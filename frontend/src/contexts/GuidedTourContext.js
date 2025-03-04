import React, { createContext, useState, useEffect } from 'react';

export const GuidedTourContext = createContext();

export const GuidedTourProvider = ({ children }) => {
  const [tourActive, setTourActive] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [hasCompletedTour, setHasCompletedTour] = useState(false);
  
  // Define tour steps
  const tourSteps = [
    {
      target: '.app-header',
      content: 'Welcome to Expense Tracker! This guided tour will help you get familiar with the application.',
      placement: 'bottom',
      disableBeacon: true
    },
    {
      target: '#expense-manager',
      content: 'Here you can add and manage your expenses. Track where your money is going!',
      placement: 'top'
    },
    {
      target: '#income-manager',
      content: 'Record your income sources to keep track of your earnings.',
      placement: 'top'
    },
    {
      target: '#budget-manager',
      content: 'Set budgets for different categories to help manage your spending.',
      placement: 'top'
    },
    {
      target: '#reports',
      content: 'View detailed reports and analytics about your financial situation.',
      placement: 'top'
    },
    {
      target: '#theme-toggle',
      content: 'Toggle between light and dark mode for comfortable viewing.',
      placement: 'left'
    },
    {
      target: '#shortcuts-help',
      content: 'Access keyboard shortcuts to navigate quickly through the app.',
      placement: 'left'
    }
  ];
  
  const startTour = () => {
    setTourActive(true);
    setTourStep(0);
  };
  
  const endTour = () => {
    setTourActive(false);
    setHasCompletedTour(true);
    localStorage.setItem('hasCompletedTour', 'true');
  };
  
  const handleJoyrideCallback = (data) => {
    const { action, index, status, type } = data;
    
    if (([STATUS.FINISHED, STATUS.SKIPPED]).includes(status)) {
      endTour();
    } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      setTourStep(index + (action === ACTIONS.PREV ? -1 : 1));
    }
  };
  
  // Check if user has completed the tour before
  useEffect(() => {
    const tourCompleted = localStorage.getItem('hasCompletedTour') === 'true';
    setHasCompletedTour(tourCompleted);
    
    // Auto-start tour for new users
    if (!tourCompleted) {
      // Delay start to ensure all components are rendered
      const timer = setTimeout(() => {
        startTour();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  return (
    <GuidedTourContext.Provider 
      value={{ 
        tourActive,
        tourStep,
        tourSteps,
        startTour,
        endTour,
        handleJoyrideCallback,
        hasCompletedTour
      }}
    >
      {children}
    </GuidedTourContext.Provider>
  );
};

// Import these from react-joyride
const STATUS = {
  FINISHED: 'finished',
  SKIPPED: 'skipped'
};

const EVENTS = {
  STEP_AFTER: 'step:after',
  TARGET_NOT_FOUND: 'error:target_not_found'
};

const ACTIONS = {
  PREV: 'prev'
};