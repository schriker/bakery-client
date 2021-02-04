import { useCategoriesQuery } from '../generated/graphql';

export default function useCategoires() {
  const { data } = useCategoriesQuery();

  const categories = [...data.categories];

  categories.push(
    categories.splice(
      categories.findIndex((category) => category.name == 'Pozostałe'),
      1
    )[0]
  );

  return categories;
}
