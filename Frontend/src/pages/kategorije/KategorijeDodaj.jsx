import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import Service from "../../services/KategorijaService";
import moment from "moment";
import InputText from "../../components/InputText";
import Akcije from "../../components/Akcije";
import useError from "../../hooks/useError";
import useLoading from "../../hooks/useLoading";

export default function KategorijeDodaj(){
    const navigate = useNavigate();

    const { prikaziError } = useError();
    const { showLoading, hideLoading } = useLoading();

    async function dodaj(kategorija){
        showLoading();
        const odgovor = await Service.dodaj('Kategorije',kategorija);
        hideLoading();
        if(!odgovor.ok){
            prikaziError(odgovor.podaci);
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