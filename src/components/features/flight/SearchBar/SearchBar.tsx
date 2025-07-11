import {
  ArrowRightAlt,
  FmdGood,
  MultipleStop,
  SearchOutlined,
  SwapHoriz,
  SyncAlt,
} from '@mui/icons-material';
import { Box, Divider, Fab, Grid, Stack } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import type { PickerValue } from '@mui/x-date-pickers/internals';
import { useMemo, useState } from 'react';
import dayjs from 'dayjs';

import Select from '@common/Select';
import { ticketTypeOptions, tripTypeOptions } from '@/constants';
import { type GenericProps, TicketType, TripType } from '@/types';

import { containerStyle } from './SearchBar.styles';
import PassengerCount, {
  type PassengerCountData,
} from './PassengerCount/PassengerCount';

import AirportAutoComplete from './AirportAutocomplete/AirportAutoComplete';

interface ExploreProps {
  tripType: TripType;
  passengers: PassengerCountData;
  ticketType: TicketType;
  returnDate: Date;
  depatureDate: Date;
}

interface SearchBarProps extends GenericProps {
  onExplore: (explore: ExploreProps) => void;
}

export default function SearchBar({ sx, onExplore }: SearchBarProps) {
  const boxStyle = { ...containerStyle, ...sx };

  const [passengers, setPassengers] = useState<PassengerCountData>({
    adults: 0,
    children: 0,
    infantsInSeat: 0,
    infantsOnLap: 0,
  });
  const [returnDate, setReturnDate] = useState<PickerValue | null>(null);
  const [depatureDate, setDepatureDate] = useState<PickerValue | null>(null);
  const [ticketType, setTicketType] = useState<TicketType>(TicketType.ECONOMY);
  const [tripType, setTripType] = useState<TripType>(TripType.ROUND_TRIP);

  const tripTypeIcon = useMemo(() => {
    if (tripType === TripType.ONE_WAY) {
      return <ArrowRightAlt />;
    } else if (tripType === TripType.MULTI_CITY) {
      return <MultipleStop />;
    } else {
      return <SyncAlt />;
    }
  }, [tripType]);

  const handleExplore = () => {
    onExplore({
      tripType,
      passengers,
      ticketType,
      returnDate: returnDate!.toDate(),
      depatureDate: depatureDate!.toDate(),
    });
  };

  return (
    <Box
      sx={({ breakpoints, palette }) => ({
        ...boxStyle,
        backgroundColor: palette.background.default,
        position: 'relative',
        [breakpoints.down('sm')]: {
          backgroundColor: 'transparent',
          borderTop: '0px',
          boxShadow:
            '0 2px 2px 0 rgba(0, 0, 0, .3), 0 2px 6px -6px rgba(0, 0, 0, .15)',
        },
      })}
    >
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Select<TripType>
          id="trip-type"
          icon={tripTypeIcon}
          options={tripTypeOptions}
          value={tripType}
          onSelect={(newValue) => setTripType(newValue as TripType)}
        />
        <PassengerCount
          value={passengers}
          onChange={(newValue) => setPassengers(newValue)}
        />
        <Select<TicketType>
          id="ticket-type"
          options={ticketTypeOptions}
          value={ticketType}
          onSelect={(newValue) => setTicketType(newValue as TicketType)}
        />
      </Stack>
      <Grid container spacing={{ xs: 1, sm: 2 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <AirportAutoComplete
              id="roundtrip-start-point"
              onUpdate={() => {}}
            />
            <Divider>
              <SwapHoriz />
            </Divider>
            <AirportAutoComplete
              id="roundtrip-end-point"
              startIcon={<FmdGood />}
              onUpdate={() => {}}
            />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <DatePicker
              defaultValue={dayjs(new Date())}
              format="ddd, MMM D"
              onChange={setDepatureDate}
            />
            <Divider orientation="vertical" flexItem />
            <DatePicker
              value={returnDate}
              format="ddd, MMM D"
              onChange={setReturnDate}
            />
          </Stack>
        </Grid>
      </Grid>
      <Fab
        sx={({ palette }) => ({
          backgroundColor: palette.info.main,
          color: palette.background.default,
          display: 'inline-flex',
          textTransform: 'none',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          ml: 'auto',
          mr: 'auto',
          mb: '-20px',
          maxWidth: '110px',
          '&:hover': {
            backgroundColor: palette.info.light,
          },
        })}
        variant="extended"
        onClick={handleExplore}
      >
        <SearchOutlined
          sx={({ palette }) => ({ color: palette.background.default, mr: 1 })}
        />
        Explore
      </Fab>
    </Box>
  );
}
