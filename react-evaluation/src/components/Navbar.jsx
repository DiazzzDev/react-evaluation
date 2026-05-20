import { Link } from 'react-router'

const Navbar = () => {
  return (
    <nav className="bg-gray-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-lg font-bold">Evaluación react</div>

        {/* Se usa una lista horizontal para los enlaces de navegación. */}
        <ul className="flex space-x-4">
          <li>
            <Link to="/home" className="hover:text-gray-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/posts" className="hover:text-gray-200">
              Posts
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
