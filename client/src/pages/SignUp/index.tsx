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
import { DuplicationButton } from './components';
import { ReactComponent as Formuser } from '@/assets/formuser.svg';
import { ReactComponent as Padlock } from '@/assets/padlock.svg';
import { ReactComponent as Name } from '@/assets/name.svg';
import { useForm } from 'hooks';

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
`;

export default function SignUp() {
  const navigate = useNavigate();
  const [isDuplicated, setIsDuplicated] = useState<boolean | null>(null);
  const { values, errors, touched, handleSubmit, getFieldProps, isValid } =
    useForm({
      initialValues: { id: '', nickname: '', password: '', pwcheck: '' },
      validate: (values, currentInput) => {
        const errors = {
          id: '',
          nickname: '',
          password: '',
          pwcheck: '',
        };
        if (!/^[a-z|A-Z|0-9|]{6,15}$/.test(values.id)) {
          errors.id = '영문, 숫자 포함 6~15자로 입력해주세요.';
        }
        if (!values.nickname) {
          errors.nickname = '1글자 이상 입력해주세요.';
        }
        if (!/^[a-z|A-Z|0-9|]{6,10}$/.test(values.password)) {
          errors.password = '영문, 숫자 포함 6~10자로 입력해주세요.';
        }
        if (values.password !== values.pwcheck) {
          errors.pwcheck = '비밀번호가 일치하지 않아요.';
        }
        if (currentInput === 'id') setIsDuplicated(null);
        return errors;
      },
      onSubmit: async (values) => {
        try {
          const result = await axios
            .post(
              `${process.env.URL}api/users/register`,
              {
                id: values.id,
                nickname: values.nickname,
                password: values.password,
              },
              { withCredentials: true }
            )
            .then((response) => response.data);
          if (result.body.success) navigate('/signin');
          else alert('회원가입에 실패하였습니다. 다시 시도해주세요.');
        } catch (err) {
          console.error(err);
        }
      },
    });
  const checkDuplication = async () => {
    try {
      const result = await axios
        .post(
          `${process.env.URL}api/users/duplication`,
          { id: values.id },
          { withCredentials: true }
        )
        .then((response) => response.data);
      setIsDuplicated(!result.body.success);
    } catch (err) {
      console.error(err);
    }
  };
  const getSVGColor = (content: string) =>
    content === '' ? '#CDCDCD' : '#01192C'; // 유틸로
  const isCompValid = () => {
    console.log('isDuplicated : ', isDuplicated);
    return isDuplicated === false && isValid();
  };
  return (
    <>
      <FormContainer>
        <h2>Sign up</h2>
        <Form handleSubmit={handleSubmit}>
          <fieldset>
            <legend className="sr-only">회원가입 폼</legend>
            <InputContainer>
              <Formuser fill={getSVGColor(values.id)} width="35" height="35" />
              <Input
                type="text"
                name="id"
                placeholder="아이디를 입력해주세요"
                autoComplete="off"
                getFieldProps={getFieldProps}
              />
              <DuplicationButton
                type="button"
                isCheckActive={errors.id === ''}
                onClick={checkDuplication}
              >
                {isDuplicated === false ? '완료!' : '중복확인'}
              </DuplicationButton>
              <ErrorMessage
                name="id"
                touched={touched}
                errors={errors}
                isDuplicated={isDuplicated}
                style={{ color: '--color-gold' }}
              ></ErrorMessage>
            </InputContainer>
            <InputContainer>
              <Name
                fill={getSVGColor(values.nickname)}
                width="35"
                height="35"
              />
              <Input
                type="text"
                name="nickname"
                placeholder="닉네임을 입력해주세요"
                autoComplete="off"
                getFieldProps={getFieldProps}
              />
              <ErrorMessage
                name="nickname"
                touched={touched}
                errors={errors}
                style={{ color: '--color-gold' }}
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
                style={{ color: '--color-gold' }}
              ></ErrorMessage>
            </InputContainer>
            <InputContainer>
              <Padlock
                fill={getSVGColor(values.pwcheck)}
                width="35"
                height="35"
              />
              <Input
                type="password"
                name="pwcheck"
                phSize={'sm'}
                placeholder="패스워드를 한 번 더 입력해주세요"
                autoComplete="off"
                getFieldProps={getFieldProps}
              />
              <ErrorMessage
                name="pwcheck"
                touched={touched}
                errors={errors}
                style={{ color: '--color-gold' }}
              ></ErrorMessage>
            </InputContainer>
            <TextButton
              type="submit"
              width="24.375rem"
              size="large"
              backgroundColor={'var(--color-normal-green)'}
              disabledBackgroundColor={'var(--color-light-green)'}
              disabled={!isCompValid()}
            >
              회원가입
            </TextButton>
          </fieldset>
        </Form>
        <SignTip formType="signUp" />
      </FormContainer>
      <FooterImg type="start" />
    </>
  );
}
