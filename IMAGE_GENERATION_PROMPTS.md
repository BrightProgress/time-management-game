# Image Generation Prompts for Time Management Game

This document contains detailed prompts for generating all images needed for the game using AI image generators (ChatGPT, Google Nano Banana, DALL-E, Midjourney, etc.).

## Directory Structure

After generating all images, organize them in the following structure:

```
assets/
├── themes/
│   └── default/
│       ├── backgrounds/
│       │   ├── energy-high.jpg
│       │   ├── energy-medium.jpg
│       │   ├── energy-low.jpg
│       │   └── energy-depleted.jpg
│       ├── buttons/
│       │   ├── teach.png
│       │   ├── admin.png
│       │   ├── collaborate.png
│       │   ├── break.png
│       │   └── meeting.png
│       └── celebrations/
│           └── completion.gif
└── icons/
    ├── icon-192.png
    └── icon-512.png
```

---

## Background Images

All background images should be:
- **Dimensions**: 1080×1920 pixels (portrait orientation, mobile aspect ratio)
- **Format**: JPG
- **Style**: Realistic or semi-realistic illustration
- **Theme**: Indian classroom setting with teacher
- **Color Scheme**: Varies by energy level (see individual prompts)

### 1. Energy High Background

**File Name**: `energy-high.jpg`  
**Location**: `assets/themes/default/backgrounds/energy-high.jpg`

**Prompt**:
```
A bright, well-lit Indian classroom scene in portrait orientation (1080x1920px). A confident teacher stands at the front of the classroom, smiling and engaged. Students are actively participating with hands raised, looking attentive and enthusiastic. The classroom is clean, organized, and well-maintained. Warm color palette with yellows, oranges, and soft golden lighting. Natural sunlight streaming through windows. Modern Indian school setting with desks, blackboard, and educational materials visible. Professional, inspiring atmosphere. High energy, positive mood. Photorealistic style.
```

### 2. Energy Medium Background

**File Name**: `energy-medium.jpg`  
**Location**: `assets/themes/default/backgrounds/energy-medium.jpg`

**Prompt**:
```
A normal, neutral Indian classroom scene in portrait orientation (1080x1920px). A teacher is at their desk or standing mid-instruction, appearing calm and steady. Students are working independently at their desks, focused on their tasks. Normal classroom lighting, neither too bright nor too dim. Neutral color palette with browns, beiges, and soft earth tones. Standard Indian school classroom with desks, blackboard, and educational materials. Professional, balanced atmosphere. Moderate energy, stable mood. Photorealistic style.
```

### 3. Energy Low Background

**File Name**: `energy-low.jpg`  
**Location**: `assets/themes/default/backgrounds/energy-low.jpg`

**Prompt**:
```
A dimmer, afternoon Indian classroom scene in portrait orientation (1080x1920px). A tired teacher is sitting at their desk with papers spread out, looking fatigued but still working. Some students appear distracted or less engaged. Dimmer lighting suggesting late afternoon, with cooler tones. Cool color palette with blues, grays, and muted tones. Indian school classroom showing signs of a long day - slightly disorganized desks, blackboard with many notes. Tired, weary atmosphere. Low energy, subdued mood. Photorealistic style.
```

### 4. Energy Depleted Background

**File Name**: `energy-depleted.jpg`  
**Location**: `assets/themes/default/backgrounds/energy-depleted.jpg`

**Prompt**:
```
An exhausted, late afternoon Indian classroom scene in portrait orientation (1080x1920px). A completely exhausted teacher sits slumped at their desk, head in hands or papers scattered, showing clear signs of being overwhelmed. The classroom is either empty or chaotic with disorganized desks and materials. Evening or late afternoon lighting with long shadows. Muted, desaturated color palette - grays, browns, and washed-out colors. Indian school setting showing the aftermath of a very long day. Exhausted, overwhelmed atmosphere. Depleted energy, drained mood. Photorealistic style.
```

---

## Button Icons

All button icons should be:
- **Dimensions**: 70×70 pixels (square)
- **Format**: PNG with transparent background
- **Style**: Simple, clean icon design
- **Background**: Transparent
- **Color**: Match the specified color for each button
- **Design**: Minimalist, recognizable symbol

### 1. Teach Button Icon

**File Name**: `teach.png`  
**Location**: `assets/themes/default/buttons/teach.png`  
**Color**: Blue (#4A90E2)

**Prompt**:
```
A simple, minimalist icon of an open book or blackboard/chalkboard symbol. 70x70 pixels, square format. Blue color (#4A90E2). Clean, modern design suitable for a mobile game button. Transparent background. Icon should be centered and clearly recognizable. Flat design style, no shadows or 3D effects. Suitable for small touch targets.
```

### 2. Admin Button Icon

**File Name**: `admin.png`  
**Location**: `assets/themes/default/buttons/admin.png`  
**Color**: Orange (#F5A623)

**Prompt**:
```
A simple, minimalist icon of a clipboard or stack of documents. 70x70 pixels, square format. Orange color (#F5A623). Clean, modern design suitable for a mobile game button. Transparent background. Icon should be centered and clearly recognizable. Flat design style, no shadows or 3D effects. Suitable for small touch targets.
```

### 3. Collaborate Button Icon

**File Name**: `collaborate.png`  
**Location**: `assets/themes/default/buttons/collaborate.png`  
**Color**: Green (#7ED321)

**Prompt**:
```
A simple, minimalist icon of two people or a handshake symbol representing collaboration. 70x70 pixels, square format. Green color (#7ED321). Clean, modern design suitable for a mobile game button. Transparent background. Icon should be centered and clearly recognizable. Flat design style, no shadows or 3D effects. Suitable for small touch targets.
```

### 4. Break Button Icon

**File Name**: `break.png`  
**Location**: `assets/themes/default/buttons/break.png`  
**Color**: Purple (#9013FE)

**Prompt**:
```
A simple, minimalist icon of a coffee cup, tea cup, or relaxation symbol (like a pause symbol or crescent moon). 70x70 pixels, square format. Purple color (#9013FE). Clean, modern design suitable for a mobile game button. Transparent background. Icon should be centered and clearly recognizable. Flat design style, no shadows or 3D effects. Suitable for small touch targets.
```

### 5. Meeting Button Icon

**File Name**: `meeting.png`  
**Location**: `assets/themes/default/buttons/meeting.png`  
**Color**: Red (#D0021B)

**Prompt**:
```
A simple, minimalist icon of a conference table, calendar, or meeting symbol (like multiple people around a table). 70x70 pixels, square format. Red color (#D0021B). Clean, modern design suitable for a mobile game button. Transparent background. Icon should be centered and clearly recognizable. Flat design style, no shadows or 3D effects. Suitable for small touch targets.
```

---

## PWA Icons

PWA icons should be:
- **Format**: PNG
- **Style**: App icon design with game branding
- **Background**: Solid color or gradient (theme color #4A90E2)
- **Content**: Should represent the game (teacher/education theme)

### 1. PWA Icon 192×192

**File Name**: `icon-192.png`  
**Location**: `assets/icons/icon-192.png`

**Prompt**:
```
A mobile app icon for a teacher time management game. 192x192 pixels, square format. The icon should feature a teacher or educational symbol (like a book, blackboard, or teacher figure) in a clean, modern design. Use the theme color blue (#4A90E2) as the primary background color. The design should be simple, recognizable, and work well at small sizes. Professional, educational theme. Flat or slightly dimensional design. Suitable for home screen icon on mobile devices.
```

### 2. PWA Icon 512×512

**File Name**: `icon-512.png`  
**Location**: `assets/icons/icon-512.png`

**Prompt**:
```
A mobile app icon for a teacher time management game. 512x512 pixels, square format. The icon should feature a teacher or educational symbol (like a book, blackboard, or teacher figure) in a clean, modern design. Use the theme color blue (#4A90E2) as the primary background color. The design should be simple, recognizable, and work well at small sizes. Professional, educational theme. Flat or slightly dimensional design. Suitable for home screen icon on mobile devices. More detailed than the 192px version but maintaining the same overall design.
```

---

## Celebration Animation

The celebration animation should be:
- **Format**: GIF (animated)
- **Dimensions**: 1080×1920 pixels (portrait orientation)
- **Style**: Celebratory, congratulatory animation
- **Duration**: 2-3 seconds, looping

### Completion Celebration Animation

**File Name**: `completion.gif`  
**Location**: `assets/themes/default/celebrations/completion.gif`

**Prompt**:
```
An animated celebration scene for completing a week of teaching. 1080x1920 pixels, portrait orientation. Animated GIF format, 2-3 seconds duration, looping. Show confetti, stars, or sparkles falling. Include text like "Week Complete!" or "Well Done!" in a celebratory font. Bright, cheerful colors - golds, yellows, blues. Indian classroom setting in the background with a happy teacher. Celebration elements like balloons, streamers, or fireworks. Positive, uplifting mood. The animation should loop smoothly. Style can be illustrated or semi-realistic.
```

**Note**: For GIF generation, you may need to:
1. Generate multiple frames of the animation
2. Use a tool to combine frames into a GIF
3. Or use a specialized animation generation tool

---

## Usage Instructions

1. **Copy each prompt** into your preferred AI image generator (ChatGPT with DALL-E, Google Nano Banana, Midjourney, Stable Diffusion, etc.)

2. **Generate the images** one by one, saving each with the exact file name specified

3. **Organize files** into the directory structure shown above

4. **Verify dimensions**:
   - Backgrounds: 1080×1920px
   - Button icons: 70×70px
   - PWA icons: 192×192px and 512×512px
   - Celebration GIF: 1080×1920px

5. **Place the entire `assets` folder** in your repository's root directory

6. **Test in the game** to ensure all images load correctly and display properly

---

## Tips for AI Image Generation

- **Be specific**: If the AI doesn't generate exactly what you want, refine the prompt with more details
- **Iterate**: Generate multiple versions and choose the best one
- **Consistency**: Try to maintain a consistent art style across all images
- **File formats**: Ensure backgrounds are JPG, icons are PNG with transparency, and the celebration is GIF
- **Aspect ratios**: Double-check that portrait images are actually portrait (height > width)
- **Colors**: Use the exact hex codes provided for button icons to match the game's color scheme

---

## Alternative: Batch Generation Prompt

If your AI tool supports batch generation, you can use this combined prompt:

```
Generate a complete set of images for a teacher time management mobile game:

BACKGROUNDS (1080x1920px, JPG, portrait):
1. Bright Indian classroom, teacher confident, students engaged, warm colors
2. Normal Indian classroom, teacher steady, students working, neutral colors
3. Dim afternoon classroom, tired teacher, some distraction, cool colors
4. Exhausted evening classroom, overwhelmed teacher, empty/chaotic, muted colors

BUTTON ICONS (70x70px, PNG, transparent):
1. Blue book/blackboard icon
2. Orange clipboard/documents icon
3. Green people/handshake icon
4. Purple coffee/relaxation icon
5. Red conference table/meeting icon

PWA ICONS (square, PNG):
1. 192x192px app icon with teacher/education theme, blue background
2. 512x512px app icon with teacher/education theme, blue background

CELEBRATION (1080x1920px, GIF, animated):
1. Animated celebration with confetti, "Week Complete!" text, happy teacher

All images should have a consistent, professional, educational theme suitable for a mobile game.
```
