import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { RoutesNames } from '../constants';

import'./NavBar.css';

function NavBar() {

    const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand 
            className='linkPocetna'
            onClick={()=>navigate(RoutesNames.Home)}
        >
            Webtrgovina
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            
            <NavDropdown title="Izbornik" id="basic-nav-dropdown">
              <NavDropdown.Item 
                onClick={()=>navigate(RoutesNames.PROIZVODI_PREGLED)}                
              >
                 Proizvodi
                </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                 
              
                Kupci
                </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                 
                
                Narudzbe
                </NavDropdown.Item>
                <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Detaljinarudzbe
              </NavDropdown.Item>
            </NavDropdown>
            
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
        <Nav.Link target="_blank" href="http://vekima-001-site1.htempurl.com/swagger/index.html">API dokumentacija</Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;