'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { useState, useEffect } from 'react';

export default function ProductPage({ params }: { params: { id: string } }) {
  const resolvedParams : { id: string} = React.use(params);

  const [product, setProduct] = useState<Product | null>(null);
  const [metalQuality, setMetalQuality] = useState('18K');
  const [diamondQuality, setDiamondQuality] = useState('VVS-EF');
  const [ringSize, setRingSize] = useState('');
  const [engraving, setEngraving] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${resolvedParams.id}`);
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        notFound();
      }
    }
    fetchProduct();
  }, [resolvedParams.id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!product) {
    return notFound();
  }

  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="relative w-full h-[400px]">
            <Image
              src={product.imageUrl[selectedImage]}
              alt={product.name}
              fill
              className="object-contain rounded-lg"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {product.imageUrl.map((url, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-20 h-20 relative border-2 ${
                  selectedImage === index ? 'border-primary' : 'border-gray-200'
                } rounded-md`}
              >
                <Image
                  src={url}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  fill
                  className="object-cover rounded-md"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <Card className="p-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{product.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center gap-4">
                <p className="text-xl font-semibold">
                  ₹{discountedPrice.toLocaleString('en-IN')}
                </p>
                {product.discountPercentage > 0 && (
                  <>
                    <p className="text-sm text-gray-500 line-through">
                      ₹{product.price.toLocaleString('en-IN')}
                    </p>
                    <p className="text-sm text-green-600">
                      {product.discountPercentage}% OFF
                    </p>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-500">Shipping and discounts calculated at checkout.</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="metalQuality">Metal Quality</Label>
                <Select value={metalQuality} onValueChange={setMetalQuality}>
                  <SelectTrigger id="metalQuality">
                    <SelectValue placeholder="Select Metal Quality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="18K">18K Yellow Gold</SelectItem>
                    <SelectItem value="14K">14K Yellow Gold</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="diamondQuality">Diamond Quality & Tone</Label>
                <Select value={diamondQuality} onValueChange={setDiamondQuality}>
                  <SelectTrigger id="diamondQuality">
                    <SelectValue placeholder="Select Diamond Quality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="VVS-EF">VVS-EF</SelectItem>
                    <SelectItem value="VS-EF">VS-EF</SelectItem>
                    <SelectItem value="VVS-GH">VVS-GH</SelectItem>
                    <SelectItem value="VS-GH">VS-GH</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="ringSize">Ring Size</Label>
                <Select value={ringSize} onValueChange={setRingSize}>
                  <SelectTrigger id="ringSize">
                    <SelectValue placeholder="Select Size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6">6</SelectItem>
                    <SelectItem value="7">7</SelectItem>
                    <SelectItem value="8">8</SelectItem>
                    {/* Add more sizes as needed */}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="engraving">Engraving (Max 20 characters)</Label>
                <Input
                  id="engraving"
                  value={engraving}
                  onChange={(e) => setEngraving(e.target.value.slice(0, 20))}
                  placeholder="Enter engraving text"
                  className="w-full"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Engraving will appear on the side of the ring on the inside.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Button className="flex-1">Add to Cart</Button>
              <Button variant="outline" className="flex-1">Buy It Now</Button>
            </div>

            <div className="text-sm space-y-2">
              <p><strong>SKU:</strong> {product.imageID}</p>
              <p><strong>Total Weight:</strong> {product.weight} gms</p>
              <p><strong>Shape:</strong> {product.shape}</p>
              <p><strong>Category:</strong> {product.category}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}