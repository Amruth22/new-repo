import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';
import ThemeCustomizer from './ThemeCustomizer';
import AccessibilitySettings from './AccessibilitySettings';
import { KeyboardShortcutsContext } from '../contexts/KeyboardShortcutsContext';
import { GuidedTourContext } from '../contexts/GuidedTourContext';

const PanelButton = styled.button`
  background-color: ${props => props.theme.primary};
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: fixed;
  bottom: 20px;
  left: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
  z-index: 100;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const Panel = styled.div`
  position: fixed;
  left: ${props => props.isOpen ? '0' : '-320px'};
  top: 0;
  bottom: 0;
  width: 300px;
  background-color: ${props => props.theme.surface};
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  transition: left 0.3s ease;
  z-index: 1000;
  overflow-y: auto;
  padding: 20px;
`;

const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid ${props => props.theme.secondary};
  padding-bottom: 10px;
`;

const Title = styled.h2`
  margin: 0;
  color: ${props => props.theme.text};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${props => props.theme.text};
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  margin-top: 0;
  color: ${props => props.theme.text};
  border-bottom: 1px solid ${props => props.theme.secondary};
  padding-bottom: 5px;
`;

const Button = styled.button`
  background-color: ${props => props.theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: 500;
  margin-top: 10px;
  width: 100%;
  
  &:hover {
    opacity: 0.9;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const SettingsPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useContext(ThemeContext);
  const { setHelpModalOpen } = useContext(KeyboardShortcutsContext);
  const { startTour } = useContext(GuidedTourContext);
  
  const togglePanel = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <>
      <PanelButton 
        theme={theme} 
        onClick={togglePanel}
        aria-label="Open settings panel"
      >
        ⚙️
      </PanelButton>
      
      <Overlay isOpen={isOpen} onClick={togglePanel} />
      
      <Panel isOpen={isOpen} theme={theme}>
        <PanelHeader theme={theme}>
          <Title theme={theme}>Settings</Title>
          <CloseButton 
            theme={theme} 
            onClick={togglePanel}
            aria-label="Close settings panel"
          >
            ×
          </CloseButton>
        </PanelHeader>
        
        <Section>
          <SectionTitle theme={theme}>Appearance</SectionTitle>
          <ThemeToggle />
          <ThemeCustomizer />
        </Section>
        
        <Section>
          <SectionTitle theme={theme}>Accessibility</SectionTitle>
          <AccessibilitySettings />
        </Section>
        
        <Section>
          <SectionTitle theme={theme}>Help & Guidance</SectionTitle>
          <Button 
            theme={theme} 
            onClick={() => {
              setIsOpen(false);
              setHelpModalOpen(true);
            }}
          >
            Keyboard Shortcuts
          </Button>
          <Button 
            theme={theme} 
            onClick={() => {
              setIsOpen(false);
              startTour();
            }}
            style={{ marginTop: '10px' }}
          >
            Start Guided Tour
          </Button>
        </Section>
      </Panel>
    </>
  );
};

export default SettingsPanel;