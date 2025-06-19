import { NextRequest, NextResponse } from 'next/server';
import { getProductById } from '../../../../lib/products';
import { Product } from '@/lib/types';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  console.log('Request received for product ID', params.id, 'at', new Date().toISOString());
  try {
    const product = getProductById(params.id);
    if (product) {
      return NextResponse.json(product);
    } else {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error in GET:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}