$ErrorActionPreference = 'Stop'

$root = 'C:\Users\PC\Desktop\Developement\Bussie portfolio'
$caseStudyPptx = Join-Path $root 'budget vs finance case study.pptx'
$dashboardPptx = Join-Path $root 'budget vs finance dashbaord.pptx'
$globalSuperstoreCaseStudyPptx = Join-Path $root 'global superstore case study.pptx'

if (-not (Test-Path $caseStudyPptx)) {
    throw "Missing file: $caseStudyPptx"
}

if (-not (Test-Path $dashboardPptx)) {
    throw "Missing file: $dashboardPptx"
}

if (-not (Test-Path $globalSuperstoreCaseStudyPptx)) {
    throw "Missing file: $globalSuperstoreCaseStudyPptx"
}

$ppt = New-Object -ComObject PowerPoint.Application

function Export-Presentation([string]$source, [string]$target) {
    $presentation = $ppt.Presentations.Open($source, $false, $false, $false)
    $presentation.SaveAs($target, [Microsoft.Office.Interop.PowerPoint.PpSaveAsFileType]::ppSaveAsPDF)
    $presentation.Close()
}

Export-Presentation $caseStudyPptx (Join-Path $root 'budget vs finance case study.pdf')
Export-Presentation $dashboardPptx (Join-Path $root 'budget vs finance dashbaord.pdf')
Export-Presentation $globalSuperstoreCaseStudyPptx (Join-Path $root 'global superstore case study.pdf')

$ppt.Quit()

Get-ChildItem $root -Filter '*.pdf' | Where-Object { $_.Name -match 'budget vs finance.*\.pdf$|global superstore case study\.pdf$' } | Select-Object FullName, Length
