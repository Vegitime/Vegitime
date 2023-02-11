import styled from 'styled-components';

interface IFieldProps {
  name: string;
  value: string;
  onBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface IInput {
  name: string;
  type: string;
  placeholder?: string;
  autoComplete?: string;
  phSize?: 'xs' | 'md';
  getFieldProps: (name: string) => IFieldProps;
}

const FormInput = styled.input<{ phSize?: string }>`
  width: 74%;
  height: 100%;
  margin-left: 4.5rem; // 83px
  border: none;
  padding: 0;
  outline: none;
  font-size: var(--text-md);
  border-radius: 0px var(--text-xxl) var(--text-xxl) 0px; // 50px
  &::placeholder {
    font-size: ${(props) =>
      props.phSize === 'xs' ? 'var(--text-xs)' : 'var(--text-sm)'};
    color: var(--color-grey);
  }
`;

export default function Input({
  name,
  phSize,
  getFieldProps,
  ...props
}: IInput) {
  return <FormInput phSize={phSize} {...props} {...getFieldProps(name)} />;
}
