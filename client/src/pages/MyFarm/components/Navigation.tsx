import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { absolute, flexContainer } from 'styles';
import { getAsset } from 'utils';

const StyledNav = styled.nav`
  width: 100vw;
  ${absolute({ b: 0, l: 0 })};
  background: hsla(0, 0%, 100%, 0.2);
  border-radius: var(--spacing-xxs) var(--spacing-xxs) 0 0;
`;

const StyledUl = styled.ul`
  ${flexContainer({ d: 'row', w: 'nowrap', jc: 'space-between' })};
  margin: var(--spacing-xs) var(--spacing-md);
`;

export default function Navigation() {
  return (
    <StyledNav>
      <StyledUl>
        <li>
          <Link to="/alarmlist">
            <img src={getAsset('alarmlist.png')} alt="알람 리스트" />
          </Link>
        </li>
        <li>
          <Link to="/mypage">
            <img src={getAsset('user.png')} alt="내 정보" />
          </Link>
        </li>
        <li>
          <Link to="/market">
            <img src={getAsset('cart.png')} alt="야채 시장" />
          </Link>
        </li>
      </StyledUl>
    </StyledNav>
  );
}
