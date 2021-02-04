import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from '@material-ui/core';
import useCategoires from '../../hooks/useCategories';

export default function HomeMapCategories() {
  const categories = useCategoires();

  return (
    <Box pr={[0, 0, 5, 10, 15]}>
      <List>
        {categories.map((category) => (
          <ListItem
            divider
            dense
            onClick={() => console.log('asd')}
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
