import styled from 'styled-components';

interface ITitle {
  children: string;
}

const StyledH1 = styled.h1`
  margin: var(--spacing-md) 0;
  font-size: var(--text-xl);
  text-align: center;
`;

export default function Title({ children }: ITitle) {
  return <StyledH1>{children}</StyledH1>;
}
