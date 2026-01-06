# Check GitHub Pages Deployment Status

$repoOwner = "BrightProgress"
$repoName = "time-management-game"

Write-Host "`n=== Deployment Status Check ===" -ForegroundColor Cyan
Write-Host ""

Write-Host "Repository: $repoOwner/$repoName" -ForegroundColor White
Write-Host ""

Write-Host "📋 Quick Links:" -ForegroundColor Yellow
Write-Host "  Pages Settings: https://github.com/$repoOwner/$repoName/settings/pages" -ForegroundColor Cyan
Write-Host "  Actions: https://github.com/$repoOwner/$repoName/actions" -ForegroundColor Cyan
Write-Host "  Live Site: https://$repoOwner.github.io/$repoName/" -ForegroundColor Cyan
Write-Host ""

Write-Host "✅ Completed Steps:" -ForegroundColor Green
Write-Host "  [✓] Code pushed to GitHub" -ForegroundColor Green
Write-Host "  [✓] GitHub Actions workflow created" -ForegroundColor Green
Write-Host ""

Write-Host "⏳ Remaining Steps:" -ForegroundColor Yellow
Write-Host "  [ ] Enable GitHub Pages in repository settings" -ForegroundColor Yellow
Write-Host "  [ ] Wait for workflow to complete (about 2 minutes)" -ForegroundColor Yellow
Write-Host "  [ ] Verify site is accessible" -ForegroundColor Yellow
Write-Host ""

Write-Host "📝 To Enable GitHub Pages:" -ForegroundColor Cyan
Write-Host "  1. Visit: https://github.com/$repoOwner/$repoName/settings/pages" -ForegroundColor White
Write-Host "  2. Under 'Source', select 'GitHub Actions'" -ForegroundColor White
Write-Host "  3. Click 'Save'" -ForegroundColor White
Write-Host ""

Write-Host "Check Workflow Status:" -ForegroundColor Cyan
Write-Host "  Visit: https://github.com/$repoOwner/$repoName/actions" -ForegroundColor White
Write-Host "  Look for Deploy to GitHub Pages workflow" -ForegroundColor White
Write-Host ""

