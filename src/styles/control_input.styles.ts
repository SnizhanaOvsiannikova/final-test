import styled from 'styled-components';

export const ControlGroup = styled.div`
  margin-bottom: 20px;
`;

const inputBaseStyles = `
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  transition: all 0.2s ease;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.6);
    background: rgba(255, 255, 255, 0.15);
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 14px;
`;

export const ColorInput = styled.input`
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: transparent;
`;

export const RangeInput = styled.input`
  width: 100%;
  margin-top: 8px;
`;

export const InputGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 8px;
`;

export const QuickInput = styled.input`
  padding: 6px 8px;
  font-size: 10px;
  text-align: center;
  ${inputBaseStyles}
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  ${inputBaseStyles}
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
  ${inputBaseStyles}
  
  option {
    background: #333;
    color: white;
  }
`;

