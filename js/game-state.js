// Game State Management

class GameState {
  constructor() {
    this.reset();
  }

  reset() {
    // Meta Information
    this.currentDay = 1;
    this.currentRound = 1;
    this.currentRoundId = 1;
    this.phase = 'selection'; // 'selection' | 'result' | 'end'
    
    // Player Resources
    this.energy = GAME_CONFIG.energy.dailyStart;
    this.dailyEnergy = GAME_CONFIG.energy.dailyStart;
    
    // Tasks
    this.teachingRemaining = GAME_CONFIG.initialTasks.teachingModules;
    this.teachingCompleted = 0;
    this.dailyTeachingCompleted = 0;
    
    this.adminRemaining = GAME_CONFIG.initialTasks.adminUnitsPerDay;
    this.adminCompleted = 0;
    
    this.collaborativeRemaining = GAME_CONFIG.initialTasks.collaborativeUnits;
    this.collaborativeCompleted = 0;
    
    // Penalties
    this.penalties = {
      teaching: 0,
      admin: 0,
      collaborative: 0,
      meetings: 0,
      total: 0
    };
    
    // Events
    this.disruptions = this.generateDisruptions();
    this.currentDisruption = null;
    
    // Current Round State
    this.selectedAction = null;
    this.actionSuccess = true;
    this.availableActions = ['teach', 'admin', 'collaborate', 'break'];
    this.mandatoryAction = null;
    this.forceBreak = false;
    
    // Flags
    this.isEndOfDay = false;
    this.isGameEnd = false;
    
    // History
    this.actionHistory = [];
    
    // Messages
    this.disruptionMessage = null;
    this.specialMessage = null;
    this.resultMessage = null;
  }

  /**
   * Generate random disruption rounds
   */
  generateDisruptions() {
    const disruptions = [];
    const totalRounds = GAME_CONFIG.structure.totalRounds;
    const disruptionCount = GAME_CONFIG.disruptions.total;
    
    // Generate random round IDs (excluding first round)
    const possibleRounds = Array.from({ length: totalRounds - 1 }, (_, i) => i + 2);
    const shuffled = shuffleArray(possibleRounds);
    
    for (let i = 0; i < disruptionCount && i < shuffled.length; i++) {
      disruptions.push(shuffled[i]);
    }
    
    return disruptions.sort((a, b) => a - b);
  }

  /**
   * Check if current round has a disruption
   */
  hasDisruption() {
    return this.disruptions.includes(this.currentRoundId);
  }

  /**
   * Get fixed events for current round
   */
  getFixedEvents() {
    const meetings = GAME_CONFIG.fixedEvents.staffMeetings;
    return meetings.map(m => {
      const roundId = (m.day - 1) * GAME_CONFIG.structure.roundsPerDay + m.round;
      return { ...m, roundId };
    });
  }

  /**
   * Check if current round is a staff meeting
   */
  isStaffMeetingRound() {
    const events = this.getFixedEvents();
    return events.some(e => e.roundId === this.currentRoundId);
  }

  /**
   * Save state to localStorage
   */
  save() {
    try {
      const stateData = {
        currentDay: this.currentDay,
        currentRound: this.currentRound,
        currentRoundId: this.currentRoundId,
        phase: this.phase,
        energy: this.energy,
        dailyEnergy: this.dailyEnergy,
        teachingRemaining: this.teachingRemaining,
        teachingCompleted: this.teachingCompleted,
        dailyTeachingCompleted: this.dailyTeachingCompleted,
        adminRemaining: this.adminRemaining,
        adminCompleted: this.adminCompleted,
        collaborativeRemaining: this.collaborativeRemaining,
        collaborativeCompleted: this.collaborativeCompleted,
        penalties: { ...this.penalties },
        disruptions: this.disruptions,
        actionHistory: this.actionHistory
      };
      localStorage.setItem('gtd_game_state', JSON.stringify(stateData));
    } catch (error) {
      console.warn('Failed to save game state:', error);
    }
  }

  /**
   * Load state from localStorage
   */
  load() {
    try {
      const stateData = localStorage.getItem('gtd_game_state');
      if (!stateData) return false;
      
      const data = JSON.parse(stateData);
      
      this.currentDay = data.currentDay || 1;
      this.currentRound = data.currentRound || 1;
      this.currentRoundId = data.currentRoundId || 1;
      this.phase = data.phase || 'selection';
      this.energy = data.energy || GAME_CONFIG.energy.dailyStart;
      this.dailyEnergy = data.dailyEnergy || GAME_CONFIG.energy.dailyStart;
      this.teachingRemaining = data.teachingRemaining || GAME_CONFIG.initialTasks.teachingModules;
      this.teachingCompleted = data.teachingCompleted || 0;
      this.dailyTeachingCompleted = data.dailyTeachingCompleted || 0;
      this.adminRemaining = data.adminRemaining || GAME_CONFIG.initialTasks.adminUnitsPerDay;
      this.adminCompleted = data.adminCompleted || 0;
      this.collaborativeRemaining = data.collaborativeRemaining || GAME_CONFIG.initialTasks.collaborativeUnits;
      this.collaborativeCompleted = data.collaborativeCompleted || 0;
      this.penalties = data.penalties || { teaching: 0, admin: 0, collaborative: 0, meetings: 0, total: 0 };
      this.disruptions = data.disruptions || this.generateDisruptions();
      this.actionHistory = data.actionHistory || [];
      
      return true;
    } catch (error) {
      console.warn('Failed to load game state:', error);
      return false;
    }
  }

  /**
   * Clear saved state
   */
  clearSave() {
    try {
      localStorage.removeItem('gtd_game_state');
    } catch (error) {
      console.warn('Failed to clear game state:', error);
    }
  }

  /**
   * Calculate total penalty points
   */
  calculateTotalPenalties() {
    this.penalties.total = 
      this.penalties.teaching + 
      this.penalties.admin + 
      this.penalties.collaborative + 
      this.penalties.meetings;
    return this.penalties.total;
  }
}

