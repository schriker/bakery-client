import Layout from '../components/Layout/Layout';
import { PaperMain } from '../components/Paper/PaperMain';
import useLoginRedirect from '../hooks/useLoginRedirect';

export default function Account() {
  useLoginRedirect();

  return (
    <Layout>
      <PaperMain elevation={6} square>
        Moje Konto
      </PaperMain>
    </Layout>
  );
}
