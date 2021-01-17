import { Button, Theme, withStyles } from '@material-ui/core';

export const ButtonPrimary = withStyles((theme: Theme) => ({
  root: {
    fontWeight: 700,
    textTransform: 'initial',
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary[800],
    boxShadow: theme.shadows[1],
    '&:hover': {
      backgroundColor: theme.palette.primary[400],
    },
  },
}))(Button);
