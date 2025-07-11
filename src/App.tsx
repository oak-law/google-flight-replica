import { createTheme, ThemeProvider } from '@mui/material';
import './App.css';
import FlightContainer from './containers/FlightContainer';
import { palette } from './theme';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

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
