import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Parques from './pages/Parques';
import Favoritos from './pages/Favoritos';
import ParqueDetalhe from './pages/ParqueDetalhe';
import MinhasReservas from './pages/MinhasReservas';
import NaoEncontrado from './pages/NaoEncontrado';
import useFavoritos from './hooks/useFavoritos';
import './App.css';

function App() {
  const { favoritos, alternarFavorito, eFavorito } = useFavoritos();

  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Parques />} />
          <Route 
            path="parque/:id" 
            element={
              <ParqueDetalhe 
                eFavorito={eFavorito} 
                alternarFavorito={alternarFavorito} 
              />
            } 
          />
          <Route 
            path="favoritos" 
            element={
              <Favoritos 
                favoritos={favoritos} 
                eFavorito={eFavorito} 
                alternarFavorito={alternarFavorito} 
              />
            } 
          />
          <Route path="reservas" element={<MinhasReservas />} />
          
          <Route path="*" element={<NaoEncontrado />} />
        </Route>
      </Routes>
  );
}

export default App;

