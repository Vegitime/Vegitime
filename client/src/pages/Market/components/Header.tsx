import { MoneyInfo } from './index';
import styled from 'styled-components';
import { flexContainer } from 'styles';
import { getAsset } from 'utils';
import { Link } from 'react-router-dom';

const StyledHeader = styled.header`
  ${flexContainer({ d: 'row', w: 'nowrap', jc: 'space-between' })}
  padding: 0 var(--spacing-base);
`;

const StyledDiv = styled.div`
  ${flexContainer({ d: 'row', w: 'nowrap', g: 'var(--spacing-base)' })}
`;

export default function Header() {
  return (
    <StyledHeader>
      <Link to="/myfarm">
        <img src={getAsset('home.png')} alt="메인 페이지 이동" />
      </Link>
      <StyledDiv>
        <MoneyInfo
          fontSize="var(--text-sm)"
          gap="var(--spacing-xxxs)"
          size="2.25rem"
        />
        <Link to="/">
          <img src={getAsset('logout.png')} alt="로그아웃" />
        </Link>
      </StyledDiv>
    </StyledHeader>
  );
}
