import React, {
  memo, useCallback, useEffect, useRef, useState,
} from 'react';
import usePage from '../hooks/usePage';
import LocationCard from '../components/locations-page/LocationCard';
import throttle from '../utills/throttle';
import getCoords from '../utills/getCoords';
import fetchLocations from '../client/fetchLocations';

const LIMIT = 3;

const Locations = () => {
  usePage('locations-page', 'locations');

  const AFrequested = useRef<boolean>(false);
  const controllerRef = useRef<AbortController>(null);
  const locationsListRef = useRef<HTMLDivElement>(null);
  const isLocationListLoadingRef = useRef<boolean>(false);
  const numberOfLocations = useRef<number>(0);
  const locationsFetchState = useRef<{ start: number, limit: number }>({
    start: 0,
    limit: LIMIT,
  });

  const [locationList, setLocationList] = useState<any>([]);
  const [isLocationListLoading, setIsLocationListLoading] = useState<boolean>(false);
  const [locationsError, setLocationsError] = useState(null);

  const nextLocationFetchState = useCallback(() => {
    locationsFetchState.current = {
      ...locationsFetchState.current,
      start: locationsFetchState.current.start + LIMIT,
    };
  }, []);

  const fetchLocationsList = useCallback(() => {
    setIsLocationListLoading(true);
    isLocationListLoadingRef.current = true;
    controllerRef.current = new AbortController();

    const { signal } = controllerRef.current;

    fetchLocations({ locationsFetchState: locationsFetchState.current, signal })
      .then((result) => {
        setLocationList((prev) => [...prev, ...result.locations]);
        setLocationsError(null);
        numberOfLocations.current = result.numberOfLocations;
        nextLocationFetchState();
      })
      // eslint-disable-next-line no-console
      .catch((error) => {
        console.log('error', error);
        setLocationsError('Something wrong with locations fetching...');
      })
      .finally(() => {
        setIsLocationListLoading(false);
        isLocationListLoadingRef.current = false;
      });
  }, [nextLocationFetchState]);

  const updateLocationsList = useCallback(() => {
    const { scrollY } = window;
    const locationListCoords = getCoords(locationsListRef.current);
    const bottomNodeCoords = locationListCoords.bottom - window.innerHeight;

    if ((scrollY * 1.10 >= bottomNodeCoords)
      && !isLocationListLoadingRef.current
      && (locationsFetchState.current.start < numberOfLocations.current)) {
      fetchLocationsList();
    }
  }, [fetchLocationsList]);

  useEffect(() => {
    const onScroll = throttle(() => {
      if (AFrequested.current) return;

      AFrequested.current = true;

      window.requestAnimationFrame(() => {
        AFrequested.current = false;
        updateLocationsList();
      });
    }, 20);

    window.addEventListener('scroll', onScroll, false);

    return () => {
      window.removeEventListener('scroll', onScroll, false);
    };
  }, []);

  useEffect(() => {
    fetchLocationsList();

    return () => {
      controllerRef.current.abort();
    };
  }, []);

  return (
    <div className="locations-page">
      <div className="header">
        <h1 className="title">List of Locations</h1>
      </div>
      <div ref={locationsListRef} className="locations-list">
        {locationList.map((location) => (
          <LocationCard
            key={location.id}
            locationDetails={location.locationDetails}
            address={location.address}
            locationType={location.locationType}
          />
        ))}
        {locationsError && <span>{locationsError}</span>}
        {isLocationListLoading && <div className="loader" />}
      </div>
    </div>
  );
};

export default memo(Locations);
