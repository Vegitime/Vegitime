import { ReactNode } from 'react';
import styled from 'styled-components';

const FormInputContainer = styled.div`
  background: var(--color-white);
  border-radius: var(--text-xxl); // 50px
  position: relative;
  width: calc(100% - 40px);
  height: 3.75rem; // 60px;

  svg {
    position: absolute;
    left: var(--spacing-xs);
    top: 0.75rem; // 12px;
    width: 35px;
    height: 35px;
  }

  &:focus-within {
    border: 0.125rem solid var(--color-normal-green); // 2px

    svg {
      left: 1.875rem;
      top: 0.645rem; // 12px;
      fill: var(--color-black);
    }
    div {
      left: 1.875rem;
      top: 4.125rem;
    }
    button {
      top: -0.125rem; //-2px
      right: -0.125rem; //-2px
    }
  }
`;

export default function InputContainer({ children }: { children: ReactNode }) {
  return <FormInputContainer>{children}</FormInputContainer>;
}
