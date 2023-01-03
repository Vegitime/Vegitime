import styled from 'styled-components';

interface ITitle {
  children: string;
}

const StyledH2 = styled.h2`
  font-size: var(--text-xl);
  margin: var(--spacing-xl) 0;
`;

export default function Title({ children }: ITitle) {
  return <StyledH2>{children}</StyledH2>;
}
