import { Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../constants";
import Service from "../../services/KategorijaService";
import { useState, useEffect  } from "react";
import InputText from "../../components/InputText";
import Akcije from "../../components/Akcije";
import moment from "moment";
import useError from "../../hooks/useError";
import useLoading from "../../hooks/useLoading";

export default function KategorijePromjeni(){
    const navigate = useNavigate();
    const routeParams = useParams();
    const [kategorija, setKategorija] = useState({});

    const { prikaziError } = useError();
    const { showLoading, hideLoading } = useLoading();

    async function ucitajKategorija(){
        showLoading();
        const odgovor = await Service.getBySifra('Kategorije',routeParams.sifra);
        hideLoading();
        if(!odgovor.ok){
            prikaziError(odgovor.podaci);
            return;
        }
        odgovor.podaci.vrijediOd=moment.utc(odgovor.podaci.vrijediOd).format('YYYY-MM-DD');
        setKategorija(odgovor.podaci);
    }

    async function promjeni(kategorija){
        showLoading();
        const odgovor = await Service.promjeni('Kategorije',routeParams.sifra,kategorija);
        hideLoading();
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
                <Akcije odustani={RoutesNames.KATEGORIJE_PREGLED} akcija='Promjeni kategoriju' />
            </Form>
        </Container>
    );
}