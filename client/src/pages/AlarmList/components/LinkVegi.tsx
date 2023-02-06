import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { flexContainer } from 'styles';
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
  ${flexContainer({
    d: 'row',
    w: 'nowrap',
    jc: 'space-between',
    ai: 'center',
  })};
  width: 100%;
  height: 5rem;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
  border-radius: 6.25rem;
  border-color: var(
    ${({ isActive }) =>
      isActive ? '--color-normal-green' : '--color-light-green'}
  );
  background: #fff;
  font-size: 3.75rem;
  :disabled {
    opacity: 0.5;
  }
`;

const InfoContainer = styled.div`
  ${flexContainer({
    d: 'column',
    w: 'nowrap',
    jc: 'center',
    ai: 'center',
    g: '0.5rem',
  })};
  width: 100%;
`;

const Time = styled.p<{ isActive: boolean }>`
  display: ${({ isActive }) => (isActive ? '' : 'none')};
  width: 100%;
  text-align: center;
  font-size: var(--text-lg);
`;

const VegiInfo = styled.p<{ isActive: boolean }>`
  width: 100%;
  text-align: center;
  font-size: var(${({ isActive }) => (isActive ? '--text-sm' : '--text-md')});
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
        <img
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
