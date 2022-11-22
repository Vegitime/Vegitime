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
  max-width: 24.375rem; // 390px
  min-width: 24.375rem; // 390px
  margin: 8.75rem auto 0; // 140px
  
  h2 {
    font-size: var(--text-xxl);
    margin-bottom: var(--spacing-md);
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
    gap: var(--spacing-md);
    align-items: center;
  }
`
const FormErrorMessage = styled.div<{formType: string}>`
  width: 100%;
  position: absolute;
  ${(props => (props.formType === 'signin' ? 'bottom: 7rem' : ''))}; // 112px;  // 로그인
  margin-left: var(--spacing-sm);
  font-size: var(--text-xs);
  color: var( ${(props) => (props.formType === 'signin' ? '--color-red' : '--color-gold')} );// #F13E1F;
`

const UserIdCheckButton = styled.button<{isCheckActive: boolean}>`
  position: absolute;
  top: 0;
  right: 0;
  width: 4.25rem; // 68px
  height: inherit;
  border: none;
  padding: 0;
  border-radius: 0px 1.813rem 1.813rem 0px; // 29px
  background: var( ${(props) => (props.isCheckActive ? '--color-normal-green' : '--color-light-green')} ); 
  font-size: var(--text-xs);
  color: var(--color-white);
`

const FormInputContainer = styled.div`
  background: var(--color-white);
  border-radius: var(--text-xxl); // 50px
  position: relative;
  width: 100%;
  min-width: 24.375rem; // 390px
  height: 3.75rem; // 60px;

  &:focus-within {
    border: 0.125rem solid var(--color-normal-green);  // 2px
    ${FormErrorMessage} {
      left: -0.125rem;   //-2px
      top: 4.125rem; // 66px;
    }
    ${UserIdCheckButton} {
      top: -0.125rem;   //-2px
      right: -0.125rem;   //-2px
    }
  }
  svg {
    position: absolute;
    left: var(--spacing-sm);
    top: 0.75rem; // 12px;
  }

  ${FormErrorMessage} {
    top: 4.25rem; // 68px
  }
`


const FormInput = styled.input<{phSize?: string}>`
  width: 74%;
  height: 100%;
  margin-left: 5.188rem; // 83px
  border: none;
  padding: 0;
  outline: none;
  font-size: var(--text-md);
  border-radius: 0px var(--text-xxl) var(--text-xxl) 0px; // 50px
  &::placeholder {
    font-size: var(${props => props.phSize ? props.phSize : '--text-md'});
  }
`


const FormButton = styled.button<{isActive : boolean}>`
  width: 100%;
  height: 3.75rem; // 60px;
  background: var( ${(props) => (props.isActive ? '--color-normal-green' : '--color-light-green')} ); 
  border: none;
  border-radius: var(--text-xxl); // 50px;

  font-size: var(--text-md);
  color: var(--color-white);
`

const FormTip = styled.div`
  margin-top: var(--spacing-base);
  font-size: var(--text-sm);
  display: flex;
  gap: var(--spacing-base);
  a {
    color: var(--color-deep-green);
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
            
            <FormInputContainer>
              <label className="sr-only" htmlFor="userId">아이디</label>
              <Formuser fill='#01192C' width="35" height="35"/>
              <FormInput type="text" id="userId" required placeholder="아이디를 입력해주세요"/>
              <FormErrorMessage formType="signin">아이디를 잘못 입력했습니다.</FormErrorMessage>
            </FormInputContainer>
            
            <FormInputContainer>
              <label className="sr-only" htmlFor="userPwd">비밀번호</label>
              <Padlock fill='#01192C' width="35" height="35"/>
              <FormInput type="password" id="userPwd" required placeholder="패스워드를 입력해주세요"/>
              <FormErrorMessage formType="signin">비밀번호를 잘못 입력했습니다.</FormErrorMessage>
            </FormInputContainer>
            
            <FormErrorMessage formType="signin">일치하는 회원 정보가 없어요. 다시 시도해주세요.</FormErrorMessage>
            <FormButton type="submit" isActive={true}>로그인</FormButton>
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
