import { RefReturn } from '../Input/InputForm';
import {
  Checkbox,
  createStyles,
  FormControlLabel,
  FormGroup,
  makeStyles,
  Theme,
} from '@material-ui/core';
import React from 'react';

const useCheckBoxStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.grey[500],
      '&$checked': {
        color: theme.palette.primary[800],
      },
    },
    checked: {},
  })
);

type CheckboxPropsType = {
  name: string;
  label: string;
  register: () => RefReturn;
};

export default function CheckboxMain({
  name,
  label,
  register,
}: CheckboxPropsType) {
  const classes = useCheckBoxStyles();

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            color="default"
            classes={classes}
            name={name}
            inputRef={register}
            inputProps={{ 'aria-label': name }}
          />
        }
        label={label}
      />
    </FormGroup>
  );
}
