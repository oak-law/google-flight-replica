import type { SxProps } from '@mui/material';

// ==== Enums ====
export enum SortByOptions {
  BEST = 'best',
  CHEAPEST = 'cheapest',
}

export enum SortByFlightOptions {
  TOP_FLIGHT = 'top flights',
  PRICE = 'price',
  DEPARTURE_TIME = 'departure time',
  ARRIVAL_TIME = 'arrival time',
  DURATION = 'duration',
  EMISSIONS = 'emissions',
}

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
export interface AirportProps {
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

export interface FlightInfoLegsProps {
  airlines: Array<{ name: string; logoUrl: string }>;
  id: string;
  stopCount: number;
  durationInMinutes: number;
  departure: string;
  arrival: string;
}

export interface FlightInfoProps {
  id: string;
  headerLogoUrl: string;
  price: Monetary;
  legs: FlightInfoLegsProps[];
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

// ==== API Payload Interfaces ====
interface Carrier {
  id: number;
  name: string;
  logoUrl: string;
}

interface Monetary {
  raw: number;
  formatted: string;
}

export interface IteneraryLegProps {
  id: string;
  origin: {
    id: string;
    name: string;
    displayCode: string;
    city: string;
    isHighlighted: boolean;
  };
  destination: {
    id: string;
    name: string;
    displayCode: string;
    city: string;
    isHighlighted: boolean;
  };
  carriers: {
    marketing: Carrier[];
    operationType: string;
  };
  durationInMinutes: number;
  stopCount: number;
  isSmallestStops: boolean;
  departure: string;
  arrival: string;
  timeDeltaInDays: number;
}

export interface FilterStats {
  duration: {
    max: number;
    min: number;
  };
  airports: Array<{
    city: string;
    airports: Array<{
      id: string;
      name: string;
    }>;
  }>;
  carriers: Array<Carrier>;
  stopPrices: {
    [key: string]: {
      isPresent: boolean;
      formattedPrice?: string;
    };
  };
}

export interface ItineraryProps {
  id: string;
  price: Monetary;
  legs: IteneraryLegProps[];
  isSelfTransfer: boolean;
  isProtectedSelfTransfer: boolean;
  farePolicy: {
    isChangeAllowed: boolean;
    isPartiallyChangeable: boolean;
    isCancellationAllowed: boolean;
    isPartiallyRefundable: boolean;
  };
  isMashUp: boolean;
  hasFlexibleOptions: boolean;
  score: number;
  tags: Array<string>;
}

export interface FlightProps {
  itineraries: ItineraryProps[];
  filterStats: FilterStats;
}

export interface PassengerCountData {
  adults: number;
  children: number;
  infantsInSeat: number;
  infantsOnLap: number;
}

interface AirportDetails {
  skyId: string;
  entityId: string;
  suggestionTitle: string;
  localizedName: string;
  subTitle: string;
  title: string;
  flightPlaceType: string;
}

export interface GetFlightsParams {
  tripType: TripType;
  passengers: PassengerCountData;
  ticketType: TicketType;
  returnDate: string;
  depatureDate: string;
  origin: AirportDetails | null;
  destination?: AirportDetails | null;
}

// ==== End of API Payload Interfaces ====

// ==== End of Interfaces ====
