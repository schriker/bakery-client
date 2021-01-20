import { Box, Container } from '@material-ui/core';
import Search from '../Search/Search';
import UserMenu from '../UserMenu/UserMenu';

export default function Navbar() {
  return (
    <Box>
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
              <UserMenu />
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
