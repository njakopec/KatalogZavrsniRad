import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import Service from "../../services/KategorijaService";
import moment from "moment";
import InputText from "../../components/InputText";
import Akcije from "../../components/Akcije";

export default function KategorijeDodaj(){
    const navigate = useNavigate();

    async function dodaj(kategorija){
        const odgovor = await Service.dodaj('Kategorije',kategorija);
        if(!odgovor.ok){
            alert(Service.dohvatiPorukeAlert(odgovor.podaci));
            return;
        }
        navigate(RoutesNames.KATEGORIJE_PREGLED);
    }

    function obradiSubmit(e){ 
        e.preventDefault();
        const podaci = new FormData(e.target);
        const kategorija = {
            naziv: podaci.get('naziv'), 
            vrijediOd: moment.utc(podaci.get('vrijediOd'))
        };
        dodaj(kategorija);
    }

    return (
        <Container>
            <Form onSubmit={obradiSubmit}>
                <InputText atribut='naziv' vrijednost='' />
                <Form.Group>
                    <Form.Label>Vrijedi od</Form.Label>
                    <Form.Control type="date" name="vrijediOd" />
                </Form.Group>
                <hr />
                <Akcije odustani={RoutesNames.KATEGORIJE_PREGLED} akcija='Dodaj kategoriju' />
            </Form>
        </Container>
    );
}