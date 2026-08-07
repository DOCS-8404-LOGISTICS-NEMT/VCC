import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const launchDir = path.join(root, "foundation", "launch_package");
const worksheetPath = path.join(
  launchDir,
  "72_Batch_A_Response_Capture_Worksheet_2026-08-04.csv",
);
const outputPath = path.join(
  launchDir,
  "76_Batch_A_No_Obligation_Contact_Run_Sheet_2026-08-04.md",
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

function fieldList(text) {
  return String(text)
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => `- ${item}`)
    .join("\n");
}

function routeType(row) {
  const gate = row["Proof Gate"].toLowerCase();
  if (gate.includes("authority")) return "Authority screen";
  if (gate.includes("insurance")) return "Insurance screen";
  if (gate.includes("partner-capacity")) return "Partner-capacity screen";
  if (gate.includes("vehicle")) return "Vehicle-control screen";
  return "Funding or planning screen";
}

function opener(row) {
  const type = routeType(row);
  const base =
    "This is Alawndus Davis with VILIGANS COMMAND CORPORATION. We are doing no-obligation planning for a Wheatland / Platte County accessible passenger mobility pilot. I am not filing, buying, booking, binding, contracting, sharing rider data, or launching service on this call. I only need planning requirements and either a dated written response or the name and title of the person giving the answer.";

  if (type === "Authority screen") {
    return `${base} Can you confirm the Wyoming authority steps and pre-authority limits for this exact planning model?`;
  }

  if (type === "Insurance screen") {
    return `${base} Can you confirm whether your market can consider the insurance path and what facts are required before a quote or bind step?`;
  }

  if (type === "Vehicle-control screen") {
    return `${base} Can you confirm availability, total due, use limits, insurance requirements, and whether any hold or reservation would require a separate approval?`;
  }

  if (type === "Partner-capacity screen") {
    return `${base} Can you confirm whether there is any referral, support-letter, demo/readiness, or written capacity path that would not require immediate service commitments?`;
  }

  return base;
}

function stopRules(row) {
  return [
    row["Payment Or Deposit Asked"],
    row["Application Or Credit Pull Asked"],
    row["Insurance Bind Or Filing Asked"],
    "Contract, MOU, dispatch, passenger service, public launch claim, rider data, PHI, sponsor recognition, invoice, restricted funds, or other obligation",
  ]
    .filter(Boolean)
    .map((item) => `- ${item}`)
    .join("\n");
}

function section(row) {
  return `## ${row["Capture ID"]} - ${row.Target}

| Field | Value |
|---|---|
| Priority | ${row["Source Priority"]} |
| Route | ${row.Route} |
| Proof gate | ${row["Proof Gate"]} |
| Contact type | ${row["Approved Contact Type"]} |
| Next approval needed | ${row["Next Approval Needed"]} |

### Opening Script

${opener(row)}

### Minimum Fields To Capture

${fieldList(row["Minimum Proof Fields"])}

### Stop If They Ask For

${stopRules(row)}

### Countability Rule

This response does not count toward any August gate unless the minimum fields are captured, written proof or dated call notes exist, and the result is reconciled into 72, 63, 49, 52, and 65.

### After-Contact Entry

- Contact date:
- Contact time:
- Operator:
- Contact person:
- Result code:
- Written proof location:
- Dated call notes:
- Stop rule triggered:
- Follow-up date:
`;
}

const today = "August 4, 2026";
const rows = parseCsv(await readFile(worksheetPath, "utf8")).sort(
  (a, b) => Number(a["Source Priority"]) - Number(b["Source Priority"]),
);

const overviewRows = rows.map((row) => [
  row["Source Priority"],
  row["Capture ID"],
  row.Target,
  routeType(row),
  row.Route,
  row["Next Approval Needed"],
]);

const content = `# Batch A No-Obligation Contact Run Sheet

Prepared: ${today}

Company: VILIGANS COMMAND CORPORATION

Corporate identity: aldavis@viliganscommandcorp.com

Pilot: Wheatland / Platte County, Wyoming

Generated from: 72_Batch_A_Response_Capture_Worksheet_2026-08-04.csv

Status: Internal generated run sheet. This file does not authorize external contact, Gmail draft creation, Gmail sending, quote submission, applications, credit pulls, payments, deposits, reservations, rentals, leases, purchases, filings, insurance binding, invoices, restricted-fund acceptance, sponsor recognition, DNS/admin changes, public launch claims, PHI handling, or paid passenger service.

## Purpose

This run sheet converts Batch A into a call/email-ready proof collection sequence. Its only function is to capture dated, no-obligation planning facts that can later be reconciled into the proof worksheet, response intake, evidence log, scorecard, and proof clock.

## Batch A Order

${markdownTable(
  ["Priority", "Capture ID", "Target", "Screen type", "Route", "Next approval needed"],
  overviewRows,
)}

## Universal Boundaries

- Say that VCC is collecting no-obligation planning information only.
- Do not submit an application, filing, quote application, insurance bind request, credit authorization, reservation, payment, deposit, invoice, MOU, contract, public recognition offer, public launch claim, rider data, or PHI.
- If the target asks for any binding step, stop and use 59_Exact_Obligation_Approval_Memo_DRAFT_2026-08-02.md.
- If the target provides a written response, save the location and reconcile the response into 72, 63, 49, 52, and 65 before counting proof.
- If the target gives only a verbal response, record date, time, person, title, phone/email route, and exact planning fields answered before counting it as dated call-note evidence.

## Proof Count Targets

| Gate | Minimum result needed |
|---|---|
| August 5 vehicle proof | One written rental, lease, purchase, or partner-capacity response with timing, total due or role, permitted use, insurance requirement, and approval sequence. |
| August 7 insurance proof | Written broker/carrier requirements or dated call notes covering appetite, Form E support, limits, driver rules, vehicle treatment, exclusions, and quote/bind sequence. |
| August 7 authority proof | Written WYDOT response or dated call notes covering MC-100, Form E, passenger capacity, USDOT, markings, registration, and pre-authority boundaries. |
| August 9/10 funding proof | Received funds, signed pledge, approved bridge authorization, lender/lease preapproval, or written term sheet tied to the selected vehicle path. |
| August 15 vehicle control | Written rental agreement, lease, purchase control, delivery/pickup proof, or partner-capacity proof plus use, insurance, authority, driver, inspection, safety, and approval limits. |

${rows.map(section).join("\n")}

## Approval Text To Activate This Run Sheet

\`\`\`text
I approve using 76_Batch_A_No_Obligation_Contact_Run_Sheet_2026-08-04.md for Batch A no-obligation proof contact after publishing or otherwise authorizing the VCC Corporate Email Approval Agent.

No applications, filings, credit pulls, payments, deposits, reservations, insurance binds, contracts, PHI handling, public launch claims, or paid passenger service are authorized.

Every response must be captured first in 72_Batch_A_Response_Capture_Worksheet_2026-08-04.csv and reconciled into 63, 49, 52, and 65 before it counts as proof.
\`\`\`
`;

await writeFile(outputPath, content, "utf8");
console.log(`Wrote ${path.relative(root, outputPath)}`);
