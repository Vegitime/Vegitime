import styled from 'styled-components';

const StartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const Button = styled.div`
  background: #5f9538;
  border-radius: 50px;
`;

export default function StartPage() {
  return (
    <StartContainer>
      <img src="/assets/logo.png" alt="vegitime 로고" />
      <ButtonContainer>
        <Button>로그인</Button>
        <Button>회원가입</Button>
      </ButtonContainer>
    </StartContainer>
  );
}
