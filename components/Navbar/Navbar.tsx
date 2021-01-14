import { Box, Container } from '@material-ui/core';

export default function Navbar() {
  return (
    <>
      <Box bgcolor="primary.800" height="5px" />
      <Box bgcolor="common.white" boxShadow={5}>
        <Container>
          <Box
            height="85px"
            display="grid"
            gridTemplateColumns="1fr auto 1fr"
            alignItems="center"
          >
            <Box>Logo</Box>
            <Box>Wyszukiwarka</Box>
            <Box ml="auto">Info</Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
