import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import Layout from '../components/Layout/Layout';
import LoginForm from '../components/LoginForm/LoginForm';
import { PaperMain } from '../components/Paper/PaperMain';
import { TypographyTitle } from '../components/Typography/TypographyTitle';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import theme from '../lib/theme';
import Link from 'next/link';
import { ButtonPrimary } from '../components/Button/ButtonPrimary';

const useListStyles = makeStyles((tehem: Theme) =>
  createStyles({
    root: {
      listStyle: 'none',
      padding: 0,
      '& li': {
        display: 'flex',
        marginBottom: 10,
      },
      '& svg': {
        fill: theme.palette.secondary[500],
        marginRight: theme.spacing(1),
      },
    },
  })
);

const list = [
  'Darmowe ogłoszenia',
  'System sprzedaży',
  'Prowadzenie magazynu',
  'Błyskawiczne powiadomienia',
];

export default function Login() {
  const classes = useListStyles();

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
            <ul className={classes.root}>
              {list.map((item, index) => (
                <li key={index}>
                  <CheckCircleOutlineRoundedIcon fontSize="small" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/rejestracja" passHref>
              <ButtonPrimary>Załóż konto</ButtonPrimary>
            </Link>
          </PaperMain>
        </Grid>
      </Grid>
    </Layout>
  );
}
