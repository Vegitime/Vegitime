import styled from 'styled-components';

interface TitleType {
  level: string;
  name: string;
}

const StyledH2 = styled.h2`
  font-size: 30px;
  margin-top: 56px;
  margin-bottom: 32px;
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
