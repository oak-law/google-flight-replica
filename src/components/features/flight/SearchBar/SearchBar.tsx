import { ticketTypeOptions, tripTypeOptions } from '@/constants';
import Select from '@common/Select';
import {
  ArrowRightAlt,
  FmdGood,
  MultipleStop,
  SearchOutlined,
  SwapHoriz,
  SyncAlt,
} from '@mui/icons-material';
import {
  Alert,
  type AlertProps,
  Box,
  Divider,
  Fab,
  Grid,
  Snackbar,
  Stack,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import type { PickerValue } from '@mui/x-date-pickers/internals';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';

import {
  type GenericProps,
  type GetFlightsParams,
  type PassengerCountData,
  TicketType,
  TripType,
} from '@/types';

import { formatDate } from '@/utils/date.utils';

import AirportAutoComplete, {
  type AirportItem,
} from './AirportAutocomplete/AirportAutoComplete';
import PassengerCount from './PassengerCount/PassengerCount';
import { containerStyle } from './SearchBar.styles';

interface SearchBarProps extends GenericProps {
  onExplore: (explore: GetFlightsParams) => void;
}

export default function SearchBar({ sx, onExplore }: SearchBarProps) {
  const boxStyle = { ...containerStyle, ...sx };
  const defaultDepartureDate = dayjs(new Date());

  const [passengers, setPassengers] = useState<PassengerCountData>({
    adults: 0,
    children: 0,
    infantsInSeat: 0,
    infantsOnLap: 0,
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarInfo, setSnackbarInfo] = useState<{
    severity: AlertProps['severity'];
    message: string;
  }>({
    message: '',
    severity: 'warning',
  });

  const [origin, setOrigin] = useState<AirportItem | null>(null);
  const [destination, setDestination] = useState<AirportItem | null>(null);
  const [returnDate, setReturnDate] = useState<PickerValue | null>(null);
  const [depatureDate, setDepatureDate] = useState<PickerValue | null>(
    defaultDepartureDate
  );
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

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  const handleExplore = () => {
    if (origin === null) {
      setSnackbarInfo({
        message: 'Your depature location is needed.',
        severity: 'warning',
      });
      setOpenSnackbar(true);
      return;
    }

    if (destination === null) {
      setSnackbarInfo({
        message: 'Your arrival location is needed.',
        severity: 'warning',
      });
      setOpenSnackbar(true);
      return;
    }

    if (depatureDate === null) {
      setSnackbarInfo({
        message: 'Your depature date is needed.',
        severity: 'warning',
      });
      setOpenSnackbar(true);
      return;
    }

    // TODO: Finish validation Provided Data

    onExplore({
      tripType,
      passengers,
      ticketType,
      origin,
      destination,
      returnDate: formatDate(returnDate?.toDate(), 'YYYY-MM-DD'),
      depatureDate: formatDate(depatureDate!.toDate(), 'YYYY-MM-DD'),
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
              onUpdate={setOrigin}
            />
            <Divider>
              <SwapHoriz />
            </Divider>
            <AirportAutoComplete
              id="roundtrip-end-point"
              startIcon={<FmdGood />}
              onUpdate={setDestination}
            />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <DatePicker
              name="departure-date"
              defaultValue={defaultDepartureDate}
              format="ddd, MMM D"
              sx={{ width: tripType === TripType.ROUND_TRIP ? 'auto' : '100%' }}
              onChange={setDepatureDate}
            />
            {tripType === TripType.ROUND_TRIP && (
              <>
                <Divider orientation="vertical" flexItem />
                <DatePicker
                  name="arrival-date"
                  sx={{ backgroundColor: 'transparent' }}
                  value={returnDate}
                  format="ddd, MMM D"
                  onChange={setReturnDate}
                />
              </>
            )}
          </Stack>
        </Grid>
        {/* TODO: Implement Multiple Stops */}
        <Fab
          sx={({ palette }) => ({
            backgroundColor: palette.info.main,
            color: palette.background.default,
            display: 'inline-flex',
            textTransform: 'none',
            maxWidth: '110px',
            '&:hover': {
              backgroundColor: palette.info.light,
            },
          })}
          variant="extended"
          onClick={() => {}}
        >
          Add Flight
        </Fab>
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
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarInfo.severity}
          variant="filled"
        >
          {snackbarInfo.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
