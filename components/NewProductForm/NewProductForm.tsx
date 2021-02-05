import { Grid, InputAdornment, MenuItem, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  CreateProductMutationVariables,
  useCreateProductMutation,
} from '../../generated/graphql';
import mapServerErrorMessage from '../../helpers/mapServerErrorMessage';
import useCategoires from '../../hooks/useCategories';
import ButtonSubmit from '../Button/ButtonSubmit';
import CheckboxMain from '../Checkbox/CheckboxMain';
import InputForm from '../Input/InputForm';
import PhotoUpload from '../PhotoUpload/PhotoUpload';
import SelectMain from '../Select/SelectMain';
import { TypographyTitle } from '../Typography/TypographyTitle';

let validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Pole nazwa jest wymagane.')
    .max(200, 'Nazwa zbyt długa. Max 200 znaków.')
    .trim(),
  price: yup
    .number()
    .typeError('Pole cena jest wymagane.')
    .positive('Cena nie może być ujemna.')
    .test(
      'is-decimal',
      'Podaj poprawną cene.',
      (value) => !!(value + '').match(/^(?!0\d|$)\d*(\.\d{1,2})?$/)
    )
    .required('Podaj cenę.'),
  count: yup
    .number()
    .typeError('Pole ilość jest wymagane.')
    .positive('Ilość nie może być ujemna.')
    .integer('Podaj poprawną ilość.')
    .required('Podaj ilość.'),
  category: yup
    .number()
    .typeError('Wybierz kategorię.')
    .positive('Wybierz kategorię.')
    .integer('Wybierz kategorię.')
    .required('Wybierz kategorię.'),
  delivery: yup.boolean(),
  shipping: yup.boolean(),
  pickup: yup.boolean(),
});

validationSchema = validationSchema.test('shipingMethodTest', null, (obj) => {
  if (obj.delivery || obj.shiping || obj.pickup) {
    return true;
  }

  return new yup.ValidationError(
    'Wybierz przynajmniej jedną opcję dostawy.',
    null,
    'shipping'
  );
});

const inputFields = [
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

type PhotoType = {
  id: number;
  image: string | null;
};

export default function NewProductForm() {
  const categories = useCategoires();
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [photos, setPhotos] = useState<PhotoType[]>(
    Array(8).fill({ id: 0, image: null })
  );
  const [isWithErrors, setWithErrors] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    control,
    errors: formErrors,
  } = useForm<CreateProductMutationVariables>({
    resolver: yupResolver(validationSchema),
  });
  const [
    createProduct,
    { loading, data, error: serverErrors },
  ] = useCreateProductMutation({
    errorPolicy: 'all',
  });

  useEffect(() => {
    if (Object.values(formErrors).length || serverErrors) {
      setWithErrors(true);
    }
  }, [formErrors, serverErrors]);

  const onSubmit = (data: CreateProductMutationVariables) => {
    console.log(data);
    createProduct({
      variables: {
        ...data,
        photos: photos.map(photo => photo.id).filter(id => id !== 0)
      }
    });
  };

  console.log(data);

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
        {inputFields.map((field, index) => (
          <InputForm
            key={index}
            {...field}
            register={register}
            error={!!formErrors[field.name]}
          />
        ))}
        <SelectMain
          error={!!formErrors.category}
          placeholder="Wybierz kategorie"
          control={control}
          label="Kategorie"
          name="category"
        >
          {categories.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </SelectMain>
        <TypographyTitle style={{ margin: '20px 0 10px 0' }} variant="h6">
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
          {photos.map((photo, index) => (
            <Grid item xs={3} key={index}>
              <PhotoUpload
                image={photo.image}
                id={photo.id}
                index={index}
                removePhoto={(id, index) =>
                  setPhotos((prevState) => {
                    const newPhotos = [...prevState];
                    newPhotos[index] = { id: 0, image: null };
                    return newPhotos;
                  })
                }
                errorHandler={(message) => setUploadError(message)}
                onCompleted={(id, image, index) =>
                  setPhotos((prevState) => {
                    const newPhotos = [...prevState];
                    newPhotos[index] = { id, image };
                    return newPhotos;
                  })
                }
              />
            </Grid>
          ))}
        </Grid>
        <ButtonSubmit loading={loading}>Dodaj produkt</ButtonSubmit>
      </form>
      <Snackbar
        open={isWithErrors}
        autoHideDuration={10000}
        onClose={() => setWithErrors(false)}
      >
        <Alert onClose={() => setWithErrors(false)} severity="error">
          Formularz zawiera błędy.
        </Alert>
      </Snackbar>
    </>
  );
}
