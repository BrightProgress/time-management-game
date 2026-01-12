// Core Game Logic and Rule Engine

class RuleEngine {
  constructor(rules) {
    this.rules = rules || [];
  }

  evaluate(state, phase = null) {
    for (const rule of this.rules) {
      // Filter by phase if specified
      if (rule.phase && rule.phase !== phase) continue;
      
      // Evaluate condition
      if (rule.condition(state)) {
        // Execute action
        rule.action(state);
        
        // If rule is terminal, stop evaluation
        if (rule.terminal) break;
      }
    }
  }

  addRule(rule) {
    this.rules.push(rule);
  }

  removeRule(ruleName) {
    this.rules = this.rules.filter(r => r.name !== ruleName);
  }
}

class GameEngine {
  constructor(state, ruleEngine) {
    this.state = state;
    this.ruleEngine = ruleEngine || new RuleEngine(GAME_RULES);
  }

  /**
   * Start the selection phase for a round
   */
  startSelectionPhase() {
    this.state.phase = 'selection';
    this.state.selectedAction = null;
    this.state.actionSuccess = true;
    this.state.currentDisruption = null;
    this.state.disruptionMessage = null;
    this.state.specialMessage = null;
    this.state.resultMessage = null;
    this.state.isEndOfDay = false;
    this.state.isGameEnd = false;
    this.state.forceBreak = false;
    
    // Calculate available actions
    this.state.availableActions = this.calculateAvailableActions();
    
    // Apply rules
    this.ruleEngine.evaluate(this.state, 'selection');
    
    // Save state
    this.state.save();
  }

  /**
   * Calculate which actions are available
   */
  calculateAvailableActions() {
    const actions = [];
    
    // Check if it's a staff meeting round
    if (this.state.isStaffMeetingRound()) {
      return ['attend_meeting', 'skip_meeting'];
    }
    
    // Energy check
    if (this.state.energy <= 0) {
      return ['break'];
    }
    
    // Regular actions
    if (this.state.teachingRemaining > 0) {
      actions.push('teach');
    }
    if (this.state.adminRemaining > 0) {
      actions.push('admin');
    }
    if (this.state.collaborativeRemaining > 0) {
      actions.push('collaborate');
    }
    actions.push('break');
    
    return actions;
  }

  /**
   * Execute an action
   */
  executeAction(action) {
    this.state.selectedAction = action;
    this.state.phase = 'result';
    
    // Check for disruption
    if (this.state.hasDisruption()) {
      this.state.actionSuccess = false;
      this.state.currentDisruption = this.getRandomDisruption();
      this.ruleEngine.evaluate(this.state, 'result');
    } else {
      this.state.actionSuccess = true;
      this.processAction(action);
    }
    
    // Apply end-of-round rules
    this.checkEndOfDay();
    this.checkEndOfGame();
    this.ruleEngine.evaluate(this.state, 'result');
    
    // Calculate total penalties
    this.state.calculateTotalPenalties();
    
    // Save state
    this.state.save();
  }

  /**
   * Process an action (when successful)
   */
  processAction(action) {
    switch (action) {
      case 'teach':
        this.processTeaching();
        break;
      case 'admin':
        this.processAdmin();
        break;
      case 'collaborate':
        this.processCollaborate();
        break;
      case 'break':
        this.processBreak();
        break;
      case 'attend_meeting':
        this.processMeeting(true);
        break;
      case 'skip_meeting':
        this.processMeeting(false);
        break;
    }
  }

  /**
   * Process teaching action
   */
  processTeaching() {
    const energy = this.state.energy;
    const rates = GAME_CONFIG.taskRates.teaching;
    let units = 0;
    
    if (energy > rates.energyHigh.threshold) {
      units = rates.energyHigh.units;
    } else if (energy > rates.energyMedium.threshold) {
      units = rates.energyMedium.units;
    } else if (energy > rates.energyLow.threshold) {
      units = rates.energyLow.units;
    } else {
      units = rates.energyDepleted.units;
    }
    
    // Apply units
    units = Math.min(units, this.state.teachingRemaining);
    this.state.teachingRemaining -= units;
    this.state.teachingCompleted += units;
    this.state.dailyTeachingCompleted += units;
    
    // Consume energy
    this.state.energy -= GAME_CONFIG.energy.costs.teaching;
    this.state.energy = Math.max(0, this.state.energy);
    
    this.state.resultMessage = `Taught ${units} module${units !== 1 ? 's' : ''}. Energy: -${GAME_CONFIG.energy.costs.teaching}`;
  }

  /**
   * Process admin action
   */
  processAdmin() {
    const energy = this.state.energy;
    const rates = GAME_CONFIG.taskRates.admin;
    let units = 0;
    
    if (energy > rates.energyHigh.threshold) {
      units = rates.energyHigh.units;
    } else if (energy > rates.energyLow.threshold) {
      units = rates.energyLow.units;
    } else {
      units = rates.energyDepleted.units;
    }
    
    // Apply units
    units = Math.min(units, this.state.adminRemaining);
    this.state.adminRemaining -= units;
    this.state.adminCompleted += units;
    
    // Consume energy
    this.state.energy -= GAME_CONFIG.energy.costs.admin;
    this.state.energy = Math.max(0, this.state.energy);
    
    this.state.resultMessage = `Completed ${units} admin task${units !== 1 ? 's' : ''}. Energy: -${GAME_CONFIG.energy.costs.admin}`;
  }

  /**
   * Process collaborate action
   */
  processCollaborate() {
    const energy = this.state.energy;
    const rates = GAME_CONFIG.taskRates.collaborative;
    let units = 0;
    
    if (energy > rates.energyHigh.threshold) {
      units = rates.energyHigh.units;
    } else {
      units = rates.energyLow.units;
    }
    
    // Apply units
    units = Math.min(units, this.state.collaborativeRemaining);
    this.state.collaborativeRemaining -= units;
    this.state.collaborativeCompleted += units;
    
    // Consume energy
    this.state.energy -= GAME_CONFIG.energy.costs.collaborative;
    this.state.energy = Math.max(0, this.state.energy);
    
    this.state.resultMessage = `Completed ${units} collaborative unit${units !== 1 ? 's' : ''}. Energy: -${GAME_CONFIG.energy.costs.collaborative}`;
  }

  /**
   * Process break action
   */
  processBreak() {
    const energyGain = GAME_CONFIG.energy.gains.break;
    this.state.energy += energyGain;
    this.state.energy = Math.min(this.state.energy, this.state.dailyEnergy);
    
    this.state.resultMessage = `Took a break. Energy: +${energyGain}`;
  }

  /**
   * Process meeting action
   */
  processMeeting(attended) {
    if (attended) {
      this.state.energy -= GAME_CONFIG.energy.costs.meeting;
      this.state.energy = Math.max(0, this.state.energy);
      this.state.resultMessage = `Attended staff meeting. Energy: -${GAME_CONFIG.energy.costs.meeting}`;
    } else {
      this.state.penalties.meetings += GAME_CONFIG.penalties.skipMeeting;
      this.state.resultMessage = `Skipped staff meeting. Penalty: +${GAME_CONFIG.penalties.skipMeeting}`;
    }
  }

  /**
   * Get random disruption type
   */
  getRandomDisruption() {
    const types = GAME_CONFIG.disruptions.types;
    return types[randomInt(0, types.length - 1)];
  }

  /**
   * Check if it's end of day
   */
  checkEndOfDay() {
    if (this.state.currentRound >= GAME_CONFIG.structure.roundsPerDay) {
      this.state.isEndOfDay = true;
    }
  }

  /**
   * Check if it's end of game
   */
  checkEndOfGame() {
    if (this.state.currentRoundId >= GAME_CONFIG.structure.totalRounds) {
      this.state.isGameEnd = true;
      this.state.phase = 'end';
    }
  }

  /**
   * Advance to next round
   */
  advanceRound() {
    // Save action to history
    this.state.actionHistory.push({
      round: this.state.currentRoundId,
      day: this.state.currentDay,
      action: this.state.selectedAction,
      success: this.state.actionSuccess
    });
    
    // Advance round
    this.state.currentRoundId++;
    this.state.currentRound++;
    
    // Day transition
    if (this.state.currentRound > GAME_CONFIG.structure.roundsPerDay) {
      this.endDay();
      this.state.currentDay++;
      this.state.currentRound = 1;
      this.startDay();
    }
    
    // Game end check
    if (this.state.currentRoundId > GAME_CONFIG.structure.totalRounds) {
      this.endGame();
    } else {
      this.startSelectionPhase();
    }
  }

  /**
   * End of day processing
   */
  endDay() {
    // Reset daily teaching counter
    this.state.dailyTeachingCompleted = 0;
    
    // Reset daily energy
    this.state.dailyEnergy = GAME_CONFIG.energy.dailyStart;
    this.state.energy = Math.min(this.state.energy, this.state.dailyEnergy);
    
    // Reset admin for new day
    this.state.adminRemaining += GAME_CONFIG.initialTasks.adminUnitsPerDay;
  }

  /**
   * Start new day
   */
  startDay() {
    // Day starts with fresh energy
    this.state.energy = this.state.dailyEnergy;
  }

  /**
   * End game processing
   */
  endGame() {
    this.state.phase = 'end';
    this.state.isGameEnd = true;
    this.state.calculateTotalPenalties();
    this.state.save();
  }
}

