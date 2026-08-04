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
  "71_Batch_A_CEO_Approval_Checklist_2026-08-04.md",
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

function markdownTable(rows) {
  const headers = ["Priority", "Target", "Route", "Action", "Approval"];
  const lines = [
    `| ${headers.join(" | ")} |`,
    `|${headers.map(() => "---").join("|")}|`,
  ];

  for (const row of rows) {
    lines.push(
      [
        row.Priority,
        row.Target,
        row["Recipient Or Route"],
        row["Earliest Safe Agent Action"],
        row["Approval Required"],
      ]
        .map((value) => String(value).replaceAll("|", "\\|"))
        .join(" | ")
        .replace(/^/, "| ")
        .replace(/$/, " |"),
    );
  }

  return lines.join("\n");
}

const registerRows = parseCsv(await readFile(registerPath, "utf8"));
const batchARows = registerRows.filter((row) => Number(row.Priority) <= 7);
const replacementRows = registerRows.filter((row) =>
  row["Current Draft Or Action"].toLowerCase().includes("stale attachment"),
);

const today = "August 4, 2026";

const content = `# Batch A CEO Approval Checklist

Prepared: ${today}

Company: VILIGANS COMMAND CORPORATION

Operating path: DOCS 8404 Logistics & NEMT LLC

Pilot: Wheatland / Platte County, Wyoming

Corporate email identity: aldavis@viliganscommandcorp.com

Source register: 69_Corporate_Email_Agent_Send_Batch_Register_2026-08-03.csv

Status: Internal CEO approval checklist. This file does not authorize publishing an agent, sending email, creating or replacing Gmail drafts, external contact, applications, credit pulls, deposits, reservations, rentals, leases, purchases, filings, insurance binding, invoices, restricted-fund acceptance, sponsor recognition, public launch claims, rider data exchange, or paid passenger service.

## Executive Decision

Batch A is the minimum proof cycle needed to keep the August 5 vehicle proof gate and August 7 authority/insurance gates alive.

The decision is not whether to launch paid passenger service. The decision is whether to collect no-obligation proof from the authority, insurance, rental bridge, and partner-vehicle targets.

## Batch A Targets

${markdownTable(batchARows)}

## Exact Approval Needed To Start Batch A

\`\`\`text
I approve Batch A no-obligation proof contact under 70_August_4_First_Proof_Activation_Packet_2026-08-04.md.

This approval authorizes calls, emails, and public contact forms for the following proof-only targets: WYDOT Regulatory Section / Motor Vehicle Services, Progressive Commercial, Insureon NEMT / paratransit, Frontier Access & Mobility - Cheyenne, MobilityWorks Rental Team, Platte ParaTransit, and Services for Seniors - Wheatland.

This approval authorizes use of the VCC Corporate Email Approval Agent to review existing Gmail drafts and prepare exact approval checklists. It does not authorize sending an email, creating or replacing a Gmail draft, deleting a Gmail draft, submitting an application, authorizing a credit pull, paying fees or deposits, reserving a vehicle, renting, leasing, purchasing, filing authority paperwork, binding insurance, issuing invoices, accepting restricted funds, promising sponsor recognition, making public launch claims, sharing rider data, or representing that passenger service is active.
\`\`\`

## Optional Separate Approvals

These are separate from Batch A and should be approved only if the CEO wants the specific action.

### Publish Corporate Email Agent

\`\`\`text
I approve publishing the VCC Corporate Email Approval Agent, agent ID agt_6a7180534f288191a6ad29c6504008cf, with Gmail connected to aldavis@viliganscommandcorp.com and Gmail write actions requiring end-user approval.
\`\`\`

### Send Existing WYDOT Draft

\`\`\`text
I approve sending Gmail draft r812018179775240945 to mvs@wyo.gov with subject "Wheatland scheduled non-emergency passenger service authority questions" exactly as currently stored.

This approval is send-only for that exact draft. It does not authorize filings, fees, insurance filings, authority representation, other sends, draft edits, applications, credit pulls, deposits, reservations, rentals, leases, purchases, invoices, restricted-fund acceptance, sponsor recognition, public launch claims, rider data exchange, or paid passenger service.
\`\`\`

### Send Existing Services For Seniors Draft

\`\`\`text
I approve sending Gmail draft r-4902884378913390524 to jeni@sfswy.org with subject "Wheatland mobility-access planning request" exactly as currently stored.

This approval is send-only for that exact draft. It does not authorize other sends, draft edits, applications, credit pulls, deposits, reservations, rentals, leases, purchases, partner agreements, dispatch, data sharing, invoices, restricted-fund acceptance, sponsor recognition, public launch claims, rider data exchange, or paid passenger service.
\`\`\`

### Create Replacement Drafts For Stale Attachments

Replacement-draft targets:

${markdownTable(replacementRows)}

\`\`\`text
I approve creating replacement Gmail drafts for the stale United Access, WyoMicro, Platte County Chamber of Commerce, and Platte County Economic Development drafts listed in 69_Corporate_Email_Agent_Send_Batch_Register_2026-08-03.csv and 53_Gmail_Draft_Attachment_Refresh_Audit_2026-08-02.md.

This approval is draft creation only. It does not authorize sending the replacement drafts, deleting old drafts, submitting applications, authorizing credit pulls, paying fees or deposits, reserving a vehicle, renting, leasing, purchasing, filing authority paperwork, binding insurance, issuing invoices, accepting restricted funds, promising sponsor recognition, making public launch claims, sharing rider data, or representing that passenger service is active.
\`\`\`

## Required Logging After Any Approved Contact

1. First capture: 63_Approved_Contact_Response_Intake_Worksheet_2026-08-03.csv
2. Evidence log: 49_External_Response_Evidence_Log_2026-08-02.csv
3. Scorecard: 52_Vehicle_Funding_Quote_Intake_Scorecard_2026-08-02.csv
4. Proof clock: 65_August_Proof_Clock_Tracker_2026-08-03.csv

## No-Count Rule

No contact, draft, public listing, or verbal intent counts as funding proof or vehicle-control proof unless the required proof fields are written or captured as dated call notes and reconciled into the proof clock.

## Recommendation

Approve Batch A proof contact first. Approve send or draft-creation actions only one exact draft at a time.
`;

await writeFile(outputPath, content, "utf8");
console.log(`Wrote ${path.relative(root, outputPath)}`);
