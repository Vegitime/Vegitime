import styled from 'styled-components';
//import { ReactComponent as Alarmlist } from '@/assets/alarmlist.svg';
//import { ReactComponent as User } from '@/assets/user.svg';
//import { ReactComponent as Cart } from '@/assets/cart.svg';
import { absolute, flexContainer } from '../../../styles';
import { getAsset } from '../../../utils';

const StyledNav = styled.nav`
  width: 100vw;
  ${absolute({ b: 0, l: 0 })};
  background: hsla(0, 0%, 100%, 0.2);
  border-radius: var(--spacing-md) var(--spacing-md) 0 0;
`;

const StyledUl = styled.ul`
  ${flexContainer({ d: 'row', w: 'nowrap', jc: 'space-between' })};
  margin: var(--spacing-lg) var(--spacing-xl);
`;
console.log(process.env.PUBLIC_URL);

export default function Navigation() {
  return (
    <StyledNav>
      <StyledUl>
        <li>
          <img src={getAsset('alarmlist.png')} alt="캐시" />
        </li>
        <li>
          <img src={getAsset('user.png')} alt="캐시" />
        </li>
        <li>
          <img src={getAsset('cart.png')} alt="캐시" />
        </li>
      </StyledUl>
    </StyledNav>
  );
}
