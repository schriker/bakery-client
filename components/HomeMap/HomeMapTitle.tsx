import { Box, Typography } from '@material-ui/core';

export default function HomeMapTitle({
  voivodeship,
}: {
  voivodeship: string | null;
}) {
  return (
    <Box mb={2} color="primary.800" fontWeight={700}>
      <Typography variant="h5" component="span">
        Przeglądaj
        <Box mx={1} component="span" color="secondary.400">
          {voivodeship ? voivodeship : 'cały kraj'}
        </Box>
        według kategorii:
      </Typography>
    </Box>
  );
}
