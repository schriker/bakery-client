import React from 'react';
import { footerLinksColumn1, footerLinksColumn2 } from '../../consts';
import {
  Box,
  Container,
  createStyles,
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { ButtonSocialFooter } from '../Button/ButtonSocialFooter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';

const useFooterListClasses = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.primary[100],
      borderRadius: theme.shape.borderRadius,
      '&:hover': {
        backgroundColor: theme.palette.primary[700],
      },
    },
  })
);

export default function Footer() {
  const classes = useFooterListClasses();

  return (
    <Box bgcolor="primary.800" color="#fff" paddingY={5}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Typography variant="h6" component="span">
              Przydatne informacje
            </Typography>
            <List>
              {footerLinksColumn1.map((item, index) => (
                <ListItem
                  classes={classes}
                  dense
                  href={item.link}
                  component="a"
                  button
                  key={index}
                >
                  <ListItemText primary={item.name} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6" component="span">
              Informacje prawne
            </Typography>
            <List>
              {footerLinksColumn2.map((item, index) => (
                <ListItem
                  classes={classes}
                  dense
                  href={item.link}
                  component="a"
                  button
                  key={index}
                >
                  <ListItemText primary={item.name} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6" component="span">
              Portale społecznościowe
            </Typography>
            <Grid container spacing={2} style={{ marginTop: 0 }}>
              <Grid item>
                <ButtonSocialFooter href="https://facebook.com">
                  <FacebookIcon />
                </ButtonSocialFooter>
              </Grid>
              <Grid item>
                <ButtonSocialFooter href="https://facebook.com">
                  <InstagramIcon />
                </ButtonSocialFooter>
              </Grid>
              <Grid item>
                <ButtonSocialFooter href="https://facebook.com">
                  <TwitterIcon />
                </ButtonSocialFooter>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
