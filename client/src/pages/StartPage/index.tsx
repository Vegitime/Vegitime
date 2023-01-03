import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FooterImg } from './components';

const StartContainer = styled.div`
  /* margin: 0 auto; */
  margin-top: 150px;
  min-width: 390px;
`;
const LogoImg = styled.img`
  display: block;
  margin: 0 auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
`;

const Button = styled(Link)`
  background: #5f9538;
  border-radius: 50px;
  font-size: 24px;
  padding: 14px 48px;
  color: #ffffff;
`;

export default function StartPage() {
  return (
    <>
      <StartContainer>
        <LogoImg src="/assets/logo.png" alt="vegitime 로고" />
        <ButtonContainer>
          <Button to="/">로그인</Button>
          <Button to="/">회원가입</Button>
        </ButtonContainer>
      </StartContainer>
      <FooterImg type="start" />
    </>
  );
}
