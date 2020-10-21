import React, { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo, FiArrowLeft } from "react-icons/fi";
import SideBar from '../../components/SideBar';
import useMap from '../../hooks/useMap'
import { Map } from '../../components/Map';
import './style.css';
import { useParams } from "react-router-dom";
import useOrphanage from '../../hooks/useOrphanage';

export default function Orphanage() {

  const divMapRef = useRef(null);
  const { map, addMarkers } = useMap(divMapRef);
  const { orphanage, getOrphanage } = useOrphanage();
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    getOrphanage(id);
  }, [id])

  useEffect(() => {
    orphanage && map && map.on('load', () => {
      addMarkers([orphanage])
      map.setCenter([orphanage.longitude, orphanage.latitude]);
      map.setZoom(15)
    })

  }, [orphanage, map])


  return (
    <div id="page-orphanage">
      <SideBar />

      <main>
        <div className="orphanage-details">
          <img src={orphanage?.images[activeImageIndex].path} alt={orphanage?.images[0].name} />

          <div className="images">
            {orphanage?.images.map((image: any, i: number) => (
              <button
                className={activeImageIndex === i ? 'active' : ''}
                type="button"
                key={image.id}
                onClick={() => setActiveImageIndex(i)}
              >

                <img src={image.path} alt={image.name} />
              </button>
            ))}
          </div>

          <div className="orphanage-details-content">
            <h1>{orphanage?.name}</h1>
            <p>{orphanage?.about}</p>

            <div className="map-container">
              <Map
                ref={divMapRef}
                style={{ height: '280px' }}
              >
                <div className='sidebarStyle'>
                  <div>Longitude: {map?.getCenter().lng.toFixed(4)} | Latitude: {map?.getCenter().lat.toFixed(4)} | Zoom: {map?.getZoom().toFixed(2)}</div>
                </div>
              </Map>

              <footer>
                <a href={`http://www.google.com/maps/dir/?api=1&destination=${orphanage?.latitude},${orphanage?.longitude}`} target="_blank" rel="noopener noreferrer">Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage?.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                {orphanage?.opening_hours}
              </div>
              <div className="open-on-weekends">
                <FiInfo size={32} color="#39CC83" />
                {
                  orphanage?.open_on_weekends ?
                    <>
                      Atendemos <br />
                    fim de semana
                  </>
                    :
                    'Não atendemons fim de semana'
                }

              </div>
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}