import styled from 'styled-components';
import AlarmList from './components/AlarmList';
import { Navigation, Title } from '../MyFarm/components';
import { Header } from 'components';

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
      <Title text="Alarm List" />
      <AlarmList />
      <AlarmList />
      <AlarmList />
      <AlarmList />
      <Navigation />
    </Container>
  );
}
