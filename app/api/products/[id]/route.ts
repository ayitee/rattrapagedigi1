import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid product id' }, { status: 400 });
  }

  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json(product);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid product id' }, { status: 400 });
  }

  const body = await request.json();
  const { name, description, photo, price } = body;

  // Basic validation — you can enhance it
  if (
    typeof name !== 'string' || !name.trim() ||
    typeof description !== 'string' || !description.trim() ||
    typeof photo !== 'string' || !photo.trim() ||
    typeof price !== 'number' || price <= 0
  ) {
    return NextResponse.json({ error: 'Invalid or missing fields' }, { status: 400 });
  }

  try {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { name, description, photo, price },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json({ error: 'Product not found or update failed' }, { status: 404 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid product id' }, { status: 400 });
  }

  try {
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ message: 'Product deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Product not found or delete failed' }, { status: 404 });
  }
}