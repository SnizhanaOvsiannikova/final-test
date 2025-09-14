import styled from 'styled-components';
import type { ButtonStyles } from '@/types/styles.types';

const spacingToCSS = (spacing: ButtonStyles['padding'] | ButtonStyles['margin']) => 
  `${spacing.top} ${spacing.right} ${spacing.bottom} ${spacing.left}`;

export const StyledButton = styled.button<{ $styles: ButtonStyles; $isSelected: boolean }>`
  width: ${({ $styles }) => $styles.width};
  height: ${({ $styles }) => $styles.height};
  display: ${({ $styles }) => $styles.display};
  position: ${({ $styles }) => $styles.position};
  color: ${({ $styles }) => $styles.color};
  background-color: ${({ $styles }) => $styles.backgroundColor};
  padding: ${({ $styles }) => spacingToCSS($styles.padding)};
  margin: ${({ $styles }) => spacingToCSS($styles.margin)};
  border: 2px solid #ddd;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  
  /* Outline for selected state */
  outline: ${({ $isSelected }) => $isSelected ? '2px solid #764ba2' : 'none'};

  /* Ensure proper box model */
  box-sizing: border-box;
  
  /* Handle different display types */
  ${({ $styles }) => $styles.display === 'flex' && `
    align-items: center;
    justify-content: center;
  `}
  
  ${({ $styles }) => $styles.display === 'grid' && `
    place-items: center;
  `}
`;

