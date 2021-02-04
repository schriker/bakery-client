import { makeStyles, Theme, createStyles } from '@material-ui/core';

const usePhotoUploadStyles = makeStyles((theme: Theme) =>
  createStyles({
    disabled: {
      cursor: 'initial',
      color: `${theme.palette.grey[400]} !important`,
      backgroundColor: `${theme.palette.grey[200]} !important`,
    },
    box: {
      position: 'relative',
      height: 100,
      backgroundColor: theme.palette.primary[100],
      borderRadius: theme.shape.borderRadius,
      transition: theme.transitions.create(['background-color']),
      '& button': {
        opacity: 0,
      },
      '&:hover': {
        backgroundColor: theme.palette.primary[200],
        '& img': {
          opacity: 0.5,
        },
        '& button': {
          opacity: 1,
        },
      },
    },
    input: {
      visibility: 'hidden',
    },
    label: {
      zIndex: 998,
      position: 'relative',
      display: 'block',
      width: '100%',
      height: '100%',
      cursor: 'pointer',
    },
    preview: {
      width: 'auto',
      height: 'auto',
      maxHeight: '100%',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: theme.shape.borderRadius,
      transition: theme.transitions.create(['opacity']),
    },
    progress: {
      zIndex: 999,
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -20,
      marginLeft: -20,
    },
    icon: {
      color: theme.palette.primary[400],
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    delete: {
      backgroundColor: 'white',
      color: theme.palette.grey[600],
      position: 'absolute',
      zIndex: 999,
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      transition: theme.transitions.create(['opacity']),
      '&:hover': {
        backgroundColor: 'white',
      },
    },
  })
);

export default usePhotoUploadStyles;
