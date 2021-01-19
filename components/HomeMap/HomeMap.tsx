import { useState } from 'react';
import { Grid } from '@material-ui/core';
import HomeMapCategories from './HomeMapCategories';
import HomeMapTitle from './HomeMapTitle';
import HomeMapSVG from './HomeMapSVG';

export default function HomeMap() {
  const [voivodeship, setVoivodeship] = useState<null | string>(null);

  return (
    <Grid container alignItems="center">
      <Grid item xs>
        <HomeMapTitle voivodeship={voivodeship} />
        <HomeMapCategories />
      </Grid>
      <Grid item xs>
        <HomeMapSVG voivodeship={voivodeship} setVoivodeship={setVoivodeship} />
      </Grid>
    </Grid>
  );
}
