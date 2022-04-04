import React, { memo } from 'react';

type Props = {
  locationDetails:string,
  address: {
    addressLine1: string,
    addressLine2: string,
    city: string,
    state: string,
    zip: string,
  },
  locationType: 'string'
};

const LocationCard = ({
  locationDetails, address, locationType,
}: Props) => (
  <div className="location-card">
    <div className="card-section">
      <p className="card-section-name">Details</p>
      <p className="card-section-info">{locationDetails}</p>
    </div>

    <div className="card-section section-address">
      <p className="card-section-name">Address</p>
      {Object.entries(address).map(([key, value]) => (
        <p key={key} className="card-section-info">
          {value && `${key}: ${value}`}
        </p>
      ))}
    </div>
    <div className="card-section">
      <p className="card-section-name">Type</p>
      <p className="card-section-info">{locationType}</p>
    </div>
  </div>

);

export default memo(LocationCard);
