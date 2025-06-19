import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '../auth/[...nextauth]/route';

const prisma = new PrismaClient();

async function isAdmin(session: any) {
  return session?.user?.role === 'admin' || session?.user?.role === 'superadmin';
}

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !(await isAdmin(session))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true }
  });
  return NextResponse.json(users);
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