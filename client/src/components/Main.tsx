import { ReactNode } from 'react';
import styled from 'styled-components';
import { flexContainer } from 'styles';

interface MainProps {
  children: ReactNode;
}

const StyledMain = styled.main`
  ${flexContainer({ d: 'column', w: 'nowrap', ai: 'center' })};
  position: relative;
  min-width: 330px;
  min-height: 100vh;
  padding: 0 var(--spacing-xxs) var(--spacing-xxxl);
`;

export default function Main({ children }: MainProps) {
  return <StyledMain>{children}</StyledMain>;
}
