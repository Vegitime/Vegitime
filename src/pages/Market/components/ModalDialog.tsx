import styled from 'styled-components';
import { flexContainer, absolute } from 'styles';
import { getAsset } from 'utils';
import { TextButton, IconButton } from './index';

const StyledDiv = styled.div`
  ${flexContainer({
    d: 'column',
    w: 'nowrap',
    ai: 'center',
    g: 'var(--spacing-base)',
  })}
  width: 100%;
  padding: var(--spacing-xl);
  background: var(--color-white);
  border-radius: var(--spacing-md);
  border: 0.125rem solid var(--color-light-green);
  font: inherit;
  font-size: var(--text-sm);
  > img {
    height: 12.5rem;
  }
  span {
    line-height: var(--spacing-xl);
  }
`;

interface Ivegetable {
  src: string;
  name: string;
  price: number;
  specialty: string;
}
interface Ivegetables {
  [key: string]: Ivegetable;
  // onion: Ivegetable;
  // carrot: Ivegetable;
}
interface IVegiInfo {
  vegetble?: string;
}

const vegetables: Ivegetables = {
  eggplant: {
    src: `${getAsset('eggplant.svg')}`,
    name: '가지',
    price: 1000,
    specialty: '여러가지',
  },
  onion: {
    src: `${getAsset('onion.svg')}`,
    name: '양파',
    price: 1000,
    specialty: '야아앙파',
  },
  carrot: {
    src: `${getAsset('carrot.svg')}`,
    name: '당근',
    price: 1000,
    specialty: '긍정인형',
  },
};

export default function ModalDialog({ vegetble = 'carrot' }: IVegiInfo) {
  const { src, name, price, specialty } = vegetables[vegetble];
  return (
    <StyledDiv>
      <img src={src} alt={name} />
      <ul>
        <li>
          <span>
            이름 : {name} {name}
          </span>
        </li>
        <li>
          <span>가격 : {price}원</span>
        </li>
        <li>
          <span>특기 : {specialty}</span>
        </li>
      </ul>
      <TextButton />
      <IconButton url={getAsset('close.png')} alt="모달 창 닫기" />
    </StyledDiv>
  );
}
