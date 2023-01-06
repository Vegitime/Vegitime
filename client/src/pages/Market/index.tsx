import { ButtonVegiInfo, ModalDialog } from './components';
import { Header, Title, Navigation } from 'components';
import styled from 'styled-components';
import { flexContainer } from 'styles';

const StyledMain = styled.main`
  ${flexContainer({ d: 'column', w: 'nowrap', ai: 'center' })};
  position: relative;
  min-height: 100vh;
  padding: 0 var(--spacing-xxs) var(--spacing-xs);
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

const VEGETABLE_TYPES = [
  'avocado',
  'carrot',
  'eggplant',
  'onion',
  'radish',
  'tomato',
];

export default function Market() {
  return (
    <>
      <Header />
      <StyledMain>
        <Title>Vegi Market</Title>
        <StyledUl>
          {VEGETABLE_TYPES.map((type) => (
            <li key={type}>
              <ButtonVegiInfo type={type} />
            </li>
          ))}
        </StyledUl>
      </StyledMain>
      <Navigation />
    </>
  );
}
