import styled from 'styled-components';
import { LinkVegi } from './components';
import { Header, Title, Navigation } from 'components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getAlarmFormat } from 'utils';

interface Alarm {
  ampm: 'AM' | 'PM' | '';
  hour: number;
  minute: number;
}

interface Vegis {
  id: number;
  type: 'avocado' | 'carrot' | 'eggplant' | 'onion' | 'radish' | 'tomato';
  name: string;
  level: number;
  alarm: Alarm;
  attendance: Array<boolean>;
}

const Container = styled.ul`
  position: relative;
  min-height: 100vh;
  padding: 1rem;
`;

export default function AlarmList() {
  const [vegis, setVegis] = useState([]);
  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const res = await axios.get(`${process.env.URL}api/users/info`, {
          withCredentials: true,
        });
        const { vegis } = res.data.body.data;
        setVegis(vegis);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUserInfo();
  }, []);
  return (
    <>
      <Header />
      <Title>Alarm List</Title>
      <Container>
        {vegis.map(({ id, type, alarm: _alarm, level }: Vegis) => {
          const { ampm, hour, minute } = _alarm;
          const alarm =
            ampm === '' && hour === 0 && minute === 0
              ? ''
              : getAlarmFormat({ hour, minute, ampm });
          return (
            <li key={id}>
              <LinkVegi
                isActive={level !== 5 && alarm === '' ? false : true}
                alarm={alarm}
                type={type}
                level={level}
                disabled={level !== 5 && alarm === '' ? true : false}
                id={id}
              />
            </li>
          );
        })}
      </Container>
      <Navigation />
    </>
  );
}
