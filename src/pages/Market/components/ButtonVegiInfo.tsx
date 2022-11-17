import styled from 'styled-components';
import { MoneyInfo } from './index';
import { flexContainer } from '../../../styles';
import { getAsset } from '../../../utils';

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
    margin-bottom: var(--spacing-base);
  }
  div {
    line-height: var(--spacing-lg);
  }
`;

interface Ivegetable {
  src: string;
  name: string;
  price: number;
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
    src: `${getAsset('eggplant.png')}`,
    name: '가지',
    price: 1000,
  },
  onion: {
    src: `${getAsset('onion.png')}`,
    name: '양파',
    price: 1000,
  },
  carrot: {
    src: `${getAsset('carrot.png')}`,
    name: '당근',
    price: 1000,
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
