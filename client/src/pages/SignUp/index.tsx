/* eslint-disable prettier/prettier */
import styled from 'styled-components';
import FooterImg from '../StartPage/components/FooterImg';
import { SignForm, SignTip } from './components';

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

export default function SignUp() {
  return (
    <>
      <FormContainer>
        <h2>Sign up</h2>
        <SignForm formType='signUp'/>
        <SignTip formType='signUp'/>
      </FormContainer>
      <FooterImg type="start" />
    </>
  );
}





