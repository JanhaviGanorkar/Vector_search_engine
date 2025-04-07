import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import Footer from './component/footer';

export default function Layout() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Semantic Search</h1>
          <nav className="flex space-x-4">
            <NavLink to="/" className={({ isActive }) => isActive ? 'underline' : 'hover:underline'}>Home</NavLink>
            <NavLink to="/search" className={({ isActive }) => isActive ? 'underline' : 'hover:underline'}>Search</NavLink>
            {isAuthenticated ? (
              <>
                <NavLink to="/add-document" className={({ isActive }) => isActive ? 'underline' : 'hover:underline'}>Add Document</NavLink>
                <Button  onClick={handleLogout} className=" bg-white hover:underline">Logout</Button>
              </>
            ) : (
              <NavLink to="/login" className={({ isActive }) => isActive ? 'underline' : 'hover:underline'}>Login</NavLink>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4">
        <Outlet />
      </main>

      <footer className="bg-muted text-muted-foreground p-4 text-center">
        <Footer/>
      </footer>
    </div>
  );
}
