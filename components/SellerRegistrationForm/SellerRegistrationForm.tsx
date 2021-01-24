import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import { Alert, AutocompleteChangeReason } from '@material-ui/lab';
import Link from 'next/link';
import React, { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import SearchLocationInput from '../../components/Search/SearchLocationInput';
import {
  City,
  CreateSellerMutationVariables,
  useCreateSellerMutation,
} from '../../generated/graphql';
import mapServerErrorMessage from '../../helpers/mapServerErrorMessage';
import ButtonSubmit from '../Button/ButtonSubmit';
import InputForm from '../Input/InputForm';

const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, 'Pole imię jest wymagane.')
    .max(200, 'Imię zbyt długie.')
    .trim(),
  lastName: yup
    .string()
    .min(2, 'Pole nazwisko jest wymagane.')
    .max(200, 'Nazwisko zbyt długie.')
    .trim(),
  email: yup
    .string()
    .email('Podaj poprawny email.')
    .max(200, 'Email zbyt długi.')
    .required('Adres email jest wymagany.'),
  password: yup
    .string()
    .min(6, 'Hasło musi zawierać min. 6 znaków.')
    .max(200, 'Hasło zbyt długie.'),
  phone: yup
    .string()
    .matches(
      /^(?:(?:(?:\+|00)?48)|(?:\(\+?48\)))?(?:1[2-8]|2[2-69]|3[2-49]|4[1-68]|5[0-9]|6[0-35-9]|[7-8][1-9]|9[145])\d{7}$/,
      'Podaj poprawny numer telefonu.'
    ),
  city: yup.string().required('Wybierz miejscowość.'),
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
    resolver: yupResolver(validationSchema) as any,
  });
  const [selctedCity, setSelectedCity] = useState<City | null>(null);
  const [
    createSeller,
    { error: serverErrors, data, loading },
  ] = useCreateSellerMutation({
    errorPolicy: 'all',
  });

  const onSubmit = (data: CreateSellerMutationVariables) => {
    createSeller({ variables: { ...data, city: selctedCity.id } });
  };

  const onCitySelectHandler = (
    event: ChangeEvent<{}>,
    value: City,
    reason: AutocompleteChangeReason
  ) => {
    if (reason === 'select-option') {
      setSelectedCity(value);
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
      {data?.createSeller.id && (
        <Alert
          action={
            <Link passHref href="/logowanie">
              <Button component="a" color="inherit" size="small">
                ZALOGUJ SIĘ
              </Button>
            </Link>
          }
        >
          Konto zostało utworzone.
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
        <ButtonSubmit loading={loading}>Zarejestruj się</ButtonSubmit>
      </form>
    </>
  );
}
