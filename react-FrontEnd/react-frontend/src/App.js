import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes, Link, Navigate, Navigation} from 'react-router-dom';
import ListPersonasComponent from './components/ListPersonasComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreatePersonasComponent from './components/Persona/CreatePersonasComponent';
import UpdatePersonasComponent from './components/UpdatePersonasComponent';
import ViewPersonasComponent from './components/ViewPersonasComponent';

function App() {
  return (
    <div>
      <Router>
            <HeaderComponent />
              <div className="container">
                  <Routes>
                      <Route path="/" element={<ListPersonasComponent />} />
                      <Route path="/personas" element={<ListPersonasComponent />} />
                      <Route path="/add-personas" element={<CreatePersonasComponent />} />
                      <Route path="/view-personas/:id" element={<ViewPersonasComponent />} />
                      <Route path="/update-personas/:id" element={<UpdatePersonasComponent />} />
                  </Routes>
              </div>
            <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
