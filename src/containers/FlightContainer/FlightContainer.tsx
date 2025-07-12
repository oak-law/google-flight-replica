import Header from '@/components/features/flight/Header/Header';
import SearchBar from '@/components/features/flight/SearchBar/SearchBar';
import { useGetFlights } from '@/hooks/useGetFlights';
import { Box, Stack, Typography } from '@mui/material';
import { useState } from 'react';

import { type GetFlightsParams, SortByOptions } from '@/types';

import FlightListContainer from './FlightListContainer';

export default function FlightContainer() {
  const [sortBy, setSortBy] = useState(SortByOptions.BEST);
  const [flightRequest, setFlightRequest] = useState<GetFlightsParams | null>(
    null
  );

  const { error, flights, loading } = useGetFlights(flightRequest);

  return (
    <Box>
      <Header />
      <Stack sx={{ margin: 'auto', maxWidth: '1024px' }}>
        <SearchBar sx={{ mb: 6 }} onExplore={setFlightRequest} />
        {!loading && flights && (
          <FlightListContainer
            filteredFlights={flights}
            sortBy={sortBy}
            onUpdateSort={setSortBy}
          />
        )}
        {!loading && !flights && !error && (
          <Typography variant="h5" textAlign="center">
            Please select your flight details and click explore to get flights
          </Typography>
        )}
        {loading && (
          <Typography variant="h5" textAlign="center">
            Loading flight details..
          </Typography>
        )}
        {error && !flights && (
          <>
            <Typography variant="h5" textAlign="center">
              An error occured
            </Typography>
            <Typography variant="caption" textAlign="center">
              Please contact customer care to get some help or reload and try
              again
            </Typography>
          </>
        )}
      </Stack>
    </Box>
  );
}
