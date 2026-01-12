# Fix Image Filenames

The image files in the `assets` directory currently have incorrect double extensions (e.g., `.png.png`, `.jpg.png`). The code has been updated to handle both correct and incorrect filenames, but ideally the files should be renamed to have the correct extensions.

## Current File Names (Incorrect)
- `energy-high.jpg.png` → should be `energy-high.jpg`
- `energy-medium.jpg.png` → should be `energy-medium.jpg`
- `energy-low.jpg.png` → should be `energy-low.jpg`
- `energy-depleted.jpg.png` → should be `energy-depleted.jpg`
- `teach.png.png` → should be `teach.png`
- `admin.png.png` → should be `admin.png`
- `collaborate.png.png` → should be `collaborate.png`
- `break.png.png` → should be `break.png`
- `meeting.png.png` → should be `meeting.png`
- `icon-192.png.png` → should be `icon-192.png`
- `icon-512.png.png` → should be `icon-512.png`
- `completion.gif.png` → should be `completion.gif`

## How to Fix (Windows PowerShell)

Run these commands in PowerShell from the repository root:

```powershell
# Fix background images
Rename-Item "assets\themes\default\backgrounds\energy-high.jpg.png" "energy-high.jpg"
Rename-Item "assets\themes\default\backgrounds\energy-medium.jpg.png" "energy-medium.jpg"
Rename-Item "assets\themes\default\backgrounds\energy-low.jpg.png" "energy-low.jpg"
Rename-Item "assets\themes\default\backgrounds\energy-depleted.jpg.png" "energy-depleted.jpg"

# Fix button icons
Rename-Item "assets\themes\default\buttons\teach.png.png" "teach.png"
Rename-Item "assets\themes\default\buttons\admin.png.png" "admin.png"
Rename-Item "assets\themes\default\buttons\collaborate.png.png" "collaborate.png"
Rename-Item "assets\themes\default\buttons\break.png.png" "break.png"
Rename-Item "assets\themes\default\buttons\meeting.png.png" "meeting.png"

# Fix PWA icons
Rename-Item "assets\icons\icon-192.png.png" "icon-192.png"
Rename-Item "assets\icons\icon-512.png.png" "icon-512.png"

# Fix celebration animation
Rename-Item "assets\themes\default\celebrations\completion.gif.png" "completion.gif"
```

## How to Fix (Command Prompt)

```cmd
cd assets\themes\default\backgrounds
ren energy-high.jpg.png energy-high.jpg
ren energy-medium.jpg.png energy-medium.jpg
ren energy-low.jpg.png energy-low.jpg
ren energy-depleted.jpg.png energy-depleted.jpg

cd ..\buttons
ren teach.png.png teach.png
ren admin.png.png admin.png
ren collaborate.png.png collaborate.png
ren break.png.png break.png
ren meeting.png.png meeting.png

cd ..\..\..\icons
ren icon-192.png.png icon-192.png
ren icon-512.png.png icon-512.png

cd ..\themes\default\celebrations
ren completion.gif.png completion.gif
```

## Note

The game code has been updated to handle both correct and incorrect filenames, so the game will work even if you don't rename the files. However, using the correct extensions is recommended for:
- Better file organization
- Proper MIME type detection
- Easier maintenance
