import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Autocomplete, {
  AutocompleteChangeReason,
  AutocompleteRenderInputParams,
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import { ChangeEvent, useEffect, useState } from 'react';
import { City, useSearchCityLazyQuery } from '../../generated/graphql';

type SearchLocationInputPropsType = {
  onSelectOption: (
    event: ChangeEvent<{}>,
    value: City,
    reason: AutocompleteChangeReason
  ) => void;
  render: (
    props: AutocompleteRenderInputParams,
    handleUserInput: (event: React.ChangeEvent<HTMLInputElement>) => void
  ) => JSX.Element;
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
    option: {
      borderBottom: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: theme.palette.grey[200],
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
      textTransform: 'capitalize',
      fontSize: 13,
      color: theme.palette.grey[600],
    },
  })
);

export default function SearchLocationInput({
  onSelectOption,
  render,
}: SearchLocationInputPropsType) {
  const classes = useSearchLocationStyles();
  const [getCity, { data, loading }] = useSearchCityLazyQuery();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<City[]>([]);

  const filterOptions = createFilterOptions<City>({
    stringify: (option) =>
      `${option.name} ${option.voivodeship} ${option.district}`,
  });

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
      setOptions(data.searchCity as City[]);
    }
  }, [data, loading]);

  return (
    <Autocomplete
      filterOptions={filterOptions}
      openOnFocus={false}
      loadingText="Szukam..."
      closeText="Zamknij"
      clearText="Usuń"
      openText="Otwórz"
      noOptionsText="Brak wyników"
      id="search-autocomplete"
      onChange={onSelectOption}
      open={open}
      classes={{
        paper: classes.paper,
        loading: classes.loading,
        option: classes.option,
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
      getOptionLabel={(option) =>
        `${option.name}, ${option.district}, ${option.voivodeship}`
      }
      options={options}
      loading={loading}
      renderOption={(option) => (
        <div>
          <span className={classes.optionName}>{option.name}</span>
          <div>
            <span className={classes.optionVoivodeship}>
              {option.district},{' '}
            </span>
            <span className={classes.optionVoivodeship}>
              {option.voivodeship}
            </span>
          </div>
        </div>
      )}
      renderInput={(params) => render(params, handleUserInput)}
    />
  );
}
