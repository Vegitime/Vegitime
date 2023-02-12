import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FooterImg, Title } from 'components';
import { getAsset } from 'utils';
import { flexContainer } from 'styles';

const Container = styled.div`
  ${flexContainer({ d: 'column', w: 'nowrap', ai: 'center', jc: 'center' })};
  position: relative;
  min-height: 100vh;
  padding: 0 var(--spacing-xxs) 80px;
`;

const LogoImg = styled.img`
  display: block;
  margin: 0 auto;
`;

const H2 = styled.h2`
  font-size: var(--text-lg);
  font-weight: 400;
  text-align: center;
  word-break: keep-all;
`;

const ButtonContainer = styled.div`
  ${flexContainer({
    d: 'row',
    jc: 'center',
    g: 'var(--spacing-xxs)',
  })}
  align-self: stretch;
  margin-top: var(--spacing-sm);
`;

const Button = styled(Link)`
  flex: 1;
  min-width: 120px;
  max-width: 170px;
  line-height: 60px;
  font-size: var(--text-md);
  text-align: center;
  color: #ffffff;
  border-radius: 50px;
  background: #5f9538;
`;

export default function StartPage() {
  return (
    <Container>
      <Title className="sr-only">시작 페이지</Title>
      <LogoImg
        width={300}
        height={300}
        src={getAsset('vegi_logo.png')}
        alt="vegitime 로고"
      />
      <H2>상쾌한 아침을 시작하세요!</H2>
      <ButtonContainer>
        <Button to="signin">로그인</Button>
        <Button to="signup">회원가입</Button>
      </ButtonContainer>
      <FooterImg type="start" />
    </Container>
  );
}
