import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface DropdownState {
  selectedOption: string | null;
}

const initialState: DropdownState = {
  selectedOption: '',
};

const dropdownSlice = createSlice({
  name: 'dropdown',
  initialState,
  reducers: {
    setSelectedOption: (state, action: PayloadAction<string>) => {
      state.selectedOption = action.payload;
    },
    clearSelectedOption: (state) => {
      state.selectedOption = null;
    },
  },
});

export const { setSelectedOption, clearSelectedOption } = dropdownSlice.actions;
export const DropdownsReducer = dropdownSlice.reducer;

