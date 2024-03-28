import { useEffect, useState } from "react";
import {  Button, Container, Table } from "react-bootstrap";
import KategorijaService from '../../services/KategorijaService';
import { Link, useNavigate } from "react-router-dom";
import {RoutesNames} from '../../constants'


export default function Kategorije(){
    const [kategorije,setKategorije] = useState();
    const navigate = useNavigate();


    async function dohvatiKategorije(){
        await KategorijaService.get()
        .then((res)=>{
            setKategorije(res);
        })
        .catch((e)=>{
            alert(e);
        });
    }

    useEffect(()=>{
        dohvatiKategorije();
    },[]);


    async function obrisiAsync(sifra){
        const odgovor = await KategorijaService._delete(sifra);
        if (odgovor.greska){
            console.log(odgovor.poruka);
            alert('Pogledaj konzolu');
            return;
        }
        dohvatiKategorije();
    }

    function obrisi(sifra){
        obrisiAsync(sifra);
    }

    return (

        <Container>
           <Link to={RoutesNames.KATEGORIJE_NOVI}> Dodaj </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Vrijedi od</th>  
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {kategorije && kategorije.map((kategorija,index)=>(
                        <tr key={index}>
                            <td>{kategorija.naziv}</td>
                            <td>{kategorija.vrijediOd}</td>  
                            <td>
                                <Button 
                                onClick={()=>obrisi(kategorija.sifra)}
                                variant='danger'
                                >
                                    Obriši
                                </Button>

                                <Button 
                                onClick={()=>navigate(`/kategorije/${kategorija.sifra}`)}
                                >
                                    Promjeni
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>

    );

}