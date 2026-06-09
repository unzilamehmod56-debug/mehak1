/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Header({ onNavigate, activeSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", id: "home" },
    { label: "Services", id: "services" },
    { label: "Portfolio", id: "portfolio" },
    { label: "Bookings", id: "booking" },
    { label: "Reviews", id: "reviews" },
    { label: "Contact", id: "contact" },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#fbfbe2]/90 backdrop-blur-md py-3 shadow-md border-b border-primary/10"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Brand/Logo Group */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-primary focus:outline-none hover:opacity-85 transition-opacity"
            id="mobile-menu-toggle"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
          
          <button
            onClick={() => handleItemClick("home")}
            className="text-left select-none animate-fade-in"
          >
            <h1 className="font-serif text-2xl md:text-3.5xl font-semibold tracking-tight text-primary">
              Makeover by Mehak
            </h1>
            <p className="hidden md:block font-sans text-[9px] uppercase tracking-[0.2em] text-lux-muted leading-none mt-1">
              Luxury Bridal & Beauty Atelier
            </p>
          </button>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`font-sans text-xs uppercase tracking-[0.15em] font-medium transition-all duration-300 relative py-1 hover:text-primary ${
                activeSection === item.id
                  ? "text-primary border-b border-primary"
                  : "text-lux-muted hover:translate-y-[-1px]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center gap-4 text-primary">
          <button 
            onClick={() => handleItemClick("booking")}
            className="relative cursor-pointer transition-transform duration-300 hover:scale-105"
            aria-label="Shopping Cart / Booking Summary"
          >
            <ShoppingBag size={22} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] bg-[#fbfbe2] z-50 animate-fade-in flex flex-col p-6 space-y-6 md:hidden border-t border-primary/5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`font-sans text-left text-lg uppercase tracking-widest font-semibold py-2 border-b border-primary/5 transition-colors ${
                activeSection === item.id ? "text-primary" : "text-lux-muted"
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-8 text-center text-xs text-lux-muted font-sans uppercase tracking-widest">
            Gulberg III, Lahore, Pakistan
          </div>
        </div>
      )}
    </header>
  );
}
