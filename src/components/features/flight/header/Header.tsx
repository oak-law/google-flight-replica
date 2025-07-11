import { Box, Typography } from '@mui/material';
import { containerStyle, h1Style } from './Header.styles';
import type { GenericProps } from '@/types';

export default function Header({ sx }: GenericProps) {
  const boxStyle = { ...containerStyle, ...sx };

  return (
    <Box id="header" sx={boxStyle}>
      <img src="/img/header.svg" />
      <Typography sx={h1Style} variant="h1">
        Flights
      </Typography>
    </Box>
  );
}
