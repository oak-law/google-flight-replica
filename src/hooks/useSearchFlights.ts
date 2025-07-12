import { apiClient } from '@/api';
// Uncomment for testing, as API has max requests per month
import { airportsMock } from '@/mocks/airports';
import { useEffect, useState } from 'react';

import { type AirportProps } from '@/types';

export const useSearchFlights = (query: string) => {
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const [flights, setFlights] = useState<AirportProps[]>([]);

  useEffect(() => {
    if (!query) return;

    const fetchFlights = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.get(
          `flights/searchAirport?query=${query}&locale=en-US`
        );
        const data: AirportProps[] = response.data?.data ?? [];
        setFlights(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      // fetchFlights();
      // Comment above and uncomment below for testing, as API has max requests per month
      setFlights(airportsMock);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [query]);

  return { error, flights, loading };
};
