/* eslint-disable prettier/prettier */
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FooterImg from '../StartPage/components/FooterImg';
import { ReactComponent as Formuser } from '@/assets/formuser.svg';
import { ReactComponent as Padlock } from '@/assets/padlock.svg';

const FormContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 390px;
  min-width: 390px;
  margin: 140px auto 0;
  
  h2 {
    font-size: 50px;
    margin-bottom: 40px;
  }
`

const Form = styled.form`
  fieldset {
    display: flex;
    flex-direction: column;
    gap: 40px;
    align-items: center;
  }
`
const SignInErrorMessage = styled.div`
  width: 100%;
  position: absolute;
  bottom: 120px;
  margin-left: 30px;
  font-size: 16px;
  color: #F13E1F;
`

const FromInputContainer = styled.div`
  background: #FFFFFF;
  border-radius: 50px;
  position: relative;
  width: 100%;
  height: 60px;
  &:focus-within {
    border: 2px solid #5F9538;
  }
  svg {
    position: absolute;
    left: 30px;
    top: 12px;
  }

  ${SignInErrorMessage} {
    top: 68px !important;
  }
`


const FormInput = styled.input`
  width: 72%;
  height: 100%;
  margin-left: 81px;
  border: none;
  padding: none;
  outline: none;
  font-size: 24px;
`


const FromButton = styled.button<{isActive : boolean}>`
  width: 100%;
  height: 60px;
  background: ${(props) => (props.isActive ? '#5F9538' : '#A5c597')}; 
  border: none;
  border-radius: 50px;

  font-size: 24px;
  color: #FFFFFF;
`
const FormTip = styled.div`
  margin-top: 24px;
  font-size: 20px;
  display: flex;
  gap: 19px;
  a {
    color: #2E6316;
  }
`

export default function SignIn() {
  return (
    <>
      <FormContainer>
        <h2>Sign in</h2>
        <Form>
          <fieldset>
            <legend className="sr-only">회원 로그인 폼</legend>
            
            <FromInputContainer>
              <label className="sr-only" htmlFor="userId">아이디</label>
              <Formuser fill='#01192C' width="35" height="35"/>
              <FormInput type="text" id="userId" required placeholder="아이디를 입력해주세요"/>
              <SignInErrorMessage>아이디를 잘못 입력했습니다.</SignInErrorMessage>
            </FromInputContainer>
            
            <FromInputContainer>
              <label className="sr-only" htmlFor="userPwd">비밀번호</label>
              <Padlock fill='#01192C' width="35" height="35"/>
              <FormInput type="password" id="userPwd" required placeholder="패스워드를 입력해주세요"/>
              <SignInErrorMessage>비밀번호를 잘못 입력했습니다.</SignInErrorMessage>
            </FromInputContainer>
            
            <SignInErrorMessage>일치하는 회원 정보가 없어요. 다시 시도해주세요.</SignInErrorMessage>
            <FromButton type="submit" isActive={false}>로그인</FromButton>
          </fieldset>
        </Form>
        <FormTip>
          <span>아직 회원이 아니신가요?</span>
          <Link to="/" className="icon-right-open">회원가입</Link>
        </FormTip>
      </FormContainer>
      <FooterImg type="start" />
    </>
  );
}
