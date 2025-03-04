import React, { useContext } from 'react';
import Switch from 'react-switch';
import styled from 'styled-components';
import { ThemeContext } from '../contexts/ThemeContext';

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const Label = styled.label`
  margin-left: 10px;
  font-size: 14px;
  cursor: pointer;
`;

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode, theme } = useContext(ThemeContext);

  return (
    <ToggleContainer id="theme-toggle">
      <Switch
        onChange={toggleDarkMode}
        checked={darkMode}
        onColor={theme.primary}
        offColor="#888"
        checkedIcon={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              fontSize: 15,
              color: 'white',
              paddingRight: 2
            }}
          >
            🌙
          </div>
        }
        uncheckedIcon={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              fontSize: 15,
              color: 'white',
              paddingRight: 2
            }}
          >
            ☀️
          </div>
        }
        aria-label="Toggle dark mode"
      />
      <Label htmlFor="theme-toggle">
        {darkMode ? 'Dark Mode' : 'Light Mode'}
      </Label>
    </ToggleContainer>
  );
};

export default ThemeToggle;