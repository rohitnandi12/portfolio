import { Menu, X, Code2, FileText } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' },
    { 
      path: 'https://drive.google.com/your-resume-link', // Replace with your actual resume link
      label: 'Resume',
      icon: <FileText className="h-4 w-4" />,
      external: true 
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed w-full bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Code2 className="h-8 w-8 text-indigo-400" />
            <span className="font-bold text-xl text-white">DevPortfolio</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(({ path, label, icon, external }) => 
              external ? (
                <a
                  key={path}
                  href={path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-gray-300 hover:text-indigo-400 transition-colors duration-200"
                >
                  {icon}
                  <span>{label}</span>
                </a>
              ) : (
                <Link
                  key={path}
                  to={path}
                  className={`${
                    isActive(path)
                      ? 'text-indigo-400 font-semibold'
                      : 'text-gray-300 hover:text-indigo-400'
                  } transition-colors duration-200`}
                >
                  {label}
                </Link>
              )
            )}
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900 border-b border-gray-800">
            {navItems.map(({ path, label, external }) => 
              external ? (
                <a
                  key={path}
                  href={path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:bg-gray-800 block px-3 py-2 rounded-md text-base font-medium"
                >
                  {label}
                </a>
              ) : (
                <Link
                  key={path}
                  to={path}
                  className={`${
                    isActive(path)
                      ? 'bg-gray-800 text-indigo-400'
                      : 'text-gray-300 hover:bg-gray-800'
                  } block px-3 py-2 rounded-md text-base font-medium`}
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
}