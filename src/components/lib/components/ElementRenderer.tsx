import React from 'react';
import type { AppElement } from '@/types/element.types';
import { useAppSelector, useAppDispatch } from '@/hooks/storeHooks';
import { setSelectedElement } from '@/store/features/UISlice';
import { isNestingLimitReached } from '@/utils/elementUtils';
import Section from '@/components/lib/components/Section';
import Button from '@/components/lib/components/Button';

export interface ElementRendererProps {
  data: AppElement;
  currentLevel?: number;
  maxLevel?: number;
}

const ElementRenderer = React.memo(({ data, currentLevel = 0, maxLevel = 5 }: ElementRendererProps) => {
  const dispatch = useAppDispatch();
  const sectionStyles = useAppSelector(state => state.styles.sectionStyles);
  const buttonStyles = useAppSelector(state => state.styles.buttonStyles);
  const selectedElementId = useAppSelector(state => state.ui?.selectedElementId);
  const elements = useAppSelector(state => state.elements);
  
  const handleElementClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(setSelectedElement(data.id));
  };

  const isSelected = selectedElementId === data.id;
  const canHaveChildren = data.type === 'SECTION' && isNestingLimitReached(elements, data.id);
  
  const getElementStyles = () => {
    if (data.type === 'SECTION') {
      return (data.styles as any) || sectionStyles;
    } else if (data.type === 'BUTTON') {
      return (data.styles as any) || buttonStyles;
    }
    return sectionStyles;
  };
  const levelIndicator = currentLevel > 0 ? `Level ${currentLevel}` : '';
  const renderSelectedElem = () => {
    const elementStyles = getElementStyles();
    
    if (!elementStyles) {
      return null;
    }
    
    if (data.type === 'SECTION') {
      return (
        <Section 
          styles={elementStyles}
          onClick={handleElementClick}
          isSelected={isSelected}
          children={data.children}
          currentLevel={currentLevel}
        />
      );
    } else if (data.type === 'BUTTON') {
      return (
        <Button 
          id={data.id} 
          styles={elementStyles}
          onClick={handleElementClick}
          isSelected={isSelected}
        />
      );
    }
    return null;
  };
  const isMaxLevel = currentLevel >= maxLevel;
  return (
    <div 
      style={{
        borderRadius: '4px',
        cursor: 'pointer',
        margin: `${currentLevel * 2}px`, 
        transition: 'border-color 0.2s ease',
        position: 'relative',
        opacity: canHaveChildren ? 1 : 0.8 // Visual feedback
      }}
      onClick={handleElementClick}
    >
      {levelIndicator && (
        <div style={{
          position: 'absolute',
          top: '-10px',
          left: '5px',
          fontSize: '10px',
          background: canHaveChildren ? '#007bff' : '#dc3545',
          color: 'white',
          padding: '1px 4px',
          borderRadius: '2px',
          zIndex: 1000
        }}>
          {levelIndicator} {isMaxLevel && '(MAX)'}
        </div>
      )}
      {renderSelectedElem()}
    </div>
  );
});

export default ElementRenderer;
