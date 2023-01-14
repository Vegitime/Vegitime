import styled from 'styled-components';
import { MoneyInfo } from 'components';
import { flexContainer } from 'styles';
import { getAsset } from 'utils';

interface VegiInfoProps {
  src: string;
  name: string;
  price: number;
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

export default function ButtonVegiInfo({
  src,
  name,
  price,
  onClick,
}: VegiInfoProps) {
  return (
    <StyledButton onClick={onClick}>
      <img
        height={100}
        src={getAsset(src)}
        alt={`${name} 캐릭터 구매하러 이동`}
      />
      <div>{name}</div>
      <MoneyInfo size="small">{price}</MoneyInfo>
    </StyledButton>
  );
}
