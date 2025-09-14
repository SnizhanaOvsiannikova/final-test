import styled from 'styled-components';

export const LevelIndicatorWrap = styled.div<{ $currentLevel: number; $canHaveChildren: boolean }>`
  border-radius: 4px;
  cursor: pointer;
  margin: ${({ $currentLevel }) => `${$currentLevel * 2}px`}; 
  transition: border-color 0.2s ease;
  position: relative;
  opacity: ${({ $canHaveChildren }) => $canHaveChildren ? 1 : 0.8 } // Visual feedback
`;

export const LevelIndicator = styled.div<{ $canHaveChildren: boolean }>`
  position: absolute;
  top: -10px;
  left: 5px;
  font-size: 10px;
  background: ${({ $canHaveChildren }) => $canHaveChildren ? '#007bff' : '#dc3545'};
  color: white;
  padding: 1px 4px;
  border-radius: 2px;
  z-index: 1000;
`;
