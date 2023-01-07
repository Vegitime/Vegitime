import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { flexContainer } from 'styles';
import { getAsset } from 'utils';
import { IconButton } from 'components';

interface VegiInfoProps {
  onClose: React.MouseEventHandler<HTMLElement>;
  children: ReactNode;
  size: 'small' | 'large';
}

interface DialogProps {
  size: 'small' | 'large';
}

const DialogStyle = {
  small: {
    padding: 'var(--spacing-xxl) 0 0',
    gap: 'var(--spacing-sm)',
  },
  large: {
    padding: 'var(--spacing-sm) 0 var(--spacing-base)',
    gap: 'var(--spacing-base)',
  },
};

const Dialog = styled.article<DialogProps>`
  ${({ size }) =>
    flexContainer({
      d: 'column',
      w: 'nowrap',
      ai: 'center',
      g: DialogStyle[size].gap,
    })}
  position: fixed;
  z-index: 100000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: calc(100% - var(--spacing-xxs) * 2);
  padding: ${({ size }) => DialogStyle[size].padding};
  background: var(--color-white);
  border-radius: var(--spacing-xxs);
  border: 0.125rem solid var(--color-light-green);
  font: inherit;
  font-size: var(--text-sm);
  > img {
    height: 12.5rem;
  }
  span {
    line-height: 1.875rem;
  }
`;

const Dimmed = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  width: 100vw;
  height: 100vh;
  background: var(--color-grey);
  opacity: 0.7;
  backdrop-filter: blur(2px);
`;

export default function ModalDialog({
  onClose,
  children,
  size,
}: VegiInfoProps) {
  return createPortal(
    <>
      <Dialog size={size}>
        {children}
        <IconButton
          onClick={(e) => {
            onClose(e);
            document.body.style.overflow = 'unset';
          }}
          url={getAsset('close.svg')}
          alt="모달 창 닫기"
          width="var(--spacing-xxs)"
          height="var(--spacing-xxs)"
          style={{
            position: 'absolute',
            top: 'var(--spacing-xxs)',
            right: 'var(--spacing-xxs)',
          }}
        />
      </Dialog>
      <Dimmed
        onClick={(e) => {
          onClose(e);
          document.body.style.overflow = 'unset';
        }}
      />
    </>,
    document.getElementById('modal-zone') as Element
  );
}
