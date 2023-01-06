import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getAsset } from 'utils';

interface Vegetable {
  [key: string]: string;
}
interface Vegetables {
  [key: string]: Vegetable;
}
interface VegiInfo {
  vegetable?: string;
  level?: number;
  isActive: boolean;
  disabled?: boolean;
}

const vegetables: Vegetables = {
  eggplant: {
    src: `${getAsset('eggplant05.svg')}`,
    name: '가지',
  },
  onion: {
    src: `${getAsset('onion04.svg')}`,
    name: '양파',
  },
  carrot: {
    src: `${getAsset('carrot03.svg')}`,
    name: '당근',
  },
};

const ListContainer = styled.button<{ isActive: boolean }>`
  width: 100%;
  height: 5rem;
  border-radius: 6.25rem;
  border-color: var(
    ${(props) =>
      props.isActive ? '--color-normal-green' : '--color-light-green'}
  );
  background: #fff;
  font-size: 3.75rem;
  margin: 0 auto var(--spacing-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--spacing-xl);
  :disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
`;

const Time = styled.p<{ isActive: boolean }>`
  width: 100%;
  text-align: center;
  font-size: var(--text-lg);
  display: ${(props) => (props.isActive ? '' : 'none')};
`;

const VegiInfo = styled.p<{ isActive: boolean }>`
  width: 100%;
  text-align: center;
  font-size: var(${(props) => (props.isActive ? '--text-sm' : '--text-lg')});
`;

const VegiImage = styled.img`
  margin: 0.5rem 0;
  width: auto;
  height: calc(100% - 1rem);
`;

export default function AlarmList({
  vegetable = 'onion',
  level = 1,
  isActive,
  disabled,
}: VegiInfo) {
  const { src, name } = vegetables[vegetable];
  return (
    <Link to="/vegipage">
      <ListContainer isActive={isActive} disabled={disabled}>
        <VegiImage src={src} alt={name} />
        <InfoContainer>
          <Time isActive={isActive}>AM 07:00</Time>
          <VegiInfo isActive={isActive}>
            Lv.{level} {name} {name}
          </VegiInfo>
        </InfoContainer>
      </ListContainer>
    </Link>
  );
}
