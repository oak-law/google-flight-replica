import { ThemeProvider, createTheme } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import './App.css';
import FlightContainer from './containers/FlightContainer/FlightContainer';
import { palette } from './theme';

function App() {
  const theme = createTheme({
    palette,
  });
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FlightContainer />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
