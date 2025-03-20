export default async function fetchAPI(urlPart, config) {
  const route = import.meta.env.VITE_SERVER_URL + urlPart;
  const request = await fetch(route, config);

  if (!request.ok) {
    return (window.location.href = `/${request.status}`);
  }

  return await request.json();
}
