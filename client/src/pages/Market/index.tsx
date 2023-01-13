import { ButtonVegiInfo } from './components';
import { Header, Title, Navigation, ModalDialog, TextButton } from 'components';
import styled from 'styled-components';
import { flexContainer } from 'styles';
import { useEffect, useState } from 'react';
import { VEGETABLE_INFO } from 'utils';
import users from '../../../../server/mock/users';
import axios from 'axios';

const StyledMain = styled.main`
  ${flexContainer({ d: 'column', w: 'nowrap', ai: 'center' })};
  position: relative;
  min-height: 100vh;
  padding: 0 var(--spacing-xxs) var(--spacing-xs);
`;

const StyledUl = styled.ul`
  ${flexContainer({ d: 'row', w: 'wrap', g: 'var(--spacing-xxs)' })}
  width: 100%;
  li {
    ${flexContainer({ d: 'column', w: 'nowrap', ai: 'center' })}
    width: calc(50% - var(--spacing-xxs) / 2);
    padding: var(--spacing-base);
    border-radius: var(--spacing-xxs);
    background: hsla(0, 0%, 100%, 0.5);
  }
`;

type Vegis = 'avocado' | 'carrot' | 'eggplant' | 'onion' | 'radish' | 'tomato';

const VEGETABLE_TYPES: Array<Vegis> = [
  'avocado',
  'carrot',
  'eggplant',
  'onion',
  'radish',
  'tomato',
];

export default function Market() {
  const [activateModal, setActivateModal] = useState(false);
  const [clickedType, setClickedType] = useState('tomato');
  const [vegitables, setVegitables] = useState([]);
  const { src, name, price, specialty } = VEGETABLE_INFO[clickedType];
  const [user] = users;
  const { money } = user;

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const res = await axios.get(`${process.env.URL}api/shop`, {
          withCredentials: true,
        });
        const vegitables = res.data.body.data;
        setVegitables(vegitables);
        console.log(vegitables);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUserInfo();
  }, []);

  return (
    <>
      <Header />
      <StyledMain>
        <Title>Vegi Market</Title>
        <StyledUl>
          {vegitables.map(({ src, name, price }) => (
            <li key={name}>
              <ButtonVegiInfo
                onClick={() => {
                  setActivateModal(true);
                  setClickedType(type);
                  document.body.style.overflow = 'hidden';
                }}
                src={src}
                name={name}
                price={price}
              />
            </li>
          ))}
        </StyledUl>
        {activateModal && (
          <ModalDialog
            size="large"
            onClose={() => {
              setActivateModal(false);
            }}
          >
            <img src={src} alt={name} />
            <ul>
              <li>
                <span>이름 : {name}</span>
              </li>
              <li>
                <span>가격 : {price}원</span>
              </li>
              <li>
                <span>특기 : {specialty}</span>
              </li>
            </ul>
            <TextButton
              width="9.375rem"
              size="small"
              disabled={money < price}
              onClick={() => {
                console.log(
                  `${clickedType} 구매하고 남은 돈 ${money - price} `
                );
                setActivateModal(false);
              }}
            >
              구매하기
            </TextButton>
          </ModalDialog>
        )}
      </StyledMain>
      <Navigation />
    </>
  );
}
