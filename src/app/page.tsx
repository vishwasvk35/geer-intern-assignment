'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';


const JewelryHomepage = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const heroImages = [
    {
      url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      title: "Elegant Diamond Collection",
      subtitle: "Timeless beauty for special moments"
    },
    {
      url: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80",
      title: "Luxury Gold Jewelry",
      subtitle: "Crafted with precision and passion"
    },
    {
      url: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80",
      title: "Precious Stone Rings",
      subtitle: "Express your unique style"
    },
    {
      url: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80",
      title: "Statement Necklaces",
      subtitle: "Make every occasion memorable"
    },
    {
      url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80",
      title: "Bridal Collection",
      subtitle: "Perfect for your special day"
    },
    {
      url: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80",
      title: "Modern Minimalist",
      subtitle: "Sleek designs for contemporary style"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden w-full">
        <div className="relative w-full h-full">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImage ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={image.url}
                alt={image.title}
                fill
                className="w-full h-full object-cover"
                style={{ objectFit: 'cover' }}
                priority={index === 0}
              />
              
              {/* Hero Content */}
              <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                <div >
                  <h2 className="bg-white text-black text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 lg:mb-6 tracking-tight px-4 py-2 sm:px-6 sm:py-4 lg:px-10 lg:py-6 rounded-lg shadow-lg">
                    {image.title}
                  </h2>
                  <Link href='/products' className='bg-white text-black px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-3 text-sm sm:text-base lg:text-lg  font-semibold w-50 hover:bg-gray-100 transition-colors transform hover:scale-105 duration-200 rounded shadow-lg'>
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-2 sm:left-4 lg:left-6 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-1.5 sm:p-2 rounded-full transition-all duration-200"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-black" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 sm:right-4 lg:right-6 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-1.5 sm:p-2 rounded-full transition-all duration-200"
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-black" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                index === currentImage ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            Discover Our Complete Collection
          </h3>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            From timeless classics to contemporary designs, explore our carefully curated selection of fine jewelry
          </p>
          <Link href='/products' className='bg-black text-white px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base lg:text-lg font-semibold transition-colors transform hover:scale-105 duration-200 rounded'>
            Explore All Products
          </Link >
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
            Shop by Category
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Rings",
                image: "https://res.cloudinary.com/dcpwog1ci/image/upload/v1750341572/GJPO-092_R1_ce7gsw.jpg",
                description: "Engagement & Wedding Rings"
              },
              {
                title: "Necklaces",
                image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                description: "Statement & Delicate Pieces"
              },
              {
                title: "Earrings",
                image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                description: "Studs, Hoops & Drops"
              }
            ].map((category, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg mb-3 sm:mb-4 h-48 sm:h-56 lg:h-64">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">{category.title}</h4>
                <p className="text-sm sm:text-base text-gray-600">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
            What Our Customers Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: "Sarah Johnson",
                rating: 5,
                review: "Absolutely stunning quality! My engagement ring exceeded all expectations."
              },
              {
                name: "Michael Chen",
                rating: 5,
                review: "Exceptional craftsmanship and beautiful designs. Highly recommended!"
              },
              {
                name: "Emma Davis",
                rating: 5,
                review: "Perfect jewelry for special occasions. The customer service is outstanding."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                <div className="flex mb-3 sm:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">&quot;{testimonial.review}&quot;</p>
                <p className="text-sm sm:text-base font-semibold text-gray-900">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            
            {/* Brand Section */}
            <div className="sm:col-span-2 lg:col-span-1">
              <h4 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">LuxeJewels</h4>
              <p className="text-sm sm:text-base text-gray-300 mb-4">
                Creating timeless pieces that celebrate life&apos;s precious moments since 1985.
              </p>
              <div className="flex space-x-4">
                <Facebook className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer transition-colors" />
                <Instagram className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer transition-colors" />
                <Twitter className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer transition-colors" />
                <Youtube className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4">Quick Links</h5>
              <ul className="space-y-2 text-sm sm:text-base text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Collections</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Custom Design</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Care Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h5 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4">Customer Service</h5>
              <ul className="space-y-2 text-sm sm:text-base text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns & Exchanges</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Warranty</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h5 className="text-sm sm:text-base font-semibold mb-3 sm:mb-4">Contact Information</h5>
              <div className="space-y-3 text-sm sm:text-base text-gray-300">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-3 flex-shrink-0" />
                  <span>+91 9834729399</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-3 flex-shrink-0" />
                  <span className="break-all">info@luxejewels.com</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-3 mt-1 flex-shrink-0" />
                  <span>123 Jewelry District<br />Jaipur, Rajasthan, India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
              © 2025. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-end space-x-4 sm:space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default JewelryHomepage;