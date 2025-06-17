import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid product id' }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), 'prisma/products.json');
  const data = await fs.readFile(filePath, 'utf-8');
  const products = JSON.parse(data);
  const product = products.find((p: any) => p.id === id);

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json(product);
}

// PUT and DELETE handlers removed for now to avoid linter errors due to missing prisma