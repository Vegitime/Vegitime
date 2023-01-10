import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { flexContainer } from 'styles';
import { separateAlarmFormat, getAlarmFormat } from 'utils';
import { Header, Title, Navigation, TextButton, ModalDialog } from 'components';
import { TimePicker, VegiSelect } from './components';
import users from '../../../../server/mock/users.js';

interface VegiSelectProps {
  id: number;
  type: 'avocado' | 'carrot' | 'eggplant' | 'onion' | 'radish' | 'tomato';
}

interface ButtonGroupProps {
  margin?: string;
  d: 'row' | 'column';
  g: string;
}

const StyledMain = styled.main`
  ${flexContainer({ d: 'column', w: 'nowrap', ai: 'center' })};
  position: relative;
  min-height: 100vh;
  padding: 0 var(--spacing-xxs) var(--spacing-xs);
`;

const StyledVegiSelect = styled(VegiSelect)`
  margin-top: var(--spacing-base);
`;

const ButtonGroup = styled.div<ButtonGroupProps>`
  ${({ d, g }) => flexContainer({ d: d, w: 'nowrap', g: g })};
  margin: ${({ margin }) => margin};
`;

const Question = styled.div`
  font-size: var(--text-lg);
`;

export default function SettingAlarm() {
  const [activateModal, setActivateModal] = useState(false);
  const { id } = useParams();
  const selectedId = +(id as string);
  const [user] = users;
  const { vegis } = user;
  const [vegi] = vegis.filter(({ id: _id }) => _id === selectedId);
  const { alarm } = vegi;
  const types = vegis.map(({ type, id }) => ({ id, type }));
  const { hour: _hour, minute: _minute, ampm } = separateAlarmFormat(alarm);
  const [hour, setHour] = useState(+_hour);
  const [minute, setMinute] = useState(+_minute);
  const [isAm, setIsAm] = useState(ampm === 'AM');
  const navigate = useNavigate();

  useEffect(() => {
    setHour(+_hour);
    setMinute(+_minute);
    setIsAm(ampm === 'AM');
  }, [id]);

  return (
    <>
      <Header />
      <StyledMain>
        <Title>Setting Alarm</Title>
        <TimePicker
          hour={hour}
          minute={minute}
          isAm={isAm}
          setHour={setHour}
          setMinute={setMinute}
          setIsAm={setIsAm}
        />
        <StyledVegiSelect
          types={types as Array<VegiSelectProps>}
          selectedId={selectedId}
        />
        <ButtonGroup
          d="column"
          g="var(--spacing-base)"
          margin="var(--spacing-xs) 0 0 0"
        >
          <TextButton
            width="11.5625rem"
            size="small"
            onClick={() => {
              const ampm = isAm ? 'AM' : 'PM';
              console.log(
                `${selectedId}에 ${getAlarmFormat({
                  hour,
                  minute,
                  ampm,
                })} 저장하기`
              );
              navigate('/alarmlist');
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
        </ButtonGroup>
        {activateModal && (
          <ModalDialog
            size="small"
            onClose={() => {
              setActivateModal(false);
            }}
          >
            <Question>삭제하시겠습니까?</Question>
            <ButtonGroup d="row" g="var(--spacing-xxxs)">
              <TextButton
                width="9.375rem"
                size="small"
                onClick={() => {
                  console.log(`${selectedId} 알람 삭제하기`);
                  navigate(`/myvegi/${selectedId}`);
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

ButtonGroup.defaultProps = {
  margin: '0',
};
