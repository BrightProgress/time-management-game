# Local Development Server Script
# Runs the game locally without deploying to GitHub Pages

Write-Host "Starting local development server..." -ForegroundColor Green
Write-Host ""

# Check if Python is available
$pythonAvailable = $false
try {
    $pythonVersion = python --version 2>&1
    if ($LASTEXITCODE -eq 0) {
        $pythonAvailable = $true
        Write-Host "Found Python: $pythonVersion" -ForegroundColor Cyan
    }
} catch {
    # Python not found
}

# Check if Node.js is available
$nodeAvailable = $false
try {
    $nodeVersion = node --version 2>&1
    if ($LASTEXITCODE -eq 0) {
        $nodeAvailable = $true
        Write-Host "Found Node.js: $nodeVersion" -ForegroundColor Cyan
    }
} catch {
    # Node.js not found
}

Write-Host ""
Write-Host "Choose a server option:" -ForegroundColor Yellow
Write-Host "1. Python HTTP Server (port 8000)"
Write-Host "2. Node.js http-server (port 8080) - requires: npm install -g http-server"
Write-Host "3. PHP Built-in Server (port 8000) - if PHP is installed"
Write-Host ""

$choice = Read-Host "Enter choice (1-3) or press Enter for Python"

# Default to Python if available
if ([string]::IsNullOrWhiteSpace($choice)) {
    if ($pythonAvailable) {
        $choice = "1"
    } elseif ($nodeAvailable) {
        $choice = "2"
    } else {
        Write-Host "Error: No suitable server found. Please install Python or Node.js." -ForegroundColor Red
        Write-Host ""
        Write-Host "Quick install options:" -ForegroundColor Yellow
        Write-Host "  Python: https://www.python.org/downloads/"
        Write-Host "  Node.js: https://nodejs.org/"
        exit 1
    }
}

switch ($choice) {
    "1" {
        if (-not $pythonAvailable) {
            Write-Host "Error: Python is not installed or not in PATH." -ForegroundColor Red
            Write-Host "Install Python from: https://www.python.org/downloads/" -ForegroundColor Yellow
            exit 1
        }
        Write-Host ""
        Write-Host "Starting Python HTTP Server on http://localhost:8000" -ForegroundColor Green
        Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
        Write-Host ""
        python -m http.server 8000
    }
    "2" {
        if (-not $nodeAvailable) {
            Write-Host "Error: Node.js is not installed or not in PATH." -ForegroundColor Red
            Write-Host "Install Node.js from: https://nodejs.org/" -ForegroundColor Yellow
            exit 1
        }
        # Check if http-server is installed
        $httpServerInstalled = $false
        try {
            $null = http-server --version 2>&1
            if ($LASTEXITCODE -eq 0) {
                $httpServerInstalled = $true
            }
        } catch {
            # http-server not found
        }
        
        if (-not $httpServerInstalled) {
            Write-Host "Installing http-server globally..." -ForegroundColor Yellow
            npm install -g http-server
        }
        
        Write-Host ""
        Write-Host "Starting http-server on http://localhost:8080" -ForegroundColor Green
        Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
        Write-Host ""
        http-server -p 8080 -c-1
    }
    "3" {
        $phpAvailable = $false
        try {
            $phpVersion = php --version 2>&1
            if ($LASTEXITCODE -eq 0) {
                $phpAvailable = $true
                Write-Host "Found PHP: $phpVersion" -ForegroundColor Cyan
            }
        } catch {
            # PHP not found
        }
        
        if (-not $phpAvailable) {
            Write-Host "Error: PHP is not installed or not in PATH." -ForegroundColor Red
            exit 1
        }
        
        Write-Host ""
        Write-Host "Starting PHP built-in server on http://localhost:8000" -ForegroundColor Green
        Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
        Write-Host ""
        php -S localhost:8000
    }
    default {
        Write-Host "Invalid choice. Exiting." -ForegroundColor Red
        exit 1
    }
}
