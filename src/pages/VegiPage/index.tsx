import styled from 'styled-components';
import { Title, Time, VegiImage, ProgressBar } from './components';
import { Header, Navigation } from '../../pages/MyFarm/components';

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  padding: 2rem 1rem 1rem;
  background: #eaf5f7;
  text-align: center;
`;

export default function VegiPage() {
  return (
    <Container>
      <Header />
      <Title level="Level. 3" name="가지 가지" />
      <ProgressBar text="3 / 5" />
      <VegiImage />
      <Time text="AM 07:00" />
      <Navigation />
    </Container>
  );
}
