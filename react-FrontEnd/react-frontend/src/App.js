import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes, Link, Navigate, Navigation} from 'react-router-dom';
import ListPersonasComponent from './components/Persona/ListPersonasComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreatePersonasComponent from './components/Persona/CreatePersonasComponent';
import UpdatePersonasComponent from './components/Persona/UpdatePersonasComponent';
import ViewPersonasComponent from './components/Persona/ViewPersonasComponent';
import ListVendedoresComponent from './components/Vendedor/ListVendedoresComponent';
import UpdateVendedoresComponent from './components/Vendedor/UpdateVendedoresComponent';
import CreateVendedoresComponent from './components/Vendedor/CreateVendedoresComponent';
import ViewVendedoresComponent from './components/Vendedor/ViewVendedoresComponent';
import ListClientesComponent from './components/Cliente/ListClientesComponent';
import CreateClientesComponent from './components/Cliente/CreateClientesComponent';
import ViewClientesComponent from './components/Cliente/ViewClientesComponent';
import UpdateClientesComponent from './components/Cliente/UpdateClientesComponent';
import ListProductosComponent from './components/Producto/ListProductosComponent';
import CreateProductosComponent from './components/Producto/CreateProductosComponent';
import UpdateProductosComponent from './components/Producto/UpdateProductosComponent';
import ViewProductosComponent from './components/Producto/ViewProductosComponent';
import ListVentasComponent from './components/Venta/ListVentasComponent';
import CreateVentasComponent from './components/Venta/CreateVentasComponent';
import ViewVentasComponent from './components/Venta/ViewVentasComponent';
import UpdateVentasComponent from './components/Venta/UpdateVentasComponent';

function App() {
  return (
    <div>
      <Router>
        <div className="main-wrapper">
            <HeaderComponent />
              <div className="container">
                  <Routes>
                      <Route path="/" element={<ListPersonasComponent />} />
                      <Route path="/personas" element={<ListPersonasComponent />} />
                      <Route path="/add-personas" element={<CreatePersonasComponent />} />
                      <Route path="/view-personas/:id" element={<ViewPersonasComponent />} />
                      <Route path="/update-personas/:id" element={<UpdatePersonasComponent />} />
                      <Route path="/vendedores" element={<ListVendedoresComponent />} />
                      <Route path="/add-vendedores" element={<CreateVendedoresComponent />} />
                      <Route path="/view-vendedores/:id" element={<ViewVendedoresComponent />} />
                      <Route path="/update-vendedores/:id" element={<UpdateVendedoresComponent />} />
                      <Route path="/clientes" element={<ListClientesComponent />} />
                      <Route path="/add-clientes" element={<CreateClientesComponent />} />
                      <Route path="/view-clientes/:id" element={<ViewClientesComponent />} />
                      <Route path="/update-clientes/:id" element={<UpdateClientesComponent />} />
                      <Route path="/productos" element={<ListProductosComponent />} />
                      <Route path="/add-productos" element={<CreateProductosComponent />} />
                      <Route path="/view-productos/:id" element={<ViewProductosComponent />} />
                      <Route path="/update-productos/:id" element={<UpdateProductosComponent />} />
                      <Route path="/ventas" element={<ListVentasComponent />} />
                      <Route path="/add-ventas" element={<CreateVentasComponent />} />
                      <Route path="/view-ventas/:id" element={<ViewVentasComponent />} />
                      <Route path="/update-ventas/:id" element={<UpdateVentasComponent />} />
                  </Routes>
              </div>
              <br></br>
              <br></br>
            <FooterComponent />
        </div>
      </Router>
    </div>
  );
}

export default App;
