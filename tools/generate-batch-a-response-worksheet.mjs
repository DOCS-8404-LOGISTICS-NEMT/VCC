import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const launchDir = path.join(root, "foundation", "launch_package");
const registerPath = path.join(
  launchDir,
  "69_Corporate_Email_Agent_Send_Batch_Register_2026-08-03.csv",
);
const outputPath = path.join(
  launchDir,
  "72_Batch_A_Response_Capture_Worksheet_2026-08-04.csv",
);

function parseCsv(text) {
  const rows = [];
  let field = "";
  let row = [];
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === "\"") {
      if (inQuotes && next === "\"") {
        field += "\"";
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(field);
      field = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(field);
      if (row.some((value) => value.length > 0)) rows.push(row);
      row = [];
      field = "";
      continue;
    }

    field += char;
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    if (row.some((value) => value.length > 0)) rows.push(row);
  }

  const [header, ...data] = rows;
  return data.map((values) =>
    Object.fromEntries(header.map((name, index) => [name, values[index] ?? ""])),
  );
}

function csvEscape(value) {
  const text = String(value ?? "");
  return `"${text.replaceAll("\"", "\"\"")}"`;
}

function proofGateFor(row) {
  const batch = row.Batch.toLowerCase();
  if (batch.includes("authority")) return "PC-04 authority proof gate";
  if (batch.includes("insurance")) return "PC-03 insurance proof gate";
  if (batch.includes("rental")) return "PC-02 vehicle proof gate; PC-08 vehicle-control gate if terms are approved";
  if (batch.includes("partner")) return "PC-02 partner-capacity proof gate; PC-08 vehicle-control gate if written role is approved";
  return "PC-05/PC-06 funding proof gate only if written cash, pledge, preapproval, term sheet, or bridge authority exists";
}

function minimumProofFields(row) {
  const batch = row.Batch.toLowerCase();
  if (batch.includes("authority")) {
    return "MC-100; Form E; passenger capacity; USDOT trigger; markings; registration; pre-authority limits; paid-service boundary";
  }
  if (batch.includes("insurance")) {
    return "NEMT/livery appetite; policy type; limits; driver rules; Form E support; rental/lease/owned or partner-vehicle treatment; exclusions; premium/down-payment sequence";
  }
  if (batch.includes("rental")) {
    return "August 10-15 availability; vehicle class; accessibility equipment; total due; permitted use; insurance requirement; mileage; pickup/delivery; hold or reservation conditions";
  }
  if (batch.includes("partner")) {
    return "Partner role; vehicle class/accessibility; driver responsibility; insurance; authority/exemption; schedule; payment/no-cost terms; data boundary; liability; approvals";
  }
  return row["Proof Needed"];
}

const sourceRows = parseCsv(await readFile(registerPath, "utf8"));
const batchRows = sourceRows.filter((row) => Number(row.Priority) <= 7);

const headers = [
  "Capture ID",
  "Source Priority",
  "Proof Gate",
  "Target",
  "Route",
  "Approved Contact Type",
  "Contact Date",
  "Contact Time",
  "Operator",
  "Approval Source",
  "Contact Person",
  "Result Code",
  "Written Proof Received",
  "Written Proof Location",
  "Dated Call Notes",
  "Minimum Proof Fields",
  "Fields Captured",
  "Vehicle Timing",
  "Amount Or Total Due",
  "Permitted Use",
  "Insurance Requirement",
  "Authority Impact",
  "Payment Or Deposit Asked",
  "Application Or Credit Pull Asked",
  "Insurance Bind Or Filing Asked",
  "Stop Rule Triggered",
  "August 5 Vehicle Proof Count",
  "August 7 Authority Insurance Count",
  "August 9/10 Funding Count",
  "August 15 Vehicle Control Count",
  "Next Approval Needed",
  "Reconcile To 63",
  "Reconcile To 49",
  "Reconcile To 52",
  "Reconcile To 65",
  "Follow-Up Date",
  "Notes",
];

const outputRows = batchRows.map((row, index) => ({
  "Capture ID": `BA-${String(index + 1).padStart(3, "0")}`,
  "Source Priority": row.Priority,
  "Proof Gate": proofGateFor(row),
  Target: row.Target,
  Route: row["Recipient Or Route"],
  "Approved Contact Type": "TBD after CEO approval; call, email, or public form only",
  "Contact Date": "",
  "Contact Time": "",
  Operator: "TBD",
  "Approval Source": "Pending CEO approval under 71_Batch_A_CEO_Approval_Checklist_2026-08-04.md",
  "Contact Person": "TBD",
  "Result Code": "TBD",
  "Written Proof Received": "No",
  "Written Proof Location": "TBD",
  "Dated Call Notes": "TBD",
  "Minimum Proof Fields": minimumProofFields(row),
  "Fields Captured": "No",
  "Vehicle Timing": "TBD",
  "Amount Or Total Due": "TBD",
  "Permitted Use": "TBD",
  "Insurance Requirement": "TBD",
  "Authority Impact": "TBD",
  "Payment Or Deposit Asked": "No unapproved payment or deposit",
  "Application Or Credit Pull Asked": "No unapproved application or credit pull",
  "Insurance Bind Or Filing Asked": "No unapproved bind or filing",
  "Stop Rule Triggered": "TBD",
  "August 5 Vehicle Proof Count": "No until minimum fields are captured and reconciled",
  "August 7 Authority Insurance Count": "No until minimum fields are captured and reconciled",
  "August 9/10 Funding Count": "No until written cash, pledge, preapproval, term sheet, or approved bridge authority exists",
  "August 15 Vehicle Control Count": "No until written control or partner-capacity proof plus use limits is captured",
  "Next Approval Needed": row["Approval Required"],
  "Reconcile To 63": "No",
  "Reconcile To 49": "No",
  "Reconcile To 52": "No",
  "Reconcile To 65": "No",
  "Follow-Up Date": "TBD",
  Notes: row.Notes,
}));

const csv = [
  headers.map(csvEscape).join(","),
  ...outputRows.map((row) => headers.map((header) => csvEscape(row[header])).join(",")),
].join("\n") + "\n";

await writeFile(outputPath, csv, "utf8");
console.log(`Wrote ${path.relative(root, outputPath)}`);
