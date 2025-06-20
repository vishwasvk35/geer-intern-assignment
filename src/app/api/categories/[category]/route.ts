import { NextRequest, NextResponse } from 'next/server';
import { getProductsByCategory } from '@/lib/products';
import { Product } from '@/lib/types';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');

  if (!category) {
    return NextResponse.json({ message: 'Invalid category' }, { status: 400 });
  }

  try {
    const products = await getProductsByCategory(category);
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}