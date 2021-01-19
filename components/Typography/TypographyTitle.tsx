import { Typography, TypographyTypeMap } from '@material-ui/core';
import { Theme, withStyles } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';

export const TypographyTitle = withStyles((theme: Theme) => ({
  root: {
    width: '100%',
    display: 'block',
    color: theme.palette.primary[800],
    marginBottom: theme.spacing(1),
  },
}))(Typography) as OverridableComponent<TypographyTypeMap<{}, 'span'>>;
