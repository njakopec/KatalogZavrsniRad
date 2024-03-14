import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProizvodService from "../../services/ProizvodService";
import { RoutesNames } from "../../constants";

export default function ProizvodiPromijeni(){

    const navigate = useNavigate();
    const routeParams = useParams();
    const [proizvod,setProizvod] = useState({});

    async function dohvatiProizvod(){
        await ProizvodService.getBySifra(routeParams.sifra)
        .then((res)=>{
            setProizvod(res.data)
        })
        .catch((e)=>{
            alert(e.poruka);
        });
    }

    useEffect(()=>{
        //console.log("useEffect")
        dohvatiProizvod();
    },[]);

    async function promjeniProizvod(proizvod){
        const odgovor = await ProizvodService.promjeniProizvod(routeParams.sifra,smjer);
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

        const proizvod = 
        {
            naziv: podaci.get('naziv'),
            vrsta: podaci.get(podaci.get('trajanje')),
            cijena: parseFloat(podaci.get('cijena')),
            detaljinarudzbe: podaci.get('detaljinarudzbe')
          };

          //console.log(JSON.stringify(smjer));
          promjeniProizvod(proizvod);
    }


    return (

        <Container>
           
           <Form onSubmit={handleSubmit}>

                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control 
                        type="text"
                        defaultValue={proizvod.naziv}
                        name="naziv"
                    />
                </Form.Group>                

                <Form.Group controlId="vrsta">
                    <Form.Label>Vrsta</Form.Label>
                    <Form.Control 
                        type="text"
                        defaultValue={proizvod.vrsta}
                        name="vrsta"
                    />
                </Form.Group>

                <Form.Group controlId="cijena">
                    <Form.Label>Cijena</Form.Label>
                    <Form.Control 
                        type="text"
                        defaultValue={proizvod.cijena}
                        name="cijena"
                    />
                </Form.Group>                

                <Form.Group controlId="detaljinarudzbe">
                    <Form.Label>Detaljinarudzbe</Form.Label>
                    <Form.Control 
                        type="text"
                        defaultValue={proizvod.detaljinarudzbe}
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
                            Promjeni proizvod
                        </Button>
                    </Col>
                </Row>
                
           </Form>

        </Container>

    );

}