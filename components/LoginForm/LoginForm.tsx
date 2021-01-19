import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Link from 'next/link';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  LoginMutationVariables,
  useLoginMutation,
  useMeLazyQuery,
} from '../../generated/graphql';
import InputForm from '../Input/InputForm';
import { Link as MuiLink, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import mapServerErrorMessage from '../../helpers/mapServerErrorMessage';
import ButtonSubmit from '../Button/ButtonSubmit';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Podaj poprawny email.')
    .required('Adres email jest wymagany.'),
  password: yup.string().min(6, 'Hasło musi zawierać min. 6 znaków.'),
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
  const [
    getCurrentUser,
    { data: userData, loading: userLoading, error: userError },
  ] = useMeLazyQuery({
    errorPolicy: 'all'
  });
  const [login, { loading, data, error: serverErrors }] = useLoginMutation({
    errorPolicy: 'all',
  });

  useEffect(() => {
    if (data?.login) {
      getCurrentUser();
    }
  }, [data]);
  
  console.log(userData, userLoading, userError);
  const onSubmit = (data: LoginMutationVariables) => {
    if (!loading) {
      login({
        variables: data,
      });
    }
  };

  return (
    <>
      {formErrors &&
        Object.values(formErrors).map((error, index) => (
          <Alert style={{ marginBottom: 5 }} key={index} severity="error">
            {error.message}
          </Alert>
        ))}
      {serverErrors && (
        <Alert style={{ marginBottom: 5 }} severity="error">
          {mapServerErrorMessage(serverErrors.message)}
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <InputForm
            key={index}
            {...field}
            register={register}
            error={!!formErrors[field.name]}
          />
        ))}
        <Typography variant="body2" style={{ marginBottom: 10 }}>
          <Link href="/przypomnij-haslo" passHref>
            <MuiLink>Zapomniałeś hasła?</MuiLink>
          </Link>
        </Typography>
        <ButtonSubmit loading={loading}>Zaloguj się</ButtonSubmit>
      </form>
    </>
  );
}