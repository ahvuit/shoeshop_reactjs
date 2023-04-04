import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import React, { useState, useCallback, useEffect } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBNWe_8qpOmcj8KgiBUc_7ZVMEoOvw9JRo",
  });

  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCenter({ lat: latitude, lng: longitude });
        setMarker({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {marker && <Marker position={marker} />}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default Map;




// import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
// import React, { useState, useCallback } from "react";
// const containerStyle = {
//   width: "100%",
//   height: "400px",
// };

// const center = {
//   lat: 21.0278,
//   lng: 105.8342,
// };
// function Map() {
//   const { isLoaded } = useJsApiLoader({
//     id: "google-map-script",
//     googleMapsApiKey: "AIzaSyBNWe_8qpOmcj8KgiBUc_7ZVMEoOvw9JRo",
//   });

//   const [map,setMap] = useState(null);

//   const onLoad = useCallback(
//     function callback(map) {
//       const bounds = new window.google.maps.LatLngBounds();
//       map.fitBounds(bounds);
//       setMap(map);
//     },
//     [setMap]
//   );

//   const onUnmount = useCallback(
//     function callback(map) {
//       setMap(null);
//     },
//     [setMap]
//   );

//   return isLoaded ? (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={center}
//       zoom={15}
//       onLoad={onLoad}
//       onUnmount={onUnmount}
//     >
//       <Marker position={center} />
//     </GoogleMap>
//   ) : (
//     <></>
//   );
// }

// export default Map;
