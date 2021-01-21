import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  CreatUserMutationVariables,
  useCreatUserMutation,
} from '../../generated/graphql';
import InputForm from '../Input/InputForm';
import { Alert } from '@material-ui/lab';
import mapServerErrorMessage from '../../helpers/mapServerErrorMessage';
import ButtonSubmit from '../Button/ButtonSubmit';

const validationSchema = yup.object().shape({
  firstName: yup.string().min(2, 'Pole imię jest wymagane.').trim(),
  email: yup
    .string()
    .email('Podaj poprawny email.')
    .required('Adres email jest wymagany.')
    .trim(),
  password: yup.string().min(6, 'Hasło musi zawierać min. 6 znaków.'),
});

const fields = [
  {
    name: 'firstName',
    label: 'Imię',
    placeholder: 'Twoje imię',
    type: 'text',
  },
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

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    errors: formErrors,
  } = useForm<CreatUserMutationVariables>({
    resolver: yupResolver(validationSchema),
  });
  const [createUser, { error: serverErrors }] = useCreatUserMutation({
    errorPolicy: 'all',
  });

  const onSubmit = (data: CreatUserMutationVariables) => {
    createUser({ variables: data });
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
        <ButtonSubmit>Zarejestruj się</ButtonSubmit>
      </form>
    </>
  );
}
