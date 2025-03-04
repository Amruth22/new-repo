import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { ChromePicker } from 'react-color';
import { ThemeContext } from '../contexts/ThemeContext';

const CustomizerContainer = styled.div`
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

const ColorOptionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 15px;
`;

const ColorOption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ColorSwatch = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.color};
  border: 2px solid ${props => props.selected ? props.theme.primary : 'transparent'};
  cursor: pointer;
  margin-bottom: 5px;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const ColorLabel = styled.span`
  font-size: 12px;
  color: ${props => props.theme.text};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
  
  &:hover {
    opacity: 0.9;
  }
`;

const ResetButton = styled(Button)`
  background-color: ${props => props.theme.error};
  color: white;
`;

const SaveButton = styled(Button)`
  background-color: ${props => props.theme.primary};
  color: white;
`;

const PickerContainer = styled.div`
  position: absolute;
  z-index: 2;
  margin-top: 10px;
`;

const ThemeCustomizer = () => {
  const { theme, updateThemeColor, resetTheme } = useContext(ThemeContext);
  const [selectedColor, setSelectedColor] = useState(null);
  const [pickerColor, setPickerColor] = useState('#ffffff');
  const [showPicker, setShowPicker] = useState(false);
  
  const colorOptions = [
    { key: 'primary', label: 'Primary' },
    { key: 'secondary', label: 'Secondary' },
    { key: 'background', label: 'Background' },
    { key: 'surface', label: 'Surface' },
    { key: 'text', label: 'Text' },
    { key: 'error', label: 'Error' }
  ];
  
  const handleColorClick = (colorKey) => {
    setSelectedColor(colorKey);
    setPickerColor(theme[colorKey]);
    setShowPicker(true);
  };
  
  const handleColorChange = (color) => {
    setPickerColor(color.hex);
  };
  
  const handleColorChangeComplete = () => {
    if (selectedColor) {
      updateThemeColor(selectedColor, pickerColor);
    }
  };
  
  const handleClickOutside = () => {
    setShowPicker(false);
    handleColorChangeComplete();
  };
  
  return (
    <CustomizerContainer theme={theme}>
      <Title theme={theme}>Customize Theme</Title>
      
      <ColorOptionContainer>
        {colorOptions.map(option => (
          <ColorOption key={option.key}>
            <ColorSwatch 
              color={theme[option.key]}
              selected={selectedColor === option.key}
              theme={theme}
              onClick={() => handleColorClick(option.key)}
              aria-label={`Select ${option.label} color`}
            />
            <ColorLabel theme={theme}>{option.label}</ColorLabel>
          </ColorOption>
        ))}
      </ColorOptionContainer>
      
      {showPicker && (
        <PickerContainer>
          <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0 }} onClick={handleClickOutside} />
          <ChromePicker 
            color={pickerColor}
            onChange={handleColorChange}
            onChangeComplete={handleColorChangeComplete}
          />
        </PickerContainer>
      )}
      
      <ButtonContainer>
        <ResetButton 
          theme={theme} 
          onClick={resetTheme}
          aria-label="Reset theme to default"
        >
          Reset to Default
        </ResetButton>
      </ButtonContainer>
    </CustomizerContainer>
  );
};

export default ThemeCustomizer;