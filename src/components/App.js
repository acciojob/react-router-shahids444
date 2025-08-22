import React, { useState, useEffect } from 'react';

// Custom Router Context
const RouterContext = React.createContext();

// Custom Router Provider
const BrowserRouter = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

// Custom Link Component
const Link = ({ to, children, className = '', ...props }) => {
  const { navigate } = React.useContext(RouterContext);

  const handleClick = (e) => {
    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
};

// Custom Route Component
const Route = ({ path, element }) => {
  const { currentPath } = React.useContext(RouterContext);
  return currentPath === path ? element : null;
};

// Custom Routes Component
const Routes = ({ children }) => {
  return <>{children}</>;
};

// Home Component
const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-8">
            Welcome to my website!
          </h1>
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <p className="text-xl text-gray-600 mb-6">
              This is the home page of our React Router demonstration application.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// About Component
const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-8">
            About Our Application
          </h1>
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <p className="text-xl text-gray-600 mb-6">
              This is a sample React Router program.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Navigation Component
const Navigation = () => {
  const { currentPath } = React.useContext(RouterContext);
  
  const isActive = (path) => {
    return currentPath === path;
  };
  
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-gray-800">
            React Router Demo
          </div>
          <div className="flex space-x-6">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ${
                isActive('/')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ${
                isActive('/about')
                  ? 'bg-green-600 text-white'
                  : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Main App Component
const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
