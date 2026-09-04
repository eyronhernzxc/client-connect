<?php

require_once __DIR__ . '/fpdf19/fpdf.php';

// =====================================================
// PAGE SIZE: FOLIO (8.5 x 13 in = 215.9 x 330.2 mm)
// =====================================================
define('PAGE_W', 215.9);
define('PAGE_H', 330.2);

// Shared horizontal geometry
define('MX', 15);                 // left margin
define('CW', 185.9);              // content width
define('RX', MX + CW);            // right edge (200.9)

class MerchantPDF extends FPDF
{
    function Ellipse($x, $y, $rx, $ry)
    {
        $lx = 4 / 3 * (M_SQRT2 - 1) * $rx;
        $ly = 4 / 3 * (M_SQRT2 - 1) * $ry;
        $k  = $this->k;
        $h  = $this->h;
        $this->_out(sprintf(
            '%.2F %.2F m %.2F %.2F %.2F %.2F %.2F %.2F c',
            ($x + $rx) * $k, ($h - $y) * $k,
            ($x + $rx) * $k, ($h - ($y - $ly)) * $k,
            ($x + $lx) * $k, ($h - ($y - $ry)) * $k,
            $x * $k,         ($h - ($y - $ry)) * $k
        ));
        $this->_out(sprintf(
            '%.2F %.2F %.2F %.2F %.2F %.2F c',
            ($x - $lx) * $k, ($h - ($y - $ry)) * $k,
            ($x - $rx) * $k, ($h - ($y - $ly)) * $k,
            ($x - $rx) * $k, ($h - $y) * $k
        ));
        $this->_out(sprintf(
            '%.2F %.2F %.2F %.2F %.2F %.2F c',
            ($x - $rx) * $k, ($h - ($y + $ly)) * $k,
            ($x - $lx) * $k, ($h - ($y + $ry)) * $k,
            $x * $k,         ($h - ($y + $ry)) * $k
        ));
        $this->_out(sprintf(
            '%.2F %.2F %.2F %.2F %.2F %.2F c S',
            ($x + $lx) * $k, ($h - ($y + $ry)) * $k,
            ($x + $rx) * $k, ($h - ($y + $ly)) * $k,
            ($x + $rx) * $k, ($h - $y) * $k
        ));
    }
}

$pdf = new MerchantPDF('P', 'mm', [PAGE_W, PAGE_H]);
$pdf->SetMargins(MX, 8, MX);
$pdf->SetAutoPageBreak(false);
$pdf->AliasNbPages();


// =====================================================
// HELPERS
// =====================================================

function box($pdf, $x, $y, $w, $h)
{
    $pdf->Rect($x, $y, $w, $h);
}

function text($pdf, $x, $y, $txt, $size = 7, $style = '')
{
    $pdf->SetFont('Arial', $style, $size);
    $pdf->SetXY($x, $y);
    $pdf->Cell(0, 4, $txt, 0, 0);
}

function ctext($pdf, $x, $y, $w, $txt, $size = 7, $style = '')
{
    $pdf->SetFont('Arial', $style, $size);
    $pdf->SetXY($x, $y);
    $pdf->Cell($w, 4, $txt, 0, 0, 'C');
}

function line($pdf, $x1, $y1, $x2, $y2)
{
    $pdf->Line($x1, $y1, $x2, $y2);
}

function checkbox($pdf, $x, $y, $size = 3)
{
    $pdf->Rect($x, $y, $size, $size);
}

function radio($pdf, $x, $y, $d = 3)
{
    $cx = $x + $d / 2;
    $cy = $y + $d / 2;
    $r  = $d / 2;
    $n  = 24;
    $pts = [];
    for ($i = 0; $i <= $n; $i++) {
        $a     = 2 * M_PI * $i / $n;
        $pts[] = [$cx + $r * cos($a), $cy + $r * sin($a)];
    }
    for ($i = 0; $i < $n; $i++) {
        $pdf->Line($pts[$i][0], $pts[$i][1], $pts[$i + 1][0], $pts[$i + 1][1]);
    }
}

// -----------------------------------------------------
// PLACEHOLDER DATA HELPER
// Draws a small italic gray "sample answer" string next
// to a label so the layout can be previewed with data in
// it. Purely cosmetic/demo — safe to delete later.
// -----------------------------------------------------
function ph($pdf, $x, $y, $txt, $size = 6.3)
{
    $pdf->SetFont('Arial', 'I', $size);
    $pdf->SetTextColor(90, 90, 90);
    $pdf->SetXY($x, $y);
    $pdf->Cell(0, 4, $txt, 0, 0);
    $pdf->SetTextColor(0, 0, 0);
}

function sectionBar($pdf, $y, $label, $h = 6.2, $size = 8.5)
{
    $pdf->SetFillColor(0, 0, 0);
    $pdf->SetTextColor(255, 255, 255);
    $pdf->SetFont('Arial', 'B', $size);
    $pdf->SetXY(MX, $y);
    $pdf->Cell(CW, $h, $label, 0, 1, 'C', true);
    $pdf->SetTextColor(0, 0, 0);
    return $y + $h;
}

function fieldRow($pdf, $x, $y, $w, $h, $cols, $labelSize = 6.3)
{
    $pdf->Rect($x, $y, $w, $h);
    $totalFrac = 0;
    foreach ($cols as $c) {
        $totalFrac += $c[2];
    }
    $cx = $x;
    foreach ($cols as $i => $c) {
        $cw = $w * ($c[2] / $totalFrac);
        if ($i > 0) {
            $pdf->Line($cx, $y, $cx, $y + $h);
        }
        $pdf->SetFont('Arial', '', $labelSize);
        $pdf->SetXY($cx + 1.5, $y + 1.2);
        $pdf->Cell($cw - 3, 3.2, $c[0], 0, 0);
        if (!empty($c[1])) {
            $pdf->SetFont('Arial', 'I', 5.2);
            $pdf->SetXY($cx + 1.5, $y + 4.4);
            $pdf->Cell($cw - 3, 3, $c[1], 0, 0);
        }
        // Placeholder sample data — pulled from an optional 4th
        // array element $c[3] (see call sites for the field name
        // this value belongs to, noted in the comment above each
        // fieldRow() call).
        if (!empty($c[3])) {
            ph($pdf, $cx + 1.5, $y + 4.4, $c[3], 5.6);
        }
        $cx += $cw;
    }
    return $y + $h;
}

function pageHeader($pdf, $title, $subtitle = null, $note = 'Kindly put N/A if not applicable')
{
    $pdf->SetFont('Arial', 'B', 12);
    $pdf->SetXY(0, 32);
    $pdf->Cell(PAGE_W, 6, $title, 0, 1, 'C');
    if ($subtitle) {
        $pdf->SetFont('Arial', '', 8);
        $pdf->SetTextColor(140, 140, 140);
        $pdf->SetXY(0, 36);
        $pdf->Cell(PAGE_W, 5, $subtitle, 0, 1, 'C');
        $pdf->SetTextColor(0, 0, 0);
    }
    if ($note) {
        $pdf->SetFont('Arial', 'BI', 6.5);
        $pdf->SetXY(0, 43);
        $pdf->Cell(PAGE_W, 4, $note, 0, 1, 'C');
    }
}

function PageNote($pdf, $note)
{
    $pdf->SetFont('Arial', 'BI', 6);
    $pdf->SetXY(MX, 28);
    $pdf->Cell(CW, 4, $note, 0, 0, 'C');
}

function pageFooter($pdf, $pageNum)
{
    $y = 310;

    $pdf->SetFont('Arial', '', 6.3);
    $pdf->SetXY(MX, $y);
    $pdf->MultiCell(74, 3.4, "PISOPAY.COM INC. BLDG., 47 POLARIS ST.,\nBRGY. BEL-AIR, MAKATI CITY,\nMETRO MANILA, PHILIPPINES 1209", 0, 'L');

    $pdf->Line(65, $y, 65, $y + 7);

    $pdf->SetXY(70, $y);
    $pdf->SetFont('Arial', '', 6.3);
    $pdf->Cell(38, 3.4, "(02) 8242-8153", 0, 2);
    $pdf->SetX(70);
    $pdf->Cell(38, 3.4, "info@pisopay.com.ph", 0, 2);
    $pdf->SetX(70);
    $pdf->SetTextColor(0, 0, 200);
    $pdf->Cell(38, 3.4, "www.pisopay.com.ph", 0, 0);
    $pdf->SetTextColor(0, 0, 0);

    $pdf->Image(__DIR__ . '/images/logo2.png', 107, $y + 1, 20);
    $pdf->Image(__DIR__ . '/images/brs.png', 122, $y + 1, 15);

    $pdf->SetFont('Arial', '', 7.2);
    $pdf->SetXY(169, $y);
    $pdf->Cell(16, 3.6, 'PAGE', 0, 0, 'L');
    $pdf->SetFont('Arial', 'B', 7.2);
    $pdf->SetXY(176, $y);
    $pdf->Cell(6, 3.6, $pageNum, 0, 0, 'C');
    $pdf->SetFont('Arial', '', 7.2);
    $pdf->SetXY(180, $y);
    $pdf->Cell(6, 3.6, 'of', 0, 0, 'C');
    $pdf->SetFont('Arial', 'B', 7.2);
    $pdf->SetXY(186, $y);
    $pdf->Cell(RX - 186, 3.6, '4 (v.3)', 0, 0, 'L');

    $pdf->SetFont('Arial', '', 5.3);
    $pdf->SetXY(RX - 90, $y + 5.6);
    $pdf->Cell(90, 5.5, 'REGULATED BY THE BANGKO SENTRAL NG PILIPINAS', 0, 0, 'R');
}



// =====================================================
// PAGE 1
// =====================================================
$pdf->AddPage();
$pdf->SetFont('Arial', '', 7);

$logo = __DIR__ . '/images/logo.png';
if (!file_exists($logo)) {
    die('Logo not found at: ' . $logo);
}
$pdf->Image($logo, MX, 20, 50);

$pdf->SetFont('Arial', 'B', 12);
$pdf->SetXY(0, 38);
$pdf->Cell(PAGE_W, 2, "e-MERCHANT'S DOCUMENTARY REQUIREMENTS", 0, 1, 'C');

$pdf->SetFont('Arial', '', 8);
$cy = 41.5;
checkbox($pdf, 84, $cy, 3);
// Placeholder: mark "PRIVATE" as the selected entity type
ph($pdf, 84.5, $cy + 0.2, 'X', 6);
text($pdf, 88, $cy - 0.4, 'PRIVATE', 8);
checkbox($pdf, 110, $cy, 3);
text($pdf, 114, $cy - 0.4, 'GOVERNMENT', 8);
checkbox($pdf, 142, $cy, 3);
text($pdf, 146, $cy - 0.4, 'OTHERS:', 8);
line($pdf, 180, $cy + 3, 178, $cy + 3);

// COMPANY INFORMATION TABLE
$cx  = MX;
$cy0 = 52.3;
$cw  = CW;
$rh  = 7.8;

box($pdf, $cx, $cy0, $cw, $rh * 5);
for ($i = 1; $i < 5; $i++) {
    line($pdf, $cx, $cy0 + $rh * $i, $cx + $cw, $cy0 + $rh * $i);
}

text($pdf, $cx + 2, $cy0 + 1.8, 'COMPANY NAME:', 7);
// Placeholder for COMPANY NAME
ph($pdf, $cx + 32, $cy0 + 1.8, 'Juan Dela Cruz Trading Corp.');

$r2 = $cy0 + $rh;
line($pdf, $cx + 159.3, $r2, $cx + 159.3, $r2 + $rh);
text($pdf, $cx + 2,     $r2 + 1.8, 'COMPLETE OFFICE ADDRESS:', 7);
// Placeholder for COMPLETE OFFICE ADDRESS
ph($pdf, $cx + 58, $r2 + 1.8, 'Unit 501, ABC Tower, Ayala Ave., Makati City');
text($pdf, $cx + 161,   $r2 + 1.8, 'ZIP CODE:', 7);
// Placeholder for ZIP CODE
ph($pdf, $cx + 175, $r2 + 1.8, '1226');

$r3 = $cy0 + $rh * 2;
line($pdf, $cx + 93.8, $r3, $cx + 93.8, $r3 + $rh);
text($pdf, $cx + 2,    $r3 + 0.8, 'DTI/SEC REGISTRATION NO.:', 6.3);
// Placeholder for DTI/SEC REGISTRATION NO.
ph($pdf, $cx + 47, $r3 + 0.8, 'CS201812345', 5.8);
text($pdf, $cx + 2,    $r3 + 4.4, 'YEAR ESTABLISHED:', 6.3);
// Placeholder for YEAR ESTABLISHED
ph($pdf, $cx + 34, $r3 + 4.4, '2015', 5.8);
text($pdf, $cx + 95.5, $r3 + 0.8, 'COMPANY TIN NO.:', 6.3);
// Placeholder for COMPANY TIN NO.
ph($pdf, $cx + 125, $r3 + 0.8, '123-456-789-000', 5.8);
text($pdf, $cx + 95.5, $r3 + 4.4, 'TAX TYPE (Vat or Non-Vat):', 6.3);
// Placeholder for TAX TYPE
ph($pdf, $cx + 135, $r3 + 4.4, 'VAT', 5.8);

$r4 = $cy0 + $rh * 3;
line($pdf, $cx + 64.7,  $r4, $cx + 64.7,  $r4 + $rh);
line($pdf, $cx + 121.4, $r4, $cx + 121.4, $r4 + $rh);
text($pdf, $cx + 2,     $r4 + 1.8, 'BSP LICENSE/CERTIFICATE NUMBER:', 6);
text($pdf, $cx + 2,     $r4 + 4,   '(put N/A if not applicable)', 5, 'I');
// Placeholder for BSP LICENSE/CERTIFICATE NUMBER
ph($pdf, $cx + 45, $r4 + 2, 'BSP-EMI-0456-2020', 5.4);
text($pdf, $cx + 66.5,  $r4 + 1.8, 'BSP LICENSE TYPE:', 6);
text($pdf, $cx + 66.5,  $r4 + 4,   '(put N/A if not applicable)', 5, 'I');
// Placeholder for BSP LICENSE TYPE
ph($pdf, $cx + 93, $r4 + 2, 'EMI-Others', 5.4);
text($pdf, $cx + 123.2, $r4 + 1.8, 'BSP CERTIFICATE ISSUED DATE:', 6);
text($pdf, $cx + 123.2, $r4 + 4,   '(put N/A if not applicable)', 5, 'I');
// Placeholder for BSP CERTIFICATE ISSUED DATE
ph($pdf, $cx + 160, $r4 + 2, '03/15/2020', 5.4);

$r5 = $cy0 + $rh * 4;
line($pdf, $cx + 64.7,  $r5, $cx + 64.7,  $r5 + $rh);
line($pdf, $cx + 121.4, $r5, $cx + 121.4, $r5 + $rh);
text($pdf, $cx + 2,     $r5 + 1.8, 'CONTACT NUMBER:', 7);
// Placeholder for CONTACT NUMBER
ph($pdf, $cx + 32, $r5 + 1.8, '0917-123-4567', 5.8);
text($pdf, $cx + 66.5,  $r5 + 1.8, 'WEBSITE:', 7);
// Placeholder for WEBSITE
ph($pdf, $cx + 84, $r5 + 1.8, 'www.juandelacruztrading.com', 5.4);
text($pdf, $cx + 123.2, $r5 + 1.8, 'EMAIL ADDRESS:', 7);
// Placeholder for EMAIL ADDRESS
ph($pdf, $cx + 153, $r5 + 1.8, 'info@jdctrading.com', 5.4);

// TO BE CHECKED BY PISOPAY
ctext($pdf, MX, 97, CW, 'TO BE CHECKED BY PISOPAY ONLY', 7, 'B');

$pdf->SetFillColor(0, 0, 0);
$pdf->SetTextColor(255, 255, 255);
$pdf->SetFont('Arial', 'B', 7.5);
$barY = 101.8;
$pdf->Rect(MX + 6.2, $barY, CW - 6.2, 4);
$pdf->Rect(MX + 6.2, $barY, CW - 6.2, 4, 'F');
ctext($pdf, MX + 14.2, $barY + 0.7, 113, 'REQUIREMENTS', 7.5, 'B');
ctext($pdf, MX + 127,  $barY + 0.7, 60,  'REMARKS',      7.5, 'B');
$pdf->SetTextColor(0, 0, 0);

$reqX    = MX + 6.2;
$reqY    = $barY + 4;
$leftW   = 113;
$rightX  = $reqX + 8 + $leftW;
$rightEnd = RX - 4.5;

$items = [
    ['header' => 'CORPORATION/PARTNERSHIP REQUIREMENTS:'],
    ['item' => 'Signed Non-Disclosure Agreement'],
    ['item' => "e-Merchant's Form (4 pages)"],
    ['item' => 'Risk Assessment Questionnaire'],
    ['item' => 'Company Profile'],
    ['item' => 'Company Website'],
    ['item' => 'Latest Business Permit'],
    ['item' => 'BIR Certificate of Registration (Form 2303)'],
    ['item' => 'Securities and Exchange Commission Certificate of Registration'],
    ['item' => 'Articles of Partnership or Articles of Incorporation'],
    ['item' => 'By-Laws'],
    ['item' => 'Updated General Information Sheet (GIS)'],
    ['item' => 'Beneficial Owner Declaration Form'],
    ['item' => 'Latest Financial Statement'],
    ['item' => 'Latest Income Tax Return'],
    ['item' => '(2) Valid ID of signatory/representative and Corporate Secretary with 3 specimen signatures'],
    ['item' => "Notarized Secretary's Certificate for authorized person/signatory (see template)"],
    ['item' => 'Others: __________________________________________'],
    ['header' => 'GOVERNMENT AGENCY REQUIREMENTS:'],
    ['item' => 'Signed Non-Disclosure Agreement'],
    ['item' => 'Risk Assessment Questionnaire'],
    ['item' => 'Signed Contract'],
    ['item' => 'Approved Resolution for contract approval/signatory/authorized person'],
    ['item' => '(2) Valid ID of signatory/representative with 3 specimen signatures'],
    ['item' => "BIR 2303/Gov. Agency's TIN No.    ( VAT )    ( Non-VAT )"],
    ['item' => 'Others: __________________________________________'],
    ['header' => 'ADDITIONAL REQUIREMENTS FOR FINANCIAL COMPANY:'],
    ['item' => 'BSP Money Service Business/Operator of Payment System/EMI Certificate of Registration/License'],
    ['item' => 'AMLC Certificate of Registration'],
    ['item' => 'KYC-AML Questionnaire for Financial Institution (see attachment)'],
    ['item' => 'Latest MTPP'],
];

$rowH = 3.11;
foreach ($items as $it) {
    if (isset($it['header'])) {
        $pdf->SetFont('Arial', 'BI', 6.3);
        $pdf->SetXY($reqX + 2, $reqY + 0.2);
        $pdf->Cell($leftW, $rowH, $it['header'], 0, 0);
        $reqY += $rowH;
    } else {
        $pdf->Rect($reqX, $reqY + 0.3, 2.6, 2.6);
        // Placeholder: check the first requirement item under each
        // header as a sample of a completed checklist ("Submitted")
        if ($it['item'] === 'Signed Non-Disclosure Agreement') {
            ph($pdf, $reqX + 0.2, $reqY + 0.5, 'X', 4.6);
            ph($pdf, $rightX + 1, $reqY + 0.15, 'Submitted', 4.8);
        }
        $pdf->SetFont('Arial', '', 5.6);
        $pdf->SetXY($reqX + 8, $reqY + 0.15);
        $pdf->Cell($leftW - 8, $rowH, $it['item'], 0, 0);
        $pdf->Line($rightX, $reqY + $rowH, $rightEnd, $reqY + $rowH);
        $reqY += $rowH;
    }
}

// DISCLOSURE PARAGRAPH
$pdf->SetFont('Arial', '', 6.3);
$pdf->SetXY(MX, 209);
$paragraph = "As part of Pisopay's due diligence, you confirm by your signature below that you agreed to provide the documents and information required to be able to process the application with Pisopay.com Inc. which also allows Bangko Sentral ng Pilipinas (BSP), Anti-Money Laundering Council (AMLC) or any Government Agency to have access with your documents and information provided for audit or any legal purposes only. Pisopay.com Inc. have the authority to decline or terminate Merchant's application/account in the event that Pisopay.com Inc. see that said merchant is non-compliant or suspicious.";
$pdf->MultiCell(CW, 3.3, $paragraph, 0, 'L');

// CONFORMED BY
$pdf->SetFont('Arial', '', 7);
$pdf->SetXY(MX + 5, 231);
$pdf->Cell(25, 4, 'Conformed by:', 0, 0);
line($pdf, MX + 30,  235.5, MX + 92,  235.5);
line($pdf, MX + 99,  235.5, MX + 135, 235.5);
line($pdf, MX + 142, 235.5, MX + 178, 235.5);
// Placeholder for "Conformed by" signature block
ph($pdf, MX + 53, 232, 'Juan Dela Cruz', 6.5);
ph($pdf, MX + 108, 232, 'President', 6.5);
ph($pdf, MX + 152, 232, '09/04/2026', 6.5);
ctext($pdf, MX + 30,  236.3, 62, 'Signature over Printed Name', 6);
ctext($pdf, MX + 99,  236.3, 36, 'Designation', 6);
ctext($pdf, MX + 142, 236.3, 36, 'Date', 6);
$pdf->SetFont('Arial', '', 6);
$pdf->SetXY(MX, 240.5);
$pdf->Cell(CW, 3, str_repeat('_', 158), 0, 0);

// FOR PISOPAY'S USE ONLY
ctext($pdf, 0, 245.3, PAGE_W, "FOR PISOPAY'S USE ONLY:", 7.5, 'B');

box($pdf, MX - 1, 248.75, CW + 2, 18);
line($pdf, 82,  248.75, 82,  267);
line($pdf, 113, 248.75, 113, 267);
line($pdf, 136, 248.75, 136, 267);
line($pdf, MX - 1, 254, RX + 1, 254);

$pdf->SetFont('Arial', '', 5.6);
text($pdf, MX + 1, 249.8, 'Processed by:', 5.6);
// Placeholder for "Processed by" row
ph($pdf, MX + 16, 249.8, 'M. Santos', 5.2);
text($pdf, 84,     249.8, 'Date:', 5.6);
ph($pdf, 89, 249.8, '09/04/2026', 5.2);
text($pdf, 115,    249.8, 'Time:', 5.6);
ph($pdf, 120, 249.8, '2:30 PM', 5.2);
text($pdf, 138,    249.8, 'Remarks:', 5.6);
ph($pdf, 152, 249.8, 'Complete', 5.2);

text($pdf, MX + 1, 255.1, 'Assessed and Screened by:', 5.6);
// Placeholder for "Assessed and Screened by" row
ph($pdf, MX + 27, 255.1, 'R. Cruz', 5.2);
text($pdf, 84,     255.1, 'Date:', 5.6);
ph($pdf, 89, 255.1, '09/05/2026', 5.2);
text($pdf, 115,    255.1, 'Time:', 5.6);
ph($pdf, 120, 255.1, '10:00 AM', 5.2);
text($pdf, 138,    255.1, 'Remarks:', 5.6);
ph($pdf, 152, 255.1, 'Cleared', 5.2);
text($pdf, 138,    257.2,   'PEP: Y/N    Watchlisted: Y/N    Blocked Customer: Y/N', 5.2);
// Placeholder: sample screening result
ph($pdf, 138, 259, 'PEP: N   Watchlisted: N   Blocked: N', 4.8);
text($pdf, 138,    261, 'Risk Level: Low / Moderate / Above Average / High', 5.2);
// Placeholder: sample risk level circled/selected
ph($pdf, 138, 263.2, 'Risk Level: Low', 4.8);

// SERVICES TO PROVIDE
box($pdf, MX - 1, 267, CW + 2, 32.3);
text($pdf, MX + 2, 267.3, 'SERVICES TO PROVIDE:', 6.5, 'B');

radio($pdf, MX + 5, 272.3, 2.6);
text($pdf, MX + 9,  271.7, 'System', 6.3);
text($pdf, MX + 26, 271.7, ':   A. Front End', 6.3);
text($pdf, MX + 60, 271.7, 'B. Back End', 6.3);
text($pdf, MX + 90, 271.7, 'C. Full Stack', 6.3);
// Placeholder: mark "C. Full Stack" as selected
ph($pdf, MX + 88.3, 271.6, 'X', 6);

radio($pdf, MX + 5, 278.3, 2.6);
text($pdf, MX + 9,   277.7, 'Payment Gateway:', 6.3);
text($pdf, MX + 46,  277.7, 'A. Over-the-counter (Bank / Non-Bank)', 6.3);
text($pdf, MX + 105, 277.7, 'B. Online Banking', 6.3);
text($pdf, MX + 140, 277.7, 'C. e-Money', 6.3);
// Placeholder: mark "B. Online Banking" as selected
ph($pdf, MX + 103.3, 277.6, 'X', 6);

radio($pdf, MX + 5, 283.6, 2.6);
text($pdf, MX + 9, 283, 'Others:', 6.3);
line($pdf, MX + 24, 285.7, MX + 82, 285.7);
// Placeholder for "Others" services field
ph($pdf, MX + 26, 282.8, 'API Integration', 6);

text($pdf, MX + 12, 288, 'Approved by:', 5.8);
line($pdf, MX + 34,  290.8, MX + 76,  290.8);
// Placeholder for "Approved by" signature block
ph($pdf, MX + 36, 288, 'A. Reyes', 6);
text($pdf, MX + 80, 288, 'Designation:', 5.8);
line($pdf, MX + 101, 290.8, MX + 139, 290.8);
ph($pdf, MX + 103, 288, 'Operations Head', 6);
text($pdf, MX + 143, 288, 'Date:', 5.8);
line($pdf, MX + 154, 290.8, MX + 170, 290.8);
ph($pdf, MX + 155, 288, '09/06/2026', 5.6);

text($pdf, MX + 12, 292.2, 'Onboarded By:', 5.8);
line($pdf, MX + 34,  294.6, MX + 76,  294.6);
// Placeholder for "Onboarded By" signature block
ph($pdf, MX + 36, 292, 'K. Villanueva', 6);
text($pdf, MX + 80, 292.2, 'Designation:', 5.8);
line($pdf, MX + 101, 294.6, MX + 139, 294.6);
ph($pdf, MX + 103, 292, 'Account Officer', 6);
text($pdf, MX + 143, 292.2, 'Date:', 5.8);
line($pdf, MX + 154, 294.6, MX + 170, 294.6);
ph($pdf, MX + 155, 292, '09/06/2026', 5.6);

pageFooter($pdf, '1');


// =====================================================
// PAGE 2 - e-MERCHANT'S INFORMATION SHEET - A1
// =====================================================
$pdf->AddPage();
$pdf->SetFont('Arial', '', 7);
$pdf->Image($logo, MX, 20, 50);
pageHeader($pdf, "e-MERCHANT'S INFORMATION SHEET - A1", 'APPLICATION FORM');

$y = sectionBar($pdf, 50, 'COMPANY DETAILS', 5.3);

// Placeholder values below use the 4th array slot in each column
// definition, e.g. ['COMPANY NAME:', null, 1, 'Juan Dela Cruz Trading Corp.']
$y = fieldRow($pdf, MX, $y, CW, 7.45, [['COMPANY NAME:', null, 1, 'Juan Dela Cruz Trading Corp.']]);
$y = fieldRow($pdf, MX, $y, CW, 7.6, [
    ['REGISTERED COMPANY ADDRESS:   (No./Street, Subd./Brgy./District/Municipality/City/Province)', null, 0.858, 'Unit 501, ABC Tower, Ayala Ave., Makati City'],
    ['ZIP CODE:', null, 0.142, '1226'],
]);
$y = fieldRow($pdf, MX, $y, CW, 7.6, [
    ['NATURE OF BUSINESS:', null, 0.858, 'Online Retail / E-commerce'],
    ['YEARS IN BUSINESS:', null, 0.142, '9'],
]);
$y = fieldRow($pdf, MX, $y, CW, 7.8, [
    ['CONTACT NUMBER:', null, 1, '0917-123-4567'],
    ['WEBSITE:', null, 1, 'www.jdctrading.com'],
    ['EMAIL ADDRESS:', null, 1, 'info@jdctrading.com'],
]);

// DTI/SEC + Company TIN (2-line labels)
$rowY = $y;
$pdf->Rect(MX, $rowY, CW, 7.8);
$pdf->Line(MX + 93.7, $rowY, MX + 93.7, $rowY + 7.8);
text($pdf, MX + 1.5, $rowY + 0.8, 'DTI/SEC REGISTRATION NO:', 6.3);
// Placeholder for DTI/SEC REGISTRATION NO
ph($pdf, MX + 47, $rowY + 0.8, 'CS201812345', 5.8);
text($pdf, MX + 1.5, $rowY + 4.3, 'DATE ESTABLISHED:', 6.3);
// Placeholder for DATE ESTABLISHED
ph($pdf, MX + 34, $rowY + 4.3, '06/12/2015', 5.8);
text($pdf, MX + 95.2, $rowY + 0.8, 'COMPANY TIN NO.:', 6.3);
// Placeholder for COMPANY TIN NO.
ph($pdf, MX + 124, $rowY + 0.8, '123-456-789-000', 5.8);
text($pdf, MX + 95.2, $rowY + 4.3, 'TAX TYPE (Vat or Non-Vat):', 6.3);
// Placeholder for TAX TYPE
ph($pdf, MX + 142, $rowY + 4.3, 'VAT', 5.8);
$y = $rowY + 7.8;

// Purpose of application
$rowY = $y;
$rh   = 13.36;
$pdf->Rect(MX, $rowY, CW, $rh);
$pdf->Line(MX + 126,   $rowY, MX + 126,   $rowY + $rh);
$pdf->Line(MX + 156.5, $rowY, MX + 156.5, $rowY + $rh);
text($pdf, MX + 1.5, $rowY + 1, 'PURPOSE OF APPLICATION/TRANSACTIONS WITH PISOPAY.COM INC.:', 6.3);
// Placeholder for PURPOSE OF APPLICATION
ph($pdf, MX + 1.5, $rowY + 6, 'Online payment collection for e-commerce store', 5.8);
$pdf->SetFont('Arial', '', 5.8);
$pdf->SetXY(MX + 127.5, $rowY + 1);
$pdf->MultiCell(29, 3.1, "TOTAL NUMBER OF EXPECTED TRANSACTION PER DAY:", 0, 'L');
// Placeholder for TOTAL NUMBER OF EXPECTED TRANSACTION PER DAY
ph($pdf, MX + 127.5, $rowY + 9, '150', 6);
$pdf->SetXY(MX + 158, $rowY + 1);
$pdf->MultiCell(28, 3.1, "TOTAL AMOUNT OF EXPECTED TRANSACTION PER DAY (PHP):", 0, 'L');
// Placeholder for TOTAL AMOUNT OF EXPECTED TRANSACTION PER DAY
ph($pdf, MX + 158, $rowY + 9, '500,000.00', 6);
$y = $rowY + $rh;

// SIGNATORY'S PERSONAL DETAILS
$y   = sectionBar($pdf, $y, "SIGNATORY'S PERSONAL DETAILS", 5.6);
$rh  = 7.5;
$y   = fieldRow($pdf, MX, $y, CW, $rh, [
    ['FIRST NAME, MIDDLE NAME, LAST NAME:', null, 0.776, 'Juan Santos Dela Cruz'],
    ['SIGNATURE:', null, 0.224, null],
]);
$y = fieldRow($pdf, MX, $y, CW, $rh, [
    ['PRESENT ADDRESS: (No./Street, Subd./Brgy./District/Municipality/City/Province)', null, 0.858, '12 Mabini St., Brgy. San Isidro, Makati City'],
    ['ZIP CODE:', null, 0.142, '1226'],
], 5.6);
$y = fieldRow($pdf, MX, $y, CW, $rh, [
    ['PERMANENT ADDRESS: (No./Street, Subd./Brgy./District/Municipality/City/Province)', null, 0.858, '12 Mabini St., Brgy. San Isidro, Makati City'],
    ['ZIP CODE:', null, 0.142, '1226'],
], 5.6);
$y = fieldRow($pdf, MX, $y, CW, $rh, [
    ['BIRTHDATE:', '(mm/dd/yyyy)', 0.40, '05/14/1985'],
    ['PLACE OF BIRTH:', null, 0.25, 'Manila'],
    ['NATIONALITY:', null, 0.23, 'Filipino'],
    ['CITIZENSHIP:', null, 0.22, 'Filipino'],
]);
$y = fieldRow($pdf, MX, $y, CW, $rh, [
    ['CONTACT NO:', null, 0.30, '0917-123-4567'],
    ['EMAIL ADDRESS:', null, 0.25, 'juan.delacruz@email.com'],
    ['CIVIL STATUS:', null, 0.23, 'Married'],
    ['GENDER:', null, 0.22, 'Male'],
]);
$y = fieldRow($pdf, MX, $y, CW, $rh, [
    ["MOTHER'S MAIDEN NAME:", null, 0.30, 'Maria Santos'],
    ['DATE OF BIRTH:', null, 0.25, '05/14/1985'],
    ['PROFESSION:', null, 0.23, 'Businessman'],
    ['NATIONALITY:', null, 0.22, 'Filipino'],
]);
$spouseRh = 10.5;

$y = fieldRow($pdf, MX, $y, CW, $spouseRh, [
    ['SPOUSE NAME:', '(put N/A if not applicable)', 0.20, 'Maria Dela Cruz'],
    ['DATE OF BIRTH:', null, 0.25, '08/22/1987'],
    ['PROFESSION:', null, 0.23, 'Teacher'],
    ['NATIONALITY:', null, 0.22, 'Filipino'],
]);
$y = fieldRow($pdf, MX, $y, CW, $rh, [
    ['1. VALID ID PRESENTED:', null, 0.20, "Driver's License"],
    ['ID NUMBER:', null, 0.15, 'N01-23-456789'],
    ['EXPIRATION DATE:', null, 0.15, '05/14/2028'],
    ['2. VALID ID PRESENTED:', null, 0.20, 'Passport'],
    ['ID NUMBER:', null, 0.15, 'P1234567A'],
    ['EXPIRATION DATE:', null, 0.15, '11/30/2029'],
], 5.6);

// PERSONAL FINANCIAL INFORMATION
$y = sectionBar($pdf, $y, 'PERSONAL FINANCIAL INFORMATION', 5.24);

// Occupation checkboxes
$occTop  = $y;
$occH    = 11.86;
box($pdf, MX, $occTop, CW, $occH);
text($pdf, MX + 1.5, $occTop + 0.8, 'Occupation:', 6.3);
$occCols = [MX + 2, MX + 32, MX + 62, MX + 92, MX + 115];
$occRow1 = ['Employed', 'OFW/Overseas Filipino', 'Farmer/Fisher', 'Unemployed', 'Lawyer/Independent Legal Professional/Accountant'];
$occRow2 = ['Self-Employed', 'Retired', 'Student/Minor', 'Housewife', 'Government Official'];
foreach ($occCols as $i => $ccx) {
    checkbox($pdf, $ccx, $occTop + 4.4, 2.6);
    text($pdf, $ccx + 3.6, $occTop + 4.2, $occRow1[$i], 5.6);
    checkbox($pdf, $ccx, $occTop + 7, 2.6);
    text($pdf, $ccx + 3.6, $occTop + 7.6, $occRow2[$i], 5.6);
}
checkbox($pdf, MX + 170, $occTop + 4, 2.6);
text($pdf, MX + 172.6, $occTop + 4.1, 'Others:', 5.6);
// Placeholder: mark "Self-Employed" as the selected occupation
ph($pdf, MX + 2.4, $occTop + 6.9, 'X', 5.4);
$y = $occTop + $occH;

// TIN row
$rh = 6.43;
box($pdf, MX, $y, CW, $rh);
$pdf->SetFont('Arial', '', 6.3);
$pdf->SetXY(MX + 1.5, $y + 1.2);
$pdf->Cell(38, 3, 'Tax Identification Number (TIN) :', 0, 0);
text($pdf, MX + 55, $y + 1.4, '___ ___ ___  -  ___ ___ ___  -  ___ ___ ___  -  ___ ___ ___ ___ ___', 6.3);
// Placeholder for TIN
ph($pdf, MX + 55, $y + 3.9, '123 - 456 - 789 - 00000', 5.6);
$y += $rh;

// Source of Wealth
$sowTop = $y;
$sowH   = 12.53;
box($pdf, MX, $sowTop, CW, $sowH);
text($pdf, MX + 1.5, $sowTop + 0.8, 'Source of Wealth:', 6.3);
$sowCols = [MX + 2, MX + 33, MX + 64, MX + 95, MX + 126, MX + 157];
$sowRow1 = ['Salary', 'Business', 'Regular Remittance', 'Professional Fees', 'Taxes & Licenses', 'Government Appropriations'];
$sowRow2 = ['Interest/Commission', 'Pension', 'Loans', 'Sale of Assets', 'Scholarship/Award/Prizes', 'Others:'];
foreach ($sowCols as $i => $ccx) {
    checkbox($pdf, $ccx, $sowTop + 4.4, 2.6);
    text($pdf, $ccx + 3.6, $sowTop + 4.1, $sowRow1[$i], 5.4);
    checkbox($pdf, $ccx, $sowTop + 8, 2.6);
    text($pdf, $ccx + 3.6, $sowTop + 7.7, $sowRow2[$i], 5.4);
}
// Placeholder: mark "Business" as the selected source of wealth
ph($pdf, MX + 33.4, $sowTop + 4.1, 'X', 5.4);
$y = $sowTop + $sowH;

// Monthly Gross Income
$rh = 9.66;
box($pdf, MX, $y, CW, $rh);
text($pdf, MX + 1.5, $y + 0.8, 'Monthly Gross Income/Pension/Allowance:', 6.3);
$mgi  = ['Php 30,000.00 and below', 'Php 30,000.01-50,000.00', 'Php 50,000.01-100,000.00', 'Php 100,000.01-500,000.00', 'Over Php 500,000.01'];
$mgiX = [MX + 2, MX + 39, MX + 76, MX + 113, MX + 155];
foreach ($mgiX as $i => $ccx) {
    checkbox($pdf, $ccx, $y + 5.2, 2.6);
    text($pdf, $ccx + 3.6, $y + 4.9, $mgi[$i], 5.4);
}
// Placeholder: mark "Php 100,000.01-500,000.00" as the selected bracket
ph($pdf, MX + 113.4, $y + 5.1, 'X', 5.4);
$y += $rh;

// Annual Gross Income
$rh = 9.65;
box($pdf, MX, $y, CW, $rh);
text($pdf, MX + 1.5, $y + 0.8, 'Annual Gross Income/Pension/Allowance:', 6.3);
$agi  = ['Php 360,000.00 and below', 'Php 360,000.01-600,000.00', 'Php 600,000.01-1,200,000.00', 'Php 1,200,000.01-6,000,000.00', 'Over Php 6,000,000.01'];
$agiX = [MX + 2, MX + 39, MX + 76, MX + 116, MX + 158];
foreach ($agiX as $i => $ccx) {
    checkbox($pdf, $ccx, $y + 5.2, 2.6);
    text($pdf, $ccx + 3.6, $y + 4.9, $agi[$i], 5.4);
}
// Placeholder: mark "Php 1,200,000.01-6,000,000.00" as the selected bracket
ph($pdf, MX + 116.4, $y + 5.1, 'X', 5.4);
$y += $rh;

// PERSONAL EMPLOYMENT INFORMATION
$y = sectionBar($pdf, $y, 'PERSONAL EMPLOYMENT INFORMATION', 5.6);
$y = fieldRow($pdf, MX, $y, CW, 7.45, [
    ["EMPLOYER'S NAME:", null, 0.42, 'Juan Dela Cruz Trading Corp.'],
    ["EMPLOYER'S ADDRESS: (No./Street, Subd./Brgy./District/Municipality/City/Province)", null, 0.58, 'Unit 501, ABC Tower, Ayala Ave., Makati City'],
], 5.8);
$y = fieldRow($pdf, MX, $y, CW, 7.6, [
    ['JOB TITLE:', null, 0.42, 'President / Owner'],
    ['EMPLOYMENT DATE: (mm/dd/yyyy)', null, 0.32, '06/12/2015'],
    ['TELEPHONE NO.:', null, 0.26, '(02) 8888-1234'],
]);

// Nature of Business checkbox grid
$gridH   = 39;
box($pdf, MX, $y, CW, 3.6 + $gridH);
text($pdf, MX + 1.5, $y + 0.9, 'NATURE OF BUSINESS/ECONOMIC ACTIVITY:', 6.3, 'B');
$gridTop = $y + 3.6;

$col1 = [
    'Private Household with Employed Persons',
    'Extra-territorial Organizations and Bodies',
    'Jewelry and Precious Stones Dealer',
    'Foreign Exchange Dealer/Money Changer /Remittance Agent',
    'Agriculture, Forestry, and Fishing',
    'Mining and Quarrying',
    'Manufacturing',
    'Electricity, Gas, Steam, and Air-conditioning Supply',
    'Information and Communication',
];
$col2 = [
    'Water Supply, Sewerage, Waste Management and Remediation Activities (e.g., Cleaning up of Oil Spills)',
    'Construction (e.g., Construction of Buildings, Railroad Infrastructures)',
    'Wholesale and Retail Trade, Repair of Motor Vehicles and Motorcycles',
    'Transportation and Storage',
    'Accommodation and Food Service Activities',
];
$col3 = [
    'Professional, Scientific, and Technical Activities',
    'Administrative and Support Service Activities',
    'Public Administrative and Defense Education',
    'Human Health and Social Work Activities',
    'Activities of Private Households as Employers and Undifferentiated',
    'Financial and Insurance Activities',
    'Real Estate Activities',
];
$col4 = [
    'Activities of Extraterritorial Organizations, and Bodies (e.g., Activities of International Organizations, such as, United Nations, ASEAN. Etc.)',
    'Gambling and Betting Activities',
    'Goods and Services and Producing Activities of Households for own use (e.g., Activities of Households as Employers of Domestic Personnel such as Maids, Cooks, Waiters, Valets, etc.)',
    'Others: ______________________________',
];

function natureCol($pdf, $x, $topY, $w, $items)
{
    $yy = $topY;
    $pdf->SetFont('Arial', '', 5.4);
    foreach ($items as $it) {
        checkbox($pdf, $x, $yy + 0.5, 2.2);
        $pdf->SetXY($x + 3.2, $yy);
        $pdf->MultiCell($w - 3.2, 2.6, $it, 0, 'L');
        $yy = $pdf->GetY() + 0.6;
    }
}

natureCol($pdf, MX + 1.5, $gridTop + 1, 45, $col1);
natureCol($pdf, MX + 48,  $gridTop + 1, 45, $col2);
natureCol($pdf, MX + 95,  $gridTop + 1, 45, $col3);
natureCol($pdf, MX + 142, $gridTop + 1, 43, $col4);
// Placeholder: mark "Wholesale and Retail Trade..." (col2, item 3) as selected
ph($pdf, MX + 49.7, $gridTop + 1 + 0.7, 'X', 4.6);

pageFooter($pdf, '2');


// =====================================================
// PAGE 3 - e-MERCHANT'S INFORMATION SHEET - A1 (cont.)
// =====================================================
$pdf->AddPage();
$pdf->SetFont('Arial', '', 7);
$pdf->Image($logo, MX, 15, 50);
pageNote ($pdf, 'Kindly put N/A if not applicable');

$y = 40;

// ── ADDITIONAL INFORMATION ───────────────────────────────────

$y = sectionBar($pdf, $y, 'ADDITIONAL INFORMATION', 5.3);

// ── Two-column block ──────────────────────────────────────────

$aiTop  = $y;
$aiH    = 36;
$aiColW = 93;
$aiRH   = 6;
$aiRows = 3; // picture shows 3 lines

box($pdf, MX, $aiTop, CW, $aiH);

// Vertical divider between left and right columns
line(
    $pdf,
    MX + $aiColW,
    $aiTop,
    MX + $aiColW,
    $aiTop + $aiH
);


// ============================================================
// LEFT COLUMN — COMPANY AFFILIATIONS
// ============================================================

$pdf->SetFont('Arial', 'B', 5.9);
$pdf->SetXY(MX + 4, $aiTop + 1);

$pdf->MultiCell(
    $aiColW - 1,
    3.2,
    "List of Company/ies where you're a Director/Officer/Stockholder/Authorized Signatory",
    0,
    'L'
);

$pdf->SetFont('Arial', 'I', 5.4);
$pdf->SetXY(MX + 36, $aiTop + 4);

$pdf->Cell(
    $aiColW - 39,
    3,
    '(put N/A if not applicable)',
    0,
    0
);

$pdf->SetFont('Arial', 'I', 6);
$pdf->SetXY(MX + 37, $aiTop + 6.5);

$pdf->Cell(
    $aiColW - 40,
    3,
    'Company Name:',
    0,
    0
);


// ============================================================
// RIGHT COLUMN — EXISTING BANK ACCOUNTS
// ============================================================

$rColX = MX + $aiColW;
$rColW = CW - $aiColW;

$subW = $rColW / 3;

$pdf->SetFont('Arial', 'B', 6.3);
$pdf->SetXY($rColX + 1.5, $aiTop + 1);

$pdf->Cell(
    $rColW - 3,
    4,
    "e-Merchant's Existing Accounts with Other Banks",
    0,
    0,
    'C'
);


// ── Bank / Branch / Account Type headers ─────────────────────

$subLabels = [
    'Bank',
    'Branch Name',
    'Account Type'
];

$subY = $aiTop + 7;

for ($i = 0; $i < 3; $i++) {

    $pdf->SetFont('Arial', 'I', 6);

    $pdf->SetXY(
        $rColX + ($subW * $i),
        $subY + 0.6
    );

    $pdf->Cell(
        $subW,
        3,
        $subLabels[$i],
        0,
        0,
        'C'
    );
}


// ============================================================
// DATA LINES
// ============================================================

// Left side: Company Name lines
$leftLineX1 = MX + 4;
$leftLineX2 = MX + $aiColW - 4;


// Right side: individual Bank / Branch / Account Type lines
$rightPadding = 5;

$dataStartY = $aiTop + 14.5;

// Placeholder sample rows for the Company Affiliations /
// Existing Bank Accounts grid below
$affiliationPlaceholders = ['ABC Logistics Corp.', 'N/A', 'N/A'];
$bankPlaceholders = [
    ['BDO', 'Ayala Ave. Branch', 'Current'],
    ['BPI', 'Makati Main', 'Savings'],
    ['N/A', 'N/A', 'N/A'],
];

for ($r = 0; $r < $aiRows; $r++) {

    $ry = $dataStartY + ($aiRH * $r);

    // ── Company Name line ──
    line(
        $pdf,
        $leftLineX1,
        $ry,
        $leftLineX2,
        $ry
    );
    // Placeholder for Company Affiliation row $r
    ph($pdf, $leftLineX1 + 1, $ry - 3.2, $affiliationPlaceholders[$r], 5.4);


    // ── Bank line ──
    line(
        $pdf,
        $rColX + $rightPadding,
        $ry,
        $rColX + $subW - $rightPadding,
        $ry
    );
    // Placeholder for Bank Name (row $r)
    ph($pdf, $rColX + $rightPadding + 1, $ry - 3.2, $bankPlaceholders[$r][0], 5.4);


    // ── Branch Name line ──
    line(
        $pdf,
        $rColX + $subW + $rightPadding,
        $ry,
        $rColX + ($subW * 2) - $rightPadding,
        $ry
    );
    // Placeholder for Branch Name (row $r)
    ph($pdf, $rColX + $subW + $rightPadding + 1, $ry - 3.2, $bankPlaceholders[$r][1], 5.4);


    // ── Account Type line ──
    line(
        $pdf,
        $rColX + ($subW * 2) + $rightPadding,
        $ry,
        $rColX + ($subW * 3) - $rightPadding,
        $ry
    );
    // Placeholder for Account Type (row $r)
    ph($pdf, $rColX + ($subW * 2) + $rightPadding + 1, $ry - 3.2, $bankPlaceholders[$r][2], 5.4);
}

$y = $aiTop + $aiH;


// ── RELATIONSHIP TO GOV / INTL ORG ───────────────────────────

$y = sectionBar(
    $pdf,
    $y,
    'RELATIONSHIP TO GOVERNMENT / INTERNATIONAL ORGANIZATION',
    5.3,
    7.5
);

$govH    = 34;
$govRows = 3; // picture shows 3 rows

box($pdf, MX, $y, CW, $govH);


// ============================================================
// SECTION NOTE
// ============================================================

$pdf->SetFont('Arial', 'BI', 5.6);

$pdf->SetXY(MX + 1.5, $y + 1.2);

$pdf->MultiCell(
    CW - 3,
    3,
    "Relationship to Official of Government/International Organization    (put N/A if not applicable)",
    0,
    'L'
);


// ============================================================
// FOUR HEADERS
// ============================================================

$gColW = CW / 4;

$gHdrY = $y + 7.5;

$gHeaders = [
    'Full Name',
    'Relationship',
    'Position',
    'Government Organization Name'
];

for ($j = 0; $j < 4; $j++) {

    $pdf->SetFont('Arial', 'I', 5.8);

    $pdf->SetXY(
        MX + ($gColW * $j),
        $gHdrY
    );

    $pdf->Cell(
        $gColW,
        3,
        $gHeaders[$j],
        0,
        0,
        'C'
    );
}


// ============================================================
// DATA LINES
// ============================================================

// The picture DOES NOT have full-width horizontal lines.
// Each field has its own independent line.

$govLineStartY = $gHdrY + 9;

$govLineGap = 7.5;

$govPadding = 4;

// Placeholder sample row: all N/A since no such relationship exists
$govPlaceholders = [
    ['N/A', 'N/A', 'N/A', 'N/A'],
    ['N/A', 'N/A', 'N/A', 'N/A'],
    ['N/A', 'N/A', 'N/A', 'N/A'],
];

for ($r = 0; $r < $govRows; $r++) {

    $ry = $govLineStartY + ($govLineGap * $r);

    // Full Name
    line(
        $pdf,
        MX + $govPadding,
        $ry,
        MX + $gColW - $govPadding,
        $ry
    );
    // Placeholder for Full Name (row $r)
    ph($pdf, MX + $govPadding + 1, $ry - 3.2, $govPlaceholders[$r][0], 5.4);

    // Relationship
    line(
        $pdf,
        MX + $gColW + $govPadding,
        $ry,
        MX + ($gColW * 2) - $govPadding,
        $ry
    );
    // Placeholder for Relationship (row $r)
    ph($pdf, MX + $gColW + $govPadding + 1, $ry - 3.2, $govPlaceholders[$r][1], 5.4);

    // Position
    line(
        $pdf,
        MX + ($gColW * 2) + $govPadding,
        $ry,
        MX + ($gColW * 3) - $govPadding,
        $ry
    );
    // Placeholder for Position (row $r)
    ph($pdf, MX + ($gColW * 2) + $govPadding + 1, $ry - 3.2, $govPlaceholders[$r][2], 5.4);

    // Government Organization Name
    line(
        $pdf,
        MX + ($gColW * 3) + $govPadding,
        $ry,
        MX + ($gColW * 4) - $govPadding,
        $ry
    );
    // Placeholder for Government Organization Name (row $r)
    ph($pdf, MX + ($gColW * 3) + $govPadding + 1, $ry - 3.2, $govPlaceholders[$r][3], 5.4);
}

$y += $govH;

// ── FATCA ────────────────────────────────────────────────────────
$fatH = 22;
box($pdf, MX, $y, CW, $fatH);

$pdf->SetFont('Arial', 'BI', 6.3);
$pdf->SetXY(MX + 1.5, $y + 1.2);
$pdf->MultiCell(CW - 3, 3.2, "For U.S person under Foreign Account Tax Compliance Act (FATCA)    (put N/A if not applicable)", 0, 'L');

$pdf->SetFont('Arial', '', 6.3);
$pdf->SetXY(MX + 1.5, $y + 6.5);
$pdf->Cell(CW - 3, 3, "Are you a U.S Person?      ___Yes      ___No     (If Yes, please provide the following)", 0, 0);
// Placeholder: mark "No" as the answer to the FATCA question
ph($pdf, MX + 63, $y + 6.5, 'X', 6);

$fat1 = $y + 11.5;
line($pdf, MX, $fat1, MX + CW, $fat1);
line($pdf, MX + 140, $fat1, MX + 140, $fat1 + 5.5);
text($pdf, MX + 1.5, $fat1 + 1.2, 'U.S Address:', 6.3);
// Placeholder for U.S Address
ph($pdf, MX + 22, $fat1 + 1.2, 'N/A', 5.8);
text($pdf, MX + 141.5, $fat1 + 1.2, 'ZIP Code:', 6.3);
// Placeholder for ZIP Code (U.S.)
ph($pdf, MX + 158, $fat1 + 1.2, 'N/A', 5.8);

$fat2 = $fat1 + 5.5;
line($pdf, MX, $fat2, MX + CW, $fat2);
line($pdf, MX + 70, $fat2, MX + 70, $fat2 + 5.5);
line($pdf, MX + 130, $fat2, MX + 130, $fat2 + 5.5);
text($pdf, MX + 1.5, $fat2 + 1.2, 'U.S Phone No.: (Area Code+Telephone No.)', 6.3);
// Placeholder for U.S Phone No.
ph($pdf, MX + 1.5, $fat2 + 4, 'N/A', 5.8);
text($pdf, MX + 71.5, $fat2 + 1.2, 'Length of Stay in the U.S:', 6.3);
// Placeholder for Length of Stay in the U.S
ph($pdf, MX + 71.5, $fat2 + 4, 'N/A', 5.8);
text($pdf, MX + 131.5, $fat2 + 1.2, 'U.S TIN:', 6.3);
// Placeholder for U.S TIN
ph($pdf, MX + 131.5, $fat2 + 4, 'N/A', 5.8);
$y += $fatH;

// ── e-MERCHANT'S SETTLEMENT ACCOUNT INFO ───────────────────────
$y = sectionBar($pdf, $y, "e-MERCHANT'S SETTLEMENT ACCOUNT INFO", 5.3);

$setRH   = 7;
$setRows = 4;
box($pdf, MX, $y, CW, $setRH * $setRows);
line($pdf, MX + 92, $y, MX + 92, $y + $setRH * $setRows); // vertical divider

$setData = [
    ['Bank Name:',      'Branch Address:'],
    ['Account Name:',   'Contact Person:'],
    ['Account Number:', 'Contact No.:'],
    ['Account Type:',   'Email address:'],
];
// Placeholder settlement account values, paired with $setData above
$setPlaceholders = [
    ['BDO Unibank', 'Ayala Ave. Branch, Makati City'],
    ['Juan Dela Cruz Trading Corp.', 'Ma. Cristina Reyes'],
    ['0012-3456-7890', '0918-234-5678'],
    ['Current Account', 'settlements@jdctrading.com'],
];
for ($i = 0; $i < $setRows; $i++) {
    $sy = $y + $setRH * $i;
    if ($i > 0) {
        line($pdf, MX, $sy, MX + CW, $sy);
    }
    text($pdf, MX + 1.5, $sy + 1.4, $setData[$i][0], 6.3);
    // Placeholder for "{$setData[$i][0]}"
    ph($pdf, MX + 1.5, $sy + 4.6, $setPlaceholders[$i][0], 5.6);
    text($pdf, MX + 93.5, $sy + 1.4, $setData[$i][1], 6.3);
    // Placeholder for "{$setData[$i][1]}"
    ph($pdf, MX + 93.5, $sy + 4.6, $setPlaceholders[$i][1], 5.6);
}
$y += $setRH * $setRows;

// ── CUSTOMER SUPPORT CONTACT DETAILS ───────────────────────────
$y = sectionBar($pdf, $y, 'e-MERCHANTS CUSTOMER SUPPORT CONTACT DETAILS', 5.3);

$csRH = 6.5;
box($pdf, MX, $y, CW, $csRH * 2);
line($pdf, MX + 92, $y, MX + 92, $y + $csRH * 2);
line($pdf, MX, $y + $csRH, MX + CW, $y + $csRH);

$csData = [
    ['CS CONTACT NUMBER:', 'CS CONTACT NUMBER:'],
    ['CS SCHEDULE:',        'CS SCHEDULE:'],
];
// Placeholder customer support values
$csPlaceholders = [
    ['(02) 8888-1234', '0917-123-4567'],
    ['Mon-Fri, 9AM-6PM', 'Mon-Sat, 8AM-8PM'],
];
foreach ($csData as $i => $pair) {
    $sy = $y + $csRH * $i;
    text($pdf, MX + 1.5,  $sy + 1.4, $pair[0], 6.3);
    // Placeholder for "{$pair[0]}" (left column)
    ph($pdf, MX + 40, $sy + 1.4, $csPlaceholders[$i][0], 5.6);
    text($pdf, MX + 93.5, $sy + 1.4, $pair[1], 6.3);
    // Placeholder for "{$pair[1]}" (right column)
    ph($pdf, MX + 132, $sy + 1.4, $csPlaceholders[$i][1], 5.6);
}
$y += $csRH * 2;

// ── Reusable contact-person block ───────────────────────────────
function contactPersonBlock($pdf, $y, $title, $data = [])
{
    $y = sectionBar($pdf, $y, $title, 5.3);

    // Reduced from 7.5 to prevent footer overlap
    $rh = 6;

    // Default placeholder values, used unless the caller overrides
    // them via the $data array (keyed same as the field label).
    $d = array_merge([
        'name'        => 'Maria Lopez Reyes',
        'signature'   => null,
        'present'     => '25 Rizal St., Brgy. Poblacion, Makati City',
        'presentZip'  => '1210',
        'permanent'   => '25 Rizal St., Brgy. Poblacion, Makati City',
        'permanentZip'=> '1210',
        'birthdate'   => '03/10/1990',
        'birthplace'  => 'Quezon City',
        'nationality1'=> 'Filipino',
        'citizenship' => 'Filipino',
        'contact'     => '0918-765-4321',
        'email'       => 'maria.reyes@jdctrading.com',
        'civilStatus' => 'Single',
        'gender'      => 'Female',
        'motherName'  => 'Elena Lopez',
        'dob2'        => '03/10/1990',
        'profession'  => 'Accountant',
        'nationality2'=> 'Filipino',
        'spouseName'  => 'N/A',
        'spouseDob'   => 'N/A',
        'spouseProf'  => 'N/A',
        'spouseNat'   => 'N/A',
        'id1'         => "Driver's License",
        'id1num'      => 'N02-34-567890',
        'id1exp'      => '03/10/2028',
        'id2'         => 'Passport',
        'id2num'      => 'P7654321B',
        'id2exp'      => '09/15/2030',
    ], $data);

    $rows = [
        [
            ['FIRST NAME, MIDDLE NAME, LAST NAME:', null, 0.776, $d['name']],
            ['SIGNATURE:', null, 0.224, null],
        ],
        [
            ['PRESENT ADDRESS: (No./Street, Subd./Brgy./District/Municipality/City/Province)', null, 0.858, $d['present']],
            ['ZIP CODE:', null, 0.142, $d['presentZip']],
        ],
        [
            ['PERMANENT ADDRESS: (No./Street, Subd./Brgy./District/Municipality/City/Province)', null, 0.858, $d['permanent']],
            ['ZIP CODE:', null, 0.142, $d['permanentZip']],
        ],
        [
            ['BIRTHDATE:', '(mm/dd/yyyy)', 0.215, $d['birthdate']],
            ['PLACE OF BIRTH:', null, 0.25, $d['birthplace']],
            ['NATIONALITY:', null, 0.27, $d['nationality1']],
            ['CITIZENSHIP:', null, 0.265, $d['citizenship']],
        ],
        [
            ['CONTACT NO:', null, 0.215, $d['contact']],
            ['EMAIL ADDRESS:', null, 0.25, $d['email']],
            ['CIVIL STATUS:', null, 0.27, $d['civilStatus']],
            ['GENDER:', null, 0.265, $d['gender']],
        ],
        [
            ["MOTHER'S MAIDEN NAME:", null, 0.215, $d['motherName']],
            ['DATE OF BIRTH:', null, 0.25, $d['dob2']],
            ['PROFESSION:', null, 0.27, $d['profession']],
            ['NATIONALITY:', null, 0.265, $d['nationality2']],
        ],
        [
            ['SPOUSE NAME:', '(put N/A if not applicable)', 0.215, $d['spouseName']],
            ['DATE OF BIRTH:', null, 0.25, $d['spouseDob']],
            ['PROFESSION:', null, 0.27, $d['spouseProf']],
            ['NATIONALITY:', null, 0.265, $d['spouseNat']],
        ],
        [
            ['1. VALID ID PRESENTED:', null, 0.20, $d['id1']],
            ['ID NUMBER:', null, 0.15, $d['id1num']],
            ['EXPIRATION DATE:', null, 0.15, $d['id1exp']],
            ['2. VALID ID PRESENTED:', null, 0.20, $d['id2']],
            ['ID NUMBER:', null, 0.15, $d['id2num']],
            ['EXPIRATION DATE:', null, 0.15, $d['id2exp']],
        ],
    ];

    $labelSizes = [6.3, 5.6, 5.6, 6.3, 6.3, 6.3, 6.3, 5.6];

    foreach ($rows as $i => $cols) {
        $y = fieldRow(
            $pdf,
            MX,
            $y,
            CW,
            $rh,
            $cols,
            $labelSizes[$i]
        );
    }

    return $y;
}

// Placeholder data for FINANCE / ACCOUNTING CONTACT PERSON
$y = contactPersonBlock($pdf, $y, 'FINANCE / ACCOUNTING CONTACT PERSON', [
    'name'        => 'Maria Lopez Reyes',
    'contact'     => '0918-765-4321',
    'email'       => 'finance@jdctrading.com',
    'profession'  => 'Finance Manager',
]);
// Placeholder data for DEVELOPER / TECHNICAL CONTACT PERSON
$y = contactPersonBlock($pdf, $y, 'DEVELOPER / TECHNICAL CONTACT PERSON', [
    'name'        => 'Carlos Miguel Tan',
    'birthdate'   => '11/02/1992',
    'birthplace'  => 'Cebu City',
    'contact'     => '0920-345-6789',
    'email'       => 'dev@jdctrading.com',
    'civilStatus' => 'Single',
    'gender'      => 'Male',
    'motherName'  => 'Linda Tan',
    'dob2'        => '11/02/1992',
    'profession'  => 'IT/Web Developer',
]);

pageFooter($pdf, '3');


// =====================================================
// PAGE 4 - ONLINE/e-COMMERCE BUSINESS INFO + DECLARATION
// =====================================================
$pdf->AddPage();
$pdf->SetFont('Arial', '', 7);
$pdf->Image($logo, MX, 20, 50);
pageNote ($pdf, 'Kindly put N/A if not applicable');

$y = 45;

// ── ONLINE/E-COMMERCE BUSINESS INFO ────────────────────────────
$y = sectionBar($pdf, $y, 'ONLINE/E-COMMERCE BUSINESS INFO (For Online Merchant Applicants only)', 5.3, 7.5);

$obRH = 7.5;

// Simple two-column row helper (local only)
// Placeholder value is optional 3rd/4th args ($ph1, $ph2)
$drawObRow = function($lbl1, $lbl2, $h = null, $ph1 = null, $ph2 = null) use ($pdf, &$y, $obRH) {
    $h = $h ?? $obRH;
    $pdf->Rect(MX, $y, CW, $h);
    $pdf->Line(MX + 92, $y, MX + 92, $y + $h);
    text($pdf, MX + 1.5, $y + 1.4, $lbl1, 6.3);
    if ($ph1) {
        // Placeholder value for "{$lbl1}"
        ph($pdf, MX + 1.5, $y + 4.8, $ph1, 5.6);
    }
    if ($lbl2 !== '') {
        text($pdf, MX + 93.5, $y + 1.4, $lbl2, 6.3);
        if ($ph2) {
            // Placeholder value for "{$lbl2}"
            ph($pdf, MX + 93.5, $y + 4.8, $ph2, 5.6);
        }
    }
    $y += $h;
};

$drawObRow('Trading Name / Doing Business as', 'No. of Years in Business', null, 'JDC Online Store', '9 years');
$drawObRow('Types of Products and Services', '', null, 'Apparel, footwear, and accessories');
$drawObRow('URL/ Website Address', 'Target Market / Countries', null, 'www.jdconlinestore.com', 'Philippines');
$drawObRow('Estimated Monthly Online Sales / Sales Forecast (Php):', 'Current Transaction Fee Charged (%)', null, 'Php 2,500,000.00', '2.5%');
$drawObRow('Average Billing Amount:', 'Highest Billing Amount:', null, 'Php 1,500.00', 'Php 25,000.00');
$drawObRow('Current Payment Gateway:', 'Current Acquirer Bank:', null, 'PayMongo', 'BDO Unibank');

// Familiar with chargeback
$h = $obRH;
box($pdf, MX, $y, CW, $h);
line($pdf, MX + 92, $y, MX + 92, $y + $h);
text($pdf, MX + 1.5, $y + 1.4, 'Familiar with Chargeback?', 6.3);
radio($pdf, MX + 40, $y + 2.4, 2.6);
text($pdf, MX + 43, $y + 2.1, 'YES', 5.6);
// Placeholder: mark "YES" as familiar with chargeback
ph($pdf, MX + 38.4, $y + 2.2, 'X', 6);
radio($pdf, MX + 50,  $y + 2.4, 2.6);
text($pdf, MX + 53, $y + 2.1, 'NO', 5.6);
text($pdf, MX + 93.5, $y + 1.0, 'Average Chargeback Ratio Over Past 6 months', 6.3);
text($pdf, MX + 93.5, $y + 3.5, 'Month 1: ____%   Month 2: ____%   Month 3: ____%', 5.6);
// Placeholder for Average Chargeback Ratio (months 1-3)
ph($pdf, MX + 93.5, $y + 6, 'Month 1: 0.2%   Month 2: 0.15%   Month 3: 0.1%', 5.2);
$y += $h;

// Credit card payments
$h = 10.5;
box($pdf, MX, $y, CW, $h);
text($pdf, MX + 1.5, $y + 1.2, 'Currently accepting Credit Card Payments?', 6.3);
radio($pdf, MX + 61, $y + 2.1, 2.6);
text($pdf, MX + 64, $y + 2.0, 'YES', 5.6);
// Placeholder: mark "YES" as accepting credit card payments
ph($pdf, MX + 59.4, $y + 1.9, 'X', 6);
radio($pdf, MX + 74, $y + 2.2, 2.6);
text($pdf, MX + 78, $y + 1.9, 'NO', 5.6);
// Brand row

text($pdf, MX + 1.5, $y + 6.2, 'Which Brand:', 6);

$brands = ['Visa', 'Mastercard', 'American Express', 'JCB', 'Others: ___________'];

$bx = MX + 18;

foreach ($brands as $br) {
    radio($pdf, $bx, $y + 5.6, 2.6);
    text($pdf, $bx + 3, $y + 5.5, $br, 5.4);

    $bx += 25;
}
// Placeholder: mark "Visa" and "Mastercard" as accepted brands
ph($pdf, MX + 16.4, $y + 5.4, 'X', 5.4);
ph($pdf, MX + 41.4, $y + 5.4, 'X', 5.4);
$y += $h;

// Proof of delivery / Refund policy
$h = $obRH;
box($pdf, MX, $y, CW, $h);
line($pdf, MX + 92, $y, MX + 92, $y + $h);
text($pdf, MX + 1.5, $y + 1.4, 'Do you get proof of delivery?', 6.3);
radio($pdf, MX + 61, $y + 2.4, 2.6);
text($pdf, MX + 64.5, $y + 2.1, 'YES', 5.6);
// Placeholder: mark "YES" for proof of delivery
ph($pdf, MX + 59.4, $y + 2.2, 'X', 6);
radio($pdf, MX + 72, $y + 2.4, 2.6);
text($pdf, MX + 75.5, $y + 2.1, 'NO', 5.6);
text($pdf, MX + 93.5, $y + 1.4, 'Do you have a refund policy?', 6.3);
radio($pdf, MX + 152, $y + 2.4, 2.6);
text($pdf, MX + 155.5, $y + 2.1, 'YES', 5.6);
// Placeholder: mark "YES" for refund policy
ph($pdf, MX + 150.4, $y + 2.2, 'X', 6);
radio($pdf, MX + 163, $y + 2.4, 2.6);
text($pdf, MX + 166.5, $y + 2.1, 'NO', 5.6);
$y += $h;

// Wait time
$h = $obRH;
box($pdf, MX, $y, CW, $h);
text($pdf, MX + 1.5, $y + 1.4, 'How long does customer wait before product is received (No. of days)', 6.3);
// Placeholder for wait time (No. of days)
ph($pdf, MX + 1.5, $y + 4.8, '3 to 5 business days', 5.6);
text($pdf, MX + 118,  $y + 1.4, 'Percentage of sales in this category: ________%', 6);
// Placeholder for percentage of sales in this category
ph($pdf, MX + 118, $y + 4.8, '100%', 5.6);
$y += $h;

// Accept transactions before delivery
$h = 9;
box($pdf, MX, $y, CW, $h);
text($pdf, MX + 1.5, $y + 1.2, 'Does company accept transactions before the customer received product or services?', 6.3);
radio($pdf, MX + 1.5, $y + 5.2, 2.6);
text($pdf, MX + 5,    $y + 4.9, 'YES', 5.6);
// Placeholder: mark "YES" for accepting transactions before delivery
ph($pdf, MX, $y + 5.1, 'X', 6);
radio($pdf, MX + 15,  $y + 5.2, 2.6);
text($pdf, MX + 18.5, $y + 4.9, 'NO', 5.6);
text($pdf, MX + 28, $y + 5, 'If YES, % of deposit customer prepaid by customers: __________%', 5.6);
// Placeholder for % of deposit prepaid
ph($pdf, MX + 125, $y + 5, '100%', 5.6);
$y += $h;

// Warranties / extended services
$h = 9;
box($pdf, MX, $y, CW, $h);
text($pdf, MX + 1.5, $y + 1.2, 'Does company offer warranties, dues, subscription, memberships or other extended services?', 6.3);
radio($pdf, MX + 1.5, $y + 5.2, 2.6);
text($pdf, MX + 5,    $y + 4.9, 'YES', 5.6);
radio($pdf, MX + 15,  $y + 5.2, 2.6);
text($pdf, MX + 18.5, $y + 4.9, 'NO', 5.6);
// Placeholder: mark "NO" for warranties/subscriptions
ph($pdf, MX + 14.4, $y + 5.1, 'X', 6);
text($pdf, MX + 28, $y + 5, 'If YES, Duration of extended service or benefits (in weeks): _________', 5.6);
// Placeholder (N/A since "NO" was selected above)
ph($pdf, MX + 148, $y + 5, 'N/A', 5.6);
$y += $h;

// Shopping cart / Mobile app
$h = 9;
box($pdf, MX, $y, CW, $h);
line($pdf, MX + 92, $y, MX + 92, $y + $h);
// Left: shopping cart
text($pdf, MX + 1.5, $y + 1.2, 'Are you using any shopping cart?', 6.3);
radio($pdf, MX + 1.5, $y + 5.2, 2.6);
text($pdf, MX + 5,    $y + 4.9, 'NO', 5.6);
radio($pdf, MX + 14,  $y + 5.2, 2.6);
text($pdf, MX + 17.5, $y + 4.9, 'YES, please specify: __________________________', 5.6);
// Placeholder: mark "YES" and name the shopping cart platform
ph($pdf, MX + 12.4, $y + 5.1, 'X', 6);
ph($pdf, MX + 45, $y + 4.9, 'Shopify', 5.4);
// Right: mobile app
text($pdf, MX + 93.5, $y + 1.2, 'Are you selling via Mobile App?', 6.3);
radio($pdf, MX + 93.5, $y + 5.2, 2.6);
text($pdf, MX + 97,    $y + 4.9, 'NO', 5.6);
// Placeholder: mark "NO" for mobile app
ph($pdf, MX + 92.4, $y + 5.1, 'X', 6);
radio($pdf, MX + 106,  $y + 5.2, 2.6);
text($pdf, MX + 109.5, $y + 4.9, 'YES, for OS platform of: _____________', 5.6);
$y += $h;

$y += 2; // small gap

// ── DECLARATION | A-2 ─────────────────────────────────────────
// =====================================================
// DECLARATION | A-2
// =====================================================

// Start position of the entire declaration box
$declTop = $y;

// Title - plain text inside the box
$pdf->SetFont('Arial', 'B', 6.5);
$pdf->SetXY(MX + 1.5, $declTop + 1.5);
$pdf->Cell(CW - 3, 4, 'DECLARATION | A-2', 0, 0, 'C');

// Intro text
$pdf->SetFont('Arial', 'B', 6.5);
$pdf->SetXY(MX + 1.5, $declTop + 6);
$pdf->Cell(CW - 3, 4, 'By the signature below, I/We hereby:', 0, 1, 'L');

$y = $declTop + 11;

// Declaration text
$pdf->SetFont('Arial', '', 6);

$declarations = [
    'A.' => 'further declare to have full control and authorization of the website content;',

    'B.' => 'certifies that all information furnished herein is true, accurate and complete to my knowledge;',

    'C.' => 'has read, understands and agrees to be bound by the terms and conditions of the Memorandum of Agreement;',

    'D.' => "certify to the best of my/our current knowledge as of the date that Application Form is signed, there is no known owner, officer, director, or agent which is a current of former official in the executive, legislative, administrative, military, or judicial branch of any government (elected or not); an official of a political party; an executive of a government-owned commercial enterprise; a family member of any of the above-mentioned officials; or a close personal or professional associate of any of the above-mentioned officials;\n\nIf I/we am/are affiliated with any such Politically Exposed Person, the identity of the owner, officer, director, or agent is/are:",

    'E.' => 'agrees to Pisopay.com, Inc. have a right, upon written request, to a complete and accurate disclosure of the nature of and scope of the investigation requested.',

    'F.' => "represents that:\nI/We have complied in all materials respect with the Data Privacy Act of 2012;\nI/We have not received any notice (including, without limitation, any enforcement notice, de-registration notice or transfer prohibition notice), letter, complaint or allegation from the National Privacy Commission of Philippines, alleging any breach or non-compliance by it of the Data Privacy Act of 2012 or prohibiting the transfer of data to a place outside Philippines;\nI/We have not received any claim for compensation from any person in respect of its business under Data Privacy Act of 2012 and industry standards in respect of inaccuracy, loss, unauthorized destruction or unauthorized disclosure of data in the past three (3) years and there is no outstanding order against me/us in respect of the rectification of erasure of data; and\nNo warrant has been issued, authorizing the National Privacy Commission of Philippines (or any of its officers, employees or agents) to enter any of the possession of me/us for the purpose of, inter alia, searching them or seizing any documents or other material found there;",

    'G.' => "agrees and allows Pisopay.com, Inc. and its related companies may forward now and at any future time the data of the company, authorized signatories, directors, partners, owners and key personnel of the company/business to bureaus/agency that may include (but not limited to), Bangko Sentral ng Pilipinas (BSP), Anti-Money Laundering Council (AMLC) and other related bureaus/agency for purposes such as opening of account; evaluation; account review; account monitoring; debt recovery purposes; legal actions feed; scoring solutions; audit; risk assessment; legal documentation and/or action consented to a contract of facility granted and such. Pisopay.com, Inc. and its related companies may also disclose any information including the conduct of the business account including its authorized signatories, directors, partners, owners and key personnel of the company/business to bureaus/agency at any time.",
];

$lineH = 3.2;

$indent = 9;
$textX  = MX + $indent + 4;
$textW  = CW - $indent - 4;

foreach ($declarations as $letter => $content) {

    // Letter
    $pdf->SetFont('Arial', '', 6);
    $pdf->SetXY(MX + $indent, $y + 0.5);
    $pdf->Cell(4, $lineH, $letter, 0, 0);

    // Declaration text
    $pdf->SetXY($textX, $y + 0.5);

    $pdf->MultiCell(
        $textW,
        $lineH,
        $content,
        0,
        'L'
    );

    $y = $pdf->GetY() + 1.2;

    // Placeholder: for clause D, fill in the "identity of the owner,
    // officer, director, or agent" blank with a sample N/A answer
    if ($letter === 'D.') {
        ph($pdf, $textX, $y - 1, 'N/A – No known Politically Exposed Person affiliation', 5.6);
        $y += 3;
    }
}

$y += 3;

// Signature block
line($pdf, MX + 15,   $y, MX + 50,  $y);
line($pdf, MX + 80,  $y, MX + 135, $y);
line($pdf, MX + 143, $y, RX - 2,   $y);

// Placeholder for the Declaration signature block
ph($pdf, MX + 17, $y - 2.2, 'Juan Dela Cruz', 6);
ph($pdf, MX + 90, $y - 2.2, 'President', 6);
ph($pdf, MX + 155, $y - 2.2, '09/04/2026', 6);

$pdf->SetFont('Arial', '', 5.8);

$pdf->SetXY(MX + 8, $y + 1);
$pdf->Cell(64, 3.5, 'Name and Signature', 0, 0, 'C');

$pdf->SetXY(MX + 80, $y + 1);
$pdf->Cell(55, 3.5, 'Designation', 0, 0, 'C');

$pdf->SetXY(MX + 143, $y + 1);
$pdf->Cell(RX - MX - 145, 3.5, 'Date', 0, 0, 'C');

// Bottom of declaration box
$declBottom = $y + 6;

// Draw ONE box around everything
box($pdf, MX, $declTop, CW, $declBottom - $declTop);

// Update Y position
$y = $declBottom;

pageFooter($pdf, '4');


// =====================================================
// OUTPUT
// =====================================================
$pdf->Output('I', 'emerchant.pdf');