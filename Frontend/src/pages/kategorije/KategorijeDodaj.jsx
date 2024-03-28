import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import KategorijaService from "../../services/KategorijaService";


export default function KategorijeDodaj(){
    const navigate = useNavigate();

    async function dodaj(kategorija){
        const odgovor = await KategorijaService.post(kategorija);
        if (odgovor.greska){
            console.log(odgovor.poruka);
            alert('Pogledaj konzolu');
            return;
        }
        navigate(RoutesNames.KATEGORIJE_PREGLED);
    }

    function obradiSubmit(e){ // e predstavlja event
        e.preventDefault();
        //alert('Dodajem smjer');

        const podaci = new FormData(e.target);

        const kategorija = {
            naziv: podaci.get('naziv'),  // 'naziv' je name atribut u Form.Control
            vrijediOd: '2024-01-01T00:00:00.000'          
        };

        dodaj(kategorija);

    }

    return (

        <Container>
            <Form onSubmit={obradiSubmit}>

                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" required />
                </Form.Group>

                <Form.Group controlId="trajanje">
                    <Form.Label>Vrijedi od</Form.Label>
                    <Form.Control type="date" name="trajanje" />
                </Form.Group>

              

                <hr />
                <Row>
                    <Col xs={6} sm={6} md={3} lg={6} xl={1} xxl={2}>
                        <Link className="btn btn-danger siroko" to={RoutesNames.KATEGORIJE_PREGLED}>
                            Odustani
                        </Link>
                    </Col>
                    <Col xs={6} sm={6} md={9} lg={6} xl={1} xxl={10}>
                        <Button className="siroko" variant="primary" type="submit">
                            Dodaj
                        </Button>
                    </Col>
                </Row>

            </Form>
        </Container>

    );
}