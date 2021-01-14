import { List, ListItem, ListItemIcon, ListItemText, Box } from '@material-ui/core';
import { useCategoriesQuery } from '../../generated/graphql';

export default function HomeMapCategories() {
  const { data } = useCategoriesQuery();

  const categories = [...data.categories];

  categories.push(
    categories.splice(
      categories.findIndex((category) => category.name == 'Pozostałe'),
      1
    )[0]
  );

  return (
    <Box pr={20}>
      <List>
        {categories.map((category) => (
          <ListItem
            divider
            component="a"
            onClick={() => console.log('asd')}
            dense
            button
            key={category.id}
          >
            <ListItemIcon title={category.name}>
              <img
                width="15px"
                height="15px"
                src={`${process.env.NEXT_PUBLIC_API}/categories_icons/${category.icon}`}
              />
            </ListItemIcon>
            <ListItemText primary={category.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
