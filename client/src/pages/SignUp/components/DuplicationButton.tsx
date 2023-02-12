import { ReactNode } from 'react';
import styled from 'styled-components';

interface IDuplicationButton {
  isCheckActive: boolean;
  children: ReactNode;
  type: 'button' | 'submit' | 'reset' | undefined;
  onClick: () => void;
}

const StyleDuplicationButton = styled.button<{ isCheckActive: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  width: 4.25rem; // 68px
  height: inherit;
  border: none;
  padding: 0;
  border-radius: 0px 1.813rem 1.813rem 0px; // 29px
  background: var(
    ${(props) =>
      props.isCheckActive ? '--color-normal-green' : '--color-light-green'}
  );
  font-size: var(--text-xs);
  color: var(--color-white);
`;

export default function DuplicationButton({
  isCheckActive,
  children,
  onClick,
  ...props
}: IDuplicationButton) {
  return (
    <StyleDuplicationButton
      onClick={onClick}
      isCheckActive={isCheckActive}
      disabled={!isCheckActive}
      {...props}
    >
      {children}
    </StyleDuplicationButton>
  );
}
