import React from 'react';
import styled from 'styled-components';

export interface IButton {
  url?: string;
  alt?: string;
  width?: string;
  height?: string;
  style: React.CSSProperties;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const StyledButton = styled.button<{ width?: string; height?: string }>`
  background: none;
  border: none;
  cursor: pointer;
  img {
    width: ${({ width }) => width};
    height: ${({ height }) => height};
  }
`;

export default function IconButton({
  onClick,
  url,
  alt,
  width,
  height,
  ...restProps
}: IButton) {
  return (
    <StyledButton onClick={onClick} width={width} height={height}>
      <img src={url} alt={alt} {...restProps} />
    </StyledButton>
  );
}

IconButton.defaultProps = {
  width: 'var(--spacing-md)',
  height: 'var(--spacing-md)',
};
