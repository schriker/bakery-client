import {
  createStyles,
  makeStyles,
  Menu,
  MenuProps,
  withStyles,
} from '@material-ui/core';

export const useMenuItemStyles = makeStyles((theme) =>
  createStyles({
    primary: {
      fontSize: 14,
      fontWeight: 700,
      textTransform: 'initial',
      color: theme.palette.secondary[400],
    },
  })
);

export const MenuMain = withStyles({})((props: MenuProps) => (
  <Menu
    elevation={6}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));
