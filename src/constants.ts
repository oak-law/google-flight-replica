import { type GenericOptionProps, TicketType, TripType } from './types';

export const noop = () => {};

export const ticketTypeOptions: Array<GenericOptionProps<TicketType>> = [
  {
    label: 'Economy',
    value: TicketType.ECONOMY,
  },
  {
    label: 'Premium Economy',
    value: TicketType.PREMIUM_ECONOMY,
  },
  {
    label: 'Business',
    value: TicketType.BUSINESS,
  },
  {
    label: 'First',
    value: TicketType.FIRST,
  },
];

export const tripTypeOptions: Array<GenericOptionProps<TripType>> = [
  {
    label: 'Round Trip',
    value: TripType.ROUND_TRIP,
  },
  {
    label: 'One Way',
    value: TripType.ONE_WAY,
  },
  {
    label: 'Multi-City',
    value: TripType.MULTI_CITY,
  },
];
