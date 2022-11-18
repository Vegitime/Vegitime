import styled from 'styled-components';
import { ReactComponent as Money } from '@/assets/money.svg';

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

export default function MoneyInfo({ money = 1000 }: IMoneyInfo) {
  return (
    <Container>
      <Money />
      <span>{money}</span>
    </Container>
  );
}

interface IMoneyInfo {
  money?: number;
}
