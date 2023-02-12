import styled from 'styled-components';

interface ButtonProps {
  width: string | number;
  size: 'large' | 'small';
  backgroundColor: string;
  disabledBackgroundColor?: string;
}

interface TextButtonProps extends ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  children: string;
}

const buttonStyle = {
  small: {
    height: '3.125rem',
    fontSize: 'var(--text-sm)',
  },
  large: {
    height: '3.75rem',
    fontSize: 'var(--text-md)',
  },
};

const StyledButton = styled.button<ButtonProps>`
  width: ${({ width }) => width};
  height: ${({ size }) => buttonStyle[size].height};
  background: ${({ backgroundColor }) => backgroundColor};
  border: none;
  border-radius: 3.125rem;
  font: inherit;
  color: var(--color-white);
  font-size: ${({ size }) => buttonStyle[size].fontSize};
  cursor: pointer;

  &[disabled] {
    background: ${({ disabledBackgroundColor }) =>
      disabledBackgroundColor ?? 'var(--color-grey)'};
  }
`;

export default function TextButton({
  type,
  onClick,
  disabled,
  width,
  size,
  backgroundColor,
  disabledBackgroundColor,
  children,
}: TextButtonProps) {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      width={width}
      size={size}
      backgroundColor={backgroundColor}
      disabledBackgroundColor={disabledBackgroundColor}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
}

TextButton.defaultProps = {
  type: 'button',
  disabled: false,
  size: 'large',
  backgroundColor: 'var(--color-normal-green)',
};
