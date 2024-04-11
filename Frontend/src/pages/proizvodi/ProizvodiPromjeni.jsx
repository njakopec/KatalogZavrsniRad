import { Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../constants";
import Service from "../../services/ProizvodService";
import { useState, useEffect  } from "react";
import InputText from "../../components/InputText";
import Akcije from "../../components/Akcije";

export default function ProizvodiPromjeni(){
    const navigate = useNavigate();
    const routeParams = useParams();
    const [proizvod, setProizvod] = useState({});

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

    async function ucitajProizvod(){
        const odgovor = await Service.getBySifra('Proizvodi',routeParams.sifra);
        if(!odgovor.ok){
            alert(Service.dohvatiPorukeAlert(odgovor.podaci));
            return;
        }
        setProizvod(odgovor.podaci);
        setKategorijaSifra(odgovor.podaci.kategorijaSifra);
    }

    async function promjeni(proizvod){
        const odgovor = await Service.promjeni('Proizvodi',routeParams.sifra,proizvod);
        if(!odgovor.ok){
            alert(Service.dohvatiPorukeAlert(odgovor.podaci));
            return;
        }
        navigate(RoutesNames.PROIZVODI_PREGLED);
    }

    useEffect(()=>{
        dohvatiKategorije();
        ucitajProizvod();
    },[]);

    function obradiSubmit(e){ 
        e.preventDefault();
        const podaci = new FormData(e.target);
        promjeni({
            naziv: podaci.get('naziv'),  
            kategorijaSifra: parseInt(kategorijaSifra), 
            tezina: parseInt(podaci.get('tezina')),
            cijena: parseFloat(podaci.get('cijena'))
        });
    }

    return (
        <Container>
            <Form onSubmit={obradiSubmit}>
                <InputText atribut='naziv' vrijednost={proizvod.naziv} />
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
                <InputText atribut='tezina' vrijednost={proizvod.tezina} />
                <InputText atribut='cijena' vrijednost={proizvod.cijena} />
                <hr />
                <Akcije odustani={RoutesNames.PROIZVODI_PREGLED} akcija='Promjeni proizvod' />
            </Form>
        </Container>
    );
}