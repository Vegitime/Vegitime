import styled from 'styled-components';

interface TitleType {
  name: string;
}

const StyledH2 = styled.h2`
  margin: var(--spacing-md) 0;
  font-size: var(--text-xl);
  text-align: center;

  p {
    margin-top: 0px;
    margin-bottom: 8px;
  }
`;

export default function Title({ name }: TitleType) {
  return <StyledH2>{name}</StyledH2>;
}
