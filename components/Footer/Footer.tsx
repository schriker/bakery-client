import React from 'react';
import { footerLinksColumn1, footerLinksColumn2 } from '../../consts';
import { Box, Container, Grid } from '@material-ui/core';
import FooterSocial from './FooterSocial';
import FooterLinkList from './FooterLinkList';

export default function Footer() {
  return (
    <Box bgcolor="primary.800" color="#fff" paddingY={5}>
      <Container>
        <Grid container spacing={3}>
          <FooterLinkList
            title="Przydatne informacje"
            links={footerLinksColumn1}
          />
          <FooterLinkList
            title="Informacje prawne"
            links={footerLinksColumn2}
          />
          <FooterSocial />
        </Grid>
      </Container>
    </Box>
  );
}
