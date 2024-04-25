import { Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../constants";
import Service from "../../services/KategorijaService";
import { useState, useEffect  } from "react";
import InputText from "../../components/InputText";
import Akcije from "../../components/Akcije";
import moment from "moment";
import useError from "../../hooks/useError";

export default function KategorijePromjeni(){
    const navigate = useNavigate();
    const routeParams = useParams();
    const [kategorija, setKategorija] = useState({});

    const { prikaziError } = useError();

    async function ucitajKategorija(){
        const odgovor = await Service.getBySifra('Kategorije',routeParams.sifra);
        if(!odgovor.ok){
            prikaziError(odgovor.podaci);
            return;
        }
        setKategorija(odgovor.podaci);
    }

    async function promjeni(kategorija){
        const odgovor = await Service.promjeni('Kategorije',routeParams.sifra,kategorija);
        if(!odgovor.ok){
            prikaziError(odgovor.podaci);
            return;
        }
        navigate(RoutesNames.KATEGORIJE_PREGLED);
    }

    useEffect(()=>{
        ucitajKategorija();
    },[]);

    function obradiSubmit(e){ 
        e.preventDefault();
        const podaci = new FormData(e.target);
        promjeni({
            naziv: podaci.get('naziv'),  
            vrijediOd: moment.utc(podaci.get('vrijediOd'))  
        });
    }

    return (
        <Container>
            <Form onSubmit={obradiSubmit}>
                <InputText atribut='naziv' vrijednost={kategorija.naziv} />
                <Form.Group>
                    <Form.Label>Vrijedi od</Form.Label>
                    <Form.Control type="date" name="vrijediOd" defaultValue={kategorija.vrijediOd} />
                </Form.Group>
                <hr />
                <Akcije odustani={RoutesNames.KATEGORIJE_PREGLED} akcija='Dodaj kategoriju' />
            </Form>
        </Container>
    );
}