import { StyledFormControl, StyledSelect } from '@/components/common/Select';
import { noop } from '@/constants';
import Add from '@mui/icons-material/Add';
import Person from '@mui/icons-material/Person';
import Remove from '@mui/icons-material/Remove';
import {
  IconButton,
  InputAdornment,
  ListItemText,
  MenuItem,
  Stack,
} from '@mui/material';
import { useMemo } from 'react';

import { type GenericOptionProps, type PassengerCountData } from '@/types';

import { iconStyles } from './PassengerCount.styles';

interface PassengerCountProps {
  value: PassengerCountData;
  onChange: (newValue: PassengerCountData) => void;
}

export default function PassengerCount({
  value,
  onChange,
}: PassengerCountProps) {
  const options: GenericOptionProps<number>[] = [
    {
      label: 'Adults',
      key: 'adults',
      value: value.adults,
    },
    {
      label: 'Children',
      key: 'children',
      value: value.children,
      subLabel: 'Aged 2 - 11',
    },
    {
      label: 'Infants',
      key: 'infantsInSeat',
      value: value.infantsInSeat,
      subLabel: 'in seat',
    },
    {
      label: 'Infants',
      key: 'infantsOnLap',
      value: value.infantsOnLap,
      subLabel: 'on lap',
    },
  ];

  const count = useMemo(() => {
    return [
      Object.values(value).reduce((total, current) => total + current, 0),
    ];
  }, [value]);

  const handleAdd = (key: string) => {
    const pKey: keyof PassengerCountData = key as keyof PassengerCountData;
    onChange({ ...value, [pKey]: value[pKey] + 1 });
  };

  const handleRemove = (key: string) => {
    const pKey: keyof PassengerCountData = key as keyof PassengerCountData;
    onChange({ ...value, [pKey]: value[pKey] - 1 });
  };

  return (
    <StyledFormControl
      sx={({ palette }) => ({
        color: palette.secondary.main,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '8px',
        m: 1,
      })}
      size="small"
      variant="standard"
    >
      <StyledSelect
        id="passenger-count"
        className="custom-select"
        multiple
        value={count}
        onChange={noop}
        renderValue={() => count}
        startAdornment={
          <InputAdornment position="start" sx={{ mr: 1 }}>
            <Person />
          </InputAdornment>
        }
        sx={({ palette }) => ({ color: palette.secondary.main })}
      >
        {options.map((option) => (
          <MenuItem key={option.key} value={option.value}>
            <ListItemText
              primary={option.label}
              secondary={option.subLabel}
              slotProps={{ secondary: { sx: { color: 'secondary.main' } } }}
            />
            <Stack
              direction="row"
              spacing={1}
              sx={{ alignItems: 'center', ml: 5 }}
            >
              <IconButton
                aria-label="add-button"
                sx={iconStyles}
                onClick={() => handleAdd(option.key as string)}
              >
                <Add />
              </IconButton>
              <ListItemText primary={option.value} />
              <IconButton
                aria-label="remove-button"
                onClick={() => handleRemove(option.key as string)}
                sx={iconStyles}
                disabled={option.value === 0}
              >
                <Remove />
              </IconButton>
            </Stack>
          </MenuItem>
        ))}
      </StyledSelect>
    </StyledFormControl>
  );
}
