import { useEffect, useState } from 'react';
import { createStyles, makeStyles, TextField, Theme } from '@material-ui/core';
import { InputAdornment } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { grey } from '@material-ui/core/colors';
import { LocationOnOutlined } from '@material-ui/icons';
import { useSearchCityLazyQuery } from '../../generated/graphql';

type CityType = {
  id: number;
  name: string;
  district: string;
  voivodeship: string;
};

const useSearchLocationStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      boxShadow: theme.shadows[6],
    },
    endAdornment: {
      marginRight: 5,
    },
    loading: {
      color: theme.palette.grey[500],
    },
    noOptions: {
      color: theme.palette.grey[500],
    },
    optionName: {
      fontWeight: 700,
      fontSize: 15,
      color: theme.palette.grey[800],
    },
    optionVoivodeship: {
      fontSize: 13,
      color: theme.palette.grey[600],
    },
  })
);

export default function SearchLocationInput() {
  const classes = useSearchLocationStyles();
  const [getCity, { data, loading }] = useSearchCityLazyQuery();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<CityType[]>([]);

  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 2) {
      getCity({
        variables: {
          query: event.target.value,
        },
      });
    } else {
      setOptions([]);
    }
  };

  useEffect(() => {
    if (!loading && data?.searchCity) {
      setOptions(data.searchCity);
    }
  }, [data, loading]);

  return (
    <Autocomplete
      openOnFocus={false}
      loadingText="Szukam..."
      closeText="Zamknij"
      clearText="Usuń"
      openText="Otwórz"
      noOptionsText="Brak wyników"
      id="search-autocomplete"
      open={open}
      classes={{
        paper: classes.paper,
        loading: classes.loading,
        endAdornment: classes.endAdornment,
        noOptions: classes.noOptions,
      }}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.id === value.id}
      getOptionLabel={(option) => `${option.name}, ${option.voivodeship}`}
      options={options}
      loading={loading}
      renderOption={(option) => (
        <div>
          <span className={classes.optionName}>{option.name}, </span>
          <span className={classes.optionVoivodeship}>
            {option.voivodeship}
          </span>
        </div>
      )}
      renderInput={(params) => (
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
  );
}