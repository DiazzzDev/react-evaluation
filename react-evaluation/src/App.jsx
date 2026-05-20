import { BrowserRouter as Router, Routes, Route } from 'react-router' // Importa el router y los componentes necesarios para definir rutas.

import Home from './pages/Home' 
import Login from './pages/Login' 
import Post from './pages/Posts'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/posts" element={<Post />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
