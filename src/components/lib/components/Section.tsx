import {
  StyledSection,
} from '@/styles/section.styles';
import type { Styles }from '@/types/styles.types';
import type { AppElement } from '@/types/element.types';
import ElementRenderer from '@/components/lib/components/ElementRenderer';

interface SectionProps {
  styles: Styles;
  onClick?: (event: React.MouseEvent) => void;
  isSelected?: boolean;
  children?: Record<string, AppElement> | null;
  currentLevel?: number;
};

const Section = ({ styles, onClick, isSelected, children, currentLevel = 0 }: SectionProps) => {
  return (
    <StyledSection 
      $styles={styles}
      $isSelected={isSelected || false}
      onClick={onClick}
    >
      {children && Object.values(children).map(child => {
        return (
          <ElementRenderer 
            key={child.id}
            data={child}
            currentLevel={currentLevel + 1}
            maxLevel={5}
          />
        )
      })}
    </StyledSection>
  );
};

export default Section;




