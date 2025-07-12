import { apiClient } from '@/api';
import { useEffect, useState } from 'react';

import { type FlightProps, type GetFlightsParams } from '@/types';

export const useGetFlights = (requestFilter: GetFlightsParams | null) => {
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const [flights, setFlights] = useState<FlightProps | null>();

  const buildFilters = (
    url: string,
    {
      depatureDate,
      destination,
      origin,
      returnDate,
      ticketType,
      passengers,
    }: GetFlightsParams
  ) => {
    const params = new URLSearchParams({
      originSkyId: origin?.skyId ?? '',
      destinationSky: destination?.skyId ?? '',
      originEntityId: origin?.entityId ?? '',
      destinationId: destination?.entityId ?? '',
      date: depatureDate,
      returnDate: returnDate,
      cabinClass: ticketType,
      adults: passengers.adults.toString(),
      childrens: passengers.children.toString(),
      infants: (passengers.infantsInSeat + passengers.infantsOnLap).toString(),
    });
    return (url += `?${params.toString()}`);
  };

  useEffect(() => {
    if (!requestFilter) return;

    const fetchFlights = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.get(
          buildFilters('flights/searchAirport', requestFilter)
        );
        const data: FlightProps = response.data?.data ?? [];
        setFlights(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchFlights();
      // Comment above and uncomment below for testing, as API has max requests per month
      // setFlights(flightsMock);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [requestFilter]);

  return { error, flights, loading };
};
