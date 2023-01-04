import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import { createGlobalStyle } from 'styled-components';
// import { BrowserRouter } from 'react-router-dom';
import {
  StartPage,
  SignIn,
  SignUp,
  MyFarm,
  Market,
  MyPage,
  SettingAlarm,
  AlarmList,
  VegiPage,
} from 'pages';
import { GlobalStyle } from 'styles';

const router = createBrowserRouter([
  {
    path: '/',
    element: <StartPage />,
  },
  {
    path: 'signin',
    element: <SignIn />,
  },
  {
    path: 'signup',
    element: <SignUp />,
  },
  {
    path: 'myfarm',
    element: <MyFarm />,
  },
  {
    path: 'market',
    element: <Market />,
  },
  {
    path: 'mypage',
    element: <MyPage />,
  },
  {
    path: 'setting_alarm',
    element: <SettingAlarm />,
  },
  {
    path: 'alarmlist',
    element: <AlarmList />,
  },
  {
    path: 'vegipage',
    element: <VegiPage />,
  },
]);

const rootNode = document.getElementById('root');
if (!rootNode) throw new Error('루트 엘리먼트가 존재하지 않습니다.');

ReactDOM.createRoot(rootNode).render(
  <React.StrictMode>
    <GlobalStyle />
    <RouterProvider router={router} />
  </React.StrictMode>
);

// const App = () => <MyPage />;

// createRoot(rootNode).render(
//   <StrictMode>
//     <BrowserRouter>
//       <GlobalStyle />
//       <App />
//     </BrowserRouter>
//   </StrictMode>
// );
