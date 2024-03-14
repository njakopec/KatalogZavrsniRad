import { App } from "../constants"
import { httpService } from "./httpService";

async function getProizvodi(){
    return await httpService.get('/Proizvod')
    .then((res)=>{
        if(App.DEV) console.table(res.data);
        
        return res;
    }).catch((e)=>{
        console.log(e);
    });
}

async function obrisiProizvod(sifra){
    return await httpService.delete('/Proizvod/' + sifra)   
    .then((res)=>{                
        return {ok: true,poruka: res};
    }).catch((e)=>{
        console.log(e);
    });
}

async function dodajProizvod(proizvod){
    const odgovor = await httpService.post('/Proizvod',proizvod)
    .then(()=>{
        return {ok: true, poruka: 'Uspješno dodano'}
    })
    .catch((e)=>{
        console.log(e.response.data.errors);
        return {ok: false, poruka: 'Greška'}
    });
    return odgovor;
}

async function promjeniProizvod(sifra,proizvod){
    const odgovor = await httpService.put('/Proizvod/'+sifra,proizvod)
    .then(()=>{
        return {ok: true, poruka: 'Uspješno promjnjeno'}
    })
    .catch((e)=>{
        console.log(e.response.data.errors);
        return {ok: false, poruka: 'Greška'}
    });
    return odgovor;
}

async function getBySifra(sifra){
    return await httpService.get('/Proizvod/' + sifra)
    .then((res)=>{
        if(App.DEV) console.table(res.data);

        return res;
    }).catch((e)=>{
        console.log(e);
        return {poruka: e}
    });
}


export default{
    getProizvodi,
    obrisiProizvod,
    dodajProizvod,
    promjeniProizvod,
    getBySifra   
};