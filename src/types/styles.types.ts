export type BoxSide = 'Top' | 'Right' | 'Bottom' | 'Left';
export type CSSProperty = 'padding' | 'margin';

export interface Spacing {
  top: string;
  right: string;
  bottom: string;
  left: string;
};

export interface Styles {
  width: string;
  height: string;
  display: string;
  position: string;
  color: string;
  backgroundColor: string;
  padding: Spacing;
  margin: Spacing;
  text?: string;
};

export interface ButtonStyles extends Styles {
  text: string;
};

export interface SpacingUpdatePayload {
  property: CSSProperty;
  side: BoxSide;
  value: string;
};

export interface StylesState {
  sectionStyles: Styles;
  buttonStyles: ButtonStyles;
};

export interface StylePreset {
  name: string;
  styles: Partial<Styles>;
};

export interface ControlConfig {
  property: keyof Styles;
  label: string;
  type: 'range' | 'color' | 'select' | 'text' | 'spacing';
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
};

export const DISPLAY_OPTIONS = [
  'block', 'inline', 'inline-block', 'flex', 
  'inline-flex', 'grid', 'none'
] as const;

export const POSITION_OPTIONS = [
  'static', 'relative', 'absolute', 'fixed', 'sticky'
] as const;

export const BOX_SIDES: BoxSide[] = ['Top', 'Right', 'Bottom', 'Left'];

export type DisplayValue = typeof DISPLAY_OPTIONS[number];
export type PositionValue = typeof POSITION_OPTIONS[number];

