import styled from 'styled-components';

interface Ierror {
  [key: string]: string;
}

interface Itouched {
  [key: string]: boolean;
}

interface IErrorMessage {
  name: string;
  touched: Itouched;
  errors: Ierror;
  isDuplicated?: boolean | null;
  serverError?: boolean;
  style: { color: string; bottom?: string };
}
const FormErrorMessage = styled.div<{
  style: { color: string; bottom?: string };
}>`
  width: 100%;
  position: absolute;
  font-size: var(--text-xs);
  ${({ style }) => (style.bottom ? '' : 'top : 4.25rem')}; // 68px
  left: var(--spacing-sm);
  bottom: ${({ style }) => style.bottom}; // 112px;  // 로그인
  color: var(${({ style }) => style.color}); // #F13E1F;
`;

export default function ErrorMessage({
  name,
  touched,
  errors,
  isDuplicated,
  serverError,
  style,
}: IErrorMessage) {
  if (serverError)
    return (
      <FormErrorMessage style={style}>
        일치하는 회원 정보가 없어요. 다시 시도해주세요.
      </FormErrorMessage>
    );
  if (isDuplicated === undefined || isDuplicated === null) {
    if (!touched[name] || !errors[name]) {
      return null;
    }
    return <FormErrorMessage style={style}>{errors[name]}</FormErrorMessage>;
  }
  // 중복 체크
  if (!isDuplicated) style.color = '--color-normal-green';
  return (
    <FormErrorMessage style={style}>
      {isDuplicated
        ? '이미 존재하는 아이디입니다.'
        : '사용 가능한 아이디입니다.'}
    </FormErrorMessage>
  );
}
