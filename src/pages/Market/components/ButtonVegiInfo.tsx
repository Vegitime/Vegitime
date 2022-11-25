import styled from 'styled-components';
import { MoneyInfo } from './index';
import { flexContainer } from 'styles';
import { getAsset } from 'utils';

const StyledButton = styled.button`
  ${flexContainer({ d: 'column', w: 'nowrap', ai: 'center' })}
  width: 100%;
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  font-size: var(--text-xs);
  > img {
    height: 6.25rem;
    margin-bottom: var(--spacing-base);
  }
  div {
    line-height: 1.5625rem;
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

export default function ButtonVegiInfo({ vegetble = 'onion' }: IVegiInfo) {
  const { src, name, price } = vegetables[vegetble];
  return (
    <StyledButton>
      <img src={src} alt={name} />
      <div>
        {name} {name}
      </div>
      <MoneyInfo money={price} />
    </StyledButton>
  );
}
