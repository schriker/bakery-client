import { Box, Container } from '@material-ui/core';
import { ButtonPrimary } from '../Button/ButtonPrimary';
import { ButtonText } from '../Button/ButtonText';
import Search from '../Search/Search';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

export default function Navbar() {
  return (
    <>
      <Box bgcolor="primary.800" height="5px" />
      <Box bgcolor="common.white" boxShadow={5}>
        <Container>
          <Box
            height="85px"
            display="grid"
            gridTemplateColumns="auto 1fr auto"
            alignItems="center"
          >
            <Box>Logo</Box>
            <Box mx={2}>
              <Search />
            </Box>
            <Box ml="auto">
              <ButtonText
                href="#"
                startIcon={<PersonOutlineIcon />}
                style={{ marginRight: 15 }}
                size="large"
              >
                Moje konto
              </ButtonText>
              <ButtonPrimary href="#" size="large">Dodaj ogłoszenie</ButtonPrimary>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
