import {
  makeStyles,
  Theme,
  createStyles,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import React from 'react';
import { Controller } from 'react-hook-form';
import { InputMain } from '../Input/InputMain';

type SelectMainPropsType = {
  children: React.ReactNode;
  placeholder: string;
  label: string;
  control: any;
  name: string;
  error: boolean;
};

const useSelectStyles = makeStyles((theme: Theme) =>
  createStyles({
    select: {
      '&:focus': {
        background: 'none',
      },
    },
  })
);

export default function SelectMain({
  placeholder,
  label,
  children,
  control,
  name,
  error,
}: SelectMainPropsType) {
  const classes = useSelectStyles();

  return (
    <FormControl style={{ width: '100%', margin: '10px 0' }} error={error}>
      <InputLabel shrink id={`${label}-select-label`}>
        {label}
      </InputLabel>
      <Controller
        as={
          <Select
            classes={classes}
            labelId={`${label}-select-label`}
            displayEmpty
            input={<InputMain />}
          >
            <MenuItem value="">{placeholder}</MenuItem>
            {children}
          </Select>
        }
        control={control}
        name={name}
        defaultValue=""
      />
    </FormControl>
  );
}
