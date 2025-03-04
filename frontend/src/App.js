import React, { useContext, useEffect } from 'react';
import styled, { ThemeProvider as StyledThemeProvider, createGlobalStyle } from 'styled-components';
import './App.css';
import ExpenseManager from './components/ExpenseManager';
import IncomeManager from './components/IncomeManager';
import CategoryManager from './components/CategoryManager';
import BudgetManager from './components/BudgetManager';
import RecurringTransactionManager from './components/RecurringTransactionManager';
import Report from './components/Report';

// UX Enhancement Components
import { ThemeProvider, ThemeContext } from './contexts/ThemeContext';
import { KeyboardShortcutsProvider } from './contexts/KeyboardShortcutsContext';
import { GuidedTourProvider } from './contexts/GuidedTourContext';
import KeyboardShortcutsHelp from './components/KeyboardShortcutsHelp';
import GuidedTour from './components/GuidedTour';
import SettingsPanel from './components/SettingsPanel';

// Accessibility
import { axe } from '@axe-core/react';

// Global styles for accessibility and theme
const GlobalStyle = createGlobalStyle`
  :root {
    --base-font-size: 16px;
    --base-line-height: 1.5;
  }

  body {
    font-size: var(--base-font-size);
    line-height: var(--base-line-height);
    transition: background-color 0.3s, color 0.3s;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  
  * {
    box-sizing: border-box;
  }
  
  /* Reduce motion for users who prefer it */
  .reduce-motion * {
    transition: none !important;
    animation: none !important;
  }
  
  /* High contrast mode */
  .high-contrast {
    --contrast-text: #000000;
    --contrast-bg: #ffffff;
    --contrast-link: #0000EE;
    --contrast-border: #000000;
  }
  
  .high-contrast * {
    color: var(--contrast-text) !important;
    background-color: var(--contrast-bg) !important;
    border-color: var(--contrast-border) !important;
  }
  
  .high-contrast a {
    color: var(--contrast-link) !important;
    text-decoration: underline !important;
  }
  
  /* Focus styles for keyboard navigation */
  *:focus-visible {
    outline: 3px solid #4a90e2 !important;
    outline-offset: 2px !important;
  }
`;

const AppContainer = styled.div`
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  min-height: 100vh;
  transition: background-color 0.3s, color 0.3s;
`;

const AppHeader = styled.header`
  background-color: ${props => props.theme.primary};
  color: white;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const AppTitle = styled.h1`
  margin: 0;
  font-size: 2rem;
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

// The themed app component
const ThemedApp = () => {
  const { theme } = useContext(ThemeContext);
  
  // Listen for custom events from keyboard shortcuts
  useEffect(() => {
    const handleToggleDarkMode = () => {
      // This event is dispatched from KeyboardShortcutsContext
      window.dispatchEvent(new CustomEvent('toggle-dark-mode'));
    };
    
    window.addEventListener('toggle-dark-mode', handleToggleDarkMode);
    
    return () => {
      window.removeEventListener('toggle-dark-mode', handleToggleDarkMode);
    };
  }, []);
  
  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer theme={theme}>
        <AppHeader theme={theme} className="app-header">
          <AppTitle>Expense Tracker</AppTitle>
        </AppHeader>
        
        <MainContent>
          <div id="category-manager">
            <CategoryManager />
          </div>
          
          <div id="expense-manager">
            <ExpenseManager />
          </div>
          
          <div id="income-manager">
            <IncomeManager />
          </div>
          
          <div id="budget-manager">
            <BudgetManager />
          </div>
          
          <div id="recurring-transactions">
            <RecurringTransactionManager />
          </div>
          
          <div id="reports">
            <Report />
          </div>
        </MainContent>
        
        <SettingsPanel />
        <KeyboardShortcutsHelp />
        <GuidedTour />
      </AppContainer>
    </StyledThemeProvider>
  );
};

// Main App component with all providers
function App() {
  // Enable accessibility testing in development
  if (process.env.NODE_ENV !== 'production') {
    React.useEffect(() => {
      axe(React, 1000);
    }, []);
  }
  
  return (
    <ThemeProvider>
      <KeyboardShortcutsProvider>
        <GuidedTourProvider>
          <ThemedApp />
        </GuidedTourProvider>
      </KeyboardShortcutsProvider>
    </ThemeProvider>
  );
}

export default App;