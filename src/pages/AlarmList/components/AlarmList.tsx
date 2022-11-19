import styled from 'styled-components';
import { ReactComponent as Eggplant } from '@/assets/eggplant.svg';
// import { ReactComponent as Remove } from '@/assets/remove.svg';

const ListContainer = styled.div`
  width: 390px;
  height: 80px;
  border-radius: 50px;
  background: #fff;
  font-size: 30px;
  margin: 0 auto 40px;
  display: flex;
  justify-content: space-between;
`;

const Span = styled.span`
  width: 100%;
  line-height: 80px;
  text-align: center;
`;

const VegiImage = styled(Eggplant)`
  margin-left: 56px;
  margin-top: 15px;
`;

// active 되었을 때 button icon style
// const RemoveButton = styled(Remove)`
//   margin-right: 48px;
//   margin-top: 20px;
// `;

export default function AlarmList() {
  return (
    <ListContainer>
      <VegiImage width="57px" height="50px" />
      <Span>AM 07:00</Span>
      {/* <RemoveButton width="80px" height="40px" /> */}
    </ListContainer>
  );
}
