import { Button, Theme, withStyles } from '@material-ui/core';

export const ButtonText = withStyles((theme: Theme) => ({
  root: {
    fontWeight: 700,
    textTransform: 'initial',
    color: theme.palette.secondary[400],
  },
  startIcon: {
    color: theme.palette.grey[600]
  }
}))(Button);
