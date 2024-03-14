import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import NarudzbaService from '../../services/NarudzbaService';
import { RoutesNames } from '../../constants';

export default function NarudzbePromjeni() {
  const [narudzba, setNarudzba] = useState({});

  const routeParams = useParams();
  const navigate = useNavigate();


  async function dohvatiNarudzba() {

    await NarudzbaService
      .getBySifra(routeParams.sifra)
      .then((response) => {
        console.log(response);
        setNarudzba(response.data);
      })
      .catch((err) => alert(err.poruka));

  }

  useEffect(() => {
    dohvatiNarudzba();
  }, []);

  async function promjeniNarudzba(narudzba) {
    const odgovor = await NarudzbaService.promjeni(routeParams.sifra, narudzba);

    if (odgovor.ok) {
      navigate(RoutesNames.NARUDZBE_PREGLED);
    } else {
      alert(odgovor.poruka);

    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);
    promjeniNarudzba({
       kupac: podaci.get('sifra'),
       proizvod: podaci.get('sifra'),
       datumnarudzbe: podaci.get('datumnarudzbe'),
       placanje: podaci.get('placanje'),
       ukupaniznos: podaci.get('ukupaniznos')
    });
  }

  return (
    <Container className='mt-4'>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='sifra'>
          <Form.Label>Ime</Form.Label>
          <Form.Control
            type='text'
            name='sifra'
            placeholder='Sifra Kupca'
            maxLength={255}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='sifra'>
          <Form.Label>sifra</Form.Label>
          <Form.Control
            type='text'
            name='sifra'
            placeholder='Sifra Proizvoda'
            maxLength={255}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='datumnarudzbe'>
          <Form.Label>Datumnarudzbe</Form.Label>
          <Form.Control
            type='text'
            name='datumnarudzbe'
            placeholder='Datumnarudzbe'
            maxLength={100}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='placanje'>
          <Form.Label>Placanje</Form.Label>
          <Form.Control
            type='text'
            name='placanje'
            placeholder='Placanje'
            maxLength={255}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='ukupaniznos'>
          <Form.Label>Ukupaniznos</Form.Label>
          <Form.Control
            type='text'
            name='ukupaniznos'
            placeholder='Ukupaniznos'
          />
        </Form.Group>

       

        <Row>
          <Col>
            <Link className='btn btn-danger gumb' to={RoutesNames.NARUDZBE_PREGLED}>
              Odustani
            </Link>
          </Col>
          <Col>
            <Button variant='primary' className='gumb' type='submit'>
              Dodaj Narudzbu
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}