# Assets Directory

This directory contains all visual assets for the game.

## Directory Structure

```
assets/
├── themes/
│   └── default/
│       ├── backgrounds/      # Energy-level background images (1080×1920px JPG)
│       ├── buttons/          # Action button icons (70×70px PNG)
│       └── celebrations/     # End game animations (1080×1920px GIF)
└── icons/                    # PWA app icons (192×192px and 512×512px PNG)
```

## Required Files

### Backgrounds (`themes/default/backgrounds/`)
- `energy-high.jpg` - Energy > 10
- `energy-medium.jpg` - Energy 5-10
- `energy-low.jpg` - Energy 1-4
- `energy-depleted.jpg` - Energy 0

### Button Icons (`themes/default/buttons/`)
- `teach.png` - Blue (#4A90E2)
- `admin.png` - Orange (#F5A623)
- `collaborate.png` - Green (#7ED321)
- `break.png` - Purple (#9013FE)
- `meeting.png` - Red (#D0021B)

### PWA Icons (`icons/`)
- `icon-192.png` - 192×192px
- `icon-512.png` - 512×512px

### Celebrations (`themes/default/celebrations/`)
- `completion.gif` - Animated celebration (2-3 seconds, looping)

## Generating Images

See `IMAGE_GENERATION_PROMPTS.md` in the repository root for detailed prompts that can be used with AI image generators (ChatGPT, Google Nano Banana, DALL-E, Midjourney, etc.).

The prompt document includes:
- Detailed prompts for each image
- Exact file names and locations
- Dimension specifications
- Color codes
- Style guidelines

## Notes

- All backgrounds should be 1080×1920px (portrait, mobile aspect ratio)
- All button icons should be 70×70px with transparent backgrounds
- PWA icons should be square (192×192px and 512×512px)
- Maintain consistent art style across all images
- Use the exact file names specified - the game code references these names
