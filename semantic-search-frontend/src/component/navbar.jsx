import React, { useState, useEffect } from "react";
import { Link, useLocation, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell, Search, Home, Users, Info, Menu, Mail, X } from "lucide-react";


const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Vector Search", href: "/search", icon: Search },
  { name: "About", href: "/about", icon: Info },
  { name: "Contact", href: "/contact", icon: Mail },
];

// Adjusted logic for login/register buttons and navigation
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const location = useLocation();
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  const handleNavigation = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <div>
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo + Hamburger */}
          <div className="flex items-center">
            <Link to={isLoggedIn ? "/search" : "/"} className="flex items-center gap-2 font-bold text-xl text-foreground">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                <Search className="h-4 w-4" />
              </div>
              VectorSearch
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={handleNavigation}
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center gap-1.5 text-sm text-primary'
                    : 'flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition'
                }
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Auth & Search */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            {isLoggedIn ? (
              <Button asChild onClick={handleLogout}>
                <Link to="/logout">Logout</Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild onClick={handleNavigation}>
                  <Link to="/login">Log in</Link>
                </Button>
                <Button asChild onClick={handleNavigation}>
                  <Link to="/register">Sign up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Hamburger */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 border-t border-border/40 bg-background/95">
          <nav className="flex flex-col gap-4 mt-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={handleNavigation}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition"
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}

            <div className="flex flex-col gap-2 mt-4">
              {isLoggedIn ? (
                <Button asChild onClick={handleLogout}>
                  <Link to="/logout">Logout</Link>
                </Button>
              ) : (
                <>
                  <Button variant="outline" asChild onClick={handleNavigation}>
                    <Link to="/login">Log in</Link>
                  </Button>
                  <Button asChild onClick={handleNavigation}>
                    <Link to="/register">Sign up</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
          
        </div>
      )}
    </header>
 
    </div>
  );
};

export default Navbar;
