import { Box, Container } from '@material-ui/core';
import Search from '../Search/Search';
import UserMenu from '../UserMenu/UserMenu';
import Link from 'next/link';

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
            <Box>
              <Link href="/">Logo</Link>
            </Box>
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
