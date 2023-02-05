import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GlobalStyle } from 'styles';
import App from 'App';

const rootNode = document.getElementById('root');
if (!rootNode) throw new Error('루트 엘리먼트가 존재하지 않습니다.');

createRoot(rootNode).render(
  <StrictMode>
    <GlobalStyle />
    <App />
  </StrictMode>
);

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker
//       .register('/service-worker.js')
//       .then((registration) => {
//         console.log('SW registered: ', registration);
//       })
//       .catch((registrationError) => {
//         console.log('SW registration failed: ', registrationError);
//       });
//   });
// }
