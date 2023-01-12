import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getAsset, VEGETABLE_INFO } from 'utils';

interface VegiInfo {
  type: 'avocado' | 'carrot' | 'eggplant' | 'onion' | 'radish' | 'tomato';
  level: number;
  alarm: string;
  isActive: boolean;
  disabled: boolean;
  id: number;
}

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
  height: 100%;
`;

export default function AlarmList({
  type,
  level,
  alarm,
  isActive,
  disabled,
  id,
}: VegiInfo) {
  const { name } = VEGETABLE_INFO[type];
  return (
    <Link to={`/myvegi/${id}`}>
      <ListContainer isActive={isActive} disabled={disabled}>
        <VegiImage src={getAsset(`${type}0${level}.svg`)} alt={name} />
        <InfoContainer>
          <Time isActive={isActive}>{alarm}</Time>
          <VegiInfo isActive={isActive}>
            Lv.{level} {name}
          </VegiInfo>
        </InfoContainer>
      </ListContainer>
    </Link>
  );
}
