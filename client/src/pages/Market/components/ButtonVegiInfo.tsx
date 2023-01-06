import styled from 'styled-components';
import { MoneyInfo } from 'components';
import { flexContainer } from 'styles';
import { getAsset } from 'utils';

interface Ivegetable {
  src: string;
  name: string;
  price: number;
  specialty: string;
}
interface Ivegetables {
  [key: string]: Ivegetable;
}
interface VegiInfoProps {
  type: 'avocado' | 'carrot' | 'eggplant' | 'onion' | 'radish' | 'tomato';
}

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

// 야채 이름, 가격, 특기 변경
const VEGETABLE_INFO: Ivegetables = {
  avocado: {
    src: `${getAsset('avocado05.svg')}`,
    name: '보카 도도',
    price: 1000,
    specialty: '여러가지',
  },
  carrot: {
    src: `${getAsset('carrot05.svg')}`,
    name: '당근 당근',
    price: 3000,
    specialty: '긍정인형',
  },
  eggplant: {
    src: `${getAsset('eggplant05.svg')}`,
    name: '가지 가지',
    price: 1000,
    specialty: '여러가지',
  },
  onion: {
    src: `${getAsset('onion05.svg')}`,
    name: '양파 양파',
    price: 2000,
    specialty: '야아앙파',
  },
  radish: {
    src: `${getAsset('radish05.svg')}`,
    name: '무우 무우',
    price: 2000,
    specialty: '야아앙파',
  },
  tomato: {
    src: `${getAsset('tomato05.svg')}`,
    name: '토마 토마',
    price: 3000,
    specialty: '긍정인형',
  },
};

export default function ButtonVegiInfo({ type }: VegiInfoProps) {
  const { src, name, price } = VEGETABLE_INFO[type];
  return (
    <StyledButton
      onClick={() => {
        console.log('모달활성화');
      }}
    >
      <img height={100} src={src} alt={`${name} 캐릭터 구매하러 이동`} />
      <div>{name}</div>
      <MoneyInfo size="small">{price}</MoneyInfo>
    </StyledButton>
  );
}
