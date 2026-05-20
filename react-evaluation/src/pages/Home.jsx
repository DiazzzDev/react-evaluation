import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import Nav from '../components/Navbar'

const Home = () => {
  const navigate = useNavigate() // Hook de react-router para redirigir programáticamente.
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('fakestore_token')

  useEffect(() => {
    // Si no hay token, redirige al login.
    if (!token) {
      navigate('/')
    }
  }, [navigate, token])

  const handleLogout = () => {
    // Borra todos los datos de sesión del almacenamiento local y de sesión.
    localStorage.removeItem('authToken')
    navigate('/') // Redirige al login después de cerrar sesión.
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {token && <Nav />} {/* Muestra la navegación solo si hay token. */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-blue-600">
            Bienvenido {user ? `, ${user}` : ''}
          </h1>
          <p className="mt-4 text-gray-700">Explora las funcionalidades y disfruta de la experiencia.</p>
        </header>
        <main className="mt-8">
          <button onClick={handleLogout} className="px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
            Cerrar Sesión
          </button>
        </main>
      </div>
    </div>
  )
}

export default Home
