# Getting Things Done - Teacher Simulator

A time management simulation game where players assume the role of a teacher managing a typical school week. Implemented as a Progressive Web App (PWA) using HTML5 and JavaScript, optimized for mobile devices.

## Features

- **40 Rounds of Gameplay**: 5 days × 8 rounds per day
- **Resource Management**: Balance teaching, administrative tasks, collaborative activities, and personal energy
- **Dynamic Events**: Staff meetings, disruptions, and random events
- **Mobile-First Design**: Optimized for 320px-428px width devices
- **Progressive Web App**: Installable and works offline
- **Customizable**: Easy to modify game parameters, rules, and visual assets

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (for development)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd time-management-game
```

2. Run the game locally:

**Quick Start (Windows PowerShell):**
```powershell
.\run-local.ps1
```

**Or use any of these methods:**
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

3. Open your browser and navigate to `http://localhost:8000` (or the port shown)

**📖 For detailed local development instructions, see [LOCAL_DEVELOPMENT.md](LOCAL_DEVELOPMENT.md)**

### PWA Installation

- **Android**: Open in Chrome, tap the menu, select "Add to Home screen"
- **iOS**: Open in Safari, tap the Share button, select "Add to Home Screen"

## Project Structure

```
/getting-things-done/
├── index.html                 # Main application file
├── manifest.json              # PWA manifest
├── service-worker.js          # Offline capability
├── css/
│   └── styles.css            # Application styles
├── js/
│   ├── config.js             # Game configuration and rules
│   ├── game-state.js         # State management
│   ├── game-engine.js        # Core game logic
│   ├── ui-controller.js      # UI rendering and interaction
│   └── utils.js              # Helper functions
└── assets/
    ├── themes/
    │   └── default/
    │       ├── backgrounds/  # Energy-level background images
    │       ├── buttons/      # Action button icons
    │       └── celebrations/ # End game animations
    └── icons/                # PWA icons
```

## Game Rules

### Objectives
- Complete 80 teaching modules
- Complete 20 collaborative units
- Complete daily admin tasks (4 per day)
- Maintain energy levels
- Avoid penalty points

### Actions
- **Teach**: Complete teaching modules (costs 2 energy)
- **Admin**: Complete administrative tasks (costs 2 energy)
- **Collaborate**: Complete collaborative units (costs 1 energy)
- **Break**: Restore energy (+2 energy)
- **Meeting**: Attend mandatory staff meetings (costs 1 energy)

### Penalties
- Teaching minimum per day: 10 modules
- Collaborative minimum total: 10 units
- Admin tasks compound if not completed daily
- Skipping meetings incurs penalties

### Energy System
- Start each day with 16 energy
- Actions consume energy
- Energy affects task completion rates
- Depleted energy forces breaks

## Customization

### Changing Game Parameters

Edit `js/config.js` to modify:
- Game structure (rounds, days)
- Task requirements
- Energy costs and gains
- Penalty rules
- Disruption frequency

### Adding Custom Themes

1. Create a new theme directory: `assets/themes/your-theme/`
2. Add background images for each energy level
3. Add button icons
4. Update `GAME_CONFIG.theme` in `config.js`

### Adding Custom Rules

Add new rules to the `GAME_RULES` array in `config.js`:

```javascript
GAME_RULES.push({
  name: 'your_rule_name',
  phase: 'selection', // or 'result'
  condition: (state) => {
    // Return true when rule should apply
  },
  action: (state) => {
    // Modify state when rule applies
  }
});
```

## Development

### Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

### Performance Requirements
- Load Time: < 3 seconds on 3G
- Frame Rate: 60fps for animations
- Memory: < 50MB RAM usage

## Assets Required

The game requires the following image assets (placeholders can be used for development):

### Background Images (1080×1920px)
- `energy-high.jpg` - Energy > 10
- `energy-medium.jpg` - Energy 5-10
- `energy-low.jpg` - Energy 1-4
- `energy-depleted.jpg` - Energy 0

### Button Icons (70×70px recommended)
- `teach.png`
- `admin.png`
- `collaborate.png`
- `break.png`
- `meeting.png`

### PWA Icons
- `icon-192.png` (192×192px)
- `icon-512.png` (512×512px)

## License

See LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

Based on the "Getting Things Done" methodology adapted for educational contexts.
