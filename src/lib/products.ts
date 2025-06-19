import { Product } from './types';
import fs from 'fs/promises';
import path from 'path';

const DATA_PATH = path.resolve(process.cwd(), 'src/app/data/products.json');

async function readProductsFile(): Promise<Product[]> {
  const data = await fs.readFile(DATA_PATH, 'utf-8');
  return JSON.parse(data) as Product[];
}

async function writeProductsFile(products: Product[]): Promise<void> {
  await fs.writeFile(DATA_PATH, JSON.stringify(products, null, 2), 'utf-8');
}

export async function getAllProducts(): Promise<Product[]> {
  return readProductsFile();
}

export async function getProductById(imageID: string): Promise<Product | undefined> {
  const products = await readProductsFile();
  return products.find((product) => product.imageID === imageID);
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const products = await readProductsFile();
  return products.filter((product) => product.category.toLowerCase() === category.toLowerCase());
}

export async function getAllCategories(): Promise<string[]> {
  const products = await readProductsFile();
  return [...new Set(products.map((product) => product.category))];
}

export async function getAllShapes(): Promise<string[]> {
  const products = await readProductsFile();
  return [...new Set(products.map((product) => product.shape))];
}

export async function getFilteredProducts({
  category = 'All',
  shape = 'All',
  minPrice = 0,
  maxPrice = 100000
}: {
  category?: string;
  shape?: string;
  minPrice?: number;
  maxPrice?: number;
}): Promise<Product[]> {
  const products = await readProductsFile();
  return products.filter((product) => {
    const matchCategory = category === 'All' || product.category.toLowerCase() === category.toLowerCase();
    const matchShape = shape === 'All' || product.shape.toLowerCase() === shape.toLowerCase();
    const matchPrice = product.price >= minPrice && product.price <= maxPrice;
    return matchCategory && matchShape && matchPrice;
  });
}

export async function addProduct(product: Product): Promise<Product> {
  const products = await readProductsFile();
  products.push(product);
  await writeProductsFile(products);
  return product;
}

export async function deleteProductById(imageID: string): Promise<boolean> {
  const products = await readProductsFile();
  const index = products.findIndex((product) => product.imageID === imageID);
  if (index !== -1) {
    products.splice(index, 1);
    await writeProductsFile(products);
    return true;
  }
  return false;
}