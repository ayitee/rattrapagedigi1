import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = parseInt(session.user.id);
  const orders = await prisma.order.findMany({
    where: { userId },
    orderBy: { creationDate: "desc" },
    select: {
      id: true,
      totalPrice: true,
      creationDate: true,
      products: true,
    },
  });
  return NextResponse.json(orders);
}

// Create a new order
export async function POST(req: NextRequest) {
  // ... existing code ...
} 