import { Button, Theme, withStyles } from '@material-ui/core';

export const ButtonSocialFooter = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.background.paper,
    backgroundColor: theme.palette.secondary[300],
    borderRadius: '50%',
    padding: 8,
    minWidth: 0,
    '&:hover': {
      color: theme.palette.background.paper,
      backgroundColor: theme.palette.secondary[200],
    },
  },
}))(Button);
