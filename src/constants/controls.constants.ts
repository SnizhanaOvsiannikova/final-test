import type { ControlConfig } from '@/types/styles.types';

export const CONTROL_CONFIGS: ControlConfig[] = [
  {
    property: 'width',
    label: 'Width',
    type: 'range',
    min: 50,
    max: 1200,
    step: 1,
    placeholder: 'e.g., 300px, 50%, auto'
  },
  {
    property: 'height',
    label: 'Height',
    type: 'range',
    min: 50,
    max: 1200,
    step: 1,
    placeholder: 'e.g., 200px, 100vh, auto'
  },
  {
    property: 'display',
    label: 'Display',
    type: 'select',
    options: ['block', 'inline', 'inline-block', 'flex', 'inline-flex', 'grid', 'none']
  },
  {
    property: 'position',
    label: 'Position',
    type: 'select',
    options: ['static', 'relative', 'absolute', 'fixed', 'sticky']
  },
  {
    property: 'color',
    label: 'Text Color',
    type: 'color',
    placeholder: 'e.g., #ff0000, red'
  },
  {
    property: 'backgroundColor',
    label: 'Background Color',
    type: 'color',
    placeholder: 'e.g., #ffffff, transparent'
  },
  {
    property: 'padding',
    label: 'Padding',
    type: 'spacing'
  },
  {
    property: 'margin',
    label: 'Margin',
    type: 'spacing'
  }, 
  {
    property: 'text',
    label: 'Button Text',
    type: 'text'
  }
];

export const DEBOUNCE_DELAY = 300;
export const MAX_HISTORY_SIZE = 50;

