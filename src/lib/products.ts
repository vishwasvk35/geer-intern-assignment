import { productsData } from '@/app/data/products';
import { Product } from './types';

const products: Product[] = productsData as Product[];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductById(imageID: string): Product | undefined {
  return products.find((product) => product.imageID === imageID);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category.toLowerCase() === category.toLowerCase());
}

export function getAllCategories(): string[] {
  return [...new Set(products.map((product) => product.category))];
}