import styled from 'styled-components';

interface TitleType {
  level: string;
  name: string;
}

const StyledH2 = styled.h2`
  font-size: 3.75rem;
  margin-top: var(--spacing-xl);
  margin-bottom: var(2rem);
  text-align: center;

  p {
    margin-top: 0px;
    margin-bottom: 8px;
  }
`;

export default function Title({ level, name }: TitleType) {
  return (
    <StyledH2>
      <p>{level}</p>
      <p>{name}</p>
    </StyledH2>
  );
}
