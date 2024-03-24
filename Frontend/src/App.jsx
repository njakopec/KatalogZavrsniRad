import { Route, Routes } from "react-router-dom"
import Pocetna from "./pages/Pocetna"
import { RoutesNames } from "./constants"
import NavBar from "./components/NavBar"
import Kategorije from "./pages/kategorije/Kategorije"
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

function App() {
  return (
    <>
    <NavBar />
      <Routes>
        <>
          <Route path={RoutesNames.HOME} element={<Pocetna />} />
          
                    
          <Route path={RoutesNames.KATEGORIJE_PREGLED} element={<Kategorije />} /> 
        </>
      </Routes>
    </>
  )
}

export default App
