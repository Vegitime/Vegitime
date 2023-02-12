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

export const VEGETABLE_INFO: Ivegetables = {
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
