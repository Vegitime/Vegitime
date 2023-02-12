import { useLayoutEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { Header, Title, Navigation, TextButton, ModalDialog } from 'components';
import { Time, ProgressBar, DictButton } from './components';
import { flexContainer } from 'styles';
import {
  getAsset,
  getAlarmFormat,
  getAlarmTime,
  executeFuncOnTime,
} from 'utils';

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  padding: 0 var(--spacing-xxs) var(--spacing-xxxl);
  text-align: center;
`;

const P = styled.p`
  position: relative;
  top: -16px;
  margin: var(--spacing-base) 0;
  font-size: var(--text-lg);
  text-align: center;
`;

const Question = styled.div`
  font-size: var(--text-lg);
`;

const ButtonGroup = styled.div`
  ${flexContainer({ d: 'row', w: 'nowrap', g: 'var(--spacing-xxxs)' })}
`;

export default function VegiPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activateModal, setActivateModal] = useState(false);
  const [name, setName] = useState('');
  const [level, setLevel] = useState<number>();
  const [alarm, setAlarm] = useState('');
  const [type, setType] = useState();
  const [money, setMoney] = useState<number>();
  const [isTimeForAlarm, setIsTimeForAlarm] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useLayoutEffect(() => {
    async function fetchUserInfo() {
      try {
        const resVegi = await axios.get(
          `${process.env.REACT_APP_URL}api/vegetables/${id}`,
          {
            withCredentials: true,
          }
        );
        const resUser = await axios.get(`${process.env.REACT_APP_URL}api/users/info`, {
          withCredentials: true,
        });

        const { money } = resUser.data.body.data;
        const {
          name,
          level,
          alarm: _alarm,
          type,
          isCompleted,
        } = resVegi.data.body.data;
        const { ampm, hour, minute } = _alarm;

        if (ampm === '' && hour === 0 && minute === 0) {
          setAlarm('');
        } else {
          setAlarm(getAlarmFormat({ hour, minute, ampm }));
          executeFuncOnTime(() => {
            setIsTimeForAlarm(true);
          }, getAlarmTime({ hour, minute, ampm }));
          executeFuncOnTime(() => {
            setIsTimeForAlarm(false);
          }, getAlarmTime({ hour, minute: minute + 1, ampm }));
        }
        setIsCompleted(isCompleted);
        setMoney(money);
        setName(name);
        setLevel(level);
        setType(type);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUserInfo();
  }, []);

  return (
    <>
      <Header money={money} />
      <Container>
        <Title>{name}</Title>
        <ProgressBar level={level} />
        {type ? (
          <img
            src={getAsset(`${type}0${level}.svg`)}
            width={300}
            height={300}
            alt={`${type}`}
          />
        ) : (
          <div
            style={{
              width: '300px',
              height: '300px',
              background: 'var(--color-skyblue)',
            }}
          ></div>
        )}
        {level === 5 ? (
          <P>키워주셔서 감사합니다 ^^</P>
        ) : (
          <Time text={alarm} id={id as string} />
        )}
        {level === 5 ? (
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
        ) : (
          <DictButton
            setLevel={setLevel as React.Dispatch<React.SetStateAction<number>>}
            setIsCompleted={
              setIsCompleted as React.Dispatch<React.SetStateAction<boolean>>
            }
            isDisabled={alarm === '' || isCompleted || !isTimeForAlarm}
          >
            칭찬하기
          </DictButton>
        )}
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
                onClick={async () => {
                  await axios.delete(
                    `${process.env.REACT_APP_URL}api/vegetables/${id}/sale`,
                    {
                      withCredentials: true,
                    }
                  );
                  document.body.style.overflow = 'unset';

                  navigate('/alarmlist');
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
      </Container>
      <Navigation />
    </>
  );
}
