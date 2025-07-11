import { useSearchFlights } from '@/hooks/useSearchFlights';
import {
  CircleOutlined,
  FmdGood,
  KeyboardArrowDown,
  LocalAirport,
} from '@mui/icons-material';
import {
  Autocomplete,
  IconButton,
  InputAdornment,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from '@mui/material';
import { useState, type ReactNode } from 'react';

export interface AirportItem {
  skyId: string;
  entityId: string;
  suggestionTitle: string;
  localizedName: string;
  subTitle: string;
  title: string;
  flightPlaceType: string;
  icon: ReactNode;
}

interface AirportAutoCompleteProps {
  id: string;
  onUpdate: (value: AirportItem | null) => void;
  startIcon?: ReactNode;
}

export default function AirportAutoComplete({
  id,
  startIcon,
  onUpdate,
}: AirportAutoCompleteProps) {
  const [query, setQuery] = useState('');
  const { flights } = useSearchFlights(query);
  const options: AirportItem[] = flights.map(
    ({ navigation, presentation }) => ({
      ...presentation,
      ...navigation.relevantFlightParams,
      icon:
        navigation.relevantFlightParams.flightPlaceType.toLocaleLowerCase() ===
        'airport' ? (
          <LocalAirport />
        ) : (
          <FmdGood />
        ),
    })
  );

  return (
    <Autocomplete<AirportItem>
      id={id}
      options={options}
      sx={({ palette }) => ({
        // backgroundColor: palette.background.default,
        borderColor: palette.secondary.main,
        color: palette.secondary.main,
        width: 300,
      })}
      autoHighlight
      getOptionLabel={(option) => option.suggestionTitle}
      onInputChange={(_, newValue) => setQuery(newValue)}
      onChange={(_, newValue) => onUpdate(newValue)}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <ListItem
            key={key}
            {...optionProps}
            secondaryAction={
              <IconButton>
                <KeyboardArrowDown />
              </IconButton>
            }
            sx={({ palette }) => ({
              backgroundColor: palette.background.default,
              '&:hover': {
                backgroundColor: palette.background.default,
              },
            })}
          >
            <ListItemAvatar>{option.icon}</ListItemAvatar>
            <ListItemText
              primary={`${(option.suggestionTitle, option.subTitle)}`}
              secondary={`${option.flightPlaceType} in ${option.localizedName}`}
            />
          </ListItem>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          slotProps={{
            input: {
              ...params.InputProps,
              sx: ({ palette }) => ({
                color: palette.secondary.main,
                borderColor: palette.secondary.main,
              }),
              startAdornment: (
                <InputAdornment position="start">
                  {startIcon ? startIcon : <CircleOutlined />}
                </InputAdornment>
              ),
            },
          }}
          sx={({ palette }) => ({
            color: palette.secondary.main,
          })}
        />
      )}
    />
  );
}
