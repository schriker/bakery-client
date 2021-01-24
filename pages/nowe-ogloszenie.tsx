import React from 'react';
import Layout from '../components/Layout/Layout';
import UserPanelLayout from '../components/UserPanelLayout/UserPanelLayout';
import useLoginRedirect from '../hooks/useLoginRedirect';

export default function NewPost() {
  useLoginRedirect();

  return (
    <Layout>
      <UserPanelLayout>
        <p>Nowe ogłoszenie</p>
      </UserPanelLayout>
    </Layout>
  );
}
