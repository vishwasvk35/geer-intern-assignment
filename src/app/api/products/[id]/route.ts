import { NextRequest, NextResponse } from 'next/server';
import { getProductById, deleteProductById } from '../../../../lib/products';

export async function GET(req: NextRequest, {params}: {params: Promise<{ id: string }>}) {
  const id = (await params).id
  console.log('Request received for product ID', id, 'at', new Date().toISOString());
  try {
    const product = await getProductById(id);
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

export async function DELETE(req: NextRequest, {params}: {params: Promise<{ id: string }>}) {
  const id = (await params).id

  try {
    const deleted = await deleteProductById(id);
    if (deleted) {
      return NextResponse.json({ message: 'Product deleted' });
    } else {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error in DELETE:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}