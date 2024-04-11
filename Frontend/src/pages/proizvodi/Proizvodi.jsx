import { useEffect, useState } from "react";
import {  Button, Container, Table } from "react-bootstrap";
import Service from '../../services/ProizvodService';
import { Link, useNavigate } from "react-router-dom";
import {RoutesNames} from '../../constants'
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { NumericFormat } from "react-number-format";


export default function Proizvodi(){
    const [proizvodi,setProizvodi] = useState();
    const navigate = useNavigate();


    async function dohvatiProizvodi(){
        const odgovor = await Service.get('Proizvodi');
        if(!odgovor.ok){
            alert(Service.dohvatiPorukeAlert(odgovor.podaci));
            return;
        }
        setProizvodi(odgovor.podaci);
    }

    useEffect(()=>{
        dohvatiProizvodi();
    },[]);


    async function obrisiAsync(sifra){
        const odgovor = await Service.obrisi('Proizvodi',sifra);
        if (odgovor.greska){
            alert(Service.dohvatiPorukeAlert(odgovor.podaci));
            return;
        }
        dohvatiProizvodi();
    }

    function obrisi(sifra){
        obrisiAsync(sifra);
    }

    return (

        <Container>
           <Link to={RoutesNames.PROIZVODI_NOVI} className="btn btn-success siroko">
                <IoIosAdd size={25} /> 
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Kategorija</th>
                        <th>Težina</th>  
                        <th>Cijena</th>  
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {proizvodi && proizvodi.map((proizvod,index)=>(
                        <tr key={index}>
                            <td>{proizvod.naziv}</td>
                            <td>{proizvod.kategorijaNaziv}</td> 
                            <td>{proizvod.tezina}</td> 
                            <td><NumericFormat 
                                    value={proizvod.cijena}
                                    displayType={'text'}
                                    thousandSeparator='.'
                                    decimalSeparator=','
                                    prefix={'€'}
                                    decimalScale={2}
                                    fixedDecimalScale
                                    /></td>  
                            <td>
                                <Button onClick={()=>obrisi(proizvod.sifra)} variant='danger'>
                                     <FaTrash size={25} />
                                </Button>
                                <span> </span>
                                <Button onClick={()=>navigate(`/proizvodi/${proizvod.sifra}`)}>
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