import styled from 'styled-components';

interface TimeType {
  text: string;
}

const StyledP = styled.p`
  font-size: 3.75rem;
  text-align: center;
`;

export default function Time({ text }: TimeType) {
  return <StyledP>{text}</StyledP>;
}
