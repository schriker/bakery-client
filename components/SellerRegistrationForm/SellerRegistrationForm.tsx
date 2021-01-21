import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  City,
  CreateSellerMutationVariables,
  useCreateSellerMutation,
} from '../../generated/graphql';
import InputForm from '../Input/InputForm';
import { Alert, AutocompleteChangeReason } from '@material-ui/lab';
import mapServerErrorMessage from '../../helpers/mapServerErrorMessage';
import ButtonSubmit from '../Button/ButtonSubmit';
import SearchLocationInput from '../../components/Search/SearchLocationInput';
import React, { ChangeEvent } from 'react';

const validationSchema = yup.object().shape({
  firstName: yup.string().min(2, 'Pole imię jest wymagane.').trim(),
  lastName: yup.string().min(2, 'Pole nazwisko jest wymagane.').trim(),
  email: yup
    .string()
    .email('Podaj poprawny email.')
    .required('Adres email jest wymagany.'),
  password: yup.string().min(6, 'Hasło musi zawierać min. 6 znaków.'),
  phone: yup
    .string()
    .matches(
      /^(?:(?:(?:\+|00)?48)|(?:\(\+?48\)))?(?:1[2-8]|2[2-69]|3[2-49]|4[1-68]|5[0-9]|6[0-35-9]|[7-8][1-9]|9[145])\d{7}$/,
      'Podaj poprawny numer telefonu.'
    ),
  city: yup
    .number()
    .required('Wybierz miejscowość.')
    .positive('Wybierz miejscowość.')
    .integer('Wybierz miejscowość.'),
});

const fields = [
  {
    name: 'firstName',
    label: 'Imię',
    placeholder: 'Twoje imię',
    type: 'text',
  },
  {
    name: 'lastName',
    label: 'Nazwisko',
    placeholder: 'Twoje nazwisko',
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
  {
    name: 'phone',
    label: 'Telefon',
    placeholder: 'Numer telefonu',
    type: 'text',
  },
];

export default function SellerRegistrationForm() {
  const {
    register,
    handleSubmit,
    errors: formErrors,
  } = useForm<CreateSellerMutationVariables>({
    resolver: yupResolver(validationSchema),
  });
  const [createSeller, { error: serverErrors }] = useCreateSellerMutation();

  const onSubmit = (data: CreateSellerMutationVariables) => {
    createSeller({ variables: data });
  };

  const onCitySelectHandler = (
    event: ChangeEvent<{}>,
    value: City,
    reason: AutocompleteChangeReason
  ) => {};

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
        <SearchLocationInput
          onSelectOption={(event, value, reason) =>
            onCitySelectHandler(event, value, reason)
          }
          render={(params, handleUserInput) => (
            <InputForm
              passRef={params.InputProps.ref}
              params={params}
              placeholder="Wybierz miejscowość"
              label="Miejscowość"
              name="city"
              onChange={handleUserInput}
              register={register}
              error={!!formErrors['city']}
            />
          )}
        />
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
