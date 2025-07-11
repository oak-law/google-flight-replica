import { apiClient } from '@/api';
import { useEffect, useState } from 'react';

// Uncomment for testing, as API has max requests per month
// import { flightsMock } from '@/mocks/flights';
import { type FlightProps } from '@/types';

export const useSearchFlights = (query: string) => {
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const [flights, setFlights] = useState<FlightProps[]>([]);

  useEffect(() => {
    if (!query) return;

    const fetchFlights = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.get(
          `flights/searchAirport?query=${query}&locale=en-US`
        );
        const data: FlightProps[] = response.data?.data ?? [];
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
  }, [query]);

  return { error, flights, loading };
};
