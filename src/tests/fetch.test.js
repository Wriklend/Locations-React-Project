import React from 'react';
import mockLocations from '../mocks/locationListRequestMock';
import {act, create} from 'react-test-renderer';
import Locations from "../pages/Locations";
import {createRoot} from "react-dom/client";

/**
 * @jest-environment jsdom
 */

describe('fetchLocations', () => {
  let container = null;
  let root = null;
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container)
    root = createRoot(container);
  });

  afterEach(() => {
    root?.unmount();
    container?.remove();
    container = null;
  });

  it("renders locations with fetch", async () => {
    const fakeLocations = mockLocations;
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(fakeLocations)
    }));

    await act(async () => {
      create(<Locations />);
    });

    expect(fetch).toBeCalledTimes(1)
  })

})
