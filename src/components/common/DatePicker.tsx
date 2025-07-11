import { styled } from '@mui/material';
import { DatePicker as MUIDatePicker } from '@mui/x-date-pickers';
import type { PickerValue } from '@mui/x-date-pickers/internals';
import dayjs from 'dayjs';

interface DatePickerProps {
  onChange: (value: PickerValue) => void;
  defaultValue?: Date;
}

const StyledDatePicker = styled(
  MUIDatePicker,
  {}
)(({ theme }) => ({
  color: theme.palette.secondary.main,
}));

export default function DatePicker({
  defaultValue,
  onChange,
}: DatePickerProps) {
  const parsedDefaultValue = defaultValue ? dayjs(defaultValue) : defaultValue;
  return (
    <StyledDatePicker
      defaultValue={parsedDefaultValue}
      format="ddd, MMM D"
      onChange={onChange}
    />
  );
}
