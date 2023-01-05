import styled from 'styled-components';
import {
  Title,
  Time,
  VegiImage,
  ProgressBar,
  ActionButton,
} from './components';
import { Header, Navigation } from 'components';

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  padding: 1rem;
  background: var(--color-skyblue);
  text-align: center;
`;

export default function VegiPage() {
  return (
    <>
      <Header />
      <Title name="가지 가지" />
      <Container>
        <ProgressBar text="3 / 5" />
        <VegiImage />
        <Time text="AM 07:00" />
        <ActionButton action="voice" />
      </Container>
      <Navigation />
    </>
  );
}
