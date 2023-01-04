import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { flexContainer } from 'styles';
import { getAsset } from 'utils';
import { MoneyInfo } from 'components';

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  ${flexContainer({ d: 'row', w: 'nowrap', jc: 'space-between' })}
  margin-top: var(--spacing-lg);
  padding: var(--spacing-xxs) var(--spacing-md);
  background-color: var(--color-skyblue);
  z-index: 1000;
`;

const StyledDiv = styled.div`
  ${flexContainer({ d: 'row', w: 'nowrap', g: 'var(--spacing-base)' })}
`;

// 갖고있는 돈 변경
// 로그아웃 아이콘 클릭시 이벤트 핸들러 변경

export default function Header() {
  const navigate = useNavigate();

  return (
    <StyledHeader>
      <button onClick={() => navigate(-1)}>
        <img src={getAsset('arrow.svg')} alt="뒤로 가기" />
      </button>
      <StyledDiv>
        <MoneyInfo size="large">{2323200}</MoneyInfo>
        <button type="button" onClick={() => console.log('로그아웃 연결')}>
          <img src={getAsset('logout.svg')} alt="로그아웃" />
        </button>
      </StyledDiv>
    </StyledHeader>
  );
}
