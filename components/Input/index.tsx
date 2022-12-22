import { FieldError } from 'react-hook-form';

import * as S from './styled';

type InputProps = {
  register: (arg: any) => any;
  name: string;
  type?: string;
  label?: string;
  error?: FieldError | undefined;
  maxLength?: number;
};

const Input = ({ register, name, type, label, error, maxLength }: InputProps) => (
  <S.InputWrapper>
    <S.Label>{label}</S.Label>
    <S.Input type={type || 'text'} {...register(name)} maxLength={maxLength || 200} />
    <S.ErrorText>{error?.message}</S.ErrorText>
  </S.InputWrapper>
);

export default Input;
