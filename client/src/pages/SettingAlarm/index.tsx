import { TimePicker } from './components';
import { Header, Title, Navigation } from 'components';
import styled from 'styled-components';
import { flexContainer } from 'styles';
// import users from '../../../../server/mock/users.js';

const StyledMain = styled.main`
  ${flexContainer({ d: 'column', w: 'nowrap', ai: 'center' })};
  position: relative;
  min-height: 100vh;
  padding: 0 var(--spacing-xxs) var(--spacing-xs);
`;

export default function SettingAlarm() {
  return (
    <>
      <Header />
      <StyledMain>
        <Title>Setting Alarm</Title>
        <TimePicker />
      </StyledMain>
      <Navigation />
    </>
  );
}
