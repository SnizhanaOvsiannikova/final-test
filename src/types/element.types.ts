
export type ElementType = 'SECTION' | 'BUTTON';
import type { Styles }from '@/types/styles.types';

export type ElementsState = Record<string, AppElement>;

export interface AppElement {
  id: string;
  type: ElementType;
  title: string;
  styles?: Styles;
  children?: ElementsState | null;
  text?: string;
  hasCustomStyles?: boolean;
  isRoot?: boolean;
};
  
export interface ElementProps {
  element: AppElement;
  level?: number;
  maxLevel?: number;
  onToggleExpansion: (elementId: string) => void;
  onAddChild: (parentId: string, type: ElementType) => void;
};
  
export interface ElementListProps {
  elements: ElementsState
  maxLevel?: number;
  onToggleExpansion: (elementId: string) => void;
  onAddChild: (parentId: string, type: ElementType) => void;
};

export interface DropdownOption {
  id: string;
  value: string;
  disabled?: boolean;
};

export type ElementUpdateFunction = (items: AppElement, currentLevel?: number) => AppElement;
