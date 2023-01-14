import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { flexContainer } from 'styles';
import { separateDefaultAlarmFormat } from 'utils';
import { Header, Title, Navigation, TextButton, ModalDialog } from 'components';
import { TimePicker, VegiSelect } from './components';
import axios from 'axios';

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
  const [types, setTypes] = useState();
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [ampm, setAmpm] = useState('AM');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const res = await axios.get(`${process.env.URL}api/vegetables`, {
          withCredentials: true,
        });
        const vegis = res.data.body.data;
        const types = vegis.map(({ type, vegeId: id }) => ({ id, type }));
        setTypes(types);
        const vegi = vegis.find(({ vegeId }) => vegeId === id);
        const { hour, minute, ampm } =
          vegi.alarm.ampm === '' ? separateDefaultAlarmFormat() : vegi.alarm;
        setHour(hour);
        setMinute(minute);
        setAmpm(ampm);

        console.log(vegi);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUserInfo();
  }, [id]);

  return (
    <>
      <Header />
      <StyledMain>
        <Title>Setting Alarm</Title>
        <TimePicker
          hour={hour}
          minute={minute}
          ampm={ampm as 'AM' | 'PM'}
          setHour={setHour}
          setMinute={setMinute}
          setAmpm={setAmpm}
        />
        {types && (
          <StyledVegiSelect
            types={types as Array<VegiSelectProps>}
            selectedId={id as string}
          />
        )}
        <ButtonGroup
          d="column"
          g="var(--spacing-base)"
          margin="var(--spacing-xs) 0 0 0"
        >
          <TextButton
            width="11.5625rem"
            size="small"
            onClick={async () => {
              await axios.patch(
                `${process.env.URL}api/vegetables/${id}/alarm`,
                {
                  ampm,
                  hour,
                  minute,
                },
                {
                  withCredentials: true,
                }
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
                onClick={async () => {
                  await axios.patch(
                    `${process.env.URL}api/vegetables/${id}/alarm`,
                    {
                      ampm: '',
                      hour: 0,
                      minute: 0,
                    },
                    {
                      withCredentials: true,
                    }
                  );
                  navigate(`/myvegi/${id}`);
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
