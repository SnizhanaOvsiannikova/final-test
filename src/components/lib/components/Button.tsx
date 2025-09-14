import { StyledButton } from '@/styles/button.styles';
import type { ButtonStyles }from '@/types/styles.types';

interface ButtonProps {
  id: string;
  styles: ButtonStyles;
  onClick?: (event: React.MouseEvent) => void;
  isSelected?: boolean;
}

const Button = ({ id, styles, onClick, isSelected }: ButtonProps) => {
  return (
    <StyledButton 
      id={id}
      $styles={styles}
      $isSelected={isSelected || false}
      onClick={onClick}
    >
      {styles.text}
    </StyledButton>
  );
};

export default Button;

