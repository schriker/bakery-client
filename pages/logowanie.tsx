import { Grid } from '@material-ui/core';
import Link from 'next/link';
import { ButtonPrimary } from '../components/Button/ButtonPrimary';
import Layout from '../components/Layout/Layout';
import LoginForm from '../components/LoginForm/LoginForm';
import { PaperMain } from '../components/Paper/PaperMain';
import { TypographyTitle } from '../components/Typography/TypographyTitle';
import SidePanelList from '../components/SidePanelList/SidePanelList';

const list = [
  'Darmowe ogłoszenia',
  'System sprzedaży',
  'Prowadzenie magazynu',
  'Błyskawiczne powiadomienia',
];

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
            <SidePanelList list={list} />
            <Link href="/rejestracja" passHref>
              <ButtonPrimary>Załóż konto</ButtonPrimary>
            </Link>
          </PaperMain>
        </Grid>
      </Grid>
    </Layout>
  );
}
