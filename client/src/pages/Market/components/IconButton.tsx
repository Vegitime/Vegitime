import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button<{ width?: string; height?: string }>`
  background: none;
  border: none;
  cursor: pointer;
  img {
    width: ${({ width }) => width};
    height: ${({ height }) => height};
  }
`;

export interface IButton {
  url?: string;
  alt?: string;
  width?: string;
  height?: string;
  style: React.CSSProperties;
}

export default function IconButton({
  url,
  alt,
  width,
  height,
  ...restProps
}: IButton) {
  return (
    <StyledButton width={width} height={height}>
      <img src={url} alt={alt} {...restProps} />
    </StyledButton>
  );
}

IconButton.defaultProps = {
  width: 'var(--spacing-md)',
  height: 'var(--spacing-md)',
};
