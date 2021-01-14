import { GetStaticProps } from 'next';
import {
  CategoriesDocument,
  CategoriesQuery,
  CategoriesQueryVariables,
} from '../generated/graphql';
import { addApolloState, initializeApollo } from '../lib/apolloClient';
import Layout from '../components/Layout/Layout';
import HomeMap from '../components/HomeMap/HomeMap';

export default function Home() {
  return (
    <Layout>
      <HomeMap />
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
