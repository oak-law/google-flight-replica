import type { SxProps } from '@mui/material';

// ==== Enums ====
export enum TicketType {
  ECONOMY = 'economy',
  PREMIUM_ECONOMY = 'premium economy',
  BUSINESS = 'business',
  FIRST = 'first',
}

export enum TripType {
  ONE_WAY = 'one way',
  ROUND_TRIP = 'round trip',
  MULTI_CITY = 'multi-city',
}
// ==== End of Enums ====

// ==== Interfaces ====
export interface FlightProps {
  presentation: {
    subTitle: string;
    suggestionTitle: string;
    title: string;
  };
  navigation: {
    relevantFlightParams: {
      skyId: string;
      entityId: string;
      flightPlaceType: string;
      localizedName: string;
    };
  };
}

export interface GenericOptionProps<T = string> {
  label: string;
  value: T;
  key?: string;
  subLabel?: string;
}

export interface GenericProps {
  sx?: SxProps;
}
// ==== End of Interfaces ====
