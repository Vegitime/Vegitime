import styled from 'styled-components';
import AlarmList from './components/AlarmList';
import { Header, Title, Navigation } from 'components';
import users from '../../../../server/mock/users';

interface Users {
  nickname: string;
  money: number;
  vegis: Array<Vegis>;
}

interface Vegis {
  id: number;
  type: 'avocado' | 'carrot' | 'eggplant' | 'onion' | 'radish' | 'tomato';
  name: string;
  level: number;
  alarm: string;
  attendance: Array<boolean>;
}

const Container = styled.ul`
  position: relative;
  min-height: 100vh;
  padding: 1rem;
`;

export default function AlarmListComponent() {
  const [user] = users;
  const { vegis } = user as Users;
  return (
    <>
      <Header />
      <Title>Alarm List</Title>
      <Container>
        {vegis.map(({ id, type, alarm, level }: Vegis) => (
          <li key={id}>
            <AlarmList
              isActive={alarm === '' ? false : true}
              alarm={alarm}
              type={type}
              level={level}
              disabled={alarm === '' ? true : false}
              id={id}
            />
          </li>
        ))}
      </Container>
      <Navigation />
    </>
  );
}
