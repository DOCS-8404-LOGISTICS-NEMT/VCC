from __future__ import annotations

import html
import re
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    HRFlowable,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[2]
LAUNCH = ROOT / "foundation" / "launch_package"
OUT = ROOT / "output" / "pdf"

PREPARED_DATE = "August 2, 2026"
COMPANY = "VILIGANS COMMAND CORPORATION"
FILING_ID = "2025-001851867"
SIGNER = "ALAWNDUS L. DAVIS"
SIGNER_TITLE = "CEO/FOUNDER"


def clean(text: str) -> str:
    replacements = {
        "\u2018": "'",
        "\u2019": "'",
        "\u201c": '"',
        "\u201d": '"',
        "\u2013": "-",
        "\u2014": "-",
        "\u00a0": " ",
    }
    for old, new in replacements.items():
        text = text.replace(old, new)
    return text


def esc(text: str) -> str:
    text = clean(text).strip()
    text = re.sub(r"`([^`]+)`", r"\1", text)
    return html.escape(text)


def make_styles():
    base = getSampleStyleSheet()
    styles = {
        "title": ParagraphStyle(
            "VCC Title",
            parent=base["Title"],
            fontName="Helvetica-Bold",
            fontSize=18,
            leading=22,
            alignment=TA_CENTER,
            textColor=colors.HexColor("#1f2933"),
            spaceAfter=8,
        ),
        "subtitle": ParagraphStyle(
            "VCC Subtitle",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=10,
            leading=14,
            alignment=TA_CENTER,
            textColor=colors.HexColor("#4b5563"),
            spaceAfter=12,
        ),
        "h1": ParagraphStyle(
            "VCC H1",
            parent=base["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=14,
            leading=18,
            textColor=colors.HexColor("#111827"),
            spaceBefore=12,
            spaceAfter=6,
        ),
        "h2": ParagraphStyle(
            "VCC H2",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=11,
            leading=14,
            textColor=colors.HexColor("#1f2933"),
            spaceBefore=9,
            spaceAfter=5,
        ),
        "body": ParagraphStyle(
            "VCC Body",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=9,
            leading=12,
            textColor=colors.HexColor("#111827"),
            spaceAfter=4,
        ),
        "small": ParagraphStyle(
            "VCC Small",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=7.5,
            leading=10,
            textColor=colors.HexColor("#111827"),
            spaceAfter=3,
        ),
        "bullet": ParagraphStyle(
            "VCC Bullet",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=9,
            leading=12,
            leftIndent=14,
            firstLineIndent=-8,
            spaceAfter=3,
        ),
        "sig": ParagraphStyle(
            "VCC Signature",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=9,
            leading=13,
            textColor=colors.HexColor("#111827"),
            spaceAfter=5,
        ),
        "warning": ParagraphStyle(
            "VCC Warning",
            parent=base["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=8.5,
            leading=11,
            textColor=colors.HexColor("#7f1d1d"),
            backColor=colors.HexColor("#fee2e2"),
            borderPadding=6,
            spaceAfter=8,
        ),
    }
    return styles


STYLES = make_styles()


def paragraph(text: str, style: str = "body"):
    return Paragraph(esc(text), STYLES[style])


def signature_block(name: str = SIGNER, title: str = SIGNER_TITLE, label: str = "Authorized signature"):
    return [
        Spacer(1, 0.18 * inch),
        paragraph(label, "sig"),
        Spacer(1, 0.18 * inch),
        paragraph("Signature: ________________________________________________", "sig"),
        paragraph(f"Name: {name}", "sig"),
        paragraph(f"Title: {title}", "sig"),
        paragraph("Date: ______________________", "sig"),
    ]


def secretary_block():
    return [
        Spacer(1, 0.16 * inch),
        paragraph("Secretary certification, if applicable", "sig"),
        Spacer(1, 0.16 * inch),
        paragraph("Signature: ________________________________________________", "sig"),
        paragraph("Name: CARIANN M. BODENDORFOR [confirm legal spelling before signature]", "sig"),
        paragraph("Date: ______________________", "sig"),
    ]


def page_footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(colors.HexColor("#6b7280"))
    canvas.drawString(0.65 * inch, 0.38 * inch, "VCC signing packet - prepared for signature review - unsigned until executed")
    canvas.drawRightString(7.85 * inch, 0.38 * inch, f"Page {doc.page}")
    canvas.restoreState()


def parse_table(block: list[str], width: float):
    rows: list[list[str]] = []
    for line in block:
        stripped = line.strip()
        if not stripped.startswith("|") or not stripped.endswith("|"):
            continue
        cells = [cell.strip() for cell in stripped.strip("|").split("|")]
        if all(re.fullmatch(r":?-{3,}:?", cell or "") for cell in cells):
            continue
        rows.append(cells)
    if not rows:
        return []
    max_cols = max(len(row) for row in rows)
    for row in rows:
        row.extend([""] * (max_cols - len(row)))
    cell_style = STYLES["small"]
    data = [[Paragraph(esc(cell), cell_style) for cell in row] for row in rows]
    col_widths = [width / max_cols] * max_cols
    table = Table(data, colWidths=col_widths, repeatRows=1, hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("GRID", (0, 0), (-1, -1), 0.25, colors.HexColor("#cbd5e1")),
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#e5e7eb")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.HexColor("#111827")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 4),
                ("RIGHTPADDING", (0, 0), (-1, -1), 4),
                ("TOPPADDING", (0, 0), (-1, -1), 3),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
            ]
        )
    )
    return [table, Spacer(1, 0.08 * inch)]


def markdown_to_flowables(markdown: str, width: float):
    flow = []
    lines = clean(markdown).splitlines()
    table_block: list[str] = []

    def flush_table():
        nonlocal table_block
        if table_block:
            flow.extend(parse_table(table_block, width))
            table_block = []

    for raw in lines:
        line = raw.rstrip()
        stripped = line.strip()
        if not stripped:
            flush_table()
            flow.append(Spacer(1, 0.05 * inch))
            continue
        if stripped.startswith("|") and stripped.endswith("|"):
            table_block.append(stripped)
            continue
        flush_table()
        if stripped.startswith("# "):
            flow.append(Paragraph(esc(stripped[2:]), STYLES["h1"]))
        elif stripped.startswith("## "):
            flow.append(Paragraph(esc(stripped[3:]), STYLES["h2"]))
        elif stripped.startswith("### "):
            flow.append(Paragraph(esc(stripped[4:]), STYLES["h2"]))
        elif stripped.startswith("- "):
            flow.append(Paragraph("- " + esc(stripped[2:]), STYLES["bullet"]))
        elif re.match(r"^\d+\.\s+", stripped):
            flow.append(Paragraph(esc(stripped), STYLES["bullet"]))
        else:
            flow.append(Paragraph(esc(stripped), STYLES["body"]))
    flush_table()
    return flow


def read_doc(name: str) -> str:
    return (LAUNCH / name).read_text(encoding="utf-8")


def cover(title: str, subtitle: str):
    return [
        Paragraph(esc(COMPANY), STYLES["title"]),
        Paragraph(esc(title), STYLES["title"]),
        Paragraph(esc(subtitle), STYLES["subtitle"]),
        HRFlowable(width="100%", thickness=0.75, color=colors.HexColor("#9ca3af")),
        Spacer(1, 0.15 * inch),
        Paragraph(
            "Prepared for signature review. These PDFs are unsigned until the authorized signer applies a wet, electronic, or certificate-based signature.",
            STYLES["warning"],
        ),
        paragraph(f"Wyoming Filing ID: {FILING_ID}"),
        paragraph(f"Prepared: {PREPARED_DATE}"),
        paragraph("Signer shown for signature blocks: ALAWNDUS L. DAVIS, CEO/FOUNDER"),
        paragraph("Corporate email identity: aldavis@viliganscommandcorp.com"),
        Spacer(1, 0.08 * inch),
        paragraph("Digital signature note: this packet does not apply a signature. Use Adobe Fill & Sign, DocuSign, a certificate-based signing tool, or wet signature scanning to execute the documents."),
    ]


AUTHORITY_RESOLUTIONS = f"""# Supplemental Authority Resolutions

{COMPANY}

Wyoming Filing ID: {FILING_ID}

Prepared: {PREPARED_DATE}

Status: Prepared for signature review. Unsigned until executed.

## Resolution 1 - Annual Report And Wyoming Filing Authority

RESOLVED, that the President / CEO is authorized to prepare and file Wyoming Secretary of State annual report, license tax, address, officer, director, and related corporate maintenance filings for VILIGANS COMMAND CORPORATION when the required factual information, asset amount, payment method, and filing portal access are available.

FURTHER RESOLVED, that no filing shall include false, unverified, or placeholder information.

## Resolution 2 - Federal Registration And Grant Authority

RESOLVED, that the President / CEO is authorized to prepare SAM.gov, UEI, Grants.gov, SBA VetCert readiness, and federal or state grant materials for the corporation.

FURTHER RESOLVED, that no final federal certification, grant submission, or representation of SBA-certified SDVOSB/VOSB status shall be made unless the required source-proof evidence, signer authority, account access, and applicable approvals are complete.

## Resolution 3 - WYDOT, Operating Authority, And Insurance Preparation

RESOLVED, that the President / CEO is authorized to contact WYDOT, insurance brokers, vehicle vendors, partner agencies, and compliance resources to prepare transportation operating authority, insurance, vehicle, driver, and launch-readiness files.

FURTHER RESOLVED, that no paid passenger transportation shall begin until the Wyoming operating authority path, commercial insurance, vehicle readiness, driver files, operating manual, privacy controls, and incident procedures are complete and approved.

## Resolution 4 - Partner Outreach, Sponsorship, And Pilot Commitments

RESOLVED, that the President / CEO is authorized to use reviewed outreach scripts, capability statements, executive summaries, and MOU templates to pursue anchor partners, sponsor commitments, letters of support, and pilot planning conversations.

FURTHER RESOLVED, that no MOU, service agreement, sponsorship agreement, grant commitment, or financial obligation shall be binding until reviewed, approved, and signed by authorized parties.

## Resolution 5 - Pilot Vehicle Diligence Authority

RESOLVED, that the President / CEO is authorized to conduct diligence for pilot vehicle acquisition, accessible vehicle leasing, short-term accessible rental options, and approved partner-vehicle options.

FURTHER RESOLVED, that no vehicle purchase, deposit, loan, title transfer, lease, rental agreement, insurance bind, pledge, or public-use representation may be executed until title or use authority, lien status, inspection, insurance, use classification, storage, financing, and no-personal-use controls are complete and approved.

## Execution

The undersigned approves these supplemental authority resolutions.
"""


STOCK_SIGNATURE_PAGE = """# Stock Ledger And Issuance Signature Page

Do not sign this page until all stock ledger placeholders are completed with final shareholder address, share count, consideration, issue date, certificate or uncertificated notice number, and status notation.

The undersigned certifies that the final stock ledger and capitalization entries inserted before signature are accurate and authorized by corporate action.

Signature: ________________________________________________

Name: ALAWNDUS L. DAVIS

Title: CEO/FOUNDER

Date: ______________________

Secretary certification, if applicable:

Signature: ________________________________________________

Name: CARIANN M. BODENDORFOR [confirm legal spelling before signature]

Date: ______________________
"""


AUTHORITY_SIGNATURE_PAGE = """# Supplemental Authority Resolution Signature Page

The undersigned approves the annual-report, federal-registration, grant, WYDOT, insurance-preparation, partner-outreach, sponsorship, and pilot vehicle diligence authority resolutions in this packet.

Signature: ________________________________________________

Name: ALAWNDUS L. DAVIS

Title: CEO/FOUNDER

Date: ______________________

Secretary certification, if applicable:

Signature: ________________________________________________

Name: CARIANN M. BODENDORFOR [confirm legal spelling before signature]

Date: ______________________
"""


MOU_SIGNATURE_PAGE = """# Partner MOU Signature Page

Use this page only after the partner legal name, service scope, privacy/data language, insurance terms, payment terms if any, and counterparty signature block are completed.

VCC / DOCS authorized signature:

Signature: ________________________________________________

Name: ALAWNDUS L. DAVIS

Title: CEO/FOUNDER

Date: ______________________

Partner authorized signature:

Signature: ________________________________________________

Name: ________________________________________________

Title: ________________________________________________

Date: ______________________
"""


COMBINED_SIGNATURE_PAGES = """# Combined Packet Signature Pages

These pages are for convenience when signing the combined packet. Do not sign stock, partner, vehicle, insurance, grant, or filing commitments unless the required factual blanks and external-party terms are completed.

## Bylaws Adoption

Signature: ________________________________________________

Name: ALAWNDUS L. DAVIS

Title: CEO/FOUNDER

Date: ______________________

## Initial Board Consent

Signature: ________________________________________________

Name: ALAWNDUS L. DAVIS

Title: CEO/FOUNDER

Date: ______________________

Secretary certification, if applicable:

Signature: ________________________________________________

Name: CARIANN M. BODENDORFOR [confirm legal spelling before signature]

Date: ______________________

## Stock Ledger And Issuance Certification

Do not sign until stock ledger placeholders are completed.

Signature: ________________________________________________

Name: ALAWNDUS L. DAVIS

Title: CEO/FOUNDER

Date: ______________________

## Supplemental Authority Resolutions

Signature: ________________________________________________

Name: ALAWNDUS L. DAVIS

Title: CEO/FOUNDER

Date: ______________________

## Partner MOU Template Acknowledgment

Use only after partner-specific terms are completed.

VCC / DOCS signature: ________________________________________________

Name: ALAWNDUS L. DAVIS

Title: CEO/FOUNDER

Date: ______________________
"""


def build_pdf(path: Path, title: str, subtitle: str, markdown_docs: list[str], append_signature: bool = False):
    path.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(path),
        pagesize=LETTER,
        rightMargin=0.55 * inch,
        leftMargin=0.55 * inch,
        topMargin=0.55 * inch,
        bottomMargin=0.6 * inch,
        title=title,
        author=COMPANY,
        subject=subtitle,
    )
    story = cover(title, subtitle)
    for idx, md in enumerate(markdown_docs):
        story.append(PageBreak())
        story.extend(markdown_to_flowables(md, doc.width))
        if append_signature:
            story.extend(signature_block())
            story.extend(secretary_block())
        if idx < len(markdown_docs) - 1:
            story.append(PageBreak())
    doc.build(story, onFirstPage=page_footer, onLaterPages=page_footer)


def main():
    OUT.mkdir(parents=True, exist_ok=True)

    bylaws = read_doc("13_VCC_Bylaws_DRAFT.md")
    board = read_doc("14_VCC_Initial_Board_Consent_DRAFT.md")
    stock = read_doc("15_Stock_Ledger_and_Cap_Table_DRAFT.md")
    mou = read_doc("08_Partner_MOU_Template_DRAFT.md")
    approval = read_doc("21_Document_Approval_Register_2026-08-02.md")

    stock_notice = """# Stock Issuance Execution Notice

This stock ledger and capitalization table are prepared as a template only. Do not sign as a final issuance record until the shareholder address, number of shares, consideration, issue date, certificate or uncertificated notice number, and veteran/status notation are completed.

## Execution

The undersigned certifies that the final facts inserted before signature are accurate and authorized by corporate action.
"""

    outputs = {
        "VCC_Corporate_Signature_Packet_SIGNATURE_REVIEW_REQUIRED_2026-08-02.pdf": [
            approval,
            bylaws,
            board,
            stock,
            stock_notice,
            AUTHORITY_RESOLUTIONS,
            mou,
            COMBINED_SIGNATURE_PAGES,
        ],
        "VCC_Bylaws_SIGNATURE_REVIEW_REQUIRED_2026-08-02.pdf": [bylaws],
        "VCC_Initial_Board_Consent_SIGNATURE_REVIEW_REQUIRED_2026-08-02.pdf": [board],
        "VCC_Stock_Ledger_SIGNATURE_REVIEW_REQUIRED_2026-08-02.pdf": [stock, stock_notice, STOCK_SIGNATURE_PAGE],
        "VCC_Authority_Resolutions_SIGNATURE_REVIEW_REQUIRED_2026-08-02.pdf": [AUTHORITY_RESOLUTIONS, AUTHORITY_SIGNATURE_PAGE],
        "VCC_Partner_MOU_SIGNATURE_REVIEW_REQUIRED_2026-08-02.pdf": [mou, MOU_SIGNATURE_PAGE],
    }

    for filename, docs in outputs.items():
        build_pdf(
            OUT / filename,
            filename.replace("_", " ").replace(".pdf", ""),
            "Prepared for signature review - unsigned until executed",
            docs,
            append_signature=filename.startswith("VCC_Bylaws"),
        )

    for filename in outputs:
        print(OUT / filename)


if __name__ == "__main__":
    main()
