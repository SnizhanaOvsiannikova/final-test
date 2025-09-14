import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
  
interface UIState {
  selectedElementId: string | null;
}

const initialState: UIState = {
  selectedElementId: null
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSelectedElement: (state, action: PayloadAction<string | null>) => {
      state.selectedElementId = action.payload;
    },
    clearSelectedElement: (state) => {
      state.selectedElementId = null;
    }
  }
});

export const { setSelectedElement, clearSelectedElement } = uiSlice.actions;
export const UIReducer = uiSlice.reducer;

