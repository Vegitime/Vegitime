import styled from 'styled-components';
import { Time, VegiImage, ProgressBar, ActionButton } from './components';
import { Header, Title, Navigation, TextButton, ModalDialog } from 'components';
import { useState } from 'react';
import { flexContainer } from 'styles';

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  padding: 1rem;
  background: var(--color-skyblue);
  text-align: center;
`;

const Question = styled.div`
  font-size: var(--text-lg);
`;

const ButtonGroup = styled.div`
  ${flexContainer({ d: 'row', w: 'nowrap', g: 'var(--spacing-xxxs)' })}
`;

export default function VegiPage() {
  const [activateModal, setActivateModal] = useState(false);

  return (
    <>
      <Header />
      <Container>
        <Title>가지가지</Title>
        <ProgressBar text="3 / 5" />
        <VegiImage />
        <Time text="AM 07:00" />
        <ActionButton action="voice" />
        <TextButton
          width="100%"
          size="large"
          backgroundColor="var(--color-gold)"
          onClick={() => {
            setActivateModal(true);
            document.body.style.overflow = 'hidden';
          }}
        >
          판매하기
        </TextButton>
        {activateModal && (
          <ModalDialog
            size="small"
            onClose={() => {
              setActivateModal(false);
            }}
          >
            <Question>판매하시겠습니까?</Question>
            <ButtonGroup>
              <TextButton
                width="9.375rem"
                size="small"
                onClick={() => {
                  console.log('판매하기');
                }}
              >
                확인
              </TextButton>
              <TextButton
                width="9.375rem"
                size="small"
                onClick={() => {
                  setActivateModal(false);
                }}
              >
                취소
              </TextButton>
            </ButtonGroup>
          </ModalDialog>
        )}
      </Container>
      <Navigation />
    </>
  );
}
