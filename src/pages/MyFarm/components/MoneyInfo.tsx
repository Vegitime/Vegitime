import { ReactComponent as Money } from '@/assets/money.svg';

export default function MoneyInfo({ money = 1000 }: IMoneyInfo) {
  return (
    <div>
      <Money />
      <span>{money}</span>
    </div>
  );
}

interface IMoneyInfo {
  money?: number;
}
