import { useForm } from 'react-hook-form';

import Input from 'components/Input';
import Select from 'components/Select';

import { ApplicationTypes, ActionTypes } from 'lib/types/logger';

import * as S from './styles';

export type FormData = {
  logId?: string;
  actionType?: string;
  applicationType?: string;
  fromDate?: Date;
  toDate?: Date;
  applicationId?: number;
};

export type Props = {
  onSubmit: (arg: any) => void;
  defaultValues: FormData;
};

const ApplicationTypeOptions = [
  {
    key: ApplicationTypes.ADD_COMPANY_EMPLOYEE,
    value: ApplicationTypes.ADD_COMPANY_EMPLOYEE,
    label: ApplicationTypes.ADD_COMPANY_EMPLOYEE,
  },
  {
    key: ApplicationTypes.ADD_POA,
    value: ApplicationTypes.ADD_POA,
    label: ApplicationTypes.ADD_POA,
  },
  {
    key: ApplicationTypes.CERT_TITLE_DEED_PLOT,
    value: ApplicationTypes.CERT_TITLE_DEED_PLOT,
    label: ApplicationTypes.CERT_TITLE_DEED_PLOT,
  },
  {
    key: ApplicationTypes.LEASE_REGISTRATION,
    value: ApplicationTypes.LEASE_REGISTRATION,
    label: ApplicationTypes.LEASE_REGISTRATION,
  },
];

const ActionTypeOptions = [
  {
    key: ActionTypes.ADD_EMPLOYEE,
    value: ActionTypes.ADD_EMPLOYEE,
    label: ActionTypes.ADD_EMPLOYEE,
  },
  {
    key: ActionTypes.DARI_REFRESH_TOKEN,
    value: ActionTypes.DARI_REFRESH_TOKEN,
    label: ActionTypes.DARI_REFRESH_TOKEN,
  },
  {
    key: ActionTypes.INITIATE_APPLICATION,
    value: ActionTypes.INITIATE_APPLICATION,
    label: ActionTypes.INITIATE_APPLICATION,
  },
  {
    key: ActionTypes.SUBMIT_APPLICATION,
    value: ActionTypes.SUBMIT_APPLICATION,
    label: ActionTypes.SUBMIT_APPLICATION,
  },
];

const FiltersForm = ({ onSubmit, defaultValues }: Props): JSX.Element => {
  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormData>({ defaultValues });

  const onClear = () => {
    const values = getValues();
    Object.keys(values).forEach((key: any) => setValue(key, null));
    onSubmit({});
  };

  return (
    <S.FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <Input register={register} name="logId" error={errors.logId} label="Log ID" type="text" />
      <Select
        register={register}
        name="actionType"
        error={errors.actionType}
        label="Action Type"
        options={ActionTypeOptions}
      />
      <Select
        register={register}
        name="applicationType"
        error={errors.applicationType}
        label="Application Type"
        options={ApplicationTypeOptions}
      />
      <Input register={register} name="fromDate" error={errors.fromDate} label="From Date" type="date" />
      <Input register={register} name="toDate" error={errors.toDate} label="To Date" type="date" />
      <Input register={register} name="applicationId" error={errors.applicationId} label="Application ID" type="text" />
      <S.Button type="submit">Search Logger</S.Button>
      <S.Button onClick={onClear}>Clear</S.Button>
    </S.FormWrapper>
  );
};

export default FiltersForm;
