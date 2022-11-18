import styled from 'styled-components';

const StyledH2 = styled.h2`
  margin: 2rem;
`;

export default function Title({ text }: ITitle) {
  return <StyledH2>{text}</StyledH2>;
}

interface ITitle {
  text: string;
}
