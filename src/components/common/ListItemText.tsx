import {
  type ListItemTextProps,
  ListItemText as MUIListItemText,
} from '@mui/material';

export default function ListItemText(props: ListItemTextProps) {
  return (
    <MUIListItemText
      {...props}
      slotProps={{
        ...props.slotProps,
        secondary: {
          color: 'secondary.main',
          fontSize: '12px',
        },
      }}
    />
  );
}
