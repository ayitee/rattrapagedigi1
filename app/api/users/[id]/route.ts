import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const isAdmin = async () => {
  const session = await getServerSession(authOptions);
  return session?.user?.role === 'admin' || session?.user?.role === 'superadmin';
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  if (!await isAdmin()) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 403 });
  }

  const session = await getServerSession(authOptions);
  const { id } = params;
  const { role } = await req.json();

  if (session?.user?.id && parseInt(session.user.id, 10) === parseInt(id, 10)) {
    return new Response(JSON.stringify({ error: "Cannot change your own role" }), { status: 400 });
  }

  if (!['user', 'admin', 'superadmin'].includes(role)) {
    return new Response(JSON.stringify({ error: 'Invalid role' }), { status: 400 });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id, 10) },
      data: { role },
    });
    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update user' }), { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  if (!await isAdmin()) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 403 });
  }

  const session = await getServerSession(authOptions);
  const { id } = params;

  if ((session?.user as any)?.id === parseInt(id, 10)) {
    return new Response(JSON.stringify({ error: "Cannot delete your own account" }), { status: 400 });
  }

  try {
    await prisma.user.delete({
      where: { id: parseInt(id, 10) },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete user' }), { status: 500 });
  }
} 