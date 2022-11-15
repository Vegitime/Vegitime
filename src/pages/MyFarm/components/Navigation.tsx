import styled from 'styled-components';
import { ReactComponent as Alarmlist } from '@/assets/alarmlist.svg';
import { ReactComponent as User } from '@/assets/user.svg';
import { ReactComponent as Cart } from '@/assets/cart.svg';

const StyledNav = styled.nav`
  box-sizing: border-box;
  width: calc(100vw - 1rem);
  position: absolute;
  bottom: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 1rem;
`;

const StyledUl = styled.ul`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  margin: 0.5rem 1rem;
`;

export default function Navigation() {
  return (
    <StyledNav>
      <StyledUl>
        <li>
          <Alarmlist />
        </li>
        <li>
          <User />
        </li>
        <li>
          <Cart />
        </li>
      </StyledUl>
    </StyledNav>
  );
}
