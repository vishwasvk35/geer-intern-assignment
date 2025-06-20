import { NextRequest, NextResponse } from 'next/server';
import { getFilteredProducts, addProduct } from '../../../lib/products';
import { Product } from '@/lib/types';

export async function GET(req: NextRequest) {
  console.log('Request received for all products at', new Date().toISOString());
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') || 'All';
    const shape = searchParams.get('shape') || 'All';
    const minPrice = parseFloat(searchParams.get('minPrice') || '0');
    const maxPrice = parseFloat(searchParams.get('maxPrice') || '100000');
    const products = await getFilteredProducts({ category, shape, minPrice, maxPrice });
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error in GET:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Basic validation: check required fields
    if (!body || !body.imageID || !body.name || !body.price) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
    const product: Product = body;
    const created = await addProduct(product);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('Error in POST:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}