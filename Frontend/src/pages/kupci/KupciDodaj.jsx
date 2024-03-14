import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import NarudzbaService from '../../services/NarudzbaService';
import { RoutesNames } from '../../constants';


export default function KupciDodaj() {
  const navigate = useNavigate();


  async function dodajKupac(Kupac) {
    const odgovor = await KupacService.dodaj(Kupac);
    if (odgovor.ok) {
      navigate(RoutesNames.KUPCI_PREGLED);
    } else {
      alert(odgovor.poruka.errors);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);


    dodajKupac({
      ime: podaci.get('ime'),
      prezime: podaci.get('prezime'),
      email: podaci.get('email'),
      adresa: podaci.get('adresa'),
      telefon: podaci.get('telefon')
    });
  }

  return (
    <Container className='mt-4'>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='ime'>
          <Form.Label>Ime</Form.Label>
          <Form.Control
            type='text'
            name='ime'
            placeholder='Ime Kupca'
            maxLength={255}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='prezime'>
          <Form.Label>Prezime</Form.Label>
          <Form.Control
            type='text'
            name='prezime'
            placeholder='Prezime Kupca'
            maxLength={255}
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            name='email'
            placeholder='Email Kupca'
            maxLength={50}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='adresa'>
          <Form.Label>Adresa</Form.Label>
          <Form.Control
            type='text'
            name='adresa'
            placeholder='Adresa Kupca'
            maxLength={255}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='telefon'>
          <Form.Label>Telefon</Form.Label>
          <Form.Control
            type='text'
            name='telefon'
            placeholder='Telefon Kupca'
          />
        </Form.Group>

       

        <Row>
          <Col>
            <Link className='btn btn-danger gumb' to={RoutesNames.KUPCI_PREGLED}>
              Odustani
            </Link>
          </Col>
          <Col>
            <Button variant='primary' className='gumb' type='submit'>
              Dodaj Kupca
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}