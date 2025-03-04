import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../contexts/ThemeContext';

const SettingsContainer = styled.div`
  margin: 20px 0;
  padding: 15px;
  border-radius: 8px;
  background-color: ${props => props.theme.surface};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
  margin-top: 0;
  color: ${props => props.theme.text};
`;

const SettingGroup = styled.div`
  margin-bottom: 15px;
`;

const SettingLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: ${props => props.theme.text};
`;

const RangeContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RangeInput = styled.input`
  flex: 1;
  margin-right: 10px;
`;

const RangeValue = styled.span`
  min-width: 30px;
  text-align: right;
  color: ${props => props.theme.text};
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const AccessibilitySettings = () => {
  const { theme } = useContext(ThemeContext);
  
  // Default settings
  const [fontSize, setFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  
  // Load saved settings
  useEffect(() => {
    const savedFontSize = localStorage.getItem('a11y_fontSize');
    const savedLineHeight = localStorage.getItem('a11y_lineHeight');
    const savedReduceMotion = localStorage.getItem('a11y_reduceMotion') === 'true';
    const savedHighContrast = localStorage.getItem('a11y_highContrast') === 'true';
    
    if (savedFontSize) setFontSize(Number(savedFontSize));
    if (savedLineHeight) setLineHeight(Number(savedLineHeight));
    setReduceMotion(savedReduceMotion);
    setHighContrast(savedHighContrast);
  }, []);
  
  // Apply settings to document
  useEffect(() => {
    // Save settings
    localStorage.setItem('a11y_fontSize', fontSize);
    localStorage.setItem('a11y_lineHeight', lineHeight);
    localStorage.setItem('a11y_reduceMotion', reduceMotion);
    localStorage.setItem('a11y_highContrast', highContrast);
    
    // Apply settings
    document.documentElement.style.setProperty('--base-font-size', `${fontSize}px`);
    document.documentElement.style.setProperty('--base-line-height', lineHeight);
    
    // Add or remove classes for other settings
    if (reduceMotion) {
      document.body.classList.add('reduce-motion');
    } else {
      document.body.classList.remove('reduce-motion');
    }
    
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [fontSize, lineHeight, reduceMotion, highContrast]);
  
  return (
    <SettingsContainer theme={theme}>
      <Title theme={theme}>Accessibility Settings</Title>
      
      <SettingGroup>
        <SettingLabel theme={theme} htmlFor="font-size">
          Font Size
        </SettingLabel>
        <RangeContainer>
          <RangeInput
            type="range"
            id="font-size"
            min="12"
            max="24"
            step="1"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            aria-valuemin="12"
            aria-valuemax="24"
            aria-valuenow={fontSize}
          />
          <RangeValue theme={theme}>{fontSize}px</RangeValue>
        </RangeContainer>
      </SettingGroup>
      
      <SettingGroup>
        <SettingLabel theme={theme} htmlFor="line-height">
          Line Spacing
        </SettingLabel>
        <RangeContainer>
          <RangeInput
            type="range"
            id="line-height"
            min="1"
            max="2"
            step="0.1"
            value={lineHeight}
            onChange={(e) => setLineHeight(Number(e.target.value))}
            aria-valuemin="1"
            aria-valuemax="2"
            aria-valuenow={lineHeight}
          />
          <RangeValue theme={theme}>{lineHeight}</RangeValue>
        </RangeContainer>
      </SettingGroup>
      
      <SettingGroup>
        <SettingLabel theme={theme}>
          <Checkbox
            type="checkbox"
            id="reduce-motion"
            checked={reduceMotion}
            onChange={(e) => setReduceMotion(e.target.checked)}
          />
          Reduce Motion
        </SettingLabel>
      </SettingGroup>
      
      <SettingGroup>
        <SettingLabel theme={theme}>
          <Checkbox
            type="checkbox"
            id="high-contrast"
            checked={highContrast}
            onChange={(e) => setHighContrast(e.target.checked)}
          />
          High Contrast Mode
        </SettingLabel>
      </SettingGroup>
    </SettingsContainer>
  );
};

export default AccessibilitySettings;