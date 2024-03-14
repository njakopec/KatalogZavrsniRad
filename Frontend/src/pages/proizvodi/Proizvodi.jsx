import { useEffect, useState } from "react";
import {  Button, Container, Table } from "react-bootstrap";
import ProizvodService from "../../services/ProizvodService";
import { NumericFormat } from "react-number-format";
import { GrValidate } from "react-icons/gr";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";


export default function Proizvodi(){
    const [proizvodi,setProizvodi] = useState();
    const navigate = useNavigate();
               
    async function dohvatiProizvode(){
        await ProizvodService.getProizvodi()
        .then((res)=>{
            setProizvodi(res.data);
        })
        .catch((e)=>{
            alert(e);
        });
    }
    // Ovo se poziva dva puta u dev ali jednom u produkciji
    // https://stackoverflow.com/questions/60618844/
    //react-hooks-useeffect-is-called-twice-even-if-an-empty-arrey-is-used-as-an-ar
    
    useEffect(()=>{
        dohvatiProizvode();
    },[]);

    async function obrisiProizvod(sifra){
        const odgovor = await ProizvodService.obrisiProizvod(sifra);
        if (odgovor. ok){
            alert(odgovor.poruka.data.poruka);
            dohvatiProizvode();    
        }
    }



    return(
        <Container>
            <Link to={RoutesNames.PROIZVODI_NOVI} className="a btn btn-success gumb">
               <IoIosAdd 
               size={30} 
               /> Dodaj
            </Link>  
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Naziv</th>  
                         <th>Vrsta</th>
                         <th>Cijena</th>
                         <th>Detaljinarudzbe</th>
                         <th>Akcija</th>                                             
                    </tr>
                </thead>
                <tbody>
                    {proizvodi && proizvodi.map((proizvod,index)=>(
                       <tr key={index}>
                           <td>{proizvod.naziv}</td>
                           <td>{proizvod.vrsta}</td>                
                           <td className="desno">
                               <NumericFormat
                                value={proizvod.cijena}
                                displayType={'text'}
                                thousandSeparator= '.'
                                decimalSeparator=','
                                prefix={'€'}
                                decimalScale={2}
                                fixedDecimalScale
                               />
                           </td>
                           <td>{proizvod.detaljinarudzbe}</td>
                           <td className="sredina">
                               <Button                                
                               variant="primary"
                               onClick={()=>{navigate(`/smjerovi/${smjer.sifra}`)}}>
                                   <FaEdit 
                                   size={25}
                                   />
                               </Button> 
                                    &nbsp;&nbsp;&nbsp;
                                <Button
                                    variant="danger"
                                    onClick={()=>obrisiProizvod(proizvod.sifra)}
                                >                                            
                                <FaTrash   
                                   size={25} 
                                   />
                                </Button> 
                           </td>
                       </tr>
                    ))}                                           
                </tbody>
            </Table>
        </Container>
    );
}