import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { flexContainer } from 'styles';
import { getAsset } from 'utils';

const StyledLink = styled(Link)`
  ${flexContainer({ d: 'column', w: 'nowrap', ai: 'center' })}
  width: 100%;
  padding: 0;
  font-size: var(--text-xs);
  > img {
    height: 6.25rem;
    margin-bottom: var(--spacing-base);
  }
  div {
    line-height: var(--spacing-lg);
  }
`;

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
    src: `${getAsset('eggplant.svg')}`,
    name: '가지',
  },
  onion: {
    src: `${getAsset('onion.svg')}`,
    name: '양파',
  },
  carrot: {
    src: `${getAsset('carrot.svg')}`,
    name: '당근',
  },
};

export default function LinkVegiInfo({
  vegetble = 'onion',
  level = 1,
}: IVegiInfo) {
  const { src, name } = vegetables[vegetble];
  return (
    <StyledLink to="..">
      <img src={src} alt={name} />
      <div>Level. {level}</div>
      <div>
        {name} {name}
      </div>
    </StyledLink>
  );
}
