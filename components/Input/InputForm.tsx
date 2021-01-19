import { FormControl, InputLabel } from '@material-ui/core';
import React from 'react';
import { InputMain } from './InputMain';

type RefReturn =
  | string
  | ((instance: HTMLInputElement | null) => void)
  | React.RefObject<HTMLInputElement>
  | null
  | undefined;

type InputFormPropsType = {
  name: string;
  label: string;
  placeholder: string;
  error: boolean;
  type?: string;
  register: () => RefReturn;
};

export default function InputForm({
  name,
  error,
  label,
  placeholder,
  type = 'text',
  register,
}: InputFormPropsType) {
  return (
    <FormControl style={{ width: '100%', margin: '10px 0' }}>
      <InputLabel error={error} shrink htmlFor={name}>
        {label}
      </InputLabel>
      <InputMain
        error={error}
        inputRef={register}
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
      />
    </FormControl>
  );
}
