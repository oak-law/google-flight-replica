import {
  FormControl,
  InputAdornment,
  InputLabel,
  Select as MUISelect,
  type SelectProps as MUISelectProps,
  MenuItem,
  styled,
} from '@mui/material';
import { type ReactNode } from 'react';

import type { GenericOptionProps } from '@/types';

type SelectProps<T = string> = MUISelectProps & {
  options: Array<GenericOptionProps<T>>;
  onSelect: (newValue: T) => void;
  icon?: ReactNode;
};

export const StyledFormControl = styled(FormControl, {
  shouldForwardProp: (prop) => prop !== 'success',
})(({ theme }) => ({
  color: theme.palette.secondary.main,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '8px',
}));

export const StyledSelect = styled(MUISelect, {
  shouldForwardProp: (prop) => prop !== 'success',
})(({ theme }) => ({
  backgroundColor: 'transparent',
  color: 'whitesmoke',
  paddingBottom: '4px',
  paddingLeft: '10px',
  paddingRight: '10px',
  paddingTop: '4px',
  minWidth: '10px',
  '& .MuiMenuItem-root': {
    backgroundColor: theme.palette.background.default,
  },
  [theme.breakpoints.down('sm')]: {
    backgroundColor: 'transparent',
  },
}));

export default function Select<T = string>({
  icon,
  id = 'default-select',
  label,
  labelId = 'default-select-label',
  options,
  sx,
  value,
  onSelect,
}: SelectProps<T>) {
  return (
    <StyledFormControl sx={sx} variant="standard" size="small">
      {label && <InputLabel id={labelId}>{label}</InputLabel>}
      <StyledSelect
        id={id}
        value={value}
        onChange={(e) => onSelect(e.target.value as T)}
        startAdornment={
          <InputAdornment
            position="start"
            sx={{ color: 'currentColor', mr: 1 }}
          >
            {icon}
          </InputAdornment>
        }
        className="custom-select"
      >
        {options.map(({ label, value }) => (
          <MenuItem key={value as string} value={value as string}>
            {label}
          </MenuItem>
        ))}
      </StyledSelect>
    </StyledFormControl>
  );
}
