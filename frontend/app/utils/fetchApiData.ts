export default async function fetchApiData(
  url = '',
  method = 'get',
  headers = {},
  body = {}
) {
  // const env = process.env.APP_API_URL;
  // console.log({ env, url, method, headers, body });
  try {
    const response = await fetch(`${process.env.APP_API_URL}/api/${url}`, {
      cache: 'no-cache',
      method: method,
      headers: new Headers(headers),
      credentials: 'include',
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Error fetching data: ${error}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`Expected JSON response but got: ${contentType}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(`Fetch error at /api/${url}: ${error}`);
  }
}
