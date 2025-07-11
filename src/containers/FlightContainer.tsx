import Header from '@/components/features/flight/Header/Header';
import SearchBar from '@/components/features/flight/SearchBar/SearchBar';
import { Box, Stack, useMediaQuery } from '@mui/material';

export default function FlightContainer() {
  const isSmallScreen = useMediaQuery('(max-width:320px)');
  return (
    <Box>
      <Header sx={{ marginBottom: isSmallScreen ? '10px' : '40px' }} />
      <Stack sx={{ margin: 'auto', maxWidth: '1024px' }}>
        <SearchBar onExplore={() => {}} />
      </Stack>
    </Box>
  );
}
