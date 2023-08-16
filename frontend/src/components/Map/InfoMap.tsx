import React, { useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const InfoMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      const map = L.map(mapContainerRef.current).setView([51.505, -0.09], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      const marker = L.marker([51.5, -0.09])
        .addTo(map)
        .bindPopup('A marker!')
        .openPopup();

      marker.on('mouseover', () => {
        marker.bindTooltip('Hovered!', { permanent: true }).openTooltip();
      });

      marker.on('mouseout', () => {
        marker.unbindTooltip();
      });
    }
  }, []);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />;
};

export default InfoMap;
