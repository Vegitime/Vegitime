import { ReactComponent as Home } from '@/assets/home.svg';
import { ReactComponent as Logout } from '@/assets/logout.svg';
import { MoneyInfo } from './index';
import styled from 'styled-components';

const StyledHeader = styled.header`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 1rem;
`;

export default function Header() {
  return (
    <StyledHeader>
      <Home />
      <StyledDiv>
        <MoneyInfo />
        <Logout />
      </StyledDiv>
    </StyledHeader>
  );
}
