import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.button<{ action: string }>`
  width: 100%;
  height: 3.75rem;
  background-color: var(
    ${(props) =>
      props.action === 'voice' ? '--color-normal-green' : '--color-gold'}
  );
  font-size: var(--text-md);
  color: var(--color-white);
  border-radius: 3.125rem;
  margin: 0 auto;
`;

export default function ActionButton({ action }: { action: string }) {
  return (
    <Link to={action === 'voice' ? '' : '/market'}>
      <Button action={action}>
        {action === 'voice' ? '칭찬하기' : '판매하기'}
      </Button>
    </Link>
  );
}
