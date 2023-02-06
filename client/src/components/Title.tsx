import styled from 'styled-components';

interface ITitle {
  children: string;
  [key: string]: unknown;
}

const StyledH1 = styled.h1`
  margin: var(--spacing-md) 0 var(--spacing-sm);
  font-size: var(--text-xl);
  text-align: center;
`;

export default function Title({ children, ...props }: ITitle) {
  return (
    <StyledH1 style={{ height: '40px' }} {...props}>
      {children}
    </StyledH1>
  );
}
