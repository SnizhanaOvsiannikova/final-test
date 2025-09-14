import {
  SidebarContainer,
  SidebarHeader,
  UserInfo,
  Avatar,
  UserDetails,
  Username, 
  WavingHand,
  TitleContainer
} from '@/styles/sidebar.styles';
import type { Styles }from '@/types/styles.types';
import { Title } from '@/styles/app.styles';
import { useAppSelector, useAppDispatch } from '@/hooks/storeHooks';
import { setSelectedOption } from '@/store/features/DropdownSlice';
import { addChildToElement } from '@/store/features/ElementsSlice';
import Dropdown from '@/components/Dropdown';
import ControlInput from '@/components/lib/components/ControlInput';
import type { DropdownOption, ElementType } from '@/types/element.types';
import { createNewElement, isNestingLimitReached, findElementById, getElementDepth, MAX_NESTED_COUNT } from '@/utils/elementUtils';
import { CONTROL_CONFIGS } from '@/constants/controls.constants';

const options: DropdownOption[] = [
  { id: 'section-1', value: 'SECTION' },
  { id: 'button-1', value: 'BUTTON'}
];
const HIDDEN_FOR_SECTION = new Set(['Text Color', 'Button Text']);

const Sidebar = () => {
  const dispatch = useAppDispatch();

  const { selectedOption } = useAppSelector(state => state.dropdown);
  const elementsState = useAppSelector(state => state.elements);
  const stylesState = useAppSelector(state => state.styles);
  const selectedElementId = useAppSelector(state => state.ui?.selectedElementId);

  const handleSelect = (option: string) => {
    dispatch(setSelectedOption(option));
    
    if (selectedElementId) {
      const selectedElement = findElementById(elementsState, selectedElementId);
      
      if (!selectedElement) {
        console.warn('Selected element not found:', selectedElementId);
        return;
      }
      
      if (selectedElement.type === 'SECTION') {
        const depth = getElementDepth(elementsState, selectedElementId);
        
        if (isNestingLimitReached(elementsState, selectedElementId) && depth >= MAX_NESTED_COUNT) {
          alert('Maximum nesting level reached! Cannot add more than 5 levels.');
          return;
        }
        
        const newChild = createNewElement(option as ElementType, elementsState, stylesState);
        dispatch(addChildToElement({ parentId: selectedElementId, child: newChild }));
      }
    }
  };


  const getCurrentStyles = (): Styles => {
    if (selectedElementId) {
      const selectedElement = findElementById(elementsState, selectedElementId);
      if (selectedElement?.styles) {
        return selectedElement.styles;
      }
    }
    
    const defaultStyles = selectedOption === 'BUTTON' 
      ? stylesState.buttonStyles 
      : stylesState.sectionStyles;
    
    return { ...defaultStyles };
  };
  
  const currentStyles = getCurrentStyles();

  const getCurrentElementType = (): 'SECTION' | 'BUTTON' => {
    if (selectedElementId) {
      const selectedElement = findElementById(elementsState, selectedElementId);
      return selectedElement?.type || selectedOption as 'SECTION' | 'BUTTON';
    }
    return selectedOption as 'SECTION' | 'BUTTON';
  };

  const currentElementType = getCurrentElementType();
  
  const shouldShowButtonFields = (): boolean => {
    return Object.values(elementsState).some(el => el.type === 'BUTTON') || selectedOption === 'BUTTON';
  };

  return (
    <SidebarContainer>
      <SidebarHeader>
        <UserInfo>
          <Avatar>
            <img src='public/images/avatar.png' alt='avatar'/>
          </Avatar>
          <UserDetails>
            <Username>
              Hello Oliver <WavingHand />
            </Username>
          </UserDetails>
        </UserInfo>
      </SidebarHeader>
      <div>
        <Dropdown
          options={options} 
          placeholder='Add new element...'
          onSelect={handleSelect}
          selectedValue={null}
        />
      </div>
      <TitleContainer>
        <Title color={`#ffffff`}>
          CSS Properties
          {selectedElementId && (
            <span style={{ fontSize: '12px', opacity: 0.7, display: 'block' }}>
              (Editing selected element)
            </span>
          )}
        </Title>
      </TitleContainer>

      {CONTROL_CONFIGS.map((config) => {
        if (currentElementType === 'SECTION' && HIDDEN_FOR_SECTION.has(config.label)) {
          return null;
        };

        if (config.label === 'Button Text' && !shouldShowButtonFields()) {
          return null;
        };

        return (
          <ControlInput
            key={config.property}
            config={config}
            value={currentStyles[config.property]}
            elementType={currentElementType}
            selectedElementId={selectedElementId ?? undefined}
          />
        );
      })}
    </SidebarContainer>
  );
};

export default Sidebar;

