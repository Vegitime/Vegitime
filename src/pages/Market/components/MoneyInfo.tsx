import styled from 'styled-components';
import { getAsset } from '../../../utils';
import { flexContainer } from '../../../styles';
// import { getAsset } from 'utils';
// import { ReactComponent as Money } from '@/assets/money.svg';

interface IMoneyInfo {
  money: number;
  fontSize: string;
  gap: string;
  size: string;
}

const Container = styled.div<{ fontSize: string; gap: string; size: string }>`
  ${({ gap }) => flexContainer({ d: 'row', w: 'nowrap', ai: 'center', g: gap })}
  font-size: ${({ fontSize }) => fontSize};
  img {
    width: ${({ size }) => size};
    height: ${({ size }) => size};
  }
`;

export default function MoneyInfo({ money, fontSize, gap, size }: IMoneyInfo) {
  // console.log(getAsset('moneybag.png'));
  return (
    <Container fontSize={fontSize} gap={gap} size={size}>
      <img src={getAsset('moneybag.png')} alt="캐시" />
      <span>{money}</span>
    </Container>
  );
}

MoneyInfo.defaultProps = {
  money: 1000,
  fontSize: 'var(--text-xs)',
  gap: 'var(--spacing-xxs)',
  size: 'var(--spacing-md)',
};
