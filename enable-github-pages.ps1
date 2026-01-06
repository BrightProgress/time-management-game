# Script to Enable GitHub Pages via GitHub API
# Usage: .\enable-github-pages.ps1 -Token "your_github_token"

param(
    [Parameter(Mandatory=$false)]
    [string]$Token
)

$repoOwner = "BrightProgress"
$repoName = "time-management-game"
$apiUrl = "https://api.github.com/repos/$repoOwner/$repoName/pages"

Write-Host "`n=== GitHub Pages Enablement Script ===" -ForegroundColor Cyan
Write-Host ""

if (-not $Token) {
    Write-Host "No token provided. Here's how to enable GitHub Pages manually:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Go to: https://github.com/$repoOwner/$repoName/settings/pages" -ForegroundColor Green
    Write-Host "2. Under 'Source', select 'GitHub Actions'" -ForegroundColor Green
    Write-Host "3. Click 'Save'" -ForegroundColor Green
    Write-Host ""
    Write-Host "OR use this script with a token:" -ForegroundColor Yellow
    Write-Host "  .\enable-github-pages.ps1 -Token 'your_github_personal_access_token'" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "To create a token: https://github.com/settings/tokens" -ForegroundColor Cyan
    Write-Host "Required scope: 'repo' or 'public_repo'" -ForegroundColor Cyan
    exit 0
}

# Enable GitHub Pages via API
$headers = @{
    "Authorization" = "token $Token"
    "Accept" = "application/vnd.github.v3+json"
}

$body = @{
    source = @{
        branch = "main"
        path = "/"
    }
} | ConvertTo-Json

try {
    Write-Host "Attempting to enable GitHub Pages..." -ForegroundColor Yellow
    
    # First, try to update Pages settings
    $response = Invoke-RestMethod -Uri $apiUrl -Method PUT -Headers $headers -Body $body -ContentType "application/json"
    
    Write-Host "✅ GitHub Pages enabled successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your site will be available at:" -ForegroundColor Cyan
    Write-Host "  https://$repoOwner.github.io/$repoName/" -ForegroundColor White
    Write-Host ""
    Write-Host "Note: GitHub Actions workflow will deploy automatically." -ForegroundColor Yellow
    Write-Host "Check progress: https://github.com/$repoOwner/$repoName/actions" -ForegroundColor Cyan
    
} catch {
    $errorMessage = $_.Exception.Message
    Write-Host "❌ Error: $errorMessage" -ForegroundColor Red
    Write-Host ""
    
    if ($_.Exception.Response.StatusCode -eq 404) {
        Write-Host "Repository not found or you don't have access." -ForegroundColor Yellow
    } elseif ($_.Exception.Response.StatusCode -eq 401) {
        Write-Host "Invalid token. Please check your GitHub Personal Access Token." -ForegroundColor Yellow
    } elseif ($_.Exception.Response.StatusCode -eq 403) {
        Write-Host "Permission denied. Token may not have 'repo' scope." -ForegroundColor Yellow
    }
    
    Write-Host ""
    Write-Host "Manual setup:" -ForegroundColor Yellow
    Write-Host "  https://github.com/$repoOwner/$repoName/settings/pages" -ForegroundColor Cyan
}

