/* eslint-disable prettier/prettier */
import styled from 'styled-components';
import { ReactComponent as Formuser } from '@/assets/formuser.svg';
import { ReactComponent as Padlock } from '@/assets/padlock.svg';
import { ReactComponent as Name } from '@/assets/name.svg';

const FormErrorMessage = styled.div<{formType: string}>`
  width: 100%;
  position: absolute;
  ${(props => (props.formType === 'signIn' ? 'bottom: 7rem' : ''))}; // 112px;  // 로그인
  margin-left: var(--spacing-sm);
  font-size: var(--text-xs);
  color: var( ${(props) => (props.formType === 'signIn' ? '--color-red' : '--color-gold')} );// #F13E1F;
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
    font-size: ${props => props.phSize ? props.phSize : 'var(--text-md)'};
  }
`

interface ISignInputContainer {
  id: ('userId' | 'userNickName' | 'userPwd' | 'userPwdCheck'), 
  formType:string, 
}

export default function SignInputContainer({id, formType}: ISignInputContainer) {
  const SIGN_INFO = {
    userId: {
      type: 'text',
      labelText: '아이디',
      errMsg: '영문, 숫자 포함 6~15자로 입력해주세요',
      phMsg: '아이디를 입력해주세요',
      isBtn: true,
      phSize: '',
      svg: <Formuser fill='#01192C' width="35" height="35"/>
    },
    userNickName: {
      type: 'text',
      labelText: '닉네임',
      errMsg: '1글자 이상 입력해주세요',
      phMsg: '닉네임을 입력해주세요',
      isBtn: false,
      phSize: '',
      svg: <Name fill='#01192C' width="35" height="35"/>
    },
    userPwd: {
      type: 'password',
      labelText: '비밀번호',
      errMsg: '영문, 숫자 포함 6~10자로 입력해주세요',
      phMsg: '패스워드를 입력해주세요',
      isBtn: false,
      phSize: '',
      svg: <Padlock fill='#01192C' width="35" height="35"/>
    },
    userPwdCheck: {
      type: 'password',
      labelText: '비밀번호 확인',
      errMsg: '비밀번호가 일치하지 않아요',
      phMsg: '패스워드를 한 번 더 입력해주세요',
      isBtn: false,
      phSize: '20px',
      svg: <Padlock fill='#01192C' width="35" height="35"/>
    },
  }
  console.log(formType)
  return (
    <FormInputContainer>
      <label className="sr-only" htmlFor={id}>{ SIGN_INFO[id].labelText }</label>
      { SIGN_INFO[id].svg }
      <FormInput type={SIGN_INFO[id].type} id={id} required placeholder={SIGN_INFO[id].phMsg} phSize={SIGN_INFO[id].phSize? SIGN_INFO[id].phSize : ''}/>
      <FormErrorMessage formType={formType}>{SIGN_INFO[id].errMsg}</FormErrorMessage>
      {formType==='signUp' && SIGN_INFO[id].isBtn ? <UserIdCheckButton type="button" isCheckActive={true}>완료!</UserIdCheckButton> : null}
    </FormInputContainer>
  )
}
