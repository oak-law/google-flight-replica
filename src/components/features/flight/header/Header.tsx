import { Box, Typography } from '@mui/material';
import { h1Style } from './Header.styles';

export default function Header() {
  return (
    <Box
      id="header"
      sx={({ breakpoints }) => ({
        position: 'relative',
        minHeight: '144px',
        width: '100%',
        mb: '40px',
        [breakpoints.down('sm')]: { mb: '10px' },
      })}
    >
      <img src="/img/header.svg" />
      <Typography sx={h1Style} variant="h1">
        Flights
      </Typography>
    </Box>
  );
}
