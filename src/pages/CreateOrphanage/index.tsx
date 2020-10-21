import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useHistory } from 'react-router-dom'
import { FiPlus } from "react-icons/fi";
import SideBar from '../../components/SideBar';
import useMap from '../../hooks/useMap';
import useOrphanage from '../../hooks/useOrphanage';
import { Map } from '../../components/Map';

import './style.css';

export default function CreateOrphanage() {

  const { isLoadingCreateOrphanage,isCreated, createOrphanage } = useOrphanage();

  const divMapRef = useRef(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const { map, addMarkerOnclick } = useMap(divMapRef);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [openOnWeekends, setOpenOnWeekends] = useState(true);
  const [openingHours, setOpeningHours] = useState('');
  const [images, setImages] = useState<File[]>([]);

  const history = useHistory();

  useEffect(() => {
    map?.on('click', (e: any) => {
      const { lat, lng } = e.lngLat;
      setLatitude(lat);
      setLongitude(lng);

      addMarkerOnclick({
        latitude: lat,
        longitude: lng
      })
    })
  }, [map])

  const handleSelectImages = useCallback((e:React.ChangeEvent<HTMLInputElement>)=>{
    if(!e.target.files){
      return
    }
    setImages(Array.from(e.target.files))
  },[images])

  const previewImages = useMemo(()=>
    images.map(image=>URL.createObjectURL(image))
  ,[images])

  useEffect(()=>{
    console.log('')
    if(isCreated){
      history.push('/app')
    }
  },[isCreated])
  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('criando')
    const data = new FormData();
    data.append('about',about)
    data.append('instructions',instructions)
    data.append('latitude',String(latitude))
    data.append('longitude',String(longitude))
    data.append('name',name)
    data.append('open_on_weekends',String(openOnWeekends))
    data.append('opening_hours',String(openingHours))

    images.forEach(image=>{
      data.append('images',image);
    })
    createOrphanage(data);

  }, [name, latitude, longitude, instructions, openOnWeekends, openingHours, about, images])


  return (
    <div id="page-create-orphanage">
      <SideBar />
      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>
            <Map
              ref={divMapRef}
              style={{ height: '280px' }}
            >
              <div className='sidebarStyle'>
                <div>Longitude: {map?.getCenter().lng.toFixed(4)} | Latitude: {map?.getCenter().lat.toFixed(4)} | Zoom: {map?.getZoom().toFixed(2)}</div>
              </div>
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea
                id="name"
                maxLength={300}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                required
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>
        
              <div className="images-container">
                {previewImages.map(priviewImage=>(
                  <img 
                    key={priviewImage}
                    src={priviewImage} 
                    alt={priviewImage}
                  />
                ))}
                <button 
                  className="new-image" 
                  type='button'
                  onClick={()=>inputFileRef.current?.click()}
                >
                  <FiPlus size={32} color="#15b6d6" />
                </button>
              </div>
              <input 
                type="file" 
                id='image[]'
                multiple
                onChange={handleSelectImages}
                ref={inputFileRef}
              />

            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                required
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input
                id="opening_hours"
                value={openingHours}
                onChange={(e) => setOpeningHours(e.target.value)}
                required
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  onClick={() => setOpenOnWeekends(true)}
                  type="button"
                  className={openOnWeekends ? 'active' : ''}
                >
                  Sim
                </button>
                <button
                  onClick={() => setOpenOnWeekends(false)}
                  type="button"
                  className={!openOnWeekends ? 'active' : ''}
                >Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
