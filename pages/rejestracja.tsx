import { Grid } from '@material-ui/core';
import Layout from '../components/Layout/Layout';
import { PaperMain } from '../components/Paper/PaperMain';
import { TypographyTitle } from '../components/Typography/TypographyTitle';
import Link from 'next/link';
import { ButtonPrimary } from '../components/Button/ButtonPrimary';
import SidePanelList from '../components/SidePanelList/SidePanelList';
import { TabsMain } from '../components/Tabs/TabsMain';
import RegistrationForm from '../components/RegistrationForm/RegistrationForm';
import SellerRegistrationForm from '../components/SellerRegistrationForm/SellerRegistrationForm';
import { useMeQuery } from '../generated/graphql';
import { useRouter } from 'next/dist/client/router';

const list = [
  'Możliwość zakupu',
  'Kontakt ze sprzedajcym lub klientem',
  'Darmowe ogłoszenia',
  'System sprzedaży',
  'Prowadzenie magazynu',
  'Błyskawiczne powiadomienia',
];

export default function Register() {
  const { data } = useMeQuery();
  const router = useRouter();
  if (data) {
    router.push('/moje-konto');
  }

  return (
    <Layout>
      <Grid container justify="center" spacing={3}>
        <Grid item xs={8}>
          <PaperMain elevation={6} square>
            <TypographyTitle variant="h6" component="div">
              Rejestracja
            </TypographyTitle>
            <TabsMain
              title="wybor-konta"
              labels={['Konto Klienta', 'Konto Sprzedawcy']}
            >
              <RegistrationForm />
              <SellerRegistrationForm />
            </TabsMain>
          </PaperMain>
        </Grid>
        <Grid item xs={4}>
          <PaperMain elevation={6} square>
            <TypographyTitle variant="h6" component="div">
              Co daje rejestracja?
            </TypographyTitle>
            <SidePanelList list={list} />
            <TypographyTitle
              variant="h6"
              component="div"
              style={{ marginTop: 30 }}
            >
              Posiadasz już konto?
            </TypographyTitle>
            <Link href="/logowanie" passHref>
              <ButtonPrimary>Zaloguj się</ButtonPrimary>
            </Link>
          </PaperMain>
        </Grid>
      </Grid>
    </Layout>
  );
}
