import { useState } from 'react';
import { Box, Container, Grid } from '@material-ui/core';
import HomeMapCategories from './HomeMapCategories';
import HomeMapTitle from './HomeMapTitle';
import HomeMapSVG from './HomeMapSVG';

export default function HomeMap() {
  const [voivodeship, setVoivodeship] = useState<null | string>(null);

  return (
    <Box bgcolor="common.white" mt={5} py={6}>
      <Container>
        <Grid container alignItems="center">
          <Grid item xs>
            <HomeMapTitle voivodeship={voivodeship} />
            <HomeMapCategories />
          </Grid>
          <Grid item xs>
            <HomeMapSVG
              voivodeship={voivodeship}
              setVoivodeship={setVoivodeship}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
