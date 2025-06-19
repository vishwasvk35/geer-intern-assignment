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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [shapes, setShapes] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedShape, setSelectedShape] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [loading, setLoading] = useState(true);

  // Fetch products and derive categories and shapes on mount
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data: Product[] = await res.json();
        setProducts(data);
        setFilteredProducts(data);

        // Derive unique categories and shapes
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

  // Apply filters when category, shape, or price range changes
  useEffect(() => {
    let filtered = products;
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }
    if (selectedShape !== 'All') {
      filtered = filtered.filter((p) => p.shape.toLowerCase() === selectedShape.toLowerCase());
    }
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    setFilteredProducts(filtered);
  }, [selectedCategory, selectedShape, priceRange, products]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filter Panel */}
        <Card className="p-4 md:sticky md:top-4">
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
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
              <Select value={selectedShape} onValueChange={setSelectedShape}>
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
              <Label>Price Range (₹{priceRange[0]} - ₹{priceRange[1]})</Label>
              <Slider
                min={0}
                max={200000}
                step={1000}
                value={priceRange}
                onValueChange={(value) => {
                  setPriceRange([value[0], value[1]]);
                }}
                className="mt-2"
              />
              <div className="flex gap-2 mt-2">
                <Input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => {
                    const newMin = Math.min(Number(e.target.value), priceRange[1] - 1000);
                    setPriceRange([newMin, priceRange[1]]);
                  }}
                  className="w-1/2"
                  min="0"
                  max={priceRange[1] - 1000}
                />
                <Input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => {
                    const newMax = Math.max(Number(e.target.value), priceRange[0] + 1000);
                    setPriceRange([priceRange[0], newMax]);
                  }}
                  className="w-1/2"
                  min={priceRange[0] + 1000}
                  max="200000"
                />
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCategory('All');
                setSelectedShape('All');
                setPriceRange([0, 100000]);
              }}
              className="w-full"
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>

        {/* Product Grid */}
        <div className="md:col-span-3">
          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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