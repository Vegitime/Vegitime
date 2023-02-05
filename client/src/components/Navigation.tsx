import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FooterImg } from 'components';
import { flexContainer } from 'styles';
import { getAsset } from 'utils';

const StyledNav = styled.nav`
  width: 100vw;
  position: sticky;
  bottom: 0;
  padding: var(--spacing-base) var(--spacing-md);
  border-radius: var(--spacing-xxs) var(--spacing-xxs) 0 0;
  background: no-repeat bottom / cover
    url(${getAsset('nav_background_img_vegi.png')});
  z-index: 1000;
`;

const StyledUl = styled.ul`
  ${flexContainer({ d: 'row', w: 'nowrap', jc: 'space-between' })};
`;

export default function Navigation() {
  return (
    <>
      <StyledNav>
        <StyledUl>
          <li>
            <Link to="/mypage">
              <img
                width={36}
                height={36}
                src={getAsset('user.svg')}
                alt="마이 페이지로 이동 "
              />
            </Link>
          </li>
          <li>
            <Link to="/alarmlist">
              <img
                width={36}
                height={36}
                src={getAsset('home.svg')}
                alt="홈으로 이동"
              />
            </Link>
          </li>
          <li>
            <Link to="/market">
              <img
                width={36}
                height={36}
                src={getAsset('cart.svg')}
                alt="야채 시장으로 이동"
              />
            </Link>
          </li>
        </StyledUl>
      </StyledNav>
      <FooterImg type="main" />
    </>
  );
}
