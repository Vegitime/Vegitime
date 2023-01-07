import { TimePicker } from './components';
import { Header, Title, Navigation, TextButton, ModalDialog } from 'components';
import styled from 'styled-components';
import { flexContainer } from 'styles';
import { useState } from 'react';
// import users from '../../../../server/mock/users.js';

const mockDate = {
  onion: {
    time: '',
  },
  carrot: {
    time: new Date(),
  },
};

const StyledMain = styled.main`
  ${flexContainer({ d: 'column', w: 'nowrap', ai: 'center' })};
  position: relative;
  min-height: 100vh;
  padding: 0 var(--spacing-xxs) var(--spacing-xs);
`;

const Question = styled.div`
  font-size: var(--text-lg);
`;

const ButtonGroup = styled.div`
  ${flexContainer({ d: 'row', w: 'nowrap', g: 'var(--spacing-xxxs)' })}
`;

export default function SettingAlarm() {
  const [activateModal, setActivateModal] = useState(false);

  return (
    <>
      <Header />
      <StyledMain>
        <Title>Setting Alarm</Title>
        <TimePicker time={mockDate.carrot.time} />
        <TextButton
          width="11.5625rem"
          size="small"
          onClick={() => {
            console.log('저장하기');
          }}
        >
          저장
        </TextButton>
        <TextButton
          width="11.5625rem"
          size="small"
          backgroundColor="var(--color-gold)"
          onClick={() => {
            setActivateModal(true);
            document.body.style.overflow = 'hidden';
          }}
        >
          삭제
        </TextButton>
        {activateModal && (
          <ModalDialog
            size="small"
            onClose={() => {
              setActivateModal(false);
            }}
          >
            <Question>삭제하시겠습니까?</Question>
            <ButtonGroup>
              <TextButton
                width="9.375rem"
                size="small"
                onClick={() => {
                  console.log('삭제하기');
                }}
              >
                확인
              </TextButton>
              <TextButton
                width="9.375rem"
                size="small"
                onClick={() => {
                  setActivateModal(false);
                  document.body.style.overflow = 'unset';
                }}
              >
                취소
              </TextButton>
            </ButtonGroup>
          </ModalDialog>
        )}
      </StyledMain>
      <Navigation />
    </>
  );
}
