import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const launchDir = path.join(root, "foundation", "launch_package");

const paths = {
  batchA: path.join(launchDir, "72_Batch_A_Response_Capture_Worksheet_2026-08-04.csv"),
  intake: path.join(launchDir, "63_Approved_Contact_Response_Intake_Worksheet_2026-08-03.csv"),
  evidence: path.join(launchDir, "49_External_Response_Evidence_Log_2026-08-02.csv"),
  scorecard: path.join(launchDir, "52_Vehicle_Funding_Quote_Intake_Scorecard_2026-08-02.csv"),
  proofClock: path.join(launchDir, "65_August_Proof_Clock_Tracker_2026-08-03.csv"),
  output: path.join(launchDir, "77_Batch_A_Response_Reconciliation_Map_2026-08-04.md"),
};

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

function normalize(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\b(the|team|main|office|cheyenne|wheatland|section|motor|vehicle|services|nremt|nemt)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(value) {
  return new Set(normalize(value).split(" ").filter((token) => token.length > 2));
}

function scoreMatch(source, candidate) {
  const sourceTokens = tokens(source);
  const candidateTokens = tokens(candidate);
  if (sourceTokens.size === 0 || candidateTokens.size === 0) return 0;

  let overlap = 0;
  for (const token of sourceTokens) {
    if (candidateTokens.has(token)) overlap += 1;
  }

  const sourceNorm = normalize(source);
  const candidateNorm = normalize(candidate);
  const containsBonus =
    sourceNorm.includes(candidateNorm) || candidateNorm.includes(sourceNorm) ? 2 : 0;

  return overlap + containsBonus;
}

function bestMatch(source, rows, targetField, idField) {
  const ranked = rows
    .map((row) => ({
      row,
      score: scoreMatch(source, row[targetField]),
    }))
    .sort((a, b) => b.score - a.score);

  const [best] = ranked;
  if (!best || best.score < 2) return "New row required";

  return `${best.row[idField] ?? best.row.Priority ?? "Matched"}: ${best.row[targetField]}`;
}

function gateIds(proofGate) {
  return [...String(proofGate).matchAll(/PC-\d{2}/g)].map((match) => match[0]);
}

function gateSummary(proofGate, proofClock) {
  return gateIds(proofGate)
    .map((id) => {
      const row = proofClock.find((gate) => gate["Gate ID"] === id);
      return row ? `${id}: ${row.Gate} (${row["Current Status"]})` : `${id}: new gate mapping needed`;
    })
    .join("; ");
}

function actionFor(matches) {
  const missing = Object.entries(matches)
    .filter(([, value]) => value === "New row required")
    .map(([key]) => key);

  if (missing.length > 0) {
    return `Append ${missing.join(", ")} row(s), then reconcile response before counting proof.`;
  }

  return "Update matched rows and proof clock only after minimum fields and evidence standard are satisfied.";
}

function transferRows(row) {
  return [
    ["72 Contact Date", "63 Contact Date; 52 Received Date; 49 Response Received date note"],
    ["72 Contact Time", "63 Contact Time; 49 Response Received note"],
    ["72 Operator", "63 Operator"],
    ["72 Approval Source", "63 Approval Source; 49/52 approval gate note"],
    ["72 Route", "63 Contact Route Used; 49 Contact Route; 52 Contact Route"],
    ["72 Contact Person", "63 Contact Person; 49 Response Received note"],
    ["72 Result Code", "63 Contact Result Code; 49 Evidence Strength; 52 Current Status"],
    ["72 Written Proof Received", "63 Written Proof Received; 49 Evidence Strength; 52 Proof Type Needed status"],
    ["72 Written Proof Location", "63 Source Document Or Attachment; 49 Response Received; 52 Current Status"],
    ["72 Dated Call Notes", "63 Source Document Or Attachment or Notes; 49 Response Received; 52 Current Status"],
    ["72 Vehicle Timing", "63 Vehicle Timing; 52 Vehicle Timing Score 0-5; 65 PC-02/PC-08 Current Evidence if countable"],
    ["72 Amount Or Total Due", "63 Amount Or Total Due; 49 Response Received; 52 Funding Score 0-5 if tied to funding"],
    ["72 Permitted Use", "63 Permitted Use; 52 Mandatory Fields; 65 Current Evidence if countable"],
    ["72 Insurance Requirement", "63 Insurance Impact; 52 Compliance Score 0-5; 65 PC-03 Current Evidence if countable"],
    ["72 Authority Impact", "63 Authority Impact; 52 Compliance Score 0-5; 65 PC-04 Current Evidence if countable"],
    ["72 Stop Rule Triggered", "63 Stop Rule Triggered; 49 Next Action; 52 Next Action"],
    ["72 Next Approval Needed", "63 Next Approval Needed; 49 Approval Gate; 52 Approval Gate"],
  ].map(([from, to]) => [row["Capture ID"], row.Target, from, to]);
}

function appendTemplate(row, destination) {
  const workstream = row["Proof Gate"].includes("partner-capacity")
    ? "Partner capacity"
    : row["Proof Gate"].includes("vehicle")
      ? "Rental bridge"
      : row["Proof Gate"].includes("insurance")
        ? "Insurance"
        : "Authority";

  if (destination === "63") {
    return [
      "Next ID",
      "",
      "",
      "TBD",
      row["Approval Source"],
      workstream,
      row.Target,
      row.Route,
      "TBD",
      "TBD",
      "No",
      row["Proof Gate"].includes("partner-capacity") ? "Partner vehicle capacity" : "TBD",
      "TBD",
      "TBD",
      "TBD",
      row["Vehicle Timing"],
      row["Amount Or Total Due"],
      row["Payment Or Deposit Asked"],
      row["Application Or Credit Pull Asked"],
      row["Application Or Credit Pull Asked"],
      row["Insurance Bind Or Filing Asked"],
      row["Insurance Bind Or Filing Asked"],
      row["Permitted Use"],
      "TBD",
      row["August 9/10 Funding Count"],
      row["August 15 Vehicle Control Count"],
      row["Stop Rule Triggered"],
      row["Written Proof Location"],
      "No",
      "No",
      row["Next Approval Needed"],
      "Reconcile only after minimum proof fields are captured",
      row.Notes,
    ];
  }

  if (destination === "49") {
    return [
      "Next priority",
      workstream,
      row.Target,
      row.Route,
      "Prepared/not contacted",
      row["Minimum Proof Fields"],
      "None",
      "Missing",
      "Cannot count toward August gate until proof is captured and reconciled",
      "Use 76 after exact approval; update this row after response",
      row["Next Approval Needed"],
    ];
  }

  return [
    "Next priority",
    workstream,
    row.Target,
    row.Route,
    "Written response or dated call notes",
    row["Minimum Proof Fields"],
    "Prepared/not contacted",
    "TBD",
    "TBD",
    "TBD",
    "TBD",
    "TBD",
    "Controls whether this path can count toward the August vehicle/funding gates",
    "Use 76 after exact approval; score only after proof is captured",
    row["Next Approval Needed"],
  ];
}

const [batchA, intake, evidence, scorecard, proofClock] = await Promise.all([
  readFile(paths.batchA, "utf8").then(parseCsv),
  readFile(paths.intake, "utf8").then(parseCsv),
  readFile(paths.evidence, "utf8").then(parseCsv),
  readFile(paths.scorecard, "utf8").then(parseCsv),
  readFile(paths.proofClock, "utf8").then(parseCsv),
]);

const mapRows = batchA.map((row) => {
  const matches = {
    "63 intake": bestMatch(row.Target, intake, "Target", "Intake ID"),
    "49 evidence": bestMatch(row.Target, evidence, "Organization", "Priority"),
    "52 scorecard": bestMatch(row.Target, scorecard, "Target", "Priority"),
  };

  return [
    row["Capture ID"],
    row.Target,
    row["Proof Gate"],
    matches["63 intake"],
    matches["49 evidence"],
    matches["52 scorecard"],
    gateSummary(row["Proof Gate"], proofClock),
    actionFor(matches),
  ];
});

const appendRows = batchA.flatMap((row) => {
  const matches = {
    "63": bestMatch(row.Target, intake, "Target", "Intake ID"),
    "49": bestMatch(row.Target, evidence, "Organization", "Priority"),
    "52": bestMatch(row.Target, scorecard, "Target", "Priority"),
  };

  return Object.entries(matches)
    .filter(([, match]) => match === "New row required")
    .map(([destination]) => [row["Capture ID"], row.Target, destination, appendTemplate(row, destination).join(" | ")]);
});

const transferTableRows = batchA.flatMap(transferRows);
const readyCount = batchA.filter(
  (row) =>
    row["Written Proof Received"] === "Yes" &&
    row["Fields Captured"] === "Yes" &&
    row["Stop Rule Triggered"] === "No",
).length;

const content = `# Batch A Response Reconciliation Map

Prepared: August 4, 2026

Company: VILIGANS COMMAND CORPORATION

Pilot: Wheatland / Platte County, Wyoming

Generated from:

- 72_Batch_A_Response_Capture_Worksheet_2026-08-04.csv
- 63_Approved_Contact_Response_Intake_Worksheet_2026-08-03.csv
- 49_External_Response_Evidence_Log_2026-08-02.csv
- 52_Vehicle_Funding_Quote_Intake_Scorecard_2026-08-02.csv
- 65_August_Proof_Clock_Tracker_2026-08-03.csv

Status: Internal generated reconciliation map. This file does not authorize external contact, Gmail draft creation, Gmail sending, quote submission, applications, credit pulls, payments, deposits, reservations, rentals, leases, purchases, filings, insurance binding, invoices, restricted-fund acceptance, sponsor recognition, DNS/admin changes, public launch claims, PHI handling, or paid passenger service.

## Executive Readout

Batch A has ${batchA.length} proof targets. ${readyCount} are currently ready to reconcile as countable proof. A response remains uncounted unless written proof or dated call notes exist, the minimum fields are captured, no unresolved stop rule is triggered, and the result is reconciled into 72, 63, 49, 52, and 65.

This map identifies where each Batch A response must land. Partner-capacity responses require append rows in the main intake, evidence log, and scorecard before they can count toward August 15 vehicle-control proof.

## Reconciliation Map

${markdownTable(
  [
    "Capture ID",
    "Target",
    "Proof gate",
    "63 intake destination",
    "49 evidence destination",
    "52 scorecard destination",
    "65 proof-clock destination",
    "Action",
  ],
  mapRows,
)}

## Append-Required Row Templates

${
  appendRows.length
    ? markdownTable(["Capture ID", "Target", "Destination", "Append template values"], appendRows)
    : "No append-required downstream rows found."
}

## Field Transfer Rules

${markdownTable(["Capture ID", "Target", "From 72", "Downstream destination"], transferTableRows)}

## Countability Sequence

1. Update the source response in 72 first.
2. If the row says written proof received, record the exact file, email, attachment, or dated note location.
3. If any required downstream row is missing, append it before counting the response.
4. Reconcile the same facts into 63, 49, and 52.
5. Update 65 only when the response satisfies the gate's required proof standard.
6. Use 59 before any response becomes a deposit, reservation, lease, purchase, insurance bind, filing, invoice, accepted restricted funds, MOU, contract, public launch claim, or passenger-service action.

## Current Goal Effect

- August 15 vehicle control remains unproven until PC-02 or PC-08 receives countable rental, lease, purchase, or partner-capacity proof.
- August 9/10 funding remains unproven until PC-05 or PC-06 receives countable cash, pledge, bridge authorization, preapproval, or written term-sheet proof.
- Paid passenger launch remains not ready until authority, insurance, driver, inspection, safety, privacy, vehicle, funding, and approval gates are all satisfied.
`;

await writeFile(paths.output, content, "utf8");
console.log(`Wrote ${path.relative(root, paths.output)}`);
