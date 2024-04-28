import { useEffect, useState } from "react";
import {  Button, Container, Table } from "react-bootstrap";
import Service from '../../services/ProizvodService';
import { Link, useNavigate } from "react-router-dom";
import {App, RoutesNames} from '../../constants'
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { NumericFormat } from "react-number-format";
import useError from "../../hooks/useError";
import nepoznato from '../../assets/nepoznato.png'; 
import useLoading from "../../hooks/useLoading";


export default function Proizvodi(){
    const [proizvodi,setProizvodi] = useState();
    const navigate = useNavigate();

    const { prikaziError } = useError();
    const { showLoading, hideLoading } = useLoading();


    async function dohvatiProizvodi(){
        showLoading();
        const odgovor = await Service.get('Proizvodi');
        hideLoading();
        if(!odgovor.ok){
            prikaziError(odgovor.podaci);
            return;
        }
        setProizvodi(odgovor.podaci);
    }

    useEffect(()=>{
        dohvatiProizvodi();
    },[]);


    async function obrisiAsync(sifra){
        showLoading();
        const odgovor = await Service.obrisi('Proizvodi',sifra);
        hideLoading();
        prikaziError(odgovor.podaci);
        dohvatiProizvodi();
    }

    function obrisi(sifra){
        obrisiAsync(sifra);
    }

    function slika(p){
        if(p.slika!=null){
            return App.URL + p.slika+ `?${Date.now()}`;
        }
        return nepoznato;
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
                            <td><img src={slika(proizvod)} style={{maxWidth: '50px'}} /> {proizvod.naziv}</td>
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