import React from 'react';
import Layout from '../components/Layout/Layout';
import { PaperMain } from '../components/Paper/PaperMain';
import useLoginRedirect from '../hooks/useLoginRedirect';

export default function NewPost() {
  useLoginRedirect();

  return (
    <Layout>
      <PaperMain elevation={6} square>
        asd
      </PaperMain>
    </Layout>
  );
}
