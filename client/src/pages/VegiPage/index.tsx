import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import { flexContainer } from 'styles';
import { VEGETABLE_INFO, getAsset } from 'utils';
import { Time, ProgressBar, DictButton } from './components';
import { Header, Title, Navigation, TextButton, ModalDialog } from 'components';
import users from '../../../../server/mock/users';

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
  const navigate = useNavigate();
  const { id } = useParams();
  const [user] = users;
  const { vegis } = user;
  const [vegi] = vegis.filter(({ id: _id }) => _id === +(id as string));
  const { type, level, alarm } = vegi;
  return (
    <>
      <Header />
      <Container>
        <Title>{VEGETABLE_INFO[type].name}</Title>
        <ProgressBar text={`${level} / 5`} />
        <img src={getAsset(`${type}0${level}.svg`)} height={300} />
        <Time text={alarm} id={id as string} />
        <DictButton>칭찬하기</DictButton>
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
                  console.log(
                    `${id}를 ${VEGETABLE_INFO[type].price * 1.5}에 판매하기`
                  );
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
