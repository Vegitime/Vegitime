import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Header, Title, Navigation, ModalDialog, TextButton } from 'components';
import { ButtonVegiInfo } from './components';
import { flexContainer } from 'styles';
import { getAsset } from 'utils';

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

export default function Market() {
  const [activateModal, setActivateModal] = useState(false);
  const [clickedType, setClickedType] = useState('tomato');
  const [money, setMoney] = useState<number>();
  const [vegetables, setVegetables] = useState([]);

  const selectedVegi = vegetables.find(({ type }) => type === clickedType);
  const { type, src, name, price, specialty } = selectedVegi ?? {
    type: '',
    src: '',
    name: '',
    price: 0,
    specialty: '',
  };

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const resShop = await axios.get(`${process.env.URL}api/shop`, {
          withCredentials: true,
        });
        const vegetables = resShop.data.body.data;
        setVegetables(vegetables);
        const resUser = await axios.get(`${process.env.URL}api/users/info`, {
          withCredentials: true,
        });
        const { money } = resUser.data.body.data;
        setMoney(money);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUserInfo();
  }, []);

  return (
    <>
      <Header money={money} />
      <StyledMain>
        <Title>Vegi Market</Title>
        <StyledUl>
          {vegetables.map(({ src, name, price, type }) => (
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
            <img src={getAsset(src)} alt={name} />
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
              disabled={(money ?? 0) < price}
              onClick={async () => {
                try {
                  await axios.post(
                    `${process.env.URL}api/shop/purchase`,
                    { type },
                    {
                      withCredentials: true,
                    }
                  );
                  setMoney((money) => (money ?? 0) - price);
                } catch (err) {
                  console.error(err);
                }
                setActivateModal(false);
                document.body.style.overflow = 'unset';
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
