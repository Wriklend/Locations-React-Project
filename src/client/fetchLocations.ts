type Props = {
  locationsFetchState: { start: number; limit: number; },
  signal: AbortSignal,
};

const fetchLocations = ({ locationsFetchState, signal }: Props) => {
  const myHeaders = new Headers();
  myHeaders.append('Username', 'amitphatak$r5labs.com');
  myHeaders.append('Content-Type', 'application/json');

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(locationsFetchState),
    signal,
  };

  return fetch(`${process.env.NODE_ENV === 'development' ? 'api' : process.env.BACKEND_URL}/locations`, requestOptions as RequestInit)
    .then((response) => response.json());
};

export default fetchLocations;
