import { Header, LinkVegiInfo, Title, Navigation } from './components';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  padding: 2rem 1rem 1rem;
  background: #eaf5f7;
`;

const StyledMain = styled.main`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin-bottom: 5rem;
`;

const StyledUl = styled.ul`
  display: flex;
  flex-flow: row wrap;
  gap: 1rem;
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    width: calc(50% - 0.5rem);
    box-sizing: border-box;
    padding: 1rem;
    border-radius: 1rem;
    background: rgba(255, 255, 255, 0.5);
  }
  a {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    width: 100%;
    text-decoration: none;
    color: black;
  }
`;

export default function MyFarm() {
  return (
    <Container>
      <Header />
      <StyledMain>
        <Title text="My Farm" />
        <StyledUl>
          <li>
            <LinkVegiInfo vegetble="eggplant" level={3} />
          </li>
          <li>
            <LinkVegiInfo vegetble="carrot" level={2} />
          </li>
          <li>
            <LinkVegiInfo vegetble="onion" level={1} />
          </li>
          <li>
            <LinkVegiInfo vegetble="eggplant" level={5} />
          </li>
        </StyledUl>
      </StyledMain>
      <Navigation />
    </Container>
  );
}
