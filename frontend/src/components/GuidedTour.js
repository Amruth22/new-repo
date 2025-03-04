import React, { useContext } from 'react';
import Joyride from 'react-joyride';
import { GuidedTourContext } from '../contexts/GuidedTourContext';
import { ThemeContext } from '../contexts/ThemeContext';

const GuidedTour = () => {
  const { 
    tourActive, 
    tourStep, 
    tourSteps, 
    handleJoyrideCallback,
    hasCompletedTour,
    startTour
  } = useContext(GuidedTourContext);
  
  const { theme, darkMode } = useContext(ThemeContext);
  
  // Custom styles for the tour
  const styles = {
    options: {
      arrowColor: theme.surface,
      backgroundColor: theme.surface,
      overlayColor: 'rgba(0, 0, 0, 0.5)',
      primaryColor: theme.primary,
      textColor: theme.text,
      zIndex: 1000,
    },
    tooltipContainer: {
      textAlign: 'left',
    },
    buttonNext: {
      backgroundColor: theme.primary,
      color: '#fff',
    },
    buttonBack: {
      color: theme.text,
    },
    buttonClose: {
      color: theme.text,
    }
  };
  
  return (
    <>
      {!hasCompletedTour && (
        <button
          onClick={startTour}
          style={{
            position: 'fixed',
            bottom: '70px',
            right: '20px',
            backgroundColor: theme.primary,
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
            zIndex: 100,
          }}
          aria-label="Start guided tour"
        >
          🚀
        </button>
      )}
      
      <Joyride
        callback={handleJoyrideCallback}
        continuous
        run={tourActive}
        scrollToFirstStep
        showProgress
        showSkipButton
        steps={tourSteps}
        stepIndex={tourStep}
        styles={styles}
        disableScrolling
        locale={{
          back: 'Back',
          close: 'Close',
          last: 'Finish',
          next: 'Next',
          skip: 'Skip tour'
        }}
      />
    </>
  );
};

export default GuidedTour;