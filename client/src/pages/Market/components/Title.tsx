import styled from 'styled-components';

const StyledH2 = styled.h2`
  font-size: var(--text-xl);
  margin: var(--spacing-xl) 0;
`;

export default function Title({ text }: ITitle) {
  return <StyledH2>{text}</StyledH2>;
}

interface ITitle {
  text: string;
}
