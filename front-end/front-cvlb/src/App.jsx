import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Clientes } from './pages/Clientes';
import './App.css';
import ParticlesComponent from './components/ParticlesComponent.jsx';
function App() {
  return (
    <main style={{ display: 'flex' }} className='container-main'>
      <Router>
        <nav className='barra-lateral'>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/clientes">Clientes</Link>
            </li>
          </ul>
        </nav>
        <ParticlesComponent />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/clientes" element={<Clientes />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
