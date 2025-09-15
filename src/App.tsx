import { useEffect, useRef } from 'react';
import { AppContainer } from '@/styles/app.styles';
import { useAppSelector, useAppDispatch } from '@/hooks/storeHooks';
import { createNewElement, isRootExists } from '@/utils/elementUtils';
import { addElement } from '@/store/features/ElementsSlice';
import { setSelectedElement } from '@/store/features/UISlice';
import Sidebar from '@/components/Sidebar';
import RootSection from '@/components/RootSection';

const App = () => {
  const hasInitialized = useRef(false);
  const dispatch = useAppDispatch();
  const elementsState = useAppSelector(state => state.elementsState);
  const styles = useAppSelector(state => state.styles);

  useEffect(()=> {
    if (hasInitialized.current) return;

    const { _persist, ...cleanElements } = elementsState;

    if (!isRootExists(cleanElements)) {
      const newElement = createNewElement('SECTION', cleanElements, styles, true);
      dispatch(addElement(newElement));
      dispatch(setSelectedElement(newElement.id));
      hasInitialized.current = true;
    }
  }, [elementsState]);

  return (
    <AppContainer>
      <Sidebar />
      <RootSection />
    </AppContainer>
  )
};

export default App;

