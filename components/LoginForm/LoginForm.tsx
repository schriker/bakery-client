import { useForm } from 'react-hook-form';
import { ButtonPrimary } from '../Button/ButtonPrimary';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  LoginMutationVariables,
  useLoginMutation,
} from '../../generated/graphql';
import InputForm from '../Input/InputForm';

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6),
});

const fields = [
  {
    name: 'email',
    label: 'Adres e-mail',
    placeholder: 'Twój adres e-mail',
    type: 'text',
  },
  {
    name: 'password',
    label: 'Hasło',
    placeholder: 'Twoje hasło',
    type: 'password',
  },
];

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    errors: formErrors,
  } = useForm<LoginMutationVariables>({
    resolver: yupResolver(validationSchema),
  });
  const [login, { loading, data, error: serverErrors }] = useLoginMutation({
    errorPolicy: 'all',
  });

  const onSubmit = (data: LoginMutationVariables) =>
    login({
      variables: data,
    });

  console.log(loading, data, serverErrors?.message, formErrors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <InputForm
          key={index}
          {...field}
          register={register}
          error={!!formErrors[field.name]}
        />
      ))}
      <ButtonPrimary style={{ marginTop: 10 }} type="submit">
        Zaloguj się
      </ButtonPrimary>
    </form>
  );
}
