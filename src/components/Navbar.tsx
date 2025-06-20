'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = (): void => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <nav className="w-full flex items-center justify-between px-4 sm:px-6 py-4 bg-white shadow-md relative z-50">
        {/* Logo */}
        <Link href="/" className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'Dancing Script, cursive' }}>
          geer.in
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-4 items-center">
          <Select>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Products" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="rings">Rings</SelectItem>
              <SelectItem value="necklaces">Necklaces</SelectItem>
              <SelectItem value="earrings">Earrings</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="bracelets">Bracelets</SelectItem>
              <SelectItem value="pendants">Pendants</SelectItem>
            </SelectContent>
          </Select>
          <Button asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden p-2"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          <Menu className="w-6 h-6" />
        </Button>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <Link 
            href="/" 
            className="text-2xl font-bold" 
            style={{ fontFamily: 'Dancing Script, cursive' }}
            onClick={closeSidebar}
          >
            geer.in
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={closeSidebar}
            className="p-2"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Sidebar Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Products Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900">Products</h3>
            <div className="space-y-2">
              <Link 
                href="/products" 
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                onClick={closeSidebar}
              >
                All Products
              </Link>
              <Link 
                href="/products/rings" 
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                onClick={closeSidebar}
              >
                Rings
              </Link>
              <Link 
                href="/products/necklaces" 
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                onClick={closeSidebar}
              >
                Necklaces
              </Link>
              <Link 
                href="/products/earrings" 
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                onClick={closeSidebar}
              >
                Earrings
              </Link>
            </div>
          </div>

          {/* Categories Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900">Categories</h3>
            <div className="space-y-2">
              <Link 
                href="/categories" 
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                onClick={closeSidebar}
              >
                All Categories
              </Link>
              <Link 
                href="/categories/bracelets" 
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                onClick={closeSidebar}
              >
                Bracelets
              </Link>
              <Link 
                href="/categories/pendants" 
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                onClick={closeSidebar}
              >
                Pendants
              </Link>
            </div>
          </div>

          {/* Dashboard Button */}
          <div className="pt-4 border-t">
            <Button asChild className="w-full">
              <Link href="/dashboard" onClick={closeSidebar}>
                Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}