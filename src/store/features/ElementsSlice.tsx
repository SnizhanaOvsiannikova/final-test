import type { Styles } from "@/types/styles.types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppElement, ElementsState } from "@/types/element.types";

const elementsSlice = createSlice({
  name: 'elements',
  initialState: {} as ElementsState,
  reducers: {
    addElement: (state, action: PayloadAction<AppElement>) => {
      const { payload } = action;
      
      return {
        ...state,
        [payload.id]: payload
      }
    }, 
    
    updateElementStyles: (state, action: PayloadAction<{ 
      elementId: string; 
      styleChanges: Partial<Styles> 
    }>) => {
      const { elementId, styleChanges } = action.payload;
      
      const findAndUpdate = (items: ElementsState): boolean => {
        for (const element of Object.values(items)) {
          if (element.id === elementId) {
            const safeChanges = styleChanges as Record<string, any>;
            
            for (const key in safeChanges) {
              if (safeChanges[key] !== undefined) {
                (element.styles as any)[key] = safeChanges[key];
              }
            }
            
            element.hasCustomStyles = true;
            return true;
          }
          
          if (element.children) {
            if (findAndUpdate(element.children)) {
              return true;
            }
          }
        }
        return false;
      };
      
      findAndUpdate(state);
    },

    addChildToElement: (state, action: PayloadAction<{ parentId: string; child: AppElement }>) => {
      const { parentId, child } = action.payload;
      
      const findAndAddChild = (items: ElementsState): boolean => {
        for (const id in items) {
          const element = items[id];

          if (element.id === parentId) {
            if (!element.children) {
              element.children = {};
            }

            element.children[child.id] = child;
            return true;
          }
          
          if (element.children) {
            if (findAndAddChild(element.children)) {
              return true;
            }
          }
        }

        return false;
      };
      
      findAndAddChild(state);
    },
    clearState: () => {
      return {};
    }
  }
});

export const {
  addElement, 
  updateElementStyles,
  addChildToElement, 
  clearState
} = elementsSlice.actions;

export const ElementsReducer = elementsSlice.reducer;
