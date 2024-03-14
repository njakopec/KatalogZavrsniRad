import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import ProizvodService from "../../services/ProizvodService";

export default function ProizvodiDodaj(){
    const navigate = useNavigate();


    async function dodajProizvod(proizvod){
        const odgovor = await ProizvodService.dodajProizvod(proizvod);
        if(odgovor.ok){
          navigate(RoutesNames.PROIZVODI_PREGLED);
        }else{
          console.log(odgovor);
          alert(odgovor.poruka);
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        const podaci = new FormData(e.target);
        //console.log(podaci.get('naziv'));

        const proizvod = 
        {
            naziv: podaci.get('naziv'),
            vrsta: podaci.get(podaci.get('trajanje')),
            cijena: parseFloat(podaci.get('cijena')),
            detaljinarudzbe: podaci.get('detaljinarudzbe')
          };

          //console.log(JSON.stringify(smjer));
          dodajProizvod(proizvod);


    }

    return (

        <Container>
           
           <Form onSubmit={handleSubmit}>

                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control 
                        type="text"
                        name="naziv"
                    />
                </Form.Group>

                <Form.Group controlId="vrsta">
                    <Form.Label>Vrsta</Form.Label>
                    <Form.Control 
                        type="text"                        
                        name="vrsta"
                    />
                </Form.Group>

                <Form.Group controlId="cijena">
                    <Form.Label>Cijena</Form.Label>
                    <Form.Control 
                        type="text"                        
                        name="cijena"
                    />
                </Form.Group>

                <Form.Group controlId="detaljinarudzbe">
                    <Form.Label>Detaljinarudzbe</Form.Label>
                    <Form.Control 
                        type="text"
                        name="detaljinarudzbe"
                    />
                </Form.Group>               

                <Row className="akcije">
                    <Col>
                        <Link 
                        className="btn btn-danger"
                        to={RoutesNames.PROIZVODI_PREGLED}>Odustani</Link>
                    </Col>
                    <Col>
                        <Button
                            variant="primary"
                            type="submit"
                        >
                            Dodaj proizvod
                        </Button>
                    </Col>
                </Row>
                
           </Form>

        </Container>

    );

}