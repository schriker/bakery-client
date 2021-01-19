import { Grid, Typography } from '@material-ui/core';
import { ButtonSocialFooter } from '../Button/ButtonSocialFooter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';

export default function FooterSocial() {
  return (
    <Grid item xs={3}>
      <Typography variant="h6" component="span">
        Portale społecznościowe
      </Typography>
      <Grid container spacing={2} style={{ marginTop: 5 }}>
        <Grid item>
          <ButtonSocialFooter href="https://facebook.com">
            <FacebookIcon fontSize="small" />
          </ButtonSocialFooter>
        </Grid>
        <Grid item>
          <ButtonSocialFooter href="https://facebook.com">
            <InstagramIcon fontSize="small" />
          </ButtonSocialFooter>
        </Grid>
        <Grid item>
          <ButtonSocialFooter href="https://facebook.com">
            <TwitterIcon fontSize="small" />
          </ButtonSocialFooter>
        </Grid>
      </Grid>
    </Grid>
  );
}
