import { useEffect } from 'react';
import { AppContainer } from '@/styles/app.styles';
import { useAppSelector, useAppDispatch } from '@/hooks/storeHooks';
import { setSelectedOption } from '@/store/features/DropdownSlice';
import { addElement } from '@/store/features/ElementsSlice';
import { createNewElement } from '@/utils/elementUtils';
import { setSelectedElement } from '@/store/features/UISlice';
import Sidebar from '@/components/Sidebar';
import RootSection from '@/components/RootSection';

const App = () => {
  const dispatch = useAppDispatch();
  const elements = useAppSelector(state => state.elements);
  const styles = useAppSelector(state => state.styles);

  useEffect(()=> {
    dispatch(setSelectedOption('SECTION'));
    const newElement = createNewElement('SECTION', elements, styles)
    dispatch(setSelectedElement(newElement.id));
    dispatch(addElement(newElement));
  }, [dispatch]);

  return (
    <AppContainer>
      <Sidebar />
      <RootSection />
    </AppContainer>
  )
};

export default App;

