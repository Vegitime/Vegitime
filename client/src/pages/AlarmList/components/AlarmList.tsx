import styled from 'styled-components';
import { ReactComponent as Eggplant } from '@/assets/eggplant.svg';
// import { ReactComponent as Remove } from '@/assets/remove.svg';

const ListContainer = styled.div`
  width: 48.75rem;
  height: 10rem;
  border-radius: 6.25rem;
  background: #fff;
  font-size: 3.75rem;
  margin: 0 auto var(--spacing-md);
  display: flex;
  justify-content: space-between;
`;

const Span = styled.span`
  width: 100%;
  line-height: 10rem;
  text-align: center;
`;

const VegiImage = styled(Eggplant)`
  margin-left: var(--spacing-xl);
  margin-top: 1.875rem;
`;

// active 되었을 때 button icon style
// const RemoveButton = styled(Remove)`
//   margin-right: 48px;
//   margin-top: 20px;
// `;

export default function AlarmList() {
  return (
    <ListContainer>
      <VegiImage width="7.125rem" height="6.25rem" />
      <Span>AM 07:00</Span>
      {/* <RemoveButton width="80px" height="40px" /> */}
    </ListContainer>
  );
}
