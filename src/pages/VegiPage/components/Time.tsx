import styled from 'styled-components';

interface TimeType {
  text: string;
}

const StyledP = styled.p`
  font-size: 30px;
  text-align: center;
`;

export default function Time({ text }: TimeType) {
  return <StyledP>{text}</StyledP>;
}
