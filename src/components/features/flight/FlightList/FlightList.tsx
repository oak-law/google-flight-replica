import ListItemText from '@common/ListItemText';
import { ArrowDropDown, InfoOutline } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
} from '@mui/material';

import type { FlightInfoProps } from '@/types';

import { formatDate } from '@/utils/date.utils';

interface FlightListProps {
  destination: string;
  flightInfo: FlightInfoProps[];
  origin: string;
  tripType: string;
}

export default function FlightList({
  destination,
  origin,
  flightInfo,
  tripType,
}: FlightListProps) {
  const getStringInHours = (durationInMins: number) => {
    const hours = Math.floor(durationInMins / 60);
    const mins = durationInMins % 60;
    return `${hours} hr ${mins} min`;
  };

  return (
    <Box sx={{ width: '100%' }}>
      {flightInfo &&
        flightInfo.map(({ id, price, legs, headerLogoUrl }) => (
          <Accordion
            key={id}
            sx={({ palette }) => ({
              backgroundColor: palette.background.default,
              color: 'whitesmoke',
            })}
          >
            <AccordionSummary expandIcon={<ArrowDropDown />}>
              <Grid
                container
                spacing={2}
                sx={{
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Box sx={{ mr: 4 }}>
                  <img height="35px" src={headerLogoUrl} width="35px" />
                </Box>
                <ListItemText
                  primary={`${formatDate(legs[0].departure)} - ${formatDate(
                    legs[0].arrival
                  )}`}
                  secondary={[
                    ...new Set(legs[0].airlines.map(({ name }) => name)),
                  ].join(', ')}
                />
                <ListItemText
                  primary={getStringInHours(legs[0].durationInMinutes)}
                  secondary={`${origin}-${destination}`}
                />
                <ListItemText
                  primary={
                    legs[0].stopCount === 0 || legs[0].stopCount > 1
                      ? `${legs[0].stopCount} stops`
                      : `${legs[0].stopCount} stop`
                  }
                  secondary="-- hr --min CDG"
                />
                <ListItemText
                  primary="-- kg CO2e"
                  secondary={
                    <Typography
                      variant="caption"
                      sx={{ color: 'secondary.main' }}
                    >
                      +--% emissions{' '}
                      <InfoOutline sx={{ height: 10, width: 10 }} />
                    </Typography>
                  }
                />
                <ListItemText
                  primary={price.formatted}
                  secondary={tripType}
                  sx={{ color: 'success.main', fontWeight: '600' }}
                />
              </Grid>
            </AccordionSummary>
            <AccordionDetails>Testing</AccordionDetails>
          </Accordion>
        ))}
    </Box>
  );
}
