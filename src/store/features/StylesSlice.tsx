import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { 
  Spacing,
  StylesState
} from '@/types/styles.types';
import { createSpacing, INITIAL_STYLES } from '@/utils/constants';

const initialState: StylesState = INITIAL_STYLES;

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

