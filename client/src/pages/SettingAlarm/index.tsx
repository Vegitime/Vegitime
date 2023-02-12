import { useState, useEffect, useRef } from 'react';
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
  const [types, setTypes] = useState<VegiSelectProps[]>();
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [ampm, setAmpm] = useState<'AM' | 'PM'>('AM');
  const [money, setMoney] = useState<number>();

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const resVegis = await axios.get(`${process.env.REACT_APP_URL}api/vegetables`, {
          withCredentials: true,
        });
        const resUser = await axios.get(`${process.env.REACT_APP_URL}api/users/info`, {
          withCredentials: true,
        });

        const { money } = resUser.data.body.data;
        const vegis = resVegis.data.body.data as Array<Vegi>;
        const types = vegis.map(({ type, vegeId: id }) => ({ id, type }));
        setTypes(types);
        const vegi = vegis.find(({ vegeId }) => vegeId === id);
        const { hour, minute, ampm } =
          vegi?.alarm.ampm === ''
            ? separateDefaultAlarmFormat()
            : (vegi as Vegi).alarm;

        setMoney(money);
        setHour(hour);
        setMinute(minute);
        setAmpm(ampm as 'AM' | 'PM');
      } catch (err) {
        console.error(err);
      }
    }
    fetchUserInfo();
  }, [id]);

  type Store = {
    pushSupport: boolean;
    serviceWorkerRegistration: ServiceWorkerRegistration | null;
    pushSubscription: PushSubscription | null;
  }
  const store = useRef<Store>({
    pushSupport: false,
    serviceWorkerRegistration: null,  // 서비스워커 등록 정보
    pushSubscription: null, // 구독 정보
  });
  // 서비스 워커 등록 및 구독 정보 가져오기
  async function registerServiceWorker () {
    if (!('serviceWorker' in navigator)) return;

    // 이미 등록되어있는 정보 가져오기
    let registration = await navigator.serviceWorker.getRegistration();
    if (!registration) {
      // 없으면 서비스 워커 등록
      registration = await navigator.serviceWorker.register('/service-worker.js');
    }

    store.current.serviceWorkerRegistration = registration ?? null;
    store.current.pushSupport = !!registration?.pushManager;  // pushManager가 있는지 유무
    store.current.pushSubscription = await registration?.pushManager?.getSubscription();  // 구독정보
  }
  // 구독
  async function subscribe () {
    if (store.current.pushSubscription) { // 구독 유무 판단해서 이미 구독되어 있으면 리턴
      return;
    }

    try {
      const vapidPublicKey = await axios
      .get(`${process.env.REACT_APP_URL}vapid-public-key`)
      .then((response) => response.data);

      const registration = store.current.serviceWorkerRegistration;

      if (!registration) {  // 서비스워커 등록 안되어 있으면 쳐냄
        return;
      }

      // 1. 구독 : 구독할 때, vapidPublicKey 보냄. 
      // 2. 구독정보 받음
      const subscription = await registration.pushManager.subscribe({
        applicationServerKey: vapidPublicKey,
        userVisibleOnly: true,
      });
      store.current.pushSubscription = subscription;
    } catch (error) {
      console.error('subscribe', { error });
    }
  }
  useEffect(() => {
    registerServiceWorker()
  }, [])

  return (
    <>
      <Header money={money} />
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
        {types ? (
          <StyledVegiSelect
            types={types as VegiSelectProps[]}
            selectedId={id as string}
          />
        ) : (
          <div style={{ height: '76px' }} />
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
              await subscribe();
              await axios.patch(
                `${process.env.REACT_APP_URL}api/vegetables/${id}/alarm`,
                {
                  ampm,
                  hour,
                  minute,
                  subscription: store.current.pushSubscription
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
                    `${process.env.REACT_APP_URL}api/vegetables/${id}/alarm`,
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
