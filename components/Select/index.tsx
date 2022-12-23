import { FieldError } from 'react-hook-form';

import * as S from './styled';

type Option = {
  key: string;
  value: string;
  label: string;
};

type InputProps = {
  register: (arg: any) => any;
  name: string;
  type?: string;
  label?: string;
  error?: FieldError | undefined;
  options: Option[];
};

const Select = ({ register, name, label, error, options }: InputProps) => (
  <S.InputWrapper>
    <S.Label>{label}</S.Label>
    <S.Input {...register(name)}>
      <option value="">none</option>
      {options.map(opt => (
        <option key={opt.key} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </S.Input>
    <S.ErrorText>{error?.message}</S.ErrorText>
  </S.InputWrapper>
);

export default Select;
