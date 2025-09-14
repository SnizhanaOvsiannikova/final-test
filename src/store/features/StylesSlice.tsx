import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { 
  Styles,
  ButtonStyles,
  Spacing,
  StylesState
} from '@/types/styles.types';

const createSpacing = (value: string): Spacing => ({
  top: value,
  right: value,
  bottom: value,
  left: value
});

const SectionInitialState: Styles = {
  width: '500px',
  height: '300px',
  display: 'block',
  position: 'relative',
  color: '#333333',
  backgroundColor: '#ffffff',
  padding: createSpacing('20px'),
  margin: createSpacing('20px')
};

const ButtonInitialState: ButtonStyles = {
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

const initialState: StylesState = {
  sectionStyles: SectionInitialState,
  buttonStyles: ButtonInitialState
};

const stylesSlice = createSlice({
  name: 'styles',
  initialState,
  reducers: {
    updatePropertyForType: (state, action: PayloadAction<{ 
      elementType: 'SECTION' | 'BUTTON';
      property: string; 
      value: any 
    }>) => {
      const { elementType, property, value } = action.payload;
      console.log("fjhfhfhfhfhfhfhhf")
      if (elementType === 'SECTION') {
        (state.sectionStyles as any)[property] = value;
      } else if (elementType === 'BUTTON') {
        (state.buttonStyles as any)[property] = value;
      }
    },

    updateSpacingForType: (state, action: PayloadAction<{
      elementType: 'SECTION' | 'BUTTON';
      property: 'padding' | 'margin';
      side: string;
      value: string;
    }>) => {
      const { elementType, property, side, value } = action.payload;
      const lowercaseSide = side.toLowerCase() as keyof Spacing;
      
      if (elementType === 'SECTION') {
        state.sectionStyles[property][lowercaseSide] = value;
      } else if (elementType === 'BUTTON') {
        state.buttonStyles[property][lowercaseSide] = value;
      }
    },

    updateAllSpacingForType: (state, action: PayloadAction<{
      elementType: 'SECTION' | 'BUTTON';
      property: 'padding' | 'margin';
      value: string;
    }>) => {
      const { elementType, property, value } = action.payload;
      
      if (elementType === 'SECTION') {
        state.sectionStyles[property] = createSpacing(value);
      } else if (elementType === 'BUTTON') {
        state.buttonStyles[property] = createSpacing(value);
      }
    },

    resetStyles: () => {
      return initialState;
    }
  }
});

export const {
  updatePropertyForType,
  updateSpacingForType,
  updateAllSpacingForType,
  resetStyles
} = stylesSlice.actions;

export const StylesReducer = stylesSlice.reducer;

