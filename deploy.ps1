# deploy.ps1 — Build + push helper for r3s-realty
# Usage:  pwsh -File .\deploy.ps1
# (or right-click -> Run with PowerShell)

$ErrorActionPreference = "Stop"
Set-Location -Path $PSScriptRoot

Write-Host "== 1. Building locally ==" -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed. Fix errors and re-run." -ForegroundColor Red
    exit 1
}

Write-Host "`n== 2. Reporting bundle sizes ==" -ForegroundColor Cyan
Get-ChildItem -Path .\dist -Recurse -File |
    Sort-Object Length -Descending |
    Select-Object -First 25 @{N='Size (KB)';E={[math]::Round($_.Length / 1KB, 1)}}, FullName |
    Format-Table -AutoSize

Write-Host "`n== 3. Git status ==" -ForegroundColor Cyan
if (-not (Test-Path .git)) {
    git init
    git branch -M main
}
git add .
$msg = if ($args.Count -gt 0) { $args[0] } else { "SEO overhaul + image fixes + NH19 corridor + FAQ section" }
try { git commit -m $msg } catch { Write-Host "Nothing to commit." -ForegroundColor Yellow }

$remote = git remote -v 2>$null
if (-not $remote) {
    Write-Host "`nNo git remote set. To push, run:" -ForegroundColor Yellow
    Write-Host '  git remote add origin https://github.com/<your-user>/r3s-realty.git'
    Write-Host '  git push -u origin main'
} else {
    Write-Host "`n== 4. Pushing to origin ==" -ForegroundColor Cyan
    git push -u origin main
}

Write-Host "`nDone. If Vercel is wired to this repo, deploy is auto-triggered." -ForegroundColor Green
