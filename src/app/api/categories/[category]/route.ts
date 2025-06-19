import type { NextApiRequest, NextApiResponse } from 'next';
import { getProductsByCategory } from '@/lib/products';
import { Product } from '@/lib/types';

export default function handler(req: NextApiRequest, res: NextApiResponse<Product[] | { message: string }>) {
  const { category } = req.query;
  if (req.method === 'GET') {
    const products = getProductsByCategory(category as string);
    res.status(200).json(products);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}