import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import {
  TextButton,
  Form,
  InputContainer,
  Input,
  ErrorMessage,
  SignTip,
  FooterImg,
} from 'components';
import { ReactComponent as Formuser } from '@/assets/formuser.svg';
import { ReactComponent as Padlock } from '@/assets/padlock.svg';
import { useForm } from 'hooks';

const FormContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 20rem; // 320px
  min-width: 20rem; // 320px
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
`;

export default function SignIn() {
  const [serverError, setServerError] = useState(false);
  const navigate = useNavigate();
  const { values, errors, touched, handleSubmit, getFieldProps, isValid } =
    useForm({
      initialValues: { id: '', password: '' },
      validate: (values) => {
        const errors = {
          id: '',
          password: '',
        };
        if (!/^[a-z|A-Z|0-9|]{6,15}$/.test(values.id)) {
          errors.id = '영문, 숫자 포함 6~15자로 입력해주세요.';
        }
        if (!/^[a-z|A-Z|0-9|]{6,10}$/.test(values.password)) {
          errors.password = '영문, 숫자 포함 6~10자로 입력해주세요.';
        }
        setServerError(false);
        return errors;
      },
      onSubmit: async (values) => {
        try {
          const result = await axios
            .post(
              `${process.env.URL}api/users/login`,
              { id: values.id, password: values.password },
              { withCredentials: true }
            )
            .then((response) => response.data);
          if (result.body.success) navigate('/alarmlist');
          else {
            // 메시지
            setServerError(true);
          }
        } catch (err) {
          console.error(err);
        }
      },
    });

  const getSVGColor = (content: string) =>
    content === '' ? '#CDCDCD' : '#01192C'; // 유틸로
  return (
    <>
      <FormContainer>
        <h2>Sign in</h2>
        <Form handleSubmit={handleSubmit}>
          <fieldset>
            <legend className="sr-only">로그인 폼</legend>
            <InputContainer>
              <Formuser fill={getSVGColor(values.id)} width="35" height="35" />
              <Input
                type="text"
                name="id"
                placeholder="아이디를 입력해주세요"
                autoComplete="off"
                getFieldProps={getFieldProps}
              />
              <ErrorMessage
                name="id"
                touched={touched}
                errors={errors}
                style={{ color: '--color-red' }}
              ></ErrorMessage>
            </InputContainer>
            <InputContainer>
              <Padlock
                fill={getSVGColor(values.password)}
                width="35"
                height="35"
              />
              <Input
                type="password"
                name="password"
                placeholder="패스워드를 입력해주세요"
                autoComplete="off"
                getFieldProps={getFieldProps}
              />
              <ErrorMessage
                name="password"
                touched={touched}
                errors={errors}
                style={{ color: '--color-red' }}
              ></ErrorMessage>
            </InputContainer>
            <ErrorMessage
              name="password"
              touched={touched}
              errors={errors}
              serverError={serverError}
              style={{ color: '--color-red', bottom: '7rem' }}
            ></ErrorMessage>
            <TextButton
              type="submit"
              width="100%"
              size="large"
              backgroundColor={'var(--color-normal-green)'}
              disabledBackgroundColor={'var(--color-light-green)'}
              disabled={!isValid()}
            >
              로그인
            </TextButton>
          </fieldset>
        </Form>
        <SignTip formType="signIn" />
      </FormContainer>
      <FooterImg type="start" />
    </>
  );
}

// {formType === 'signIn' ? (
//   <FormErrorMessage formType="signin">
//     일치하는 회원 정보가 없어요. 다시 시도해주세요.
//   </FormErrorMessage>
// ) : null}
// <FormButton isActive={true} type="submit">
//   {/* <Link to={formType === 'signIn' ? '/alarmList' : '/signin'}> */}
//     {formType === 'signIn' ? '로그인' : '회원가입'}
//   {/* </Link> */}
// </FormButton>

// /* eslint-disable prettier/prettier */
// import styled from 'styled-components';
// import FooterImg from '../StartPage/components/FooterImg';
// import { SignForm, SignTip } from '../SignUp/components';

// const FormContainer = styled.div`
//   position: relative;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   max-width: 24.375rem; // 390px
//   min-width: 24.375rem; // 390px
//   margin: 8.75rem auto 0; // 140px

//   h2 {
//     font-size: var(--text-xxl);
//     margin-bottom: var(--spacing-md);
//   }

//   .sr-only {
//     position: absolute;
//     width: 1px;
//     height: 1px;
//     margin: -1px;
//     overflow: hidden;
//     clip: rect(0, 0, 0, 0);
//     clip-path: inset(50%);
//   }
// `;

// export default function SignIn() {
//   return (
//     <></>
//     //     <>
//     //       <FormContainer>
//     //         <h2>Sign in</h2>
//     //         <SignForm formType="signIn" />
//     //         <SignTip formType="signIn" />
//     //       </FormContainer>
//     //       <FooterImg type="start" />
//     //     </>
//   );
// }
