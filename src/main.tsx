import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import App from '@/App.tsx';

import '@/index.css';

const Root = () => {
  return (
    <Provider store={store}>
      <StrictMode>
        <App/>
      </StrictMode>
    </Provider>
  );
};

createRoot(document.getElementById('root')!).render(<Root />);

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration: ServiceWorkerRegistration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError: Error) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
};
