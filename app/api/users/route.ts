import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function isAdmin(session: any) {
  return session?.user?.role === 'admin' || session?.user?.role === 'superadmin';
}

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !(await isAdmin(session))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '12', 10);
  const skip = (page - 1) * limit;

  try {
    const [users, total] = await prisma.$transaction([
      prisma.user.findMany({
        select: { id: true, name: true, email: true, role: true, createdAt: true },
        skip,
        take: limit,
      }),
      prisma.user.count(),
    ]);
    return NextResponse.json({
      data: users,
      total,
      page,
      limit,
    });
  } catch (error) {
    console.error('GET /api/users error:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !(await isAdmin(session))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id, name, email, role } = await request.json();
  if (!id) {
    return NextResponse.json({ error: 'User id required' }, { status: 400 });
  }
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, email, role },
    });
    return NextResponse.json({ message: 'User updated', user: updatedUser });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}