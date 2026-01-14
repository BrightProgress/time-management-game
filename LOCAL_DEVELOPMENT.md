# Running the Game Locally

This guide explains how to run and test the game on your local machine without deploying to GitHub Pages.

## Why a Local Server?

The game uses:
- **Service Workers** (for PWA functionality)
- **Relative paths** for assets
- **SessionStorage** for game state

These features require the game to be served over HTTP (not opened as a `file://` URL). Opening `index.html` directly in a browser may cause issues.

## Quick Start

### Option 1: Use the PowerShell Script (Recommended)

**If you get an execution policy error**, use one of these methods:

**Method A: Bypass for this session only (Safest)**
```powershell
powershell -ExecutionPolicy Bypass -File .\run-local.ps1
```

**Method B: Use the bypass version**
```powershell
.\run-local-bypass.ps1
```

**Method C: Change execution policy for current user (One-time setup)**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\run-local.ps1
```

The script will:
- Detect available servers (Python, Node.js, PHP)
- Let you choose which one to use
- Start a local web server
- Display the URL to open in your browser

### Option 2: Python HTTP Server

If you have Python installed:

```powershell
# Python 3
python -m http.server 8000

# Python 2 (if Python 3 not available)
python -m SimpleHTTPServer 8000
```

Then open: **http://localhost:8000**

### Option 3: Node.js http-server

If you have Node.js installed:

```powershell
# Install http-server globally (one time)
npm install -g http-server

# Run the server
http-server -p 8080 -c-1
```

The `-c-1` flag disables caching for development.

Then open: **http://localhost:8080**

### Option 4: PHP Built-in Server

If you have PHP installed:

```powershell
php -S localhost:8000
```

Then open: **http://localhost:8000**

### Option 5: VS Code Live Server Extension

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

This automatically opens the game in your browser and reloads on file changes.

## Testing on Mobile Devices

To test on your phone/tablet while developing:

1. **Find your computer's local IP address:**
   ```powershell
   ipconfig
   ```
   Look for "IPv4 Address" (usually something like `192.168.1.100`)

2. **Start the server bound to your IP:**
   ```powershell
   # Python
   python -m http.server 8000 --bind 0.0.0.0
   
   # Node.js http-server
   http-server -p 8080 -a 0.0.0.0 -c-1
   
   # PHP
   php -S 0.0.0.0:8000
   ```

3. **On your mobile device**, open:
   ```
   http://YOUR_IP_ADDRESS:8000
   ```
   (Replace `YOUR_IP_ADDRESS` with your actual IP)

4. **Important**: Make sure your phone and computer are on the same Wi-Fi network.

## Troubleshooting

### PowerShell Execution Policy Error

If you see: `cannot be loaded because running scripts is disabled on this system`

**Quick Fix (Recommended):**
```powershell
powershell -ExecutionPolicy Bypass -File .\run-local.ps1
```

**Or use the bypass version:**
```powershell
.\run-local-bypass.ps1
```

**Permanent Fix (One-time setup):**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
This allows scripts to run for your user account only (safe, doesn't affect system-wide settings).

**Alternative:** Skip the script entirely and run the server commands directly (see options 2-5 below).

### Service Worker Not Registering

- Make sure you're accessing via `http://localhost` (not `file://`)
- Check browser console for errors
- Try clearing browser cache and service workers:
  - Chrome: DevTools → Application → Service Workers → Unregister
  - Firefox: DevTools → Application → Service Workers → Unregister

### Images Not Loading

- Check that image files exist in the `assets/` directory
- Verify file names match exactly (case-sensitive)
- Check browser console for 404 errors

### Port Already in Use

If you get a "port already in use" error:

```powershell
# Use a different port
python -m http.server 8001
# or
http-server -p 8081 -c-1
```

### CORS Errors

If you see CORS (Cross-Origin Resource Sharing) errors:
- Make sure you're using a local server (not `file://`)
- Check that all assets are being served from the same origin

## Development Tips

1. **Keep the server running** while you make changes
2. **Hard refresh** (Ctrl+Shift+R or Cmd+Shift+R) to clear cache
3. **Check browser console** (F12) for JavaScript errors
4. **Test PWA features**:
   - Service worker registration
   - Offline functionality
   - Install prompt (if supported)

## Stopping the Server

Press `Ctrl+C` in the terminal/PowerShell window where the server is running.

## Next Steps

Once you've tested locally and everything works:
- Commit your changes
- Push to GitHub
- The GitHub Actions workflow will automatically deploy to GitHub Pages
