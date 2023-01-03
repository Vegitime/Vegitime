import { ButtonVegiInfo, Title, Navigation, ModalDialog } from './components';
import { Header } from 'components';
import styled from 'styled-components';
import { flexContainer } from 'styles';

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  padding: var(--spacing-xxl) var(--spacing-xxs) var(--spacing-xs);
`;

const StyledMain = styled.main`
  ${flexContainer({ d: 'column', w: 'nowrap', ai: 'center' })};
  margin-bottom: 15.625rem;
`;

const StyledUl = styled.ul`
  ${flexContainer({ d: 'row', w: 'wrap', g: 'var(--spacing-xxs)' })}
  width: 100%;
  li {
    ${flexContainer({ d: 'column', w: 'nowrap', ai: 'center' })}
    width: calc(50% - var(--spacing-xxs) / 2);
    padding: var(--spacing-base);
    border-radius: var(--spacing-xxs);
    background: hsla(0, 0%, 100%, 0.5);
  }
`;

export default function Market() {
  return (
    <Container>
      <Header />
      <StyledMain>
        <Title text="Vegi Market" />
        <StyledUl>
          <li>
            <ButtonVegiInfo vegetble="eggplant" />
          </li>
          <li>
            <ButtonVegiInfo vegetble="carrot" />
          </li>
          <li>
            <ButtonVegiInfo vegetble="onion" />
          </li>
          <li>
            <ButtonVegiInfo vegetble="eggplant" />
          </li>
        </StyledUl>
        <ModalDialog />
      </StyledMain>
      <Navigation />
    </Container>
  );
}
