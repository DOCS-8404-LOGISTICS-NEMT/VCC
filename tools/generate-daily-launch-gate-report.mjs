import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const launchDir = path.join(root, "foundation", "launch_package");

const proofClockPath = path.join(
  launchDir,
  "65_August_Proof_Clock_Tracker_2026-08-03.csv",
);
const responseWorksheetPath = path.join(
  launchDir,
  "72_Batch_A_Response_Capture_Worksheet_2026-08-04.csv",
);
const outputPath = path.join(
  launchDir,
  "75_Daily_Launch_Gate_Report_2026-08-04.md",
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

function countBy(rows, key) {
  return rows.reduce((counts, row) => {
    const value = row[key] || "Blank";
    counts[value] = (counts[value] ?? 0) + 1;
    return counts;
  }, {});
}

function markdownTable(headers, rows) {
  const clean = (value) => String(value ?? "").replaceAll("|", "\\|");
  const lines = [
    `| ${headers.join(" | ")} |`,
    `|${headers.map(() => "---").join("|")}|`,
  ];

  for (const row of rows) {
    lines.push(`| ${row.map(clean).join(" | ")} |`);
  }

  return lines.join("\n");
}

function yesCount(rows, key) {
  return rows.filter((row) => String(row[key]).trim().toLowerCase() === "yes").length;
}

const today = "August 4, 2026";
const proofClock = parseCsv(await readFile(proofClockPath, "utf8"));
const responseRows = parseCsv(await readFile(responseWorksheetPath, "utf8"));

const statusCounts = countBy(proofClock, "Current Status");
const responseSummary = {
  total: responseRows.length,
  writtenProof: yesCount(responseRows, "Written Proof Received"),
  fieldsCaptured: yesCount(responseRows, "Fields Captured"),
  vehicleCount: yesCount(responseRows, "August 5 Vehicle Proof Count"),
  authorityInsuranceCount: yesCount(responseRows, "August 7 Authority Insurance Count"),
  fundingCount: yesCount(responseRows, "August 9/10 Funding Count"),
  vehicleControlCount: yesCount(responseRows, "August 15 Vehicle Control Count"),
};

const statusRows = Object.entries(statusCounts).map(([status, count]) => [status, count]);

const gateRows = proofClock.map((row) => [
  row["Gate ID"],
  row["Decision Date"],
  row.Gate,
  row["Current Status"],
  row["Required Proof To Count"],
  row["Next Approval Needed"],
]);

const batchRows = responseRows.map((row) => [
  row["Capture ID"],
  row.Target,
  row["Proof Gate"],
  row["Written Proof Received"],
  row["Fields Captured"],
  row["Next Approval Needed"],
]);

const content = `# Daily Launch Gate Report

Prepared: ${today}

Company: VILIGANS COMMAND CORPORATION

Operating path: DOCS 8404 Logistics & NEMT LLC

Pilot: Wheatland / Platte County, Wyoming

Generated from:

- 65_August_Proof_Clock_Tracker_2026-08-03.csv
- 72_Batch_A_Response_Capture_Worksheet_2026-08-04.csv

Status: Internal generated report. This file does not authorize external contact, Gmail draft creation, Gmail sending, quote submission, applications, credit pulls, payments, deposits, reservations, rentals, leases, purchases, filings, insurance binding, invoices, restricted-fund acceptance, sponsor recognition, DNS/admin changes, public launch claims, PHI handling, or paid passenger service.

## Executive Readout

The August 15 pilot vehicle goal remains possible but unproven. The August 9/10 funding goal remains possible but unproven. Paid passenger launch is not ready.

The current proof record does not yet contain written vehicle control, written partner capacity, written funding proof, written insurance bindability, or a written WYDOT authority path. The next action that can move the goal is exact approval to publish/use the corporate email approval agent and activate Batch A no-obligation proof contact under packets 70, 71, 72, and 74.

## Gate Status Count

${markdownTable(["Current status", "Count"], statusRows)}

## Batch A Capture Count

| Metric | Count |
|---|---:|
| Batch A proof targets | ${responseSummary.total} |
| Written proof received | ${responseSummary.writtenProof} |
| Minimum fields captured | ${responseSummary.fieldsCaptured} |
| Countable August 5 vehicle proof | ${responseSummary.vehicleCount} |
| Countable August 7 authority/insurance proof | ${responseSummary.authorityInsuranceCount} |
| Countable August 9/10 funding proof | ${responseSummary.fundingCount} |
| Countable August 15 vehicle-control proof | ${responseSummary.vehicleControlCount} |

## Current Gate Table

${markdownTable(
  ["Gate ID", "Decision date", "Gate", "Status", "Required proof to count", "Next approval needed"],
  gateRows,
)}

## Batch A Response Table

${markdownTable(
  ["Capture ID", "Target", "Proof gate", "Written proof", "Fields captured", "Next approval needed"],
  batchRows,
)}

## Decision Standard

1. Vehicle by August 15 can be treated as realistic only if a rental, lease, purchase, or partner-capacity response becomes countable proof before the vehicle-control gate.
2. Funding within the week can be treated as realistic only if VCC has received funds, a signed pledge, approved bridge authorization, lease/lender preapproval, or a written term sheet tied to the selected vehicle path.
3. Grant opportunities can support scale-up and sustainability, but they do not count as one-week vehicle cash.
4. Website SSL, DKIM, SAM/UEI, Grants.gov, Medicaid provider path, insurance, and WYDOT authority remain separate launch gates.
5. If any target asks for money, filing, credit pull, bind, reservation, contract, public recognition, rider data, or service claim, stop and use 59_Exact_Obligation_Approval_Memo_DRAFT_2026-08-02.md before action.

## Next Approval Text

\`\`\`text
I approve publishing the VCC Corporate Email Approval Agent and activating Batch A no-obligation proof contact for WYDOT, Progressive, Insureon, Frontier Access & Mobility, MobilityWorks, Platte ParaTransit, and Services for Seniors using packets 70, 71, 72, and 74.

No applications, filings, credit pulls, payments, deposits, reservations, insurance binds, contracts, PHI handling, public launch claims, or paid passenger service are authorized.

Every response must be captured first in 72_Batch_A_Response_Capture_Worksheet_2026-08-04.csv and reconciled into 63, 49, 52, and 65 before it counts as proof.
\`\`\`
`;

await writeFile(outputPath, content, "utf8");
console.log(`Wrote ${path.relative(root, outputPath)}`);
