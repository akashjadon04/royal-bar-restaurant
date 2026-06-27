'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart, User, Crown, ChevronDown, Package, MapPin, Settings as SettingsIcon, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { useSession, signOut } from 'next-auth/react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/track-order', label: 'Track Order' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHome = pathname === '/' || pathname.startsWith('/menu/');
  const [scrolled, setScrolled] = useState(false);
  
  // Hydration-safe Zustand usage for Next.js
  const [isClient, setIsClient] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const { data: session } = useSession();

  useEffect(() => {
    setIsClient(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close profile dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const textColor = (isHome && !scrolled && !isOpen) ? 'text-white' : 'text-zomato-text';
  const logoColor = (isHome && !scrolled && !isOpen) ? 'text-white' : 'text-zomato-red';
  const navBg = scrolled || !isHome ? 'glass-effect py-3 shadow-zomato-subtle' : 'bg-transparent py-5';

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
    >
      <div className="royal-container flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className={`flex items-center gap-2 group ${textColor}`}>
          <Crown className={`w-8 h-8 group-hover:scale-110 transition-transform ${logoColor}`} />
          <span className="font-display text-2xl font-bold tracking-wide">
            Royal <span className={logoColor}>Bar</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${textColor} hover:text-zomato-red transition-colors text-sm font-medium uppercase tracking-wider`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/cart"
            className={`relative p-2 ${textColor} hover:text-zomato-red transition-colors`}
          >
            <ShoppingCart className="w-6 h-6" />
            {isClient && cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-zomato-red text-white text-xs font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          {session ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`flex items-center gap-2 text-sm font-medium ${textColor} hover:text-zomato-red transition-colors px-2 py-1 rounded-md`}
              >
                <div className="h-8 w-8 rounded-full bg-zomato-red text-white flex items-center justify-center font-bold">
                  {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || 'U'}
                </div>
                <span>Hi, {session.user?.name || session.user?.email?.split('@')[0]}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden py-2"
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{session.user?.name}</p>
                      <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
                    </div>
                    
                    {/* User Links */}
                    <div className="py-2">
                      <Link href="/account" onClick={() => setIsProfileOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition">
                        <User className="w-4 h-4 mr-3" /> My Profile
                      </Link>
                      <Link href="/account#orders" onClick={() => setIsProfileOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition">
                        <Package className="w-4 h-4 mr-3" /> Order History
                      </Link>
                      <Link href="/account#addresses" onClick={() => setIsProfileOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition">
                        <MapPin className="w-4 h-4 mr-3" /> Addresses
                      </Link>
                      <Link href="/account#settings" onClick={() => setIsProfileOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition">
                        <SettingsIcon className="w-4 h-4 mr-3" /> Settings
                      </Link>
                    </div>

                    <div className="border-t border-gray-100 pt-2">
                      <button
                        onClick={() => signOut()}
                        className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                      >
                        <LogOut className="w-4 h-4 mr-3" /> Log Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              href="/auth/signin"
              className={`flex items-center gap-2 text-sm font-medium ${
                (isHome && !scrolled) ? 'text-white border-white' : 'text-zomato-red border-zomato-red'
              } border px-5 py-2 rounded-zomato hover:bg-zomato-red hover:text-white hover:border-zomato-red transition-all`}
            >
              <User className="w-4 h-4" />
              Log in
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden p-2 ${textColor}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-zomato-border shadow-card-hover"
          >
            <div className="royal-container py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-zomato-text hover:text-zomato-red transition-colors py-2 text-lg font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-4 pt-4 border-t border-zomato-border">
                <Link onClick={() => setIsOpen(false)} href="/cart" className="flex items-center gap-2 text-zomato-text py-2">
                  <ShoppingCart className="w-5 h-5 text-zomato-red" />
                  <span className="font-medium text-lg">Cart ({isClient ? cartCount : 0})</span>
                </Link>
                {session ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 py-2 border-b border-gray-100">
                       <div className="h-10 w-10 rounded-full bg-zomato-red text-white flex items-center justify-center font-bold text-lg">
                        {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || 'U'}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-zomato-text font-bold">
                          {session.user?.name}
                        </span>
                        <span className="text-gray-500 text-sm">
                          {session.user?.email}
                        </span>
                      </div>
                    </div>
                    
                    <Link href="/account" onClick={() => setIsOpen(false)} className="text-zomato-text py-2 font-medium">My Profile & Orders</Link>
                    
                    <button onClick={() => { signOut(); setIsOpen(false); }} className="bg-zomato-red text-white text-center py-3 rounded-zomato font-medium text-lg mt-2">
                      Log Out
                    </button>
                  </div>
                ) : (
                  <Link onClick={() => setIsOpen(false)} href="/auth/signin" className="bg-zomato-red text-white text-center py-3 rounded-zomato font-medium text-lg">
                    Log In
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
