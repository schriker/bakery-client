import {
  Box,
  Container,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import Footer from '../Footer/Footer';
import Header, { HeaderPtopsType } from '../Header/Header';
import Navbar from '../Navbar/Navbar';

interface LayoutPtopsType extends HeaderPtopsType {
  children: React.ReactNode;
  fullWidth?: boolean;
}

const useLayoutStyles = makeStyles((theme: Theme) =>
  createStyles({
    fullWidth: {
      flex: '1 1 auto',
      backgroundColor: theme.palette.background.paper,
      marginTop: theme.spacing(5),
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
    fixedWrapper: {
      flex: '1 1 auto',
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5),
    },
    wrapper: {
      display: 'flex',
      height: '100%',
      flexDirection: 'column',
    },
  })
);

export default function Layout({
  title,
  ogImage,
  ogDescription,
  children,
  fullWidth = false,
}: LayoutPtopsType) {
  const classes = useLayoutStyles();

  return (
    <Box className={classes.wrapper}>
      <Header title={title} ogImage={ogImage} ogDescription={ogDescription} />
      <Navbar />
      {fullWidth ? (
        <Box className={classes.fullWidth}>
          <Container>{children}</Container>
        </Box>
      ) : (
        <Box className={classes.fixedWrapper}>
          <Container>{children}</Container>
        </Box>
      )}
      <Footer />
    </Box>
  );
}
