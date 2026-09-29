import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Parques from './pages/Parques';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Parques />} />
          <Route path="favoritos" element={
            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-accent">
              <h1 className="text-4xl font-bold mb-4 text-primary">Favoritos</h1>
              <p className="text-gray-600 text-lg">Os teus parques favoritos aparecerão aqui.</p>
            </div>
          } />
          <Route path="reservas" element={
            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-accent">
              <h1 className="text-4xl font-bold mb-4 text-primary">Reservas</h1>
              <p className="text-gray-600 text-lg">As tuas reservas aparecerão aqui.</p>
            </div>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
