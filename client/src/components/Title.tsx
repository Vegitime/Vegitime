import styled from 'styled-components';

interface ITitle {
  children: string;
}

const StyledH1 = styled.h1`
  margin: var(--spacing-md) 0 var(--spacing-sm);
  font-size: var(--text-xl);
  text-align: center;
`;

export default function Title({ children }: ITitle) {
  return <StyledH1 style={{ height: '40px' }}>{children}</StyledH1>;
}
