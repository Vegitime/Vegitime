import styled from 'styled-components';

const StyledH2 = styled.h2`
  font-size: var(--text-xl);
  margin: 3.75rem 0;
`;

export default function Title({ text }: ITitle) {
  return <StyledH2>{text}</StyledH2>;
}

interface ITitle {
  text: string;
}
