import React from 'react'
import "../Css/home.css";
import Container from 'react-bootstrap/Container';
    import Nav from 'react-bootstrap/Nav';
    import Navbar from 'react-bootstrap/Navbar';
    import NavDropdown from 'react-bootstrap/NavDropdown';
    

const Home = () => {
  return (
      <>
    <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand href="#home">Pet-Perfect</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/signup">SignUp</Nav.Link>
          
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
 
  <img className="bg" src="https://media.istockphoto.com/photos/woman-sitting-with-cute-puppy-in-balcony-picture-id1355512884?k=20&m=1355512884&s=612x612&w=0&h=7UAz5r1kAXK50M0YIJaLirWAuquspEy2pPmgLePVu3o=" alt="BigCo Inc. logo"/>



  </>
    
    
  )
  
}

export default Home
