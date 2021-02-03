import {
  CreateProductMutationVariables,
  useCreateProductMutation,
} from '../../generated/graphql';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@material-ui/lab';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import mapServerErrorMessage from '../../helpers/mapServerErrorMessage';
import React, { useState } from 'react';
import InputForm from '../Input/InputForm';
import ButtonSubmit from '../Button/ButtonSubmit';
import { Grid, InputAdornment } from '@material-ui/core';
import CheckboxMain from '../Checkbox/CheckboxMain';
import { TypographyTitle } from '../Typography/TypographyTitle';
import PhotoUpload from '../PhotoUpload/PhotoUpload';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Podaj poprawny email.')
    .required('Adres email jest wymagany.'),
  password: yup.string().min(6, 'Hasło musi zawierać min. 6 znaków.'),
});

const fields = [
  {
    name: 'name',
    label: 'Nazwa',
    placeholder: 'Nazwa produktu',
    type: 'text',
  },
  {
    name: 'price',
    label: 'Cena',
    placeholder: 'Cena za sztukę',
    type: 'text',
    params: {
      InputProps: {
        endAdornment: <InputAdornment position="start">PLN</InputAdornment>,
      },
    },
  },
  {
    name: 'count',
    label: 'Ilość',
    placeholder: 'Ilość dostępnych sztuk',
    type: 'text',
  },
];

export default function NewProductForm() {
  const {
    register,
    handleSubmit,
    errors: formErrors,
  } = useForm<CreateProductMutationVariables>({
    // resolver: yupResolver(validationSchema),
  });
  const [
    createProduct,
    { loading, data, error: serverErrors },
  ] = useCreateProductMutation({
    errorPolicy: 'all',
  });
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [photos, setPhotos] = useState<number[]>([]);
  const onSubmit = (data: CreateProductMutationVariables) => {
    console.log(data);
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
        <TypographyTitle style={{ margin: '20px 0' }} variant="h6">
          Sposób dostawy:
        </TypographyTitle>
        <CheckboxMain name="delivery" register={register} label="Dowóz" />
        <CheckboxMain name="shiping" register={register} label="Wysyłka" />
        <CheckboxMain
          name="pickup"
          register={register}
          label="Odbiór osobisty"
        />
        <TypographyTitle style={{ margin: '20px 0' }} variant="h6">
          Zdjęcia:
        </TypographyTitle>
        {uploadError && (
          <Alert style={{ marginBottom: 15 }} severity="error">
            {uploadError}
          </Alert>
        )}
        <Grid container spacing={1}>
          {[...Array(8)].map((_, index) => (
            <Grid item xs={3} key={index}>
              <PhotoUpload
                disabled={index > photos.length}
                removePhoto={(id) =>
                  setPhotos((prevState) =>
                    prevState.filter((photo) => photo !== id)
                  )
                }
                errorHandler={(message) => setUploadError(message)}
                onCompleted={(id) =>
                  setPhotos((prevState) => [...prevState, id])
                }
              />
            </Grid>
          ))}
        </Grid>
        <ButtonSubmit loading={loading}>Dodaj produkt</ButtonSubmit>
      </form>
    </>
  );
}
