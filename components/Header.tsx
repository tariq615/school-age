'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface HeaderProps {
  scrollToSection: (section: string) => void;
}

const Header = ({ scrollToSection }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-xl font-bold text-blue-800">
            SchoolAgeCalculator
          </Link>

          <nav className="hidden md:flex space-x-6">
            <button 
              onClick={() => scrollToSection('calculator')}
              className="text-gray-700 hover:text-blue-800 font-medium"
            >
              Calculator
            </button>
            <button 
              onClick={() => scrollToSection('education')}
              className="text-gray-700 hover:text-blue-800 font-medium"
            >
              Education Systems
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="text-gray-700 hover:text-blue-800 font-medium"
            >
              FAQ
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;