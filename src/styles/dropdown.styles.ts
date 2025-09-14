import styled from 'styled-components';

interface DropdownStyleProps {
  readonly $isOpen: boolean;
};

export const DropdownContainer = styled.div`
  width: 200px;
  position: relative;
  margin: 20px 0;
`;

export const DropdownHeader = styled.div`
  padding: 12px 15px;
  border: 2px solid #ffffff;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: box-shadow 0.2s ease;
  background-color: #000;

  &:hover {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }
`;

export const DropdownListContainer = styled.div<DropdownStyleProps>`
  position: absolute;
  width: 100%; 
  width: -webkit-fill-available;
  width: -moz-available;
  width: stretch;
  border: ${props => (props.$isOpen ? '2px solid #ffffff' : 'none')};
  border-radius: 5px;
  z-index: 100;
  max-height: ${props => (props.$isOpen ? '200px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  box-shadow: ${props => props.$isOpen ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none'};
`;

export const DropdownList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #000;
`;

export const ListItem = styled.li`
  padding: 12px 15px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(240, 240, 240, 0.5);
  }
`;

export const ArrowIcon = styled.span<DropdownStyleProps>`
  display: flex;  
  font-size: 20px;
  transition: transform 0.2s ease;
  transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

