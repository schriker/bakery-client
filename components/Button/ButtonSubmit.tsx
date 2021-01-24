import {
  CircularProgress,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import React from 'react';
import { ButtonPrimary } from '../Button/ButtonPrimary';

type ButtonSubmitPropsType = {
  children: React.ReactNode;
  loading: boolean;
};

const useLoadingClasses = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -10,
      marginLeft: -10,
    },
  })
);

export default function ButtonSubmit({
  children,
  loading,
}: ButtonSubmitPropsType) {
  const classes = useLoadingClasses();

  return (
    <ButtonPrimary disabled={loading} style={{ marginTop: 10 }} type="submit">
      {loading && (
        <CircularProgress
          classes={classes}
          size={20}
        />
      )}
      {children}
    </ButtonPrimary>
  );
}
