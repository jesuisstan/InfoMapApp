import React, { useRef, useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-shadow.png';
import PlacesCategorySelector from './PlacesCategorySelector';
import styles from '../../styles/InfoMap.module.css';
import axios from 'axios';
import VisibleAmountSelector from './VisibleAmountSelector';

const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/'; // Use the CORS Anywhere proxy
const yelpApiUrl = 'https://api.yelp.com/v3/businesses/search';
const yelpApiKey =
  'KYlMdpPmsji2yrNI0zvib15jTZZsa8yJN2BiFZLe2PDdLVXR2i1gspUB06cVbxmv-l_l0bqjSkQu96wTqh8ydNFnGfCY0NM5duFGLt1JM-fLGbxkHYwZ3_Jp-LTcZHYx';

const markerIcon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
});

const InfoMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [visibleAmount, setVisibleAmount] = useState(10);
  const [placesCategory, setPlacesCategory] = useState('restaurants');

  useEffect(() => {
    if (mapContainerRef.current) {
      if (mapRef.current) {
        mapRef.current.remove();
      }

      const map = L.map(mapContainerRef.current).setView([48.8566, 2.3522], 13);
      mapRef.current = map; // Store the reference
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      // Fetch places data from Yelp Fusion API
      const fetchPlaces = async () => {
        try {
          const response = await axios.get(corsAnywhereUrl + yelpApiUrl, {
            headers: {
              Authorization: `Bearer ${yelpApiKey}`,
              //Origin: '*'
            },
            params: {
              term: placesCategory,
              location: 'Paris',
              limit: visibleAmount
            }
          });

          const places = response.data.businesses;
          console.log(places);

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
        } catch (error) {
          console.error('Error fetching places data:', error);
        }
      };

      fetchPlaces();
    }
  }, [placesCategory, visibleAmount]);

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
      </div>
      <div ref={mapContainerRef} className={styles.InfoMap} />
    </div>
  );
};

export default InfoMap;
