import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import Input from 'components/Input';

import * as S from './styles';

export type FormData = {
  logId?: string;
  actionType?: string;
  applicationType?: string;
  fromDate?: Date;
  selectDate?: Date;
  toDate?: Date;
  applicationId?: number;
};

export type Props = {
  onSubmit: (arg: any) => void;
};

const FiltersForm = ({ onSubmit }: Props): JSX.Element => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: {} });

  return (
    <S.FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <Input register={register} name="logId" error={errors.logId} label="Log ID" type="text" />
      <Input register={register} name="actionType" error={errors.actionType} label="Action Type" type="text" />
      <Input
        register={register}
        name="applicationType"
        error={errors.applicationType}
        label="Application Type"
        type="text"
      />
      <Input register={register} name="fromDate" error={errors.fromDate} label="From Date" type="text" />
      <Input register={register} name="selectDate" error={errors.selectDate} label="Select Date" type="text" />
      <Input register={register} name="toDate" error={errors.selectDate} label="To Date" type="text" />
      <Input register={register} name="applicationId" error={errors.applicationId} label="To Date" type="text" />
      <button type="submit">Search Logger</button>
    </S.FormWrapper>
  );
};

export default FiltersForm;
