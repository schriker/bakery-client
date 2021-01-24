import {
  createStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { TypographyTitle } from '../Typography/TypographyTitle';
import Link from 'next/link';

export type UserPanelSideBarSectionLink = {
  icon: JSX.Element;
  title: string;
  href: string;
};

type UserPanelSideBarSectionPropsType = {
  title: string;
  links: UserPanelSideBarSectionLink[];
};

const useSectionStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
    link: {
      color: theme.palette.secondary[600],
    },
    list: {
      paddingBottom: theme.spacing(3),
    },
  })
);

export default function UserPanelSideBarSection({
  title,
  links,
}: UserPanelSideBarSectionPropsType) {
  const classes = useSectionStyles();

  return (
    <>
      <TypographyTitle className={classes.title} variant="h6" component="div">
        {title}
      </TypographyTitle>
      <List className={classes.list}>
        {links.map((link, index) => (
          <Link href={link.href} passHref key={index}>
            <ListItem divider dense button component="a">
              <ListItemIcon title={link.title}>{link.icon}</ListItemIcon>
              <ListItemText className={classes.link} primary={link.title} />
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  );
}
