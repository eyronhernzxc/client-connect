<?php

require_once __DIR__ . '/fpdf19/fpdf.php';

$pdf = new FPDF('P', 'mm', 'A4');
$pdf->SetMargins(10, 8, 10);
$pdf->SetAutoPageBreak(false);
$pdf->AddPage();

$pdf->SetFont('Arial', '', 7);