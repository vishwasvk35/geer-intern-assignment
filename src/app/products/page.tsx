'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Dialog } from '@headlessui/react';

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [shapes, setShapes] = useState<string[]>([]);
  const [pendingCategory, setPendingCategory] = useState<string>('All');
  const [pendingShape, setPendingShape] = useState<string>('All');
  const [pendingPriceRange, setPendingPriceRange] = useState<[number, number]>([0, 100000]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedShape, setSelectedShape] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Fetch all products on mount to get categories and shapes
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data: Product[] = await res.json();
        
        const uniqueCategories = ['All', ...new Set(data.map((p) => p.category))];
        const uniqueShapes = ['All', ...new Set(data.map((p) => p.shape))];
        setCategories(uniqueCategories);
        setShapes(uniqueShapes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Fetch filtered products from API when filters change
  useEffect(() => {
    async function fetchFiltered() {
      setLoading(true);
      const params = new URLSearchParams({
        category: selectedCategory,
        shape: selectedShape,
        minPrice: priceRange[0].toString(),
        maxPrice: priceRange[1].toString(),
      });
      try {
        const res = await fetch(`/api/products?${params.toString()}`);
        if (!res.ok) throw new Error('Failed to fetch filtered products');
        const data: Product[] = await res.json();
        setFilteredProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching filtered products:', error);
        setFilteredProducts([]);
        setLoading(false);
      }
    }
    fetchFiltered();
  }, [selectedCategory, selectedShape, priceRange]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // Filter panel content (used in both sidebar and drawer)
  const filterPanel = (
    <Card className="p-4 md:sticky md:top-4">
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="category">Category</Label>
          <Select value={pendingCategory} onValueChange={setPendingCategory}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="shape">Shape</Label>
          <Select value={pendingShape} onValueChange={setPendingShape}>
            <SelectTrigger id="shape">
              <SelectValue placeholder="Select Shape" />
            </SelectTrigger>
            <SelectContent>
              {shapes.map((shape) => (
                <SelectItem key={shape} value={shape}>
                  {shape}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Price Range (₹{pendingPriceRange[0]} - ₹{pendingPriceRange[1]})</Label>
          <Slider
            min={0}
            max={200000}
            step={1000}
            value={pendingPriceRange}
            onValueChange={(value) => {
              setPendingPriceRange([value[0], value[1]]);
            }}
            className="mt-2"
          />
          <div className="flex gap-2 mt-2">
            <Input
              type="number"
              value={pendingPriceRange[0]}
              onChange={(e) => {
                const newMin = Math.min(Number(e.target.value), pendingPriceRange[1] - 1000);
                setPendingPriceRange([newMin, pendingPriceRange[1]]);
              }}
              className="w-1/2"
              min="0"
              max={pendingPriceRange[1] - 1000}
            />
            <Input
              type="number"
              value={pendingPriceRange[1]}
              onChange={(e) => {
                const newMax = Math.max(Number(e.target.value), pendingPriceRange[0] + 1000);
                setPendingPriceRange([pendingPriceRange[0], newMax]);
              }}
              className="w-1/2"
              min={pendingPriceRange[0] + 1000}
              max="200000"
            />
          </div>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            setPendingCategory('All');
            setPendingShape('All');
            setPendingPriceRange([0, 100000]);
            setSelectedCategory('All');
            setSelectedShape('All');
            setPriceRange([0, 100000]);
            setIsFilterOpen(false);
          }}
          className="w-full"
        >
          Clear Filters
        </Button>
        <Button
          onClick={() => {
            setSelectedCategory(pendingCategory);
            setSelectedShape(pendingShape);
            setPriceRange(pendingPriceRange);
            setIsFilterOpen(false);
          }}
          className="w-full mt-2"
        >
          Add Filter
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      <div className="md:hidden mb-4 flex justify-end">
        <Button onClick={() => setIsFilterOpen(true)} variant="outline">Add Filter</Button>
      </div>
      {/* Drawer for mobile filter */}
      <Dialog open={isFilterOpen} onClose={() => setIsFilterOpen(false)} className="relative z-50 md:hidden">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" onClick={() => setIsFilterOpen(false)} />
        <div className="fixed inset-y-0 left-0 w-80 bg-white shadow-lg p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Filters</h2>
            <Button size="sm" variant="ghost" onClick={() => setIsFilterOpen(false)}>Close</Button>
          </div>
          {filterPanel}
        </div>
      </Dialog>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filter Panel (desktop only) */}
        <div className="hidden md:block">{filterPanel}</div>
        {/* Product Grid */}
        <div className="md:col-span-3">
          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
              {filteredProducts.map((product) => (
                <ProductCard key={product.imageID} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}