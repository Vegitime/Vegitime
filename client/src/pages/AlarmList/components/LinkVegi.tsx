import { Link } from 'react-router-dom';
import styled from 'styled-components';
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
    ${({ isActive }) =>
      isActive ? '--color-normal-green' : '--color-light-green'}
  );
  background: #fff;
  font-size: 3.75rem;
  margin: 0 auto var(--spacing-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--spacing-md);
  :disabled {
    opacity: 0.5;
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
  display: ${({ isActive }) => (isActive ? '' : 'none')};
`;

const VegiInfo = styled.p<{ isActive: boolean }>`
  width: 100%;
  text-align: center;
  font-size: var(${({ isActive }) => (isActive ? '--text-sm' : '--text-md')});
`;

const VegiImage = styled.img`
  margin: 0.5rem 0;
`;

export default function LinkVegi({
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
        <VegiImage
          width={80}
          height={80}
          src={getAsset(`${type}0${level}.svg`)}
          alt={name}
        />
        <InfoContainer>
          <Time isActive={isActive}>{level === 5 ? '성장 완료!' : alarm}</Time>
          <VegiInfo isActive={isActive}>
            Lv.{level} {name}
          </VegiInfo>
        </InfoContainer>
      </ListContainer>
    </Link>
  );
}
