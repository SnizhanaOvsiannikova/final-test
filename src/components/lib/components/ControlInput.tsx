import React, { useCallback } from 'react';
import {
  ControlGroup,
  Label,
  ColorInput,
  RangeInput,
  Select,
  InputGroup,
  QuickInput
} from '@/styles/control_input.styles';
import { useAppDispatch } from '@/hooks/storeHooks';
import { updatePropertyForType, updateSpacingForType } from '@/store/features/StylesSlice';
import { updateElementStyles } from '@/store/features/ElementsSlice';
import type { ControlConfig, BoxSide } from '@/types/styles.types';

interface ControlInputProps {
  config: ControlConfig;
  value: any;
  selectedElementId?: string | null;
  elementType: 'SECTION' | 'BUTTON';
};

const ControlInput = React.memo(({ config, value, selectedElementId, elementType }: ControlInputProps) => {
  const dispatch = useAppDispatch();

  const handleChange = (newValue: any) => {
    dispatch(updatePropertyForType({
      elementType,
      property: config.property,
      value: newValue
    }));
    
    if (selectedElementId) {
      dispatch(updateElementStyles({
        elementId: selectedElementId,
        styleChanges: {
          [config.property]: newValue
        }
      }));
    }
  };
  
  const handleSpacingUpdate = useCallback((side: BoxSide, newValue: string) => {
    if (newValue.trim()) {
      dispatch(updateSpacingForType({
        elementType,
        property: config.property as 'padding' | 'margin',
        side,
        value: newValue
      }));
      
      if (selectedElementId) {
        dispatch(updateElementStyles({
          elementId: selectedElementId,
          styleChanges: {
            [config.property]: {
              ...value,
              [side.toLowerCase()]: newValue
            }
          }
        }));
      }
    }
  }, [dispatch, config.property, elementType, selectedElementId, value]);

  const parsePixelValue = useCallback((val: string): number => {
    return parseInt(val.replace(/px$/, '')) || 0;
  }, []);

  const normalizeColor = useCallback((color: string): string => {
    if (!color) return '#000000';
    if (color.length === 4) {
      return '#' + color.slice(1).split('').map(char => char + char).join('');
    }
    if (color.length === 7) {
      return color;
    }
    return '#000000';
  }, []);

  const baseId = `${elementType}-${config.property}`;

  const getDisplayValue = () => {
    if (config.type === 'range') {
      const pixelValue = parsePixelValue(value as string);
      return `: ${pixelValue}px`;
    }
    if (config.type === 'select') {
      return `: ${value}`;
    }
    return '';
  };

  const renderInput = () => {
    switch (config.type) {
      case 'range':
        const pixelValue = parsePixelValue(value as string);
        const rangeId = `${baseId}-range`;
        const textId = `${baseId}-text`;
        
        return (
          <>
            <Label htmlFor={rangeId}>{config.label}{getDisplayValue()}</Label>
            <RangeInput
              id={rangeId}
              name={rangeId}
              type='range'
              min={config.min}
              max={config.max}
              step={config.step}
              value={pixelValue}
              onChange={(e) => handleChange(`${e.target.value}px`)}
            />
            <QuickInput
              id={textId}
              name={textId}
              type='text'
              placeholder={config.placeholder}
              onBlur={(e) => e.target.value && handleChange(e.target.value)}
            />
          </>
        );

      case 'color':
        const colorId = `${baseId}-color`;
        const colorTextId = `${baseId}-color-text`;
        
        return (
          <>
            <Label htmlFor={colorId}>{config.label}{getDisplayValue()}</Label>
            <ColorInput
              id={colorId}
              name={colorId}
              type='color'
              value={normalizeColor(value as string)}
              onChange={(e) => handleChange(e.target.value)}
            />
            <QuickInput
              id={colorTextId}
              name={colorTextId}
              type='text'
              placeholder={config.placeholder}
              onBlur={(e) => e.target.value && handleChange(e.target.value)}
            />
          </>
        );

      case 'select':
        const selectId = `${baseId}-select`;
        
        return (
          <>
            <Label htmlFor={selectId}>{config.label}{getDisplayValue()}</Label>
            <Select 
              id={selectId}
              name={selectId}
              value={value as string} 
              onChange={(e) => handleChange(e.target.value)}
            >
              {config.options?.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </>
        );

      case 'spacing':
        const spacing = value as any;
        const topId = `${baseId}-spacing-top`;
        const rightId = `${baseId}-spacing-right`;
        const bottomId = `${baseId}-spacing-bottom`;
        const leftId = `${baseId}-spacing-left`;
        
        return (
          <>
            <Label>{config.label}{getDisplayValue()}</Label>
            <InputGroup>
              <Label htmlFor={topId}>Top</Label>
              <QuickInput
                id={topId}
                name={topId}
                type='text'
                defaultValue={spacing?.top}
                onBlur={(e) => handleSpacingUpdate('Top', e.target.value)}
              />
              <Label htmlFor={rightId}>Right</Label>
              <QuickInput
                id={rightId}
                name={rightId}
                type='text'
                defaultValue={spacing?.right}
                onBlur={(e) => handleSpacingUpdate('Right', e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <Label htmlFor={bottomId}>Bottom</Label>
              <QuickInput
                id={bottomId}
                name={bottomId}
                type='text'
                defaultValue={spacing?.bottom}
                onBlur={(e) => handleSpacingUpdate('Bottom', e.target.value)}
              />
              <Label htmlFor={leftId}>Left</Label>
              <QuickInput
                id={leftId}
                name={leftId}
                type='text'
                defaultValue={spacing?.left}
                onBlur={(e) => handleSpacingUpdate('Left', e.target.value)}
              />
            </InputGroup>
          </>
        );

      case 'text':
      default:
        const textFieldId = `${baseId}-text`;
        
        return (
          <>
            <Label htmlFor={textFieldId}>{config.label}{getDisplayValue()}</Label>
            <QuickInput
              id={textFieldId}
              name={textFieldId}
              type='text'
              placeholder={config.placeholder}
              defaultValue={value as string}
              onBlur={(e) => e.target.value && handleChange(e.target.value)}
            />
          </>
        );
    }
  };

  return (
    <ControlGroup>
      {renderInput()}
    </ControlGroup>
  );
});

ControlInput.displayName = 'ControlInput';

export default ControlInput;

