import styled from 'styled-components';
import { Time, VegiImage, ProgressBar, ActionButton } from './components';
import { Header, Title, Navigation } from 'components';

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
      <Container>
        <Title>가지가지</Title>
        <ProgressBar text="3 / 5" />
        <VegiImage />
        <Time text="AM 07:00" />
        <ActionButton action="voice" />
      </Container>
      <Navigation />
    </>
  );
}
