import { Paper, Theme, withStyles } from '@material-ui/core';

export const PaperMain = withStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
}))(Paper);
