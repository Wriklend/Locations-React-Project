import React from 'react';
import LocationCard from "../components/locations-page/LocationCard";
import mockLocations from '../mocks/locationListRequestMock';
import {create} from 'react-test-renderer';

const location = mockLocations.locations[0]

test('renders location card', () => {
  const component = create(<LocationCard
    locationDetails={location.locationDetails}
    address={location.address}
    locationType={location.locationType}
  />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})
