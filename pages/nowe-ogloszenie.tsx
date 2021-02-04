import { TypographyTitle } from '../components/Typography/TypographyTitle';
import React from 'react';
import Layout from '../components/Layout/Layout';
import UserPanelLayout from '../components/UserPanelLayout/UserPanelLayout';
import {
  CategoriesDocument,
  CategoriesQuery,
  CategoriesQueryVariables,
  useMeQuery,
} from '../generated/graphql';
import useLoginRedirect from '../hooks/useLoginRedirect';
import { Grid, Typography } from '@material-ui/core';
import { ButtonPrimary } from '../components/Button/ButtonPrimary';
import Link from 'next/link';
import { links } from '../consts';
import NewProductForm from '../components/NewProductForm/NewProductForm';
import { GetStaticProps } from 'next';
import { initializeApollo, addApolloState } from '../lib/apolloClient';

export default function NewPost() {
  useLoginRedirect();
  const { data, loading } = useMeQuery({});

  return (
    <Layout>
      <UserPanelLayout>
        {!data?.me.isSeller && !loading ? (
          <Grid container justify="center">
            <TypographyTitle
              style={{ textAlign: 'center' }}
              variant="h5"
              component="div"
            >
              Przejdź na konto sprzedawcy!
            </TypographyTitle>
            <Typography
              style={{ marginBottom: 20, marginTop: 10, textAlign: 'center' }}
              variant="body1"
              component="div"
            >
              Uzupełnij wymagana pola w porofilu użytkownika aby mieć możliwość
              publikowania ogłoszeń.
            </Typography>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Link passHref href={links.userSettings}>
                <ButtonPrimary>Ustawienia</ButtonPrimary>
              </Link>
            </Grid>
          </Grid>
        ) : !loading ? (
          <NewProductForm />
        ) : null}
      </UserPanelLayout>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query<CategoriesQuery, CategoriesQueryVariables>({
    query: CategoriesDocument,
  });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 60,
  });
};
