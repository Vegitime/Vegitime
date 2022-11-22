/* eslint-disable prettier/prettier */
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FooterImg from '../StartPage/components/FooterImg';
import { ReactComponent as Formuser } from '@/assets/formuser.svg';
import { ReactComponent as Padlock } from '@/assets/padlock.svg';
import { ReactComponent as Name } from '@/assets/name.svg';

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

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    clip-path: inset(50%);
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
const SignUpErrorMessage = styled.div`
  width: 100%;
  position: absolute;
  margin-left: 30px;
  font-size: 16px;
  color: #D9A059;
`

const FromInputContainer = styled.div`
  background: #FFFFFF;
  border-radius: 50px;
  position: relative;
  width: 100%;
  min-width: 390px;
  height: 60px;
  &:focus-within {
    border: 2px solid #5F9538;
  }
  svg {
    position: absolute;
    left: 30px;
    top: 12px;
  }

  ${SignUpErrorMessage} {
    top: 68px !important;
  }
`
const UserIdCheckButton = styled.button<{isCheckActive: boolean}>`
  position: absolute;
  right: 0;
  width: 68px;
  height: 100%;
  border: none;
  padding: 0;
  border-radius: 0px 50px 50px 0px;
  background: ${(props) => (props.isCheckActive ? '#5F9538' : '#A5c597')}; 

  font-size: 16px;
  color: #FFFFFF;
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


export default function SignUp() {
  return (
    <>
      <FormContainer>
        <h2>Sign up</h2>
        <Form>
          <fieldset>
            <legend className="sr-only">회원 로그인 폼</legend>
            
            <FromInputContainer>
              <label className="sr-only" htmlFor="userId">아이디</label>
              <Formuser fill='#01192C' width="35" height="35"/>
              <FormInput type="text" id="userId" required placeholder="아이디"/>
              <SignUpErrorMessage>영문, 숫자 포함 6~15자로 입력해주세요.</SignUpErrorMessage>
              <UserIdCheckButton type="button" isCheckActive={true}>완료!</UserIdCheckButton>
            </FromInputContainer>

            <FromInputContainer>
              <label className="sr-only" htmlFor="userNickName">닉네임</label>
              <Name fill='#01192C' width="35" height="35"/>
              <FormInput type="text" id="userNickName" required placeholder="닉네임"/>
              <SignUpErrorMessage>1글자 이상 입력해주세요.</SignUpErrorMessage>
            </FromInputContainer>
            
            <FromInputContainer>
              <label className="sr-only" htmlFor="userPwd">비밀번호</label>
              <Padlock fill='#01192C' width="35" height="35"/>
              <FormInput type="password" id="userPwd" required placeholder="패스워드"/>
              <SignUpErrorMessage>영문, 숫자 포함 6~10자로 입력해주세요.</SignUpErrorMessage>
            </FromInputContainer>

            <FromInputContainer>
              <label className="sr-only" htmlFor="userPwdCheck">비밀번호 확인</label>
              <Padlock fill='#01192C' width="35" height="35"/>
              <FormInput type="password" id="userPwdCheck" required placeholder="패스워드 재확인"/>
              <SignUpErrorMessage>비밀번호가 일치하지 않아요.</SignUpErrorMessage>
            </FromInputContainer>
            
            <FromButton isActive={true} type="submit">회원가입</FromButton>
          </fieldset>
        </Form>

        <FormTip>
          <span>아직 회원이세요?</span>
          <Link to="/">로그인</Link>
        </FormTip>
      </FormContainer>
      <FooterImg type="start" />
    </>
  );
}
