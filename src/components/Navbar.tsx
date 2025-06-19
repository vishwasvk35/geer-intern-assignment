import Link from 'next/link';
import { Button } from './ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Logo */}
      <Link href="/" className="text-3xl font-bold" style={{ fontFamily: 'Dancing Script, cursive' }}>
        geer.in
      </Link>
      {/* Dropdowns */}
      <div className="flex gap-4 items-center">
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
        {/* Dashboard Button */}
        <Button asChild>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      </div>
    </nav>
  );
} 