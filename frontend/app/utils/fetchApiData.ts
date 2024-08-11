export default async function fetchApiData(
  url = '',
  method = 'get',
  headers = {},
  body = {}
) {
  try {
    const response = await fetch(`${process.env.APP_API_URL}/api/${url}`, {
      cache: 'no-cache',
      method: method,
      headers: new Headers(headers),
      credentials: 'include',
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Expected JSON response but got:', contentType);
      const text = await response.text();
      throw new Error(`Response body:, ${text}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(`Fetch error at /api/${url}: ${error}`);
  }
}
