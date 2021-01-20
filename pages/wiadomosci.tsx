import Layout from '../components/Layout/Layout';
import { PaperMain } from '../components/Paper/PaperMain';
import useLoginRedirect from '../hooks/useLoginRedirect';

export default function Messages() {
  useLoginRedirect();

  return (
    <Layout>
      <PaperMain elevation={6} square>
        Wiadomosci
      </PaperMain>
    </Layout>
  );
}
