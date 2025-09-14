import type { AppElement, ElementType } from '@/types/element.types';
import type { StylesState } from '@/types/styles.types';

export const MAX_NESTED_COUNT = 5

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
};

const countElementsByType = (elements: Record<string, AppElement>, type: ElementType): number => {
  let count = 0;
  
  const countInLevel = (items: Record<string, AppElement>) => {
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
  existingElements: Record<string, AppElement>, 
  stylesState: StylesState
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
    isExpanded: false,
    styles: { ...defaultStyles },
    hasCustomStyles: false 
  };
};

export const addChildToElement = (
  elements: Record<string, AppElement>, 
  parentId: string, 
  childType: ElementType,
  stylesState: StylesState,
  maxLevel: number = 4
): Record<string, AppElement> => {
  const updateElements = (items: Record<string, AppElement>, currentLevel = 0): Record<string, AppElement> => {
    const result: Record<string, AppElement> = {};
    
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
          isExpanded: false,
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

export const toggleElementExpansion = (
  elements: Record<string, AppElement>, 
  elementId: string
): Record<string, AppElement> => {
  const updateElements = (items: Record<string, AppElement>): Record<string, AppElement> => {
    const result: Record<string, AppElement> = {};
    
    for (const [key, item] of Object.entries(items)) {
      if (item.id === elementId) {
        result[key] = { ...item, isExpanded: !item.isExpanded };
      } else {
        if (item.children) {
          result[key] = {
            ...item,
            children: updateElements(item.children)
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

export const getElementCountByType = (elements: Record<string, AppElement>, type: ElementType): number => {
  return countElementsByType(elements, type);
};

export const findElementById = (elements: Record<string, AppElement>, id: string): AppElement | null => {
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

export const getElementDepth = (elements: Record<string, AppElement>, targetId: string): number => {
  
  const element = findElementById(elements, targetId);
  
  if (!element) return -1;

  const findDepth = (items: Record<string, AppElement>, currentDepth: number = 0): number => {
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

export const isNestingLimitReached = (elementsState: Record<string, AppElement>, parentId: string): boolean => {
  const element = findElementById(elementsState, parentId);
  
  if (Object.keys(element?.children || {}).length >= MAX_NESTED_COUNT) return true;
  return false;
};
