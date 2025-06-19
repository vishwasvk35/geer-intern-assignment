import { NextRequest, NextResponse } from 'next/server';
import { getAllProducts } from '../../../lib/products';
import { Product } from '@/lib/types';

export async function GET(req: NextRequest) {
  console.log('Request received for all products at', new Date().toISOString());
  try {
    const products = getAllProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error in GET:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}