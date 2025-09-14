import { Button } from '@/styles/operation_btn.styles';

interface OperationButtonProps {
  onClick?: (event: React.MouseEvent) => void;
  buttonText: string
};

const OperationButton = ({ onClick, buttonText }: OperationButtonProps) => {
  return (
    <Button onClick={onClick}>{buttonText}</Button>
  )
};

export default OperationButton;

