// Helper Functions

/**
 * Generate a random integer between min and max (inclusive)
 */
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Shuffle an array using Fisher-Yates algorithm
 */
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Format number with leading zeros
 */
function padZero(num, length = 2) {
  return String(num).padStart(length, '0');
}

/**
 * Clamp a value between min and max
 */
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/**
 * Calculate round ID from day and round
 */
function calculateRoundId(day, round) {
  return (day - 1) * GAME_CONFIG.structure.roundsPerDay + round;
}

/**
 * Calculate day and round from round ID
 */
function calculateDayRound(roundId) {
  const day = Math.floor((roundId - 1) / GAME_CONFIG.structure.roundsPerDay) + 1;
  const round = ((roundId - 1) % GAME_CONFIG.structure.roundsPerDay) + 1;
  return { day, round };
}

/**
 * Get background image path based on energy level
 * Handles both correct extensions and double extensions (e.g., .jpg.png)
 */
function getBackgroundImage(energy) {
  const themePath = GAME_CONFIG.theme.basePath + 'backgrounds/';
  
  if (energy > 10) return themePath + 'energy-high.jpg';
  if (energy >= 5) return themePath + 'energy-medium.jpg';
  if (energy > 0) return themePath + 'energy-low.jpg';
  return themePath + 'energy-depleted.jpg';
}

/**
 * Get image path with fallback for double extensions
 * Tries the correct path first, then falls back to double extension if needed
 */
function getImagePath(basePath, filename) {
  return basePath + filename;
}

/**
 * Format action name for display
 */
function formatActionName(action) {
  const names = {
    teach: 'Teach',
    admin: 'Admin',
    collaborate: 'Collab',
    break: 'Break',
    attend_meeting: 'Meeting',
    skip_meeting: 'Skip Meeting'
  };
  return names[action] || action;
}

/**
 * Debounce function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

