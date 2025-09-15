import type { ButtonStyles, Spacing, Styles } from "@/types/styles.types";

export const createSpacing = (value: string): Spacing => ({
  top: value,
  right: value,
  bottom: value,
  left: value
});

export const SECTION_INITIAL_STATE: Styles = {
  width: '500px',
  height: '300px',
  display: 'block',
  position: 'relative',
  color: '#333333',
  backgroundColor: '#ffffff',
  padding: createSpacing('20px'),
  margin: createSpacing('20px')
};
  
export const BUTTON_INITIAL_STATE: ButtonStyles = {
  width: '150px',
  height: '50px',
  display: 'block',
  position: 'relative',
  color: '#333333',
  backgroundColor: '#ffffff',
  padding: createSpacing('4px'),
  margin: createSpacing('4px'),
  text: 'Button Text'
};

export const INITIAL_STYLES = {
  sectionStyles: SECTION_INITIAL_STATE,
  buttonStyles: BUTTON_INITIAL_STATE
};
