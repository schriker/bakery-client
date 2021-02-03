import Layout from '../components/Layout/Layout';
import useLoginRedirect from '../hooks/useLoginRedirect';
import UserPanelLayout from '../components/UserPanelLayout/UserPanelLayout';

export default function Account() {
  useLoginRedirect();

  return (
    <Layout>
      <UserPanelLayout>Moje Konto</UserPanelLayout>
    </Layout>
  );
}
