import styled from 'styled-components';
import AlarmList from './components/AlarmList';
import { Header, Title, Navigation } from 'components';

const Container = styled.ul`
  position: relative;
  min-height: 100vh;
  padding: 1rem;
`;

export default function AlarmListComponent() {
  return (
    <>
      <Header />
      <Title>Alarm List</Title>
      <Container>
        <li>
          <AlarmList isActive={true} vegetable="eggplant" level={3} />
        </li>
        <li>
          <AlarmList isActive={true} vegetable="carrot" level={2} />
        </li>
        <li>
          <AlarmList isActive={true} />
        </li>
        <li>
          <AlarmList isActive={false} disabled={true} />
        </li>
      </Container>
      <Navigation />
    </>
  );
}
