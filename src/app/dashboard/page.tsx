"use client";

import { useEffect, useState } from "react";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [shapes, setShapes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<Product>>({
    name: "",
    imageUrl: [""],
    price: 0,
    discountPercentage: 0,
    weight: 0,
    imageID: "",
    shape: "",
    category: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        setCategories([...(new Set(data.map((p: Product) => p.category)))].filter(Boolean) as string[]);
        setShapes([...(new Set(data.map((p: Product) => p.shape)))].filter(Boolean) as string[]);
      });
  }, []);

  function generateImageID() {
    // Generate a new imageID based on the highest number in existing IDs
    const prefix = (form.category && form.category.length > 0) ? form.category[0].toUpperCase() : "P";
    const numbers = products
      .filter(p => p.imageID.startsWith(prefix))
      .map(p => parseInt(p.imageID.replace(/\D/g, ""), 10))
      .filter(n => !isNaN(n));
    const nextNum = (numbers.length > 0 ? Math.max(...numbers) + 1 : 1).toString().padStart(3, "0");
    return `${prefix}${nextNum}`;
  }

  useEffect(() => {
    setForm(f => ({ ...f, imageID: generateImageID() }));
    // eslint-disable-next-line
  }, [form.category, products]);

  async function fetchProducts() {
    setLoading(true);
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this product?")) return;
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p.imageID !== id));
    }
  }

  async function handleAddProduct(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.name || !form.imageID || !form.price) {
      setError("Name, Image ID, and Price are required.");
      return;
    }
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        discountPercentage: Number(form.discountPercentage),
        weight: Number(form.weight),
        imageUrl: Array.isArray(form.imageUrl) ? form.imageUrl : [form.imageUrl || ""],
      }),
    });
    if (res.ok) {
      const newProduct = await res.json();
      setProducts((prev) => [...prev, newProduct]);
      setShowForm(false);
      setForm({
        name: "",
        imageUrl: [""],
        price: 0,
        discountPercentage: 0,
        weight: 0,
        imageID: "",
        shape: "",
        category: "",
      });
    } else {
      setError("Failed to add product.");
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button onClick={() => setShowForm((f) => !f)}>
          {showForm ? "Cancel" : "Add New Product"}
        </Button>
      </div>
      {showForm && (
        <form onSubmit={handleAddProduct} className="mb-8 p-4 border rounded space-y-4 bg-gray-50">
          {error && <div className="text-red-500">{error}</div>}
          <div className="flex gap-4">
            <Input placeholder="Name" value={form.name || ""} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            <Input placeholder="Image ID" value={form.imageID || ""} readOnly />
            <Select value={form.category || ""} onValueChange={val => setForm(f => ({ ...f, category: val }))}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={form.shape || ""} onValueChange={val => setForm(f => ({ ...f, shape: val }))}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Shape" />
              </SelectTrigger>
              <SelectContent>
                {shapes.map((shape) => (
                  <SelectItem key={shape} value={shape}>{shape}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-4">
            <Input type="number" placeholder="Price (₹)" value={form.price || ""} onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))} />
            <Input type="number" placeholder="Discount %" value={form.discountPercentage || ""} onChange={e => setForm(f => ({ ...f, discountPercentage: Number(e.target.value) }))} />
            <Input type="number" placeholder="Weight (g)" value={form.weight || ""} onChange={e => setForm(f => ({ ...f, weight: Number(e.target.value) }))} />
          </div>
          <Input placeholder="Image URL (space separated)" value={form.imageUrl?.join(" ") || ""} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value.split(/\s+/).filter(Boolean) }))} />
          <Button type="submit">Add Product</Button>
        </form>
      )}
      <div className="overflow-x-auto">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Image ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Shape</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Discount %</th>
                <th className="p-2 border">Weight</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.imageID}>
                  <td className="p-2 border">{product.imageID}</td>
                  <td className="p-2 border">{product.name}</td>
                  <td className="p-2 border">{product.category}</td>
                  <td className="p-2 border">{product.shape}</td>
                  <td className="p-2 border">₹{product.price}</td>
                  <td className="p-2 border">{product.discountPercentage}</td>
                  <td className="p-2 border">{product.weight}</td>
                  <td className="p-2 border">
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(product.imageID)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
} 