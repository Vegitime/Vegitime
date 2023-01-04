/* eslint-disable prettier/prettier */
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SignInputContainer from './SignInputContainer';

const Form = styled.form`
  fieldset {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    align-items: center;
  }
`;

const FormButton = styled.button<{ isActive: boolean }>`
  width: 100%;
  height: 3.75rem; // 60px;
  background: var(
    ${(props) =>
      props.isActive ? '--color-normal-green' : '--color-light-green'}
  );
  border: none;
  border-radius: var(--text-xxl); // 50px;

  font-size: var(--text-md);
  color: var(--color-white);
`;

const FormErrorMessage = styled.div<{ formType: string }>`
  width: 100%;
  position: absolute;
  ${(props) =>
    props.formType === 'signin' ? 'bottom: 7rem' : ''}; // 112px;  // 로그인
  margin-left: var(--spacing-sm);
  font-size: var(--text-xs);
  color: var(
    ${(props) => (props.formType === 'signin' ? '--color-red' : '--color-gold')}
  ); // #F13E1F;
`;

export default function SignForm({ formType }: { formType: string }) {
  const SIGNUP_LIST =
    formType === 'signIn'
      ? ['userId', 'userPwd']
      : ['userId', 'userNickName', 'userPwd', 'userPwdCheck'];
  return (
    <Form>
      <fieldset>
        <legend className="sr-only">
          {formType === 'signIn' ? '로그인 폼' : '회원가입 폼'}
        </legend>
        {SIGNUP_LIST.map((id) => (
          <SignInputContainer
            id={id as 'userId' | 'userNickName' | 'userPwd' | 'userPwdCheck'}
            formType={formType}
            key={formType + id}
          />
        ))}
        {formType === 'signIn' ? (
          <FormErrorMessage formType="signin">
            일치하는 회원 정보가 없어요. 다시 시도해주세요.
          </FormErrorMessage>
        ) : null}
        <FormButton isActive={true} type="submit">
          <Link to={formType === 'signIn' ? '/myfarm' : '/signin'}>
            {formType === 'signIn' ? '로그인' : '회원가입'}
          </Link>
        </FormButton>
      </fieldset>
    </Form>
  );
}
