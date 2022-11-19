import AlarmList from './components/AlarmList';
import { Header, Navigation, Title } from '../MyFarm/components';

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
