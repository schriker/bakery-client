import {
  createStyles,
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';

type FooterLink = {
  name: string;
  href: string;
};

type FooterLinkListPropsType = {
  title: string;
  links: FooterLink[];
};

const useFooterListClasses = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.primary[100],
      borderRadius: theme.shape.borderRadius,
      '&:hover': {
        backgroundColor: theme.palette.primary[700],
      },
    },
  })
);

export default function FooterLinkList({
  title,
  links,
}: FooterLinkListPropsType) {
  const classes = useFooterListClasses();

  return (
    <Grid item xs={3}>
      <Typography variant="h6" component="span">
        {title}
      </Typography>
      <List>
        {links.map((item, index) => (
          <ListItem
            classes={classes}
            dense
            href={item.href}
            component="a"
            button
            key={index}
          >
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </Grid>
  );
}
