import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withCORS, preflight } from '@/lib/cors';
import { rateLimit, ipKey } from '@/utils/rateLimit';

function isValidEmail(email: string): boolean {
  // Simple but practical validation
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// CORS handled via centralized helpers

export async function GET(req: NextRequest) {
  try {
    // Rate limit GET requests
    const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || req.headers.get('x-real-ip') || undefined
    const key = ipKey(ip as string);
    const ok = await rateLimit(key, 60, 60_000); // 60 req/min per IP
    if (!ok) {
      return withCORS(req, NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 }));
    }
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1);
    const pageSize = Math.min(100, Math.max(1, parseInt(searchParams.get('pageSize') || '10', 10) || 10));
    const skip = (page - 1) * pageSize;
    const q = (searchParams.get('q') || '').trim().toLowerCase();
    const verifiedParam = searchParams.get('verified');
    const verified = verifiedParam === null ? undefined : (verifiedParam === 'true' ? true : verifiedParam === 'false' ? false : undefined);

    const where = {
      ...(q ? { email: { contains: q } } : {}),
      ...(typeof verified === 'boolean' ? { verified } : {}),
    } as const;

    const [total, items] = await Promise.all([
      prisma.subscriber.count({ where }),
      prisma.subscriber.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
        select: { id: true, email: true, createdAt: true, verified: true },
      }),
    ]);
    const resp = NextResponse.json({ total, items, page, pageSize });
    return withCORS(req, resp);
  } catch (e) {
    const err = NextResponse.json({ error: 'Error leyendo suscriptores' }, { status: 500 });
    return withCORS(req, err);
  }
}

export async function POST(req: NextRequest) {
  try {
    // Rate limit POST requests (tighter)
    const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || req.headers.get('x-real-ip') || undefined
    const key = ipKey(ip as string) + ':post';
    const ok = await rateLimit(key, 10, 60_000); // 10 req/min per IP
    if (!ok) {
      return withCORS(req, NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 }));
    }
    const body = await req.json().catch(() => ({}));
    const rawEmail = String(body?.email || '').trim().toLowerCase();

    if (!rawEmail || !isValidEmail(rawEmail)) {
      return withCORS(req, NextResponse.json({ error: 'Email inválido' }, { status: 422 }));
    }

    try {
      const created = await prisma.subscriber.create({
        data: { email: rawEmail },
      });
      const resp = NextResponse.json({ ok: true, id: created.id }, { status: 201 });
      return withCORS(req, resp);
    } catch (e: any) {
      // Unique constraint violation => already subscribed
      if (e?.code === 'P2002') {
        const resp = NextResponse.json({ ok: true, alreadySubscribed: true }, { status: 200 });
        return withCORS(req, resp);
      }
      throw e;
    }
  } catch (e) {
    const err = NextResponse.json({ error: 'Error procesando la solicitud' }, { status: 500 });
    return withCORS(req, err);
  }
}

export async function OPTIONS(req: NextRequest) {
  return preflight(req, ['GET','POST','OPTIONS']);
}
