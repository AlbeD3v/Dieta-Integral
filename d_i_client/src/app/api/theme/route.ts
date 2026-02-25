import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withCORS, preflight } from '@/lib/cors';

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

export async function OPTIONS(req: NextRequest) {
  return preflight(req, ['GET','POST','OPTIONS']);
}

export async function GET(req: NextRequest) {
  const theme = await readTheme();
  const resp = NextResponse.json({ theme });
  return withCORS(req, resp);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const theme = String(body?.theme || '').trim();
    if (!theme) {
      const bad = NextResponse.json({ error: 'theme is required' }, { status: 400 });
      return withCORS(req, bad);
    }
    await writeTheme(theme);
    const ok = NextResponse.json({ ok: true, theme });
    return withCORS(req, ok);
  } catch (e) {
    const err = NextResponse.json({ error: 'invalid request' }, { status: 400 });
    return withCORS(req, err);
  }
}
