import { useCallback, useState } from 'react';
import api from '../services/api';

// import { Container } from './styles';
interface IImage {
    id?: number;
    name: string;
    orphanage_id?: number;
    path: string;
}
interface IOrphanage {
    id?: number;
    images: IImage[];
    about: string;
    instructions: string;
    latitude: number;
    longitude: number;
    name: string;
    open_on_weekends: boolean;
    opening_hours: string;
}

const useOrphanage = () => {
    const [orphanages, setOrphanages] = useState<IOrphanage[]>([]);
    const [orphanage, setOrphanage] = useState<IOrphanage | null>(null);
    const [isLoadingCreateOrphanage, setIsLoadingCreateOrphanage] = useState(false);
    const [isCreated, setIsisCreated] = useState(false);

    const getOrphanages = useCallback(async () => {
        try {
            const response = await api.get('/orphanage')
            //console.log('orfanatos: ', response.data)
            setOrphanages(response.data);
        }
        catch (err) {
            console.log('erro ao obter orfanatos')
            console.log(err)
        }
    }, [])

    const getOrphanage = useCallback(async (id) => {
        try {
            const response = await api.get(`/orphanage/${id}`)
            console.log(response.data)
            setOrphanage(response.data);
        }
        catch (err) {
            console.log('erro ao obter orfanatos')
            console.log(err)
        }
    }, [])

    const createOrphanage = useCallback(async (orphanageData: FormData )=>{
        try{
            console.log('criandoooo')

            setIsLoadingCreateOrphanage(true)
            await api.post('/orphanage',orphanageData)
            window.alert('orfanato criado com sucesso!')
            console.log('criando')

            setIsisCreated(true);
        }
        catch(err){
            window.alert('orfanato não pôde ser criado!')

            console.log('orfanato não pôde ser criado :/')
            console.log(err)
        }
        setIsLoadingCreateOrphanage(false)

    },[])

    return { orphanages, orphanage,isCreated,isLoadingCreateOrphanage, getOrphanages ,getOrphanage, createOrphanage};
}

export default useOrphanage;