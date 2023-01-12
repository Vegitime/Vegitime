import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Auth(
  SpecificComponent: () => JSX.Element,
  option: boolean
) {
  // null   Anyone Can go inside
  // true   only logged in user can go inside
  // false  logged in user can't go inside
  function AuthenticationCheck() {
    const navigate = useNavigate();
    useEffect(() => {
      axios
        .get(`${process.env.URL}api/users/auth`, { withCredentials: true })
        .then((response) => {
          if (!response.data.isAuth) {
            if (option) {
              navigate('/');
            }
          } else {
            if (option === false) {
              navigate('/alarmlist');
            }
          }
        });
    }, []);

    return <SpecificComponent />;
  }
  return <AuthenticationCheck />;
}
