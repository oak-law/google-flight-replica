import Select from '@/components/common/Select';
import Title from '@/components/common/Title';
import FlightList from '@/components/features/flight/FlightList/FlightList';
import useFlightsInfo from '@/hooks/useFlightsInfo';
import { InfoOutline } from '@mui/icons-material';
import {
  Box,
  Link,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import {
  type FlightProps,
  type GenericOptionProps,
  SortByFlightOptions,
  SortByOptions,
} from '@/types';

interface FlightListContainerProps {
  filteredFlights: FlightProps;
  sortBy: SortByOptions;
  onUpdateSort: (nwewSort: SortByOptions) => void;
}

export default function FlightListContainer({
  filteredFlights,
  sortBy,
  onUpdateSort,
}: FlightListContainerProps) {
  const { cheapest, flightInfo } = useFlightsInfo({ flights: filteredFlights });

  const [flightSorting, setFlightSorting] = useState(
    SortByFlightOptions.TOP_FLIGHT
  );
  const sortingFlightOptions: GenericOptionProps<SortByFlightOptions>[] = [
    {
      label: 'Top flights',
      value: SortByFlightOptions.TOP_FLIGHT,
    },
    {
      label: 'Price',
      value: SortByFlightOptions.PRICE,
    },
    {
      label: 'Departure time',
      value: SortByFlightOptions.DEPARTURE_TIME,
    },
    {
      label: 'Arrival time',
      value: SortByFlightOptions.ARRIVAL_TIME,
    },
    {
      label: 'Duration',
      value: SortByFlightOptions.DURATION,
    },
    {
      label: 'Emissions',
      value: SortByFlightOptions.EMISSIONS,
    },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <ToggleButtonGroup
        aria-label="flight-sorting"
        sx={{ mb: 2, width: '100%' }}
        color="info"
        size="large"
        exclusive
        value={sortBy}
        onChange={(_, newValue) => onUpdateSort(newValue as SortByOptions)}
      >
        <ToggleButton value={SortByOptions.BEST} sx={{ width: '50%' }}>
          <Typography textTransform="none" variant="h6">
            Best
          </Typography>
        </ToggleButton>
        <ToggleButton
          value={SortByOptions.CHEAPEST}
          sx={{ flexWrap: 'wrap', width: '50%' }}
        >
          <Typography textTransform="none" variant="h6">
            Cheapest{' '}
          </Typography>
          <Typography
            color="secondary.main"
            sx={{ mx: 1 }}
            textTransform="none"
            variant="caption"
          >
            from
          </Typography>{' '}
          <Typography color="success.main" variant="h6">
            {cheapest}
          </Typography>
        </ToggleButton>
      </ToggleButtonGroup>
      <Title title="Top departing flights">
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Typography sx={{ alignItems: 'center' }} variant="caption">
            Top departing flights{' '}
            <Tooltip
              title={
                <Typography variant="caption">
                  Top flights” are ranked based on the best trade-off between
                  price and convenience factors such as duration, number of
                  stops, and airport changes during layovers. All other flights
                  are ranked by price.{' '}
                  <Link
                    underline="always"
                    href="https://support.google.com/travel/answer/7664728?ref_topic=2475360&hl=en-US"
                  >
                    Learn more
                  </Link>
                </Typography>
              }
            >
              <InfoOutline sx={{ height: 15, width: 15 }} />
            </Tooltip>{' '}
            Prices include required taxes + fees for 4 passengers. Optional
            charges and bag fees may apply. Passenger assistance info.
          </Typography>
          <Select<SortByFlightOptions>
            id="flight-option-sorting"
            options={sortingFlightOptions}
            onSelect={(newValue) =>
              setFlightSorting(newValue as SortByFlightOptions)
            }
            size="small"
            inputProps={{
              color: 'info.main',
            }}
            sx={{ flexShrink: 0 }}
            value={flightSorting}
          />
        </Stack>
      </Title>

      {/* TODO: Setup destinatino, origin and trip type info */}
      <FlightList
        destination="LOS"
        origin="MAD"
        flightInfo={flightInfo}
        tripType="round trip"
      />
    </Box>
  );
}
