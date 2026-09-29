
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Parques from './pages/Parques'
function App() {

  return (

        <Routes>
          <Route path="/" element={<Layout/>} >
            <Route path="/" element={<Parques />} /> 
          </Route>
        </Routes>
  )
}

export default App
