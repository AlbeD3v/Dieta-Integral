import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

function isValidEmail(email: string): boolean {
  // Simple but practical validation
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1);
    const pageSize = Math.min(100, Math.max(1, parseInt(searchParams.get('pageSize') || '10', 10) || 10));
    const skip = (page - 1) * pageSize;

    const [total, items] = await Promise.all([
      prisma.subscriber.count(),
      prisma.subscriber.findMany({
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
        select: { id: true, email: true, createdAt: true, verified: true },
      }),
    ]);

    return NextResponse.json({ total, items, page, pageSize });
  } catch (e) {
    return NextResponse.json({ error: 'Error leyendo suscriptores' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const rawEmail = String(body?.email || '').trim().toLowerCase();

    if (!rawEmail || !isValidEmail(rawEmail)) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 422 });
    }

    try {
      const created = await prisma.subscriber.create({
        data: { email: rawEmail },
      });
      return NextResponse.json({ ok: true, id: created.id }, { status: 201 });
    } catch (e: any) {
      // Unique constraint violation => already subscribed
      if (e?.code === 'P2002') {
        return NextResponse.json({ ok: true, alreadySubscribed: true }, { status: 200 });
      }
      throw e;
    }
  } catch (e) {
    return NextResponse.json({ error: 'Error procesando la solicitud' }, { status: 500 });
  }
}

export async function OPTIONS() {
  // Allow simple CORS preflight if needed in the future
  const resp = new NextResponse(null, { status: 204 });
  resp.headers.set('Access-Control-Allow-Methods', 'POST,OPTIONS');
  resp.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return resp;
}
