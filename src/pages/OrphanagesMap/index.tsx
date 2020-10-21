import React, { useEffect, useState, useRef, useCallback } from 'react';
import mapMarkerImg from '../../assets/images/map-marker.svg'
import * as s from './styles';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import useMap from '../../hooks/useMap'
import useOrphanage from '../../hooks/useOrphanage';
import { Map } from '../../components/Map';

const OrphanegesMap: React.FC = () => {
  const divMapRef = useRef(null);

  const { map, addDeDefaultMarker, addMarkers } = useMap(divMapRef);
  const { orphanages, getOrphanages } = useOrphanage();


  useEffect(() => {
    map?.on('load', () => {
      //console.log('map carregado')
      getMyCurrentLocation();
      getOrphanages()
    })
  }, [map]);

  useEffect(() => {
    orphanages.length && addMarkers(orphanages);
  }, [orphanages]);



  const getMyCurrentLocation = useCallback(() => {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('position: ', position);
        const { latitude, longitude } = position.coords;
        map?.setCenter({
          lat: latitude,
          lng: longitude
        })
        map?.setZoom(15)
        addDeDefaultMarker({ latitude, longitude })
      },
      (err) => {
        console.log(err)
      },
      {
        timeout: 30000,
      }
    );
    // listenMapMoveEvent(mapbox);
    // setMap(mapbox);

  }, [map,addDeDefaultMarker]);

  return (
    <s.Container>

      <s.Aside>

        <s.Header>
          <img src={mapMarkerImg} alt="map" />
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão estão esperando a sua visita :)</p>
        </s.Header>

        <s.Footer>
          <strong>Natal</strong>
          <span>Rio Grande do Norte</span>
        </s.Footer>

      </s.Aside>


      <Map
        ref={divMapRef}
      >
        <div className='sidebarStyle'>
          <div>Longitude: {map?.getCenter().lng.toFixed(4)} | Latitude: {map?.getCenter().lat.toFixed(4)} | Zoom: {map?.getZoom().toFixed(2)}</div>
        </div>
      </Map>


      <Link to='/orphanage/create'>
        <FiPlus size={32} color='#fff' />
      </Link>
    </s.Container>
  );
}

export default OrphanegesMap;