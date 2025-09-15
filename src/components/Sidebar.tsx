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
import { addElement, addChildToElement, clearState } from '@/store/features/ElementsSlice';
import { setSelectedElement, clearSelectedElement } from '@/store/features/UISlice';
import ControlInput from '@/components/lib/components/ControlInput';
import type { DropdownOption, ElementType } from '@/types/element.types';
import { createNewElement, isNestingLimitReached, findElementById, getElementDepth, MAX_NESTED_COUNT } from '@/utils/elementUtils';
import { CONTROL_CONFIGS } from '@/constants/controls.constants';
import Dropdown from '@/components/Dropdown';
import OperationButton from '@/components/OperationButton';
import { INITIAL_STYLES } from '@/utils/constants';

const options: DropdownOption[] = [
  { id: 'section-1', value: 'SECTION' },
  { id: 'button-1', value: 'BUTTON'}
];
const HIDDEN_FOR_SECTION = new Set(['Text Color', 'Button Text']);

const Sidebar = () => {
  const dispatch = useAppDispatch();

  const { selectedOption } = useAppSelector(state => state.dropdown);
  const elementsState = useAppSelector(state => state.elementsState);
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
        
        if (isNestingLimitReached(elementsState, selectedElementId) || depth >= MAX_NESTED_COUNT) {
          alert('Maximum nesting level reached! Cannot add more than 5 levels.');
          return;
        }
        
        const newChild = createNewElement(option as ElementType, elementsState, INITIAL_STYLES);
        dispatch(addChildToElement({ parentId: selectedElementId, child: newChild }));
      }
    };
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

  const cleanState = () => {
    dispatch(clearSelectedElement());
    dispatch(clearState());
    const newElement = createNewElement('SECTION', elementsState, INITIAL_STYLES, true);
    dispatch(addElement(newElement));
    dispatch(setSelectedElement(newElement.id));
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
          options={selectedElementId ? options : [{ id: 'section-1', value: 'SECTION' }]} 
          placeholder='Add new element...'
          onSelect={handleSelect}
          selectedValue={null}
        />
      </div>
      {selectedElementId ? (
        <>
          <TitleContainer>
            <Title color={`#ffffff`}>
              CSS Properties<span>(Editing selected element)</span>
            </Title>
            <OperationButton 
              onClick={cleanState}
              buttonText='Clear State'
            />
          </TitleContainer>

          {CONTROL_CONFIGS.map((config) => {
            if (currentElementType === 'SECTION' && HIDDEN_FOR_SECTION.has(config.label)) {
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
        </>) : null
      }
    </SidebarContainer>
  );
};

export default Sidebar;

