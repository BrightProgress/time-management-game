const GAME_CONFIG = {
  // Theme Configuration
  theme: {
    name: 'default',
    basePath: './assets/themes/default/'
  },
  
  // Game Structure
  structure: {
    totalRounds: 40,
    roundsPerDay: 8,
    totalDays: 5
  },
  
  // Fixed Events
  fixedEvents: {
    staffMeetings: [
      { day: 2, round: 3 },
      { day: 3, round: 4 }
      { day: 5, round: 6 }
    ]
  },
  
  // Initial Task Load
  initialTasks: {
    teachingModules: 80,
    collaborativeUnits: 20,
    adminUnitsPerDay: 4
  },
  
  // Task Completion Rates
  taskRates: {
    teaching: {
      energyHigh: { threshold: 9, units: 3 },
      energyMedium: { threshold: 5, maxThreshold: 9, units: 2 },
      energyLow: { threshold: 0, maxThreshold: 5, units: 1 },
      energyDepleted: { threshold: 0, exact: true, units: 0 }
    },
    admin: {
      energyHigh: { threshold: 8, units: 4 },
      energyLow: { threshold: 0, maxThreshold: 8, units: 2 },
      energyDepleted: { threshold: 0, exact: true, units: 0 }
    },
    collaborative: {
      energyHigh: { threshold: 6, units: 4 },
      energyLow: { threshold: 0, maxThreshold: 6, units: 2 }
    }
  },
  
  // Energy System
  energy: {
    dailyStart: 14,
    costs: {
      teaching: 2,
      admin: 2,
      collaborative: 1,
      meeting: 1
    },
    gains: {
      break: 2
    }
  },
  
  // Crisis/Disruption System
  disruptions: {
    total: 3,
    types: [
      'tech_failure',
      'student_emergency',
      'guest_lecture',
      'event_practice'
    ]
  },
  
  // Penalty Rules
  penalties: {
    teachingMinPerDay: 10,
    collaborativeMinTotal: 10,
    adminMaxEndOfDay: 8,
    skipMeeting: 1
  },
  
  // Admin Task Compounding
  adminCompounding: {
    enabled: true,
    multiplier: 2
  }
};

const GAME_RULES = [
  // Rule 1: Staff Meeting Required
  {
    name: 'staff_meeting_scheduled',
    phase: 'selection',
    condition: (state) => {
      const roundId = state.currentRoundId;
      const meetings = GAME_CONFIG.fixedEvents.staffMeetings;
      return meetings.some(m => {
        const meetingRoundId = (m.day - 1) * GAME_CONFIG.structure.roundsPerDay + m.round;
        return meetingRoundId === roundId;
      });
    },
    action: (state) => {
      state.availableActions = ['attend_meeting', 'skip_meeting'];
      state.mandatoryAction = 'attend_meeting';
    }
  },
  
  // Rule 2: Disruption Occurs
  {
    name: 'disruption_active',
    phase: 'result',
    condition: (state) => {
      return state.currentDisruption !== null;
    },
    action: (state) => {
      state.actionSuccess = false;
      state.disruptionMessage = getDisruptionMessage(state.currentDisruption);
    }
  },
  
  // Rule 3: Energy Depleted
  {
    name: 'energy_depleted',
    phase: 'selection',
    condition: (state) => {
      return state.energy <= 0;
    },
    action: (state) => {
      state.availableActions = ['break'];
      state.forceBreak = true;
    }
  },
  
  // Rule 4: End of Day - Admin Compounding
  {
    name: 'end_of_day_admin',
    phase: 'result',
    condition: (state) => {
      return state.isEndOfDay && state.adminRemaining > 0;
    },
    action: (state) => {
      state.adminRemaining = state.adminRemaining * GAME_CONFIG.adminCompounding.multiplier;
      if (state.adminRemaining > GAME_CONFIG.penalties.adminMaxEndOfDay) {
        state.penalties.admin += 1;
      }
    }
  },
  
  // Rule 5: End of Day - Teaching Minimum
  {
    name: 'end_of_day_teaching',
    phase: 'result',
    condition: (state) => {
      return state.isEndOfDay && state.dailyTeachingCompleted < GAME_CONFIG.penalties.teachingMinPerDay;
    },
    action: (state) => {
      state.penalties.teaching += 1;
    }
  },
  
  // Rule 6: End of Game - Collaborative Minimum
  {
    name: 'end_game_collaborative',
    phase: 'result',
    condition: (state) => {
      return state.isGameEnd && state.collaborativeCompleted < GAME_CONFIG.penalties.collaborativeMinTotal;
    },
    action: (state) => {
      state.penalties.collaborative += 1;
    }
  }
];

function getDisruptionMessage(type) {
  const messages = {
    tech_failure: 'Technology failure! Your action was disrupted.',
    student_emergency: 'Student emergency occurred! Action interrupted.',
    guest_lecture: 'Unexpected guest lecture! Plans changed.',
    event_practice: 'Event practice required! Time redirected.'
  };
  return messages[type] || 'An unexpected disruption occurred!';
}

