import {
  TextField,
  IconButton,
  makeStyles,
  Theme,
  createStyles,
  fade,
  Divider,
} from '@material-ui/core';
import SearchLocationInput from './SearchLocationInput';
import SearchIcon from '@material-ui/icons/Search';
import { grey } from '@material-ui/core/colors';
import { LocationOnOutlined } from '@material-ui/icons';
import { InputAdornment } from '@material-ui/core';

const useSearchWrapperStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      border: '1px solid',
      borderColor: theme.palette.grey[300],
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[6],
      paddingLeft: 25,
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus-within': {
        borderColor: theme.palette.primary[800],
        boxShadow: `${fade(theme.palette.primary[800], 0.25)} 0 0 0 3px`,
      },
    },
  })
);

const useSearchButtonStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.primary[800],
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderTopRightRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius,
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(1.25),
      paddingRight: theme.spacing(1.25),
      margin: '-1px',
      '&:hover': {
        backgroundColor: theme.palette.primary[400],
      },
    },
  })
);

export default function Search() {
  const wrapperClasses = useSearchWrapperStyles();
  const buttonStyles = useSearchButtonStyles();

  return (
    <form>
      <div className={wrapperClasses.root}>
        <TextField
          fullWidth
          placeholder="Czego szukasz..."
          InputProps={{
            disableUnderline: true,
          }}
        ></TextField>
        <Divider orientation="vertical" flexItem />
        <SearchLocationInput
          onSelectOption={(event, value, reason) =>
            console.log(event, value, reason)
          }
          render={(params, handleUserInput) => (
            <TextField
              {...params}
              style={{
                minWidth: 250,
              }}
              onChange={handleUserInput}
              placeholder="Polska"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start" style={{ marginLeft: 5 }}>
                    <LocationOnOutlined style={{ color: grey[600] }} />
                  </InputAdornment>
                ),
                disableUnderline: true,
              }}
            ></TextField>
          )}
        />
        <IconButton type="submit" className={buttonStyles.root}>
          <SearchIcon style={{ color: '#fff' }} />
        </IconButton>
      </div>
    </form>
  );
}
