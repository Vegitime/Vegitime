import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  StartPage,
  SignIn,
  SignUp,
  Market,
  MyPage,
  SettingAlarm,
  AlarmList,
  VegiPage,
} from 'pages';
import { ScrollToTop } from 'components';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ScrollToTop />,
    children: [
      {
        path: '',
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
        path: 'market',
        element: <Market />,
      },
      {
        path: 'mypage',
        element: <MyPage />,
      },
      {
        path: 'settingalarm',
        element: <SettingAlarm />,
      },
      {
        path: 'alarmlist',
        element: <AlarmList />,
      },
      {
        path: 'myvegi',
        element: <VegiPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
