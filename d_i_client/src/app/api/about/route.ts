import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
export const runtime = 'nodejs';

const ADMIN_ORIGIN = process.env.ADMIN_ORIGIN || 'http://localhost:3001';

type AboutPayload = {
  title?: string;
  markdown?: string;
  imageUrl?: string;
  // legacy fields kept for backward compatibility
  story?: string;
  why?: string;
  difference?: string;
  ctaLabel?: string;
};

function withCORS(resp: NextResponse) {
  resp.headers.set('Access-Control-Allow-Origin', ADMIN_ORIGIN);
  resp.headers.set('Vary', 'Origin');
  resp.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  resp.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  resp.headers.set('Access-Control-Max-Age', '600');
  return resp;
}

const defaults: Required<Pick<AboutPayload, 'title' | 'markdown' | 'ctaLabel'>> & Partial<AboutPayload> = {
  title: 'Sobre mí',
  markdown: 'Escribe tu historia en formato Markdown.\n\n## Por qué hago lo que hago\n\n...\n\n## Qué me diferencia\n\n...',
  imageUrl: '/Fotos_Patrones/autor_web.svg',
  story: 'Tu historia aquí.',
  why: 'Por qué haces lo que haces.',
  difference: 'Qué te diferencia.',
  ctaLabel: 'Hablemos',
};

export async function GET() {
  try {
    const row = await prisma.setting.findUnique({ where: { id: 'about' } });
    let data: AboutPayload | null = null;
    if (row?.value) {
      try { data = typeof row.value === 'string' ? JSON.parse(row.value as any) : (row.value as any); } catch {}
    }
    const payload = { ...defaults, ...(data || {}) } as AboutPayload;
    return withCORS(NextResponse.json(payload));
  } catch (e) {
    return withCORS(NextResponse.json(defaults));
  }
}

export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return withCORS(NextResponse.json({ error: 'invalid json' }, { status: 400 }));
  }
  try {
    const get = (v: any, len: number) => (v === undefined || v === null ? undefined : String(v).slice(0, len));
    const data: AboutPayload = {
      title: get(body?.title, 200),
      markdown: get(body?.markdown, 20000),
      imageUrl: get(body?.imageUrl, 500),
      // legacy optional inputs
      story: get(body?.story, 5000),
      why: get(body?.why, 5000),
      difference: get(body?.difference, 5000),
      ctaLabel: get(body?.ctaLabel, 50),
    };
    const merged = { ...defaults, ...Object.fromEntries(Object.entries(data).filter(([,v]) => v !== undefined)) } as AboutPayload;
    await prisma.setting.upsert({
      where: { id: 'about' },
      update: { value: JSON.stringify(merged) as any },
      create: { id: 'about', value: JSON.stringify(merged) as any },
    });
    return withCORS(NextResponse.json({ ok: true }));
  } catch (e: any) {
    console.error('[api/about] POST db error:', e);
    const msg = e?.message ? String(e.message).slice(0, 500) : 'db error';
    return withCORS(NextResponse.json({ error: 'db error', message: msg }, { status: 500 }));
  }
}

export async function OPTIONS() {
  const resp = new NextResponse(null, { status: 204 });
  resp.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  resp.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return withCORS(resp);
}
