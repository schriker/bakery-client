import { Grid } from '@material-ui/core';
import React from 'react';
import Layout from '../components/Layout/Layout';
import LoginForm from '../components/LoginForm/LoginForm';
import { PaperMain } from '../components/Paper/PaperMain';
import { TypographyTitle } from '../components/Typography/TypographyTitle';

export default function Login() {
  return (
    <Layout>
      <Grid container justify="center" spacing={3}>
        <Grid item xs={8}>
          <PaperMain elevation={6} square>
            <TypographyTitle variant="h6" component="div">
              Logowanie
            </TypographyTitle>
            <LoginForm />
          </PaperMain>
        </Grid>
        <Grid item xs={4}>
          <PaperMain elevation={6} square>
            <TypographyTitle variant="h6" component="div">
              Rejestracja
            </TypographyTitle>
          </PaperMain>
        </Grid>
      </Grid>
    </Layout>
  );
}
