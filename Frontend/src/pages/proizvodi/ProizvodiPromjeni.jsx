import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../constants";
import Service from "../../services/ProizvodService";
import { useState, useEffect, useRef  } from "react";
import InputText from "../../components/InputText";
import Akcije from "../../components/Akcije";
import useError from "../../hooks/useError";
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import nepoznato from '../../assets/nepoznato.png'; 
import useLoading from "../../hooks/useLoading";

export default function ProizvodiPromjeni(){
    const navigate = useNavigate();
    const routeParams = useParams();
    const [proizvod, setProizvod] = useState({});

    const [kategorije, setKategorije] = useState([]);
    const [kategorijaSifra, setKategorijaSifra] = useState(0);

    const { prikaziError } = useError();
    const { showLoading, hideLoading } = useLoading();

    const [trenutnaSlika, setTrenutnaSlika] = useState('');
    const [slikaZaCrop, setSlikaZaCrop] = useState('');
    const [slikaZaServer, setSlikaZaServer] = useState('');
    const cropperRef = useRef(null);

    async function dohvatiKategorije(){
        const odgovor = await Service.get('Kategorije');
        if(!odgovor.ok){
          prikaziError(odgovor.podaci);
          return;
        }
        setKategorije(odgovor.podaci);
        setKategorijaSifra(odgovor.podaci[0].sifra);
      }

    async function ucitajProizvod(){
        const odgovor = await Service.getBySifra('Proizvodi',routeParams.sifra);
        if(!odgovor.ok){
            prikaziError(odgovor.podaci);
            return;
        }
        setProizvod(odgovor.podaci);
        setKategorijaSifra(odgovor.podaci.kategorijaSifra);
        if(odgovor.podaci.slika!=null){
            setTrenutnaSlika(App.URL + odgovor.podaci.slika + `?${Date.now()}`);
          }else{
            setTrenutnaSlika(nepoznato);
          }
    }

    async function promjeni(proizvod){
        showLoading();
        const odgovor = await Service.promjeni('Proizvodi',routeParams.sifra,proizvod);
        hideLoading();
        if(!odgovor.ok){
            prikaziError(odgovor.podaci);
            return;
        }
        navigate(RoutesNames.PROIZVODI_PREGLED);
    }

    useEffect(()=>{
        showLoading();
        dohvatiKategorije();
        ucitajProizvod();
        hideLoading();
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


    
  function onCrop() {
    setSlikaZaServer(cropperRef.current.cropper.getCroppedCanvas().toDataURL());
  }

  function onChangeImage(e) {
    e.preventDefault();

    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setSlikaZaCrop(reader.result);
    };
    try {
      reader.readAsDataURL(files[0]);
    } catch (error) {
      console.error(error);
    }
  }

  async function spremiSliku() {
    const base64 = slikaZaServer;
    showLoading();
    const odgovor = await Service.postaviSliku(routeParams.sifra, {Base64: base64.replace('data:image/png;base64,', '')});
    hideLoading();
    if(!odgovor.ok){
      prikaziError(odgovor.podaci);
    }
    //Date.now je zbog toga što se src na image komponenti cache-ira
    //pa kad promjenimo sliku url ostane isti i trenutna slika se ne updatea
    setTrenutnaSlika(slikaZaServer);
  }

    return (
        <Container>
          <Row>
            <Col key='1' sm={12} lg={6} md={6}>

            
           
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
                <Row>
              <Col key='1' sm={12} lg={6} md={12}>
              <p className='form-label'>Trenutna slika</p>
                <Image
                  //za lokalni development
                  //src={'https://edunovawp1.eu/' + trenutnaSlika}
                  src={trenutnaSlika}
                  className='slika'
                />
              </Col>
              <Col key='2' sm={12} lg={6} md={12}>
                {slikaZaServer && (
                  <>
                    <p className='form-label'>Nova slika</p>
                    <Image
                      src={slikaZaServer || slikaZaCrop}
                      className='slika'
                    />
                  </>
                )}
              </Col>
            </Row>
                <hr />
                <Akcije odustani={RoutesNames.PROIZVODI_PREGLED} akcija='Promjeni proizvod' />
            </Form>
            </Col>
            <Col key='2' sm={12} lg={6} md={6}>
            <input className='mb-3' type='file' onChange={onChangeImage} />
              <Button disabled={!slikaZaServer} onClick={spremiSliku}>
                Spremi sliku
              </Button>

              <Cropper
                src={slikaZaCrop}
                style={{ height: 400, width: '100%' }}
                initialAspectRatio={1}
                guides={true}
                viewMode={1}
                minCropBoxWidth={50}
                minCropBoxHeight={50}
                cropBoxResizable={false}
                background={false}
                responsive={true}
                checkOrientation={false}
                cropstart={onCrop}
                cropend={onCrop}
                ref={cropperRef}
              />
            </Col>
            </Row>
         
           
           
        </Container>
    );
}