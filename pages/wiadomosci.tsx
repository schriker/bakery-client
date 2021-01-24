import Layout from '../components/Layout/Layout';
import UserPanelLayout from '../components/UserPanelLayout/UserPanelLayout';
import useLoginRedirect from '../hooks/useLoginRedirect';

export default function Messages() {
  useLoginRedirect();

  return (
    <Layout>
      <UserPanelLayout>
        <p>Wiadomości</p>
      </UserPanelLayout>
    </Layout>
  );
}
