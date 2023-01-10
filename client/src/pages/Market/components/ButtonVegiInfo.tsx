import styled from 'styled-components';
import { MoneyInfo } from 'components';
import { flexContainer } from 'styles';
import { VEGETABLE_INFO } from 'utils';

interface VegiInfoProps {
  type: 'avocado' | 'carrot' | 'eggplant' | 'onion' | 'radish' | 'tomato';
  onClick: React.MouseEventHandler<HTMLButtonElement>;
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
    height: 8rem;
  }
  div {
    line-height: 1.5625rem;
  }
`;

export default function ButtonVegiInfo({ type, onClick }: VegiInfoProps) {
  const { src, name, price } = VEGETABLE_INFO[type];
  return (
    <StyledButton onClick={onClick}>
      <img height={100} src={src} alt={`${name} 캐릭터 구매하러 이동`} />
      <div>{name}</div>
      <MoneyInfo size="small">{price}</MoneyInfo>
    </StyledButton>
  );
}
