import type { AppElement, ElementsState, ElementType } from '@/types/element.types';
import type { StylesState } from '@/types/styles.types';

export const MAX_NESTED_COUNT = 5

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
};

const countElementsByType = (elements: ElementsState, type: ElementType): number => {
  let count = 0;
  
  const countInLevel = (items: ElementsState) => {
    for (const element of Object.values(items)) {
      if (element.type === type) {
        count++;
      }
      if (element.children) {
        countInLevel(element.children);
      }
    }
  };
  
  countInLevel(elements);
  return count;
};

export const createNewElement = (
  type: ElementType, 
  existingElements: ElementsState , 
  stylesState: StylesState,
  isRoot?: boolean,
): AppElement => {
  const defaultStyles = type === 'SECTION' 
    ? stylesState.sectionStyles 
    : stylesState.buttonStyles;

  const typeCount = countElementsByType(existingElements, type);
  const elementName = type === 'SECTION' ? 'SECTION' : 'BUTTON';
  const elementTitle = `${elementName}${typeCount + 1}`;

  return {
    id: generateId(),
    type,
    title: elementTitle,
    children: type === 'SECTION' ? {} : undefined,
    styles: { ...defaultStyles },
    hasCustomStyles: false,
    isRoot
  };
};

export const addChildToElement = (
  elements: ElementsState, 
  parentId: string, 
  childType: ElementType,
  stylesState: StylesState,
  maxLevel: number = 4
): ElementsState => {
  const updateElements = (items: ElementsState, currentLevel = 0): ElementsState => {
    const result: ElementsState = {};
    
    for (const [key, item] of Object.entries(items)) {
      if (item.id === parentId) {
        if (currentLevel >= maxLevel) {
          console.warn(`Maximum nesting level (${maxLevel}) reached`);
          result[key] = item;
          continue;
        }
        
        const allTypeCount = countElementsByType(elements, childType);
        const childName = childType === 'SECTION' ? 'SECTION' : 'BUTTON';
        const childTitle = `${childName}${allTypeCount + 1}`;
        
        const newChild: AppElement = {
          id: generateId(),
          type: childType,
          title: childTitle,
          children: childType === 'SECTION' ? {} : undefined,
          styles: { ...(childType === 'SECTION' ? stylesState.sectionStyles : stylesState.buttonStyles) }
        };
        
        result[key] = {
          ...item,
          children: {
            ...(item.children || {}),
            [newChild.id]: newChild
          }
        };
      } else {
        if (item.children) {
          result[key] = {
            ...item,
            children: updateElements(item.children, currentLevel + 1)
          };
        } else {
          result[key] = item;
        }
      }
    }
    
    return result;
  };
  
  return updateElements(elements);
};

export const findElementById = (elements: ElementsState, id: string): AppElement | null => {
  if (elements[id]) {
    return elements[id];
  }
  
  for (const element of Object.values(elements)) {
    if (element.children) {
      const found = findElementById(element.children, id);
      if (found) return found;
    }
  }
  
  return null;
};

export const getElementDepth = (elements: ElementsState, targetId: string): number => {
  
  const element = findElementById(elements, targetId);
  
  if (!element) return -1;

  const findDepth = (items: ElementsState, currentDepth: number = 0): number => {
    for (const item of Object.values(items)) {
      if (item.id === targetId) {
        return currentDepth;
      }
      
      if (item.children) {
        const childDepth = findDepth(item.children, currentDepth + 1);
        if (childDepth !== -1) return childDepth;
      }
    }
    return -1;
  };
  
  return findDepth(elements);
};

export const isNestingLimitReached = (elementsState: ElementsState, parentId: string): boolean => {
  const element = findElementById(elementsState, parentId);
  
  if (Object.keys(element?.children || {}).length >= MAX_NESTED_COUNT) return true;
  return false;
};

export const isRootExists = (elementState: ElementsState) => {
  return !!Object.values(elementState).find((elem) => elem.isRoot);
}
