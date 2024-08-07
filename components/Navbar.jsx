"use client"
import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-indigo-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          Dadigram Clone
        </div>
        <div className="hidden md:flex space-x-4">
          <Link href="/">
            <p className="text-white hover:text-gray-300">Home</p>
          </Link>
          <Link href="/login">
            <p className="text-white hover:text-gray-300">Login</p>
          </Link>
          <Link href="/signup">
            <p className="text-white hover:text-gray-300">Signup</p>
          </Link>
        </div>
        <button className="md:hidden text-white" onClick={toggleMenu}>
          ☰
        </button>
      </div>
      {menuOpen && (
        <div className="flex flex-col items-center md:hidden">
          <Link href="/">
            <p className="text-white hover:text-gray-300 py-2">Home</p>
          </Link>
          <Link href="/login">
            <p className="text-white hover:text-gray-300 py-2">Login</p>
          </Link>
          <Link href="/signup">
            <p className="text-white hover:text-gray-300 py-2">Signup</p>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
