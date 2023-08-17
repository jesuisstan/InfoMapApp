/*
The InfoMap component's purpose is to display a map interface with interactive markers
representing places fetched from the Yelp Fusion API, enabling users to explore different categories
and adjust the number of visible places. 
It offers a dynamic and user-friendly way to discover and interact with location-based data.
*/

import { useRef, useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-shadow.png';
import PlacesCategorySelector from './PlacesCategorySelector';
import VisibleAmountSelector from './VisibleAmountSelector';
import styles from '../../styles/InfoMap.module.css';
import axios from 'axios';
import errorAlert from '../../utils/errorAlert';
import FloatingButton from '../UI/FloatingButton';

const homeTownCoordinates = [48.8566, 2.3522]; // Latitude and Longitude of Paris

const markerIcon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: process.env.REACT_APP_YELP_ICON_URL!,
  shadowUrl: process.env.REACT_APP_YELP_SHADOW_URL!
});

const InfoMap = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [visibleAmount, setVisibleAmount] = useState(10);
  const [placesCategory, setPlacesCategory] = useState('restaurants');

  const [fixedCoordinates, setFixedCoordinates] = useState<[number, number]>([
    homeTownCoordinates[0],
    homeTownCoordinates[1]
  ]);

  /*Within the useEffect hook, the component sets up the Leaflet map instance,
    attaches a click event handler to update the fixed coordinates,
    and adds a tile layer from OpenStreetMap.
  */
  useEffect(() => {
    if (mapContainerRef.current) {
      if (mapRef.current) {
        mapRef.current.remove();
      }

      const map = L.map(mapContainerRef.current).setView(
        [...fixedCoordinates],
        13
      );

      mapRef.current = map; // Store the reference
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      const handleMapClick = (event: L.LeafletMouseEvent) => {
        const { lat, lng } = event.latlng;
        setFixedCoordinates([lat, lng]);
      };

      map.on('click', handleMapClick);

      // Fetch places data from Yelp Fusion API
      const fetchPlaces = async () => {
        try {
          const response = await axios.get(
            process.env.REACT_APP_URL_CORS! +
              process.env.REACT_APP_YELP_API_URL!,
            {
              headers: {
                Authorization: `Bearer ${process.env.REACT_APP_YELP_KEY}`
                //Origin: '*'
              },
              params: {
                term: placesCategory,
                //location: 'Paris',
                latitude: fixedCoordinates[0],
                longitude: fixedCoordinates[1],
                limit: visibleAmount
              }
            }
          );

          const places = response.data.businesses;

          // Loop through places data and add markers to the map
          places.forEach((place: any) => {
            const coordinates = place.coordinates;
            const marker = L.marker(
              [coordinates.latitude, coordinates.longitude],
              {
                opacity: 0.9,
                icon: markerIcon
              }
            )
              .addTo(map)
              .bindPopup(
                `<b>${place.name}</b><br>address: ${place.location.address1}<br>tel: ${place.phone}<br>rating: ${place.rating}<br><a href="${place.url}" target="_blank" rel="noopener noreferrer">visit site</a>`
              )
              .openPopup();

            marker.on('mouseover', () => {
              marker.bindTooltip(place.name, { permanent: true }).openTooltip();
            });

            marker.on('mouseout', () => {
              marker.unbindTooltip();
            });
          });
        } catch (error: any) {
          if (error.response.status !== 401) {
            errorAlert(
              'Error fetching places data: YELP authentication failed'
            );
          } else if (error.response.status !== 429) {
            errorAlert(
              'Error fetching places data: max requests per day (500) to YELP exceeded'
            );
          } else {
            errorAlert('Unknown error fetching places data from YELP');
          }
        }
      };

      fetchPlaces();

      //The useEffect hook returns a cleanup function to remove the click event listener when the component unmounts
      return () => {
        map.off('click', handleMapClick);
      };
    }
  }, [placesCategory, visibleAmount, fixedCoordinates]);

  return (
    <div className={styles.centeredCard}>
      <div className={styles.selector}>
        <PlacesCategorySelector
          placesCategory={placesCategory}
          setPlacesCategory={setPlacesCategory}
        ></PlacesCategorySelector>
        <VisibleAmountSelector
          visibleAmount={visibleAmount}
          setVisibleAmount={setVisibleAmount}
        ></VisibleAmountSelector>
        <FloatingButton
          onClick={() =>
            setFixedCoordinates([
              homeTownCoordinates[0],
              homeTownCoordinates[1]
            ])
          }
        />
      </div>
      <div ref={mapContainerRef} className={styles.InfoMap} />
    </div>
  );
};

export default InfoMap;
