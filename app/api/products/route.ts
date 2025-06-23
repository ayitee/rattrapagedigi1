import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/products
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fetchAll = searchParams.get('all') === 'true';

  const sortBy = searchParams.get('sortBy') || 'id';
  const sortOrder = searchParams.get('sortOrder') || 'asc';

  let orderBy = {};
  if (sortBy === 'name') {
    orderBy = { name: sortOrder };
  } else if (sortBy === 'price') {
    orderBy = { price: sortOrder };
  } else {
    orderBy = { id: sortOrder };
  }

  if (fetchAll) {
    try {
      const products = await prisma.product.findMany({ orderBy });
      return NextResponse.json({ data: products, total: products.length });
    } catch (error) {
      console.error('GET /api/products (all) error:', error);
      return NextResponse.json({ error: 'Failed to fetch all products' }, { status: 500 });
    }
  }

  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '12', 10);
  const skip = (page - 1) * limit;

  try {
    const [products, total] = await prisma.$transaction([
      prisma.product.findMany({
        skip,
        take: limit,
        orderBy,
      }),
      prisma.product.count(),
    ]);

    return NextResponse.json({
      data: products,
      total,
      page,
      limit,
    });
  } catch (error) {
    console.error('GET /api/products (paginated) error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

// POST /api/products
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, description, photo, price, type } = data;

    if (!name || !description || !photo || typeof price !== 'number' || !type) {
      return NextResponse.json({ error: 'Missing or invalid fields' }, { status: 400 });
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        photo,
        price,
        type,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('POST /api/products error:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}