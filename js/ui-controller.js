// UI Rendering and Interaction

class UIController {
  constructor(gameEngine) {
    this.gameEngine = gameEngine;
    this.state = gameEngine.state;
    this.initializeElements();
    this.setupEventListeners();
  }

  initializeElements() {
    // Status bar
    this.statusBar = document.getElementById('status-bar');
    this.dayDisplay = document.getElementById('day-display');
    this.roundDisplay = document.getElementById('round-display');
    this.energyDisplay = document.getElementById('energy-display');
    
    // Main game area
    this.gameArea = document.getElementById('game-area');
    this.backgroundImage = document.getElementById('background-image');
    
    // Task summary
    this.taskSummary = document.getElementById('task-summary');
    this.teachingDisplay = document.getElementById('teaching-display');
    this.adminDisplay = document.getElementById('admin-display');
    this.collaborativeDisplay = document.getElementById('collaborative-display');
    
    // Action buttons
    this.actionButtons = document.getElementById('action-buttons');
    
    // Result phase
    this.resultPhase = document.getElementById('result-phase');
    this.resultMessage = document.getElementById('result-message');
    this.resultDetails = document.getElementById('result-details');
    this.continueButton = document.getElementById('continue-button');
    
    // End game screen
    this.endGameScreen = document.getElementById('end-game-screen');
    this.endGameSummary = document.getElementById('end-game-summary');
    this.playAgainButton = document.getElementById('play-again-button');
    
    // Special messages
    this.specialMessage = document.getElementById('special-message');
  }

  setupEventListeners() {
    // Action button clicks
    this.actionButtons.addEventListener('click', (e) => {
      if (e.target.classList.contains('action-button') && !e.target.classList.contains('disabled')) {
        const action = e.target.dataset.action;
        this.handleActionClick(action);
      }
    });
    
    // Continue button
    if (this.continueButton) {
      this.continueButton.addEventListener('click', () => {
        this.handleContinue();
      });
    }
    
    // Play again button
    if (this.playAgainButton) {
      this.playAgainButton.addEventListener('click', () => {
        this.handlePlayAgain();
      });
    }
  }

  /**
   * Render the current game state
   */
  render() {
    if (this.state.phase === 'end') {
      this.renderEndGame();
    } else if (this.state.phase === 'result') {
      this.renderResultPhase();
    } else {
      this.renderSelectionPhase();
    }
  }

  /**
   * Render selection phase
   */
  renderSelectionPhase() {
    // Hide result phase, show game area
    this.resultPhase.style.display = 'none';
    this.gameArea.style.display = 'block';
    this.endGameScreen.style.display = 'none';
    
    // Update status bar
    this.updateStatusBar();
    
    // Update background image
    this.updateBackgroundImage();
    
    // Update task summary
    this.updateTaskSummary();
    
    // Update action buttons
    this.updateActionButtons();
    
    // Show/hide special message
    if (this.state.specialMessage) {
      this.specialMessage.textContent = this.state.specialMessage;
      this.specialMessage.style.display = 'block';
    } else {
      this.specialMessage.style.display = 'none';
    }
  }

  /**
   * Render result phase
   */
  renderResultPhase() {
    // Hide game area, show result phase
    this.gameArea.style.display = 'none';
    this.resultPhase.style.display = 'block';
    this.endGameScreen.style.display = 'none';
    
    // Update status bar
    this.updateStatusBar();
    
    // Update result message
    this.updateResultMessage();
    
    // Update result details
    this.updateResultDetails();
  }

  /**
   * Render end game screen
   */
  renderEndGame() {
    // Hide game area and result phase
    this.gameArea.style.display = 'none';
    this.resultPhase.style.display = 'none';
    this.endGameScreen.style.display = 'block';
    
    // Show celebration animation if available
    this.showCelebrationAnimation();
    
    // Update end game summary
    this.updateEndGameSummary();
  }

  /**
   * Show celebration animation on end game screen
   */
  showCelebrationAnimation() {
    const celebrationPath = `${GAME_CONFIG.theme.basePath}celebrations/completion.gif`;
    const celebrationImg = document.createElement('img');
    celebrationImg.src = celebrationPath;
    celebrationImg.alt = 'Celebration';
    celebrationImg.style.cssText = 'max-width: 100%; height: auto; margin: 20px 0;';
    celebrationImg.onerror = () => {
      // Try with double extension if original fails
      celebrationImg.src = celebrationPath.replace('.gif', '.gif.png');
      celebrationImg.onerror = () => {
        // If both fail, just don't show the animation
        celebrationImg.style.display = 'none';
      };
    };
    
    // Insert celebration before the title
    const title = document.getElementById('end-game-title');
    if (title && !title.previousElementSibling || 
        (title.previousElementSibling && !title.previousElementSibling.classList.contains('celebration-animation'))) {
      const existingCelebration = document.querySelector('.celebration-animation');
      if (existingCelebration) {
        existingCelebration.remove();
      }
      celebrationImg.className = 'celebration-animation';
      title.parentNode.insertBefore(celebrationImg, title);
    }
  }

  /**
   * Update status bar
   */
  updateStatusBar() {
    this.dayDisplay.textContent = `Day ${this.state.currentDay}`;
    this.roundDisplay.textContent = `Round ${this.state.currentRound}`;
    this.energyDisplay.textContent = `Energy: ${this.state.energy}`;
  }

  /**
   * Update background image based on energy
   */
  updateBackgroundImage() {
    let imagePath = getBackgroundImage(this.state.energy);
    
    // Try to load the image, with fallback to double extension
    const testImg = new Image();
    const setBackground = (path) => {
      this.backgroundImage.style.backgroundImage = `url('${path}')`;
    };
    
    testImg.onload = () => {
      setBackground(imagePath);
    };
    
    testImg.onerror = () => {
      // Try with double extension if original fails
      const fallbackPath = imagePath.replace('.jpg', '.jpg.png');
      const fallbackImg = new Image();
      fallbackImg.onload = () => {
        setBackground(fallbackPath);
      };
      fallbackImg.onerror = () => {
        // If both fail, set a default or leave empty
        setBackground(imagePath); // Try original anyway
      };
      fallbackImg.src = fallbackPath;
    };
    
    testImg.src = imagePath;
  }

  /**
   * Update task summary
   */
  updateTaskSummary() {
    this.teachingDisplay.textContent = `Teaching: ${this.state.teachingCompleted}/${GAME_CONFIG.initialTasks.teachingModules}`;
    this.adminDisplay.textContent = `Admin: ${this.state.adminRemaining}`;
    this.collaborativeDisplay.textContent = `Collaborative: ${this.state.collaborativeCompleted}/${GAME_CONFIG.initialTasks.collaborativeUnits}`;
  }

  /**
   * Update action buttons
   */
  updateActionButtons() {
    // Clear existing buttons
    this.actionButtons.innerHTML = '';
    
    // Create buttons for available actions
    const actions = this.state.availableActions;
    const buttonConfigs = {
      teach: { icon: 'teach.png', label: 'Teach', color: '#4A90E2' },
      admin: { icon: 'admin.png', label: 'Admin', color: '#F5A623' },
      collaborate: { icon: 'collaborate.png', label: 'Collab', color: '#7ED321' },
      break: { icon: 'break.png', label: 'Break', color: '#9013FE' },
      attend_meeting: { icon: 'meeting.png', label: 'Meeting', color: '#D0021B' },
      skip_meeting: { icon: 'meeting.png', label: 'Skip', color: '#999999' }
    };
    
    actions.forEach(action => {
      const config = buttonConfigs[action] || { icon: '', label: formatActionName(action), color: '#666666' };
      const button = this.createActionButton(action, config);
      this.actionButtons.appendChild(button);
    });
  }

  /**
   * Create an action button element
   */
  createActionButton(action, config) {
    const button = document.createElement('button');
    button.className = 'action-button';
    button.dataset.action = action;
    button.setAttribute('aria-label', config.label);
    
    // Check if action should be disabled
    const isDisabled = this.isActionDisabled(action);
    if (isDisabled) {
      button.classList.add('disabled');
      button.setAttribute('disabled', 'true');
    }
    
    // Create icon
    const icon = document.createElement('img');
    const iconPath = `${GAME_CONFIG.theme.basePath}buttons/${config.icon}`;
    icon.alt = config.label;
    icon.className = 'button-icon';
    icon.src = iconPath; // Try correct path first
    
    // Fallback for double extension if image fails to load
    icon.onerror = () => {
      const fallbackPath = iconPath.replace('.png', '.png.png');
      if (icon.src !== fallbackPath) {
        icon.src = fallbackPath;
        icon.onerror = () => {
          // If both fail, hide icon and show text
          icon.style.display = 'none';
          button.textContent = config.label;
        };
      } else {
        // If both fail, hide icon and show text
        icon.style.display = 'none';
        button.textContent = config.label;
      }
    };
    
    // Create label
    const label = document.createElement('span');
    label.className = 'button-label';
    label.textContent = config.label;
    
    button.appendChild(icon);
    button.appendChild(label);
    
    return button;
  }

  /**
   * Check if an action should be disabled
   */
  isActionDisabled(action) {
    // Energy check
    if (action !== 'break' && this.state.energy <= 0) {
      return true;
    }
    
    // Task availability checks
    if (action === 'teach' && this.state.teachingRemaining <= 0) {
      return true;
    }
    if (action === 'admin' && this.state.adminRemaining <= 0) {
      return true;
    }
    if (action === 'collaborate' && this.state.collaborativeRemaining <= 0) {
      return true;
    }
    
    return false;
  }

  /**
   * Handle action button click
   */
  handleActionClick(action) {
    if (this.state.phase !== 'selection') return;
    if (this.isActionDisabled(action)) return;
    
    // Execute action
    this.gameEngine.executeAction(action);
    
    // Render result phase
    this.render();
  }

  /**
   * Update result message
   */
  updateResultMessage() {
    let message = '';
    
    if (this.state.actionSuccess) {
      message = this.state.resultMessage || 'Action completed successfully.';
    } else {
      message = this.state.disruptionMessage || 'Action was disrupted!';
    }
    
    this.resultMessage.textContent = message;
  }

  /**
   * Update result details
   */
  updateResultDetails() {
    const details = [];
    
    // Action result
    if (this.state.selectedAction) {
      const actionName = formatActionName(this.state.selectedAction);
      details.push(`Action: ${actionName}`);
    }
    
    // Energy update
    details.push(`Energy: ${this.state.energy}`);
    
    // Task updates
    if (this.state.teachingCompleted > 0) {
      details.push(`Teaching: ${this.state.teachingCompleted}/${GAME_CONFIG.initialTasks.teachingModules}`);
    }
    if (this.state.adminCompleted > 0) {
      details.push(`Admin Remaining: ${this.state.adminRemaining}`);
    }
    if (this.state.collaborativeCompleted > 0) {
      details.push(`Collaborative: ${this.state.collaborativeCompleted}/${GAME_CONFIG.initialTasks.collaborativeUnits}`);
    }
    
    // Penalties
    if (this.state.penalties.total > 0) {
      details.push(`⚠️ Penalty Points: ${this.state.penalties.total}`);
    }
    
    // End of day warning
    if (this.state.isEndOfDay) {
      details.push('📅 End of Day');
    }
    
    this.resultDetails.innerHTML = details.map(d => `<div>${d}</div>`).join('');
  }

  /**
   * Handle continue button click
   */
  handleContinue() {
    if (this.state.phase === 'end') {
      this.renderEndGame();
    } else {
      this.gameEngine.advanceRound();
      this.render();
    }
  }

  /**
   * Update end game summary
   */
  updateEndGameSummary() {
    const summary = [];
    
    summary.push(`📚 Teaching Modules: ${this.state.teachingCompleted}/${GAME_CONFIG.initialTasks.teachingModules}`);
    summary.push(`🤝 Collaborative: ${this.state.collaborativeCompleted}/${GAME_CONFIG.initialTasks.collaborativeUnits}`);
    summary.push(`📋 Admin Tasks: ${this.state.adminCompleted > 0 ? 'Completed' : 'Incomplete'}`);
    summary.push(`⚡ Final Energy: ${this.state.energy}/${GAME_CONFIG.energy.dailyStart}`);
    summary.push(`⚠️ Penalty Points: ${this.state.penalties.total}`);
    
    // Calculate score (optional)
    const score = this.calculateScore();
    summary.push(`🏆 Score: ${score}`);
    
    this.endGameSummary.innerHTML = summary.map(s => `<div class="summary-item">${s}</div>`).join('');
  }

  /**
   * Calculate final score
   */
  calculateScore() {
    let score = 1000;
    
    // Teaching completion
    const teachingRatio = this.state.teachingCompleted / GAME_CONFIG.initialTasks.teachingModules;
    score += Math.floor(teachingRatio * 500);
    
    // Collaborative completion
    const collaborativeRatio = this.state.collaborativeCompleted / GAME_CONFIG.initialTasks.collaborativeUnits;
    score += Math.floor(collaborativeRatio * 300);
    
    // Energy bonus
    score += this.state.energy * 10;
    
    // Penalty deduction
    score -= this.state.penalties.total * 50;
    
    return Math.max(0, score);
  }

  /**
   * Handle play again button click
   */
  handlePlayAgain() {
    this.state.reset();
    this.state.clearSave();
    this.gameEngine.startSelectionPhase();
    this.render();
  }
}

