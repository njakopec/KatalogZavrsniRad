import { useEffect, useState } from "react";
import {  Button, Container, Table } from "react-bootstrap";
import Service from '../../services/KategorijaService';
import { Link, useNavigate } from "react-router-dom";
import {RoutesNames} from '../../constants'
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import moment from "moment";
import useError from "../../hooks/useError";
import useLoading from "../../hooks/useLoading";


export default function Kategorije(){
    const [kategorije,setKategorije] = useState();
    const navigate = useNavigate();

    const { prikaziError } = useError();
    const { showLoading, hideLoading } = useLoading();


    async function dohvatiKategorije(){
        showLoading();
        const odgovor = await Service.get('Kategorije');
        hideLoading();
        if(!odgovor.ok){
            prikaziError(odgovor.podaci);
            return;
        }
        setKategorije(odgovor.podaci);
    }

    useEffect(()=>{
        dohvatiKategorije();
    },[]);


    async function obrisiAsync(sifra){
        showLoading();
        const odgovor = await Service.obrisi('Kategorije',sifra);
        hideLoading();
        if (!odgovor.ok){
            prikaziError(odgovor.podaci);
            return;
        }
        dohvatiKategorije();
    }

    function obrisi(sifra){
        obrisiAsync(sifra);
    }

    return (

        <Container>
           <Link to={RoutesNames.KATEGORIJE_NOVI} className="btn btn-success siroko">
                <IoIosAdd size={25} /> 
            </Link>
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
                            <td>{moment.utc(kategorija.vrijediOd).format('DD. MM. YYYY.')}</td>  
                            <td>
                                <Button onClick={()=>obrisi(kategorija.sifra)} variant='danger'>
                                     <FaTrash size={25} />
                                </Button>
                                <span> </span>
                                <Button onClick={()=>navigate(`/kategorije/${kategorija.sifra}`)}>
                                    <FaEdit size={25} />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>

    );

}