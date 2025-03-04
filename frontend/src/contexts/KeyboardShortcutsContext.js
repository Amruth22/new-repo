import React, { createContext, useState, useEffect } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

export const KeyboardShortcutsContext = createContext();

export const KeyboardShortcutsProvider = ({ children }) => {
  const [shortcutsEnabled, setShortcutsEnabled] = useState(true);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  
  // Define available shortcuts
  const shortcuts = [
    { key: 'shift+?', description: 'Show keyboard shortcuts help', action: () => setHelpModalOpen(true) },
    { key: 'shift+d', description: 'Toggle dark mode', action: () => window.dispatchEvent(new CustomEvent('toggle-dark-mode')) },
    { key: 'shift+e', description: 'Go to expenses', action: () => document.getElementById('expense-manager')?.scrollIntoView() },
    { key: 'shift+i', description: 'Go to income', action: () => document.getElementById('income-manager')?.scrollIntoView() },
    { key: 'shift+b', description: 'Go to budgets', action: () => document.getElementById('budget-manager')?.scrollIntoView() },
    { key: 'shift+r', description: 'Go to reports', action: () => document.getElementById('reports')?.scrollIntoView() },
    { key: 'shift+n', description: 'Add new transaction', action: () => window.dispatchEvent(new CustomEvent('open-new-transaction')) },
    { key: 'esc', description: 'Close any open modal', action: () => window.dispatchEvent(new CustomEvent('close-modals')) }
  ];
  
  // Register all shortcuts
  shortcuts.forEach(shortcut => {
    useHotkeys(shortcut.key, (event) => {
      if (shortcutsEnabled) {
        event.preventDefault();
        shortcut.action();
      }
    });
  });
  
  const toggleShortcuts = () => {
    setShortcutsEnabled(!shortcutsEnabled);
    localStorage.setItem('shortcutsEnabled', !shortcutsEnabled);
  };
  
  // Load user preference for shortcuts
  useEffect(() => {
    const savedPreference = localStorage.getItem('shortcutsEnabled');
    if (savedPreference !== null) {
      setShortcutsEnabled(savedPreference === 'true');
    }
  }, []);
  
  return (
    <KeyboardShortcutsContext.Provider 
      value={{ 
        shortcuts,
        shortcutsEnabled,
        toggleShortcuts,
        helpModalOpen,
        setHelpModalOpen
      }}
    >
      {children}
    </KeyboardShortcutsContext.Provider>
  );
};