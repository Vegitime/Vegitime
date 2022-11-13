import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const App = () => <></>;

const rootNode = document.getElementById('root');

if (!rootNode) throw new Error('루트 엘리먼트가 존재하지 않습니다.');

createRoot(rootNode).render(
  <StrictMode>
    <App />
  </StrictMode>
);
