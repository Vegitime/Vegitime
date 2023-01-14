import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { flexContainer } from 'styles';
import { getAsset, getAlarmFormat } from 'utils';
import { Time, ProgressBar, DictButton } from './components';
import { Header, Title, Navigation, TextButton, ModalDialog } from 'components';
import axios from 'axios';

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
  const [name, setName] = useState('');
  const [level, setLevel] = useState(0);
  const [alarm, setAlarm] = useState('');
  const [price, setPrice] = useState(0);
  const [type, setType] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const res = await axios.get(`${process.env.URL}api/vegetables/${id}`, {
          withCredentials: true,
        });
        const {
          name,
          level,
          alarm: _alarm,
          sellingPrice: price,
          type,
        } = res.data.body.data;

        const { ampm, hour, minute } = _alarm;
        const alarm =
          ampm === '' && hour === 0 && minute === 0
            ? ''
            : getAlarmFormat({ hour, minute, ampm });
        setAlarm(alarm);
        setName(name);
        setLevel(level);
        setPrice(price);
        setType(type);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUserInfo();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Title>{name}</Title>
        <ProgressBar level={level} />
        <img
          src={getAsset(`${type}0${level}.svg`)}
          height={300}
          alt={`${type}`}
        />
        <Time text={alarm} id={id as string} />
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
          <DictButton setLevel={setLevel}>칭찬하기</DictButton>
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
                    `${process.env.URL}api/vegetables/${id}/sale`,
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
