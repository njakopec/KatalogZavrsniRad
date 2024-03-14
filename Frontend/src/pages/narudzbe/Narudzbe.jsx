import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import NarudzbaService from "../../services/NarudzbaService";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RoutesNames } from "../../constants";
import { useNavigate } from "react-router-dom";

export default function Narudzbe(){
    const [Narudzbe,setNarudzbe] = useState();
    let navigate = useNavigate(); 

    async function dohvatiNarudzbe(){
        await NarudzbaService.get()
        .then((res)=>{
            setNarudzbe(res.data);
        })
        .catch((e)=>{
            alert(e);
        });
    }

    useEffect(()=>{
        dohvatiNarudzbe();
    },[]);



    async function obrisiNarudzba(sifra) {
        const odgovor = await NarudzbaService.obrisi(sifra);
    
        if (odgovor.ok) {
            dohvatiNarudzbe();
        } else {
          alert(odgovor.poruka);
        }
      }

    return (

        <Container>
            <Link to={RoutesNames.NARUDZBE_NOVE} className="btn btn-success gumb">
                <IoIosAdd
                size={25}
                /> Dodaj
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Kupac</th>
                        <th>Proizvod</th>
                        <th>Datumnarudzbe</th>            
                        <th>Placanje</th>
                        <th>Ukupaniznos</th>
                    </tr>
                </thead>
                <tbody>
                    {Narudzbe && Narudzbe.map((narudzba,index)=>(
                        <tr key={index}>
                            <td>{narudzba.kupac}</td>
                            <td>{narudzba.proizvod}</td>
                            <td>{narudzba.datumnarudzbe}</td>
                            <td>{narudzba.placanje}</td>
                            <td>{narudzba.ukupaniznos}</td>
                            <td className="sredina">
                                    <Button
                                        variant='primary'
                                        onClick={()=>{navigate(`/narudzbe/${narudzba.sifra}`)}}
                                    >
                                        <FaEdit 
                                    size={25}
                                    />
                                    </Button>
                               
                                
                                    &nbsp;&nbsp;&nbsp;
                                    <Button
                                        variant='danger'
                                        onClick={() => obrisiNarudzba(narudzba.sifra)}
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