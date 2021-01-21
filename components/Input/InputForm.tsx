import { FormControl, InputBaseProps, InputLabel } from '@material-ui/core';
import React from 'react';
import { InputMain } from './InputMain';

type RefReturn =
  | string
  | ((instance: HTMLInputElement | null) => void)
  | React.RefObject<HTMLInputElement>
  | null
  | undefined;

interface InputFormPropsType extends InputBaseProps {
  name: string;
  label: string;
  placeholder: string;
  error: boolean;
  type?: string;
  passRef?: any;
  params?: any;
  register: () => RefReturn;
}

export default function InputForm({
  name,
  error,
  label,
  placeholder,
  type = 'text',
  register,
  passRef,
  params,
  ...rest
}: InputFormPropsType) {
  return (
    <FormControl style={{ width: '100%', margin: '10px 0' }}>
      <InputLabel error={error} shrink htmlFor={name}>
        {label}
      </InputLabel>
      <InputMain
        {...rest}
        ref={passRef}
        error={error}
        inputRef={register}
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
        inputProps={params?.inputProps}
        endAdornment={params?.InputProps.endAdornment}
      />
    </FormControl>
  );
}
