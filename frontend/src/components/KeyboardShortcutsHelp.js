import React, { useContext } from 'react';
import styled from 'styled-components';
import { KeyboardShortcutsContext } from '../contexts/KeyboardShortcutsContext';
import { ThemeContext } from '../contexts/ThemeContext';

const HelpButton = styled.button`
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
  right: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
  z-index: 100;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: ${props => props.theme.surface};
  color: ${props => props.theme.text};
  border-radius: 8px;
  padding: 20px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${props => props.theme.text};
`;

const ShortcutsList = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px 20px;
  align-items: center;
`;

const ShortcutKey = styled.div`
  background-color: ${props => props.theme.background};
  border: 1px solid ${props => props.theme.secondary};
  border-radius: 4px;
  padding: 5px 10px;
  font-family: monospace;
  font-weight: bold;
`;

const ShortcutDescription = styled.div`
  font-size: 14px;
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid ${props => props.theme.secondary};
`;

const ToggleLabel = styled.label`
  margin-left: 10px;
  font-size: 14px;
`;

const KeyboardShortcutsHelp = () => {
  const { shortcuts, helpModalOpen, setHelpModalOpen, shortcutsEnabled, toggleShortcuts } = useContext(KeyboardShortcutsContext);
  const { theme } = useContext(ThemeContext);
  
  return (
    <>
      <HelpButton 
        theme={theme} 
        onClick={() => setHelpModalOpen(true)}
        id="shortcuts-help"
        aria-label="Keyboard shortcuts help"
      >
        ?
      </HelpButton>
      
      {helpModalOpen && (
        <Modal>
          <ModalContent theme={theme}>
            <ModalHeader>
              <Title>Keyboard Shortcuts</Title>
              <CloseButton 
                theme={theme} 
                onClick={() => setHelpModalOpen(false)}
                aria-label="Close shortcuts help"
              >
                ×
              </CloseButton>
            </ModalHeader>
            
            <ShortcutsList>
              {shortcuts.map((shortcut, index) => (
                <React.Fragment key={index}>
                  <ShortcutKey theme={theme}>{shortcut.key}</ShortcutKey>
                  <ShortcutDescription>{shortcut.description}</ShortcutDescription>
                </React.Fragment>
              ))}
            </ShortcutsList>
            
            <ToggleContainer theme={theme}>
              <input
                type="checkbox"
                id="shortcuts-toggle"
                checked={shortcutsEnabled}
                onChange={toggleShortcuts}
              />
              <ToggleLabel htmlFor="shortcuts-toggle">
                Enable keyboard shortcuts
              </ToggleLabel>
            </ToggleContainer>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default KeyboardShortcutsHelp;