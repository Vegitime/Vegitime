import { Link } from 'react-router-dom';

interface Ivegetable {
  [key: string]: string;
  // src: string;
  // alt: string;
}
interface Ivegetables {
  [key: string]: Ivegetable;
  // onion: Ivegetable;
  // carrot: Ivegetable;
}
interface IVegiInfo {
  vegetble?: string;
  level?: number;
}

const vegetables: Ivegetables = {
  eggplant: {
    src: '/assets/eggplant.png',
    name: '가지',
  },
  onion: {
    src: '/assets/onion.png',
    name: '양파',
  },
  carrot: {
    src: '/assets/carrot.png',
    name: '당근',
  },
};

export default function LinkVegiInfo({
  vegetble = 'onion',
  level = 1,
}: IVegiInfo) {
  const { src, name } = vegetables[vegetble];
  return (
    <Link to="..">
      <img src={src} alt={name} />
      <div>Level. {level}</div>
      <div>
        {name} {name}
      </div>
    </Link>
  );
}
