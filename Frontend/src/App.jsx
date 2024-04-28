import { Route, Routes } from "react-router-dom"
import Pocetna from "./pages/Pocetna"
import { RoutesNames } from "./constants"
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import NavBar from "./components/NavBar"

import Kategorije from "./pages/kategorije/Kategorije"
import KategorijeDodaj from "./pages/kategorije/KategorijeDodaj"
import KategorijePromjeni from "./pages/kategorije/KategorijePromjeni"

import Proizvodi from "./pages/proizvodi/Proizvodi"
import ProizvodiDodaj from "./pages/proizvodi/ProizvodiDodaj"
import ProizvodiPromjeni from "./pages/proizvodi/ProizvodiPromjeni"

import ErrorModal from './components/ErrorModal';
import useError from "./hooks/useError"
import LoadingSpinner from './components/LoadingSpinner'



function App() {
  
  const { errors, prikaziErrorModal, sakrijError } = useError();

  return (
    <>
     <ErrorModal show={prikaziErrorModal} errors={errors} onHide={sakrijError} />
     <LoadingSpinner />
     <NavBar />
      <Routes>
        <>
          <Route path={RoutesNames.HOME} element={<Pocetna />} />
          
                    
          <Route path={RoutesNames.KATEGORIJE_PREGLED} element={<Kategorije />} /> 
          <Route path={RoutesNames.KATEGORIJE_NOVI} element={<KategorijeDodaj />} /> 
          <Route path={RoutesNames.KATEGORIJE_PROMIJENI} element={<KategorijePromjeni />} /> 

          <Route path={RoutesNames.PROIZVODI_PREGLED} element={<Proizvodi />} /> 
          <Route path={RoutesNames.PROIZVODI_NOVI} element={<ProizvodiDodaj />} /> 
          <Route path={RoutesNames.PROIZVODI_PROMIJENI} element={<ProizvodiPromjeni />} /> 

        </>
      </Routes>
    </>
  )
}

export default App
