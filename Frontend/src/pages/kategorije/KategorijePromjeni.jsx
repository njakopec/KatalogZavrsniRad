import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../constants";
import KategorijaService from "../../services/KategorijaService";
import { useState, useEffect  } from "react";


export default function KategorijePromjeni(){
    const navigate = useNavigate();
    const routeParams = useParams();
    const [kategorija, setKategorija] = useState({});

    async function ucitajKategorija(){
        const odgovor = await KategorijaService.getBySifra(routeParams.sifra);
        if (odgovor.greska){
            console.log(odgovor.poruka);
            alert('Pogledaj konzolu');
            return;
        }
        setKategorija(odgovor.poruka);
    }

    async function promjeni(kategorija){
        const odgovor = await KategorijaService.update(routeParams.sifra,kategorija);
        if (odgovor.greska){
            console.log(odgovor.poruka);
            alert('Pogledaj konzolu');
            return;
        }
        navigate(RoutesNames.KATEGORIJE_PREGLED);
    }



    useEffect(()=>{
        ucitajKategorija();
    },[]);


    function obradiSubmit(e){ // e predstavlja event
        e.preventDefault();

        const podaci = new FormData(e.target);

        promjeni({
            naziv: podaci.get('naziv'),  // 'naziv' je name atribut u Form.Control
            vrijediOd: podaci.get('vrijediOd')       
        });

    }

    return (

        <Container>
            <Form onSubmit={obradiSubmit}>

                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" 
                    defaultValue={kategorija.naziv}
                    required />
                </Form.Group>

                <Form.Group controlId="vrijediOd">
                    <Form.Label>Vrijedi od</Form.Label>
                    <Form.Control type="text" name="vrijediOd" 
                    defaultValue={kategorija.vrijediOd}
                     />
                </Form.Group>

              

                <hr />
                <Row>
                    <Col>
                        <Link className="btn btn-danger siroko" to={RoutesNames.KATEGORIJE_PREGLED}>
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button className="siroko" variant="primary" type="submit">
                            Promjeni
                        </Button>
                    </Col>
                </Row>

            </Form>
        </Container>

    );
}