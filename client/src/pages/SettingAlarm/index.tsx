import { Navigation, TimePicker } from './components';
import { Header, Title } from 'components';
import styled from 'styled-components';
import { flexContainer } from 'styles';
import users from '../../../../server/mock/users.js';

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  padding: var(--spacing-xxl) var(--spacing-xxs) var(--spacing-xs);
`;

const StyledMain = styled.main`
  ${flexContainer({ d: 'column', w: 'nowrap', ai: 'center' })};
  margin-bottom: 15.625rem;
`;

export default function SettingAlarm() {
  return (
    <Container>
      <Header />
      <StyledMain>
        <Title>Setting Alarm</Title>
        <TimePicker />
      </StyledMain>
      <Navigation />
    </Container>
  );
}
