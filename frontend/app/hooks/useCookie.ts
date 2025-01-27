import { useState, useEffect } from 'react';

interface CookieResponse {
  value: string | null;
}

export function useCookie(cookieName: string): string | null {
  const [cookieValue, setCookieValue] = useState<string | null>(null);

  useEffect(() => {
    const fetchCookie = async () => {
      try {
        const response = await fetch(
          `/api/get-cookie?cookieName=${cookieName}`
        );
        if (!response.ok) throw new Error('Failed to fetch cookie');
        const data: CookieResponse = await response.json();
        setCookieValue(data.value);
      } catch (error) {
        console.error('Error fetching cookie:', error);
        setCookieValue(null);
      }
    };

    fetchCookie();
  }, [cookieName]);

  return cookieValue;
}
