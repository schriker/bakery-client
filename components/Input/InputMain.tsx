import { fade, InputBase, Theme, withStyles } from '@material-ui/core';

export const InputMain = withStyles((theme: Theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  error: {
    '& input': {
      borderColor: theme.palette.error.main,
      '&:focus': {
        borderColor: theme.palette.error.main,
        boxShadow: `${fade(theme.palette.error.main, 0.25)} 0 0 0 3px`,
      },
    },
  },
  input: {
    border: '1px solid',
    padding: '10px 12px',
    borderColor: theme.palette.grey[300],
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: theme.palette.primary[800],
      boxShadow: `${fade(theme.palette.primary[800], 0.25)} 0 0 0 3px`,
    },
  },
}))(InputBase);
