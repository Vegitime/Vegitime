import styled from 'styled-components';
import { flexContainer } from 'styles';
import { getAsset } from 'utils';

interface IMoneyInfo {
  size: 'small' | 'large';
  children: number | undefined;
}

const moneyInfoStyle = {
  small: {
    gap: 'calc(var(--spacing-xxxs)/2)',
    fontSize: 'var(--text-xxs)',
    width: '1.25rem',
    height: '1.25rem',
  },
  large: {
    gap: 'var(--spacing-xxxs)',
    fontSize: 'var(--text-sm)',
    width: '2.25rem',
    height: '2.25rem',
  },
};

const Container = styled.div<{ size: 'small' | 'large' }>`
  ${({ size }) =>
    flexContainer({
      d: 'row',
      w: 'nowrap',
      ai: 'center',
      g: moneyInfoStyle[size].gap,
    })}
  font-size: ${({ size }) => moneyInfoStyle[size].fontSize};
  img {
    width: ${({ size }) => moneyInfoStyle[size].width};
    height: ${({ size }) => moneyInfoStyle[size].width};
  }
`;

export default function MoneyInfo({ size, children }: IMoneyInfo) {
  return (
    <Container size={size}>
      <img
        width={moneyInfoStyle[size].width}
        height={moneyInfoStyle[size].width}
        src={getAsset('money.svg')}
        alt="캐시"
      />
      <span>{children}</span>
    </Container>
  );
}

MoneyInfo.defaultProps = {
  size: 'small',
};
