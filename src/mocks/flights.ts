import type { FlightProps } from '@/types';

export const flightsMock: FlightProps[] = [
  {
    presentation: {
      title: 'New York',
      suggestionTitle: 'New York (Any)',
      subTitle: 'United States',
    },
    navigation: {
      relevantFlightParams: {
        skyId: 'NYCA',
        entityId: '27537542',
        flightPlaceType: 'CITY',
        localizedName: 'New York',
      },
    },
  },
  {
    presentation: {
      title: 'New York Newark',
      suggestionTitle: 'New York Newark (EWR)',
      subTitle: 'United States',
    },
    navigation: {
      relevantFlightParams: {
        skyId: 'EWR',
        entityId: '95565059',
        flightPlaceType: 'AIRPORT',
        localizedName: 'New York Newark',
      },
    },
  },
  {
    presentation: {
      title: 'New York John F. Kennedy',
      suggestionTitle: 'New York John F. Kennedy (JFK)',
      subTitle: 'United States',
    },
    navigation: {
      relevantFlightParams: {
        skyId: 'JFK',
        entityId: '95565058',
        flightPlaceType: 'AIRPORT',
        localizedName: 'New York John F. Kennedy',
      },
    },
  },
  {
    presentation: {
      title: 'New York LaGuardia',
      suggestionTitle: 'New York LaGuardia (LGA)',
      subTitle: 'United States',
    },
    navigation: {
      relevantFlightParams: {
        skyId: 'LGA',
        entityId: '95565057',
        flightPlaceType: 'AIRPORT',
        localizedName: 'New York LaGuardia',
      },
    },
  },
  {
    presentation: {
      title: 'Stewart International',
      suggestionTitle: 'Stewart International (SWF)',
      subTitle: 'United States',
    },
    navigation: {
      relevantFlightParams: {
        skyId: 'SWF',
        entityId: '95566280',
        flightPlaceType: 'AIRPORT',
        localizedName: 'Stewart International',
      },
    },
  },
];
