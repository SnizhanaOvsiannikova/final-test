import '@/index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store/store';
import LoadingScreen from '@/components/lib/components/LoadingScreen';
import App from '@/App.tsx';

const Root = () => {
  return (
    <Provider store={store}>
      <PersistGate 
        loading={<LoadingScreen />} 
        persistor={persistor}
      >
        <StrictMode>
          <App />
        </StrictMode>
      </PersistGate>
    </Provider>
  );
};

createRoot(document.getElementById('root')!).render(<Root />);
