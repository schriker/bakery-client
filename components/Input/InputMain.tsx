import { fade, InputBase, Theme, withStyles } from '@material-ui/core';

export const InputMain = withStyles((theme: Theme) => ({
  root: {
    border: '1px solid',
    padding: '5px 12px',
    borderColor: theme.palette.grey[300],
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  focused: {
    borderColor: theme.palette.primary[800],
    boxShadow: `${fade(theme.palette.primary[800], 0.25)} 0 0 0 3px`,
  },
  error: {
    borderColor: theme.palette.error.main,
    boxShadow: `${fade(theme.palette.error.main, 0.25)} 0 0 0 3px`,
  },
}))(InputBase);
