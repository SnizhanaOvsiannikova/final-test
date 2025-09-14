import { useState, useEffect, useRef } from 'react';
import {
  DropdownContainer,
  DropdownHeader,
  ArrowIcon,
  DropdownListContainer,
  DropdownList,
  ListItem
} from '@/styles/dropdown.styles';
import { RiArrowDropDownLine } from "react-icons/ri";

interface Option {
  id: string;
  value: string;
}

interface DropdownProps {
  readonly options: Option[];
  readonly placeholder?: string;
  readonly onSelect?: (option: string) => void;
  readonly selectedValue?: string | null;
}

const Dropdown = ({ options, placeholder, onSelect, selectedValue }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (): void => setIsOpen(!isOpen);

  const handleOptionClick = (value: string): void => {
    setIsOpen(false);
    onSelect?.(value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
            
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownHeader onClick={toggleDropdown}>
        <span>{selectedValue || placeholder}</span>
        <ArrowIcon $isOpen={isOpen}>
            <RiArrowDropDownLine />
        </ArrowIcon>
      </DropdownHeader>
      <DropdownListContainer $isOpen={isOpen}>
        <DropdownList>
          {options.map(option => (
            <ListItem
              onClick={() => handleOptionClick(option.value)}
              key={option.id}
              role='option'
              aria-selected={selectedValue === option.value}
            >
              {option.value}
            </ListItem>
          ))}
        </DropdownList>
      </DropdownListContainer>
    </DropdownContainer>
  );
};

export default Dropdown;

