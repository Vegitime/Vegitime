import styled from 'styled-components';

const StyledButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  img {
    width: var(--spacing-xl);
    height: var(--spacing-xl);
  }
`;

export interface IButton {
  url?: string;
  alt?: string;
}

export default function IconButton({ url, alt }: IButton) {
  return (
    <StyledButton>
      <img src={url} alt={alt} />
    </StyledButton>
  );
}
