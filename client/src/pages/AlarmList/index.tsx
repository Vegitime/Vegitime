import styled from 'styled-components';
import AlarmList from './components/AlarmList';
import { Navigation } from '../MyFarm/components';
import { Header, Title } from 'components';

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  padding: 2rem 1rem 1rem;
  background: #eaf5f7;
`;

export default function AlarmListComponent() {
  return (
    <Container>
      <Header />
      <Title>Alarm List</Title>
      <AlarmList />
      <AlarmList />
      <AlarmList />
      <AlarmList />
      <Navigation />
    </Container>
  );
}
