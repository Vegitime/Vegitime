import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { absolute, flexContainer } from 'styles';
import { getAsset } from 'utils';

const StyledNav = styled.nav`
  width: 100vw;
  position: sticky;
  bottom: 0;
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--spacing-xxs) var(--spacing-xxs) 0 0;
  background: hsla(0, 0%, 100%, 0.2);
  z-index: 1000;
`;

const StyledUl = styled.ul`
  ${flexContainer({ d: 'row', w: 'nowrap', jc: 'space-between' })};
`;

export default function Navigation() {
  return (
    <StyledNav>
      <StyledUl>
        <li>
          <Link to="/mypage">
            <img src={getAsset('user.svg')} alt="마이 페이지로 이동 " />
          </Link>
        </li>
        <li>
          <Link to="/alarmlist">
            <img src={getAsset('home.svg')} alt="홈으로 이동" />
          </Link>
        </li>
        <li>
          <Link to="/market">
            <img src={getAsset('cart.svg')} alt="야채 시장으로 이동" />
          </Link>
        </li>
      </StyledUl>
    </StyledNav>
  );
}
