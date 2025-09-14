
export type ElementType = 'SECTION' | 'BUTTON';
import type { Styles }from '@/types/styles.types';

export interface AppElement {
  id: string;
  type: ElementType;
  title: string;
  styles?: Styles;
  children?: Record<string, AppElement> | null;
  isExpanded?: boolean;
  text?: string;
  hasCustomStyles?: boolean;
};
  
export interface ElementProps {
  element: AppElement;
  level?: number;
  maxLevel?: number;
  onToggleExpansion: (elementId: string) => void;
  onAddChild: (parentId: string, type: ElementType) => void;
};
  
export interface ElementListProps {
  elements: Record<string, AppElement>
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