import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useState } from 'react';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 31.7917,
  lng: -7.0926,
};

const LocationPicker = ({newPosition, setAddress }: { newPosition: {lat: number; lng: number;}, setAddress: any }) => {
  // const [position, setPosition] = useState(newPosition);
  // //////console.log('Position:', position);
  const position = newPosition;
  async function handleMapClick(event: google.maps.MapMouseEvent) {
    ////console.log('Map clicked', event);
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      // setPosition({ lat, lng });
      try {
      const response = await fetch((
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_GOOGLE_MAP_API}`), {
        method: 'GET',
        });
      const data = await response.json();
      const formattedAddress = data.results[0]?.formatted_address;
      setAddress(formattedAddress || 'Address not found');
    } catch (error) {
      console.error('Error fetching address:', error);
      setAddress('Error fetching address');
    }
    }
  };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={position}
      zoom={6}
      onClick={handleMapClick}
    >
      <Marker position={position} />
    </GoogleMap>
  );
};

export default LocationPicker;