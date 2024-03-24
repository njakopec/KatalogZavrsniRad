import { useEffect, useState } from "react";
import {  Container, Table } from "react-bootstrap";
import KategorijaService from '../../services/KategorijaService';


export default function Kategorije(){
    const [kategorije,setKategorije] = useState();


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




    return (

        <Container>
           
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Datum od</th>  
                    </tr>
                </thead>
                <tbody>
                    {kategorije && kategorije.map((kategorija,index)=>(
                        <tr key={index}>
                            <td>{kategorija.naziv}</td>
                            <td>{kategorija.vrijediOd}</td>  
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>

    );

}