import { configureStore } from '@reduxjs/toolkit';
import { DropdownsReducer } from '@/store/features/DropdownSlice';
import { StylesReducer } from '@/store/features/StylesSlice';
import { ElementsReducer } from '@/store/features/ElementsSlice';
import { UIReducer } from '@/store/features/UISlice';

export const store = configureStore({
  reducer: {
    elements: ElementsReducer,
    styles: StylesReducer,
    dropdown: DropdownsReducer,
    ui: UIReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

