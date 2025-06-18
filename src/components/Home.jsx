import React from 'react';
import { NavLink } from 'react-router-dom';

const navLinkStyles = ({ isActive }) =>
  `px-6 py-2 rounded-xl transition-all duration-100 hover:bg-gray-700 hover:scale-105 ${
    isActive ? 'bg-blue-600 font-semibold shadow-md' : ''
  }`;

const Home = () => {
  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between p-4 gap-4">
        <h1 className="text-2xl font-extrabold text-blue-400 flex items-center gap-2">
          📚 BookFinder
        </h1>
        <nav className="flex gap-6 text-lg">
          <NavLink to="/" className={navLinkStyles}>
            Search
          </NavLink>
          <NavLink to="/Favourites" className={navLinkStyles}>
            Favourites
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Home;
