import { Box, Typography } from '@mui/material';
import type { PropsWithChildren } from 'react';

import type { GenericProps } from '@/types';

interface TitleProps extends GenericProps {
  title: string;
}

export default function Title({
  children,
  sx,
  title,
}: PropsWithChildren<TitleProps>) {
  return (
    <Box>
      <Typography sx={sx} variant="h6">
        {title}
      </Typography>
      {children}
    </Box>
  );
}
