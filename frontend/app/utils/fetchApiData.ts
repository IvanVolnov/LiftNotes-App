export default async function fetchApiData(
  url = '',
  method = 'get',
  headers = {},
  body = {},
  signal?: AbortSignal
) {
  try {
    const response = await fetch(`${process.env.APP_API_URL}/api/${url}`, {
      cache: 'no-store',
      method: method,
      headers: new Headers(headers),
      credentials: 'include',
      body: JSON.stringify(body),
      signal,
    });

    const contentType = response.headers.get('content-type');

    if (!response.ok) {
      if (contentType && contentType.includes('application/json')) {
        const error = await response.json();
        throw new Error(`Error fetching data: ${JSON.stringify(error)}`);
      } else {
        const errorText = await response.text();
        throw new Error(
          `Unexpected response type: ${
            contentType || 'unknown'
          }, error: ${errorText}`
        );
      }
    }

    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`Expected JSON response but got: ${contentType}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(`Fetch error at /api/${url}: ${error.message || error}`);
  }
}
