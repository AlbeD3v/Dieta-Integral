import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
const ADMIN_ORIGIN = process.env.ADMIN_ORIGIN || 'http://localhost:3001';

async function readTheme(): Promise<string> {
  try {
    const row = await prisma.setting.findUnique({ where: { id: 'theme' } });
    if (!row) return 'light';
    const v: unknown = row.value;
    if (typeof v === 'string') return v;
    if (v && typeof (v as any).theme === 'string') return (v as any).theme;
    return 'light';
  } catch {
    return 'light';
  }
}

async function writeTheme(theme: string) {
  await prisma.setting.upsert({
    where: { id: 'theme' },
    update: { value: theme },
    create: { id: 'theme', value: theme },
  });
}

function withCORS(resp: NextResponse, req: NextRequest) {
  // Always echo the configured admin origin to avoid wildcard issues in browsers
  resp.headers.set('Access-Control-Allow-Origin', ADMIN_ORIGIN);
  resp.headers.set('Vary', 'Origin');
  resp.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  resp.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  resp.headers.set('Access-Control-Max-Age', '600');
  return resp;
}

export async function OPTIONS(req: NextRequest) {
  return withCORS(new NextResponse(null, { status: 204 }), req);
}

export async function GET(req: NextRequest) {
  const theme = await readTheme();
  const resp = NextResponse.json({ theme });
  return withCORS(resp, req);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const theme = String(body?.theme || '').trim();
    if (!theme) {
      const bad = NextResponse.json({ error: 'theme is required' }, { status: 400 });
      return withCORS(bad, req);
    }
    await writeTheme(theme);
    const ok = NextResponse.json({ ok: true, theme });
    return withCORS(ok, req);
  } catch (e) {
    const err = NextResponse.json({ error: 'invalid request' }, { status: 400 });
    return withCORS(err, req);
  }
}
