import { GetStaticProps } from 'next';
import Products from '../components/Products/Products';
import {
  CategoriesDocument,
  CategoriesQuery,
  CategoriesQueryVariables,
  useCategoriesQuery,
} from '../generated/graphql';
import { addApolloState, initializeApollo } from '../lib/apolloClient';

export default function Home() {
  const { data } = useCategoriesQuery();

  const categories = [...data.categories];

  categories.push(
    categories.splice(
      categories.findIndex((category) => category.name == 'Pozostałe'),
      1
    )[0]
  );

  return (
    <div>
      {categories.map((category, index) => (
        <>
          <img
            width="15px"
            height="15ox"
            src={`${process.env.NEXT_PUBLIC_API}/categories_icons/${category.icon}`}
            alt=""
          />
          <p key={index}>{category.name}</p>
        </>
      ))}
      <Products />
    </div>
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
