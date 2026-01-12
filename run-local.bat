@echo off
REM Local Development Server - Batch File Version
REM This works without PowerShell execution policy issues

echo Starting local development server...
echo.

REM Check for Python
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo Found Python
    goto :start_python
)

REM Check for Node.js
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo Found Node.js
    goto :start_node
)

echo Error: No suitable server found. Please install Python or Node.js.
echo.
echo Quick install options:
echo   Python: https://www.python.org/downloads/
echo   Node.js: https://nodejs.org/
pause
exit /b 1

:start_python
echo.
echo Starting Python HTTP Server on http://localhost:8000
echo Press Ctrl+C to stop the server
echo.
python -m http.server 8000
goto :end

:start_node
echo.
echo Starting Node.js http-server on http://localhost:8080
echo Press Ctrl+C to stop the server
echo.
echo Note: If http-server is not installed, run: npm install -g http-server
echo.
npx http-server -p 8080 -c-1
goto :end

:end
