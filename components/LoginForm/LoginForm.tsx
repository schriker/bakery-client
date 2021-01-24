import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Link from 'next/link';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  LoginMutationVariables,
  useLoginMutation,
  useMeQuery,
} from '../../generated/graphql';
import InputForm from '../Input/InputForm';
import { Link as MuiLink, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import mapServerErrorMessage from '../../helpers/mapServerErrorMessage';
import ButtonSubmit from '../Button/ButtonSubmit';
import { useRouter } from 'next/dist/client/router';

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
  const router = useRouter();
  const {
    register,
    handleSubmit,
    errors: formErrors,
  } = useForm<LoginMutationVariables>({
    resolver: yupResolver(validationSchema),
  });
  const { data: userData, loading: userLoading, refetch } = useMeQuery();
  const [
    login,
    { loading: loginLoading, data, error: serverErrors },
  ] = useLoginMutation({
    errorPolicy: 'all',
  });

  const loading = userLoading || loginLoading;

  useEffect(() => {
    if (data?.login) {
      refetch();
    }
  }, [data]);

  useEffect(() => {
    if (userData) {
      router.push('/moje-konto')
    }
  }, [userData]);

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
        <ButtonSubmit loading={loginLoading}>Zaloguj się</ButtonSubmit>
      </form>
    </>
  );
}
