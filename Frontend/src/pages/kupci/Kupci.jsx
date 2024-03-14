import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import KupacService from '../../services/KupacService';
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RoutesNames } from "../../constants";
import { useNavigate } from "react-router-dom";

export default function Kupci(){
    const [Kupci,setKupci] = useState();
    let navigate = useNavigate(); 

    async function dohvatiKupce(){
        await KupacService.get()
        .then((res)=>{
            setKupci(res.data);
        })
        .catch((e)=>{
            alert(e);
        });
    }

    useEffect(()=>{
        dohvatiKupce();
    },[]);



    async function obrisiKupac(sifra) {
        const odgovor = await KupacService.obrisi(sifra);
    
        if (odgovor.ok) {
            dohvatiKupce();
        } else {
          alert(odgovor.poruka);
        }
      }

    return (

        <Container>
            <Link to={RoutesNames.KUPCI_NOVI} className="btn btn-success gumb">
                <IoIosAdd
                size={25}
                /> Dodaj
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Ime</th>
                        <th>Prezime</th>                        
                        <th>Email</th>
                        <th>Adresa</th>
                        <th>Telefon</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {Kupci && Kupci.map((kupac,index)=>(
                        <tr key={index}>
                            <td>{kupac.ime}</td>
                            <td>{kupac.prezime}</td>                            
                            <td>{kupac.email}</td>
                            <td>{kupac.adresa}</td>
                            <td>{kupac.telefon}</td>
                            <td className="sredina">
                                    <Button
                                        variant='primary'
                                        onClick={()=>{navigate(`/kupci/${kupac.sifra}`)}}
                                    >
                                        <FaEdit 
                                    size={25}
                                    />
                                    </Button>
                               
                                
                                    &nbsp;&nbsp;&nbsp;
                                    <Button
                                        variant='danger'
                                        onClick={() => obrisiKupac(kupac.sifra)}
                                    >
                                        <FaTrash
                                        size={25}/>
                                    </Button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>

    );

}