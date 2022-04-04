import React from 'react';
import renderer from 'react-test-renderer';
import App from "../App";
/**
 * @jest-environment jsdom
 */

test('renders locations page', () => {
  const component = renderer.create(<App />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})
