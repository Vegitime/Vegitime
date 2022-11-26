import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { SettingAlarm } from 'pages';
import { GlobalStyle } from 'styles';

const App = () => <SettingAlarm />;

const rootNode = document.getElementById('root');

if (!rootNode) throw new Error('루트 엘리먼트가 존재하지 않습니다.');

createRoot(rootNode).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalStyle />
      <App />
    </BrowserRouter>
  </StrictMode>
);
