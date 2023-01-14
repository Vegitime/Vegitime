import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { Header, Title, Navigation, TextButton, ModalDialog } from 'components';
import { TimePicker, VegiSelect } from './components';
import { flexContainer } from 'styles';
import { separateDefaultAlarmFormat } from 'utils';

interface Alarm {
  ampm: 'AM' | 'PM' | '';
  hour: number;
  minute: number;
}

interface Vegi {
  vegeId: string;
  type: 'avocado' | 'carrot' | 'eggplant' | 'onion' | 'radish' | 'tomato';
  name: string;
  level: number;
  alarm: Alarm;
  attendance: Array<boolean>;
}

interface VegiSelectProps {
  id: string;
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
  const { id } = useParams();
  const navigate = useNavigate();
  const [activateModal, setActivateModal] = useState(false);
  const [types, setTypes] = useState<VegiSelectProps[]>([]);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [ampm, setAmpm] = useState<'AM' | 'PM'>('AM');

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const res = await axios.get(`${process.env.URL}api/vegetables`, {
          withCredentials: true,
        });
        const vegis = res.data.body.data as Array<Vegi>;
        const types = vegis.map(({ type, vegeId: id }) => ({ id, type }));
        setTypes(types);
        const vegi = vegis.find(({ vegeId }) => vegeId === id);
        const { hour, minute, ampm } =
          vegi?.alarm.ampm === ''
            ? separateDefaultAlarmFormat()
            : (vegi as Vegi).alarm;
        setHour(hour);
        setMinute(minute);
        setAmpm(ampm as 'AM' | 'PM');

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
            types={types as VegiSelectProps[]}
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
                  document.body.style.overflow = 'unset';
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
