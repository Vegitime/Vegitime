/* eslint-disable prettier/prettier */
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FormTip = styled.div`
  margin-top: var(--spacing-base);
  font-size: var(--text-sm);
  display: flex;
  gap: var(--spacing-base);
  a {
    color: var(--color-deep-green);
  }
`
export default function SignTip({formType}:{formType:string}) {
  return (
    <FormTip>
      <span>{formType === 'signIn' ? '아직 회원이 아니신가요?' : '이미 회원이세요?'}</span>
      <Link to="/">{formType === 'signIn' ? '회원가입' : '로그인'}</Link>
    </FormTip>
  );
}
