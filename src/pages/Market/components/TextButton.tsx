import styled from 'styled-components';

const StyledButton = styled.button`
  background: var(--color-normal-green);
  padding: var(--spacing-sm) var(--spacing-xl);
  border: none;
  border-radius: 3.125rem;
  font: inherit;
  color: var(--color-white);
  font-size: var(--text-sm);
  cursor: pointer;
`;

interface IButton {
  text?: string;
}

export default function TextButton({ text = '구매하기' }: IButton) {
  return <StyledButton>{text}</StyledButton>;
}
