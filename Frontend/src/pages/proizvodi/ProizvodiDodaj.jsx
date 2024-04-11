import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import Service from "../../services/ProizvodService";
import InputText from "../../components/InputText";
import Akcije from "../../components/Akcije";
import { useEffect, useState } from "react";

export default function ProizvodiDodaj(){
    const navigate = useNavigate();

    const [kategorije, setKategorije] = useState([]);
    const [kategorijaSifra, setKategorijaSifra] = useState(0);

    async function dohvatiKategorije(){
    
        const odgovor = await Service.get('Kategorije');
        if(!odgovor.ok){
          alert(Service.dohvatiPorukeAlert(odgovor.podaci));
          return;
        }
        setKategorije(odgovor.podaci);
        setKategorijaSifra(odgovor.podaci[0].sifra);
      }

      useEffect(()=>{
        dohvatiKategorije();
    },[]);

    async function dodaj(proizvod){
        const odgovor = await Service.dodaj('Proizvodi',proizvod);
        if(!odgovor.ok){
            alert(Service.dohvatiPorukeAlert(odgovor.podaci));
            return;
        }
        navigate(RoutesNames.PROIZVODI_PREGLED);
    }

    function obradiSubmit(e){ 
        e.preventDefault();
        const podaci = new FormData(e.target);
        const proizvod = {
            naziv: podaci.get('naziv'),
            kategorijaSifra: parseInt(kategorijaSifra), 
            tezina: parseInt(podaci.get('tezina')),
            cijena: parseFloat(podaci.get('cijena'))
        };
        dodaj(proizvod);
    }

    return (
        <Container>
            <Form onSubmit={obradiSubmit}>
                <InputText atribut='naziv' vrijednost='' />
                <Form.Group className='mb-3' controlId='smjer'>
                    <Form.Label>Kategorija</Form.Label>
                    <Form.Select onChange={(e)=>{setKategorijaSifra(e.target.value)}} >
                    {kategorije && kategorije.map((s,index)=>(
                        <option key={index} value={s.sifra}>
                        {s.naziv}
                        </option>
                    ))}
                    </Form.Select>
                </Form.Group>
                <InputText atribut='tezina' vrijednost='' />
                <InputText atribut='cijena' vrijednost='' />
                <hr />
                <Akcije odustani={RoutesNames.PROIZVODI_PREGLED} akcija='Dodaj Proizvod' />
            </Form>
        </Container>
    );
}