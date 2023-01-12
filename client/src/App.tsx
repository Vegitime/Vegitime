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
import Auth from 'hoc/auth';
// Auth(LandingPage, null)
const router = createBrowserRouter([
  {
    path: '/',
    element: <ScrollToTop />,
    children: [
      {
        path: '',
        element: Auth(StartPage, false),
      },
      {
        path: 'signin',
        element: Auth(SignIn, false),
      },
      {
        path: 'signup',
        element: Auth(SignUp, false),
      },
      {
        path: 'market',
        element: Auth(Market, true),
      },
      {
        path: 'mypage',
        element: Auth(MyPage, true),
      },
      {
        path: 'settingalarm/:id',
        element: Auth(SettingAlarm, true),
      },
      {
        path: 'alarmlist',
        element: Auth(AlarmList, true),
      },
      {
        path: 'myvegi/:id',
        element: Auth(VegiPage, true),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
