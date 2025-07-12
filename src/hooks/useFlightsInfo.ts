import { useEffect, useState } from 'react';

import type { FlightInfoProps, FlightProps, ItineraryProps } from '@/types';

interface FlightsInfoProps {
  flights: FlightProps;
}

const defaultHeaderLogo =
  'https://www.gstatic.com/flights/airline_logos/70px/multi.png';
// const initialState: Pick<FlightInfoProps, ''> = {};

export default function useFlightsInfo({ flights }: FlightsInfoProps) {
  const [flightInfo, setFlightInfo] = useState<FlightInfoProps[]>([]);
  const [cheapest, setCheapest] = useState('$0');

  useEffect(() => {
    const info: FlightInfoProps[] = [];

    flights.itineraries.forEach((itinerary: ItineraryProps) => {
      const data: FlightInfoProps = {
        id: itinerary.id,
        price: itinerary.price,
        headerLogoUrl: itinerary.isMashUp
          ? defaultHeaderLogo
          : itinerary.legs[0].carriers.marketing[0].logoUrl,
        legs: [],
      };

      if (itinerary.isMashUp) {
        data.headerLogoUrl = defaultHeaderLogo;
      }

      if (itinerary.tags.includes('cheapest')) {
        setCheapest(itinerary.price.formatted);
      }

      itinerary.legs.forEach((leg) => {
        data.legs.push({
          ...leg,
          airlines: leg.carriers.marketing.map(({ name, logoUrl }) => ({
            name,
            logoUrl,
          })),
        });
      });

      info.push(data);
    });
    setFlightInfo(info);
  }, [flights]);

  return {
    flightInfo,
    cheapest,
  };
}
