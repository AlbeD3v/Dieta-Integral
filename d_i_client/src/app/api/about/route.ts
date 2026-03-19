import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withCORS, preflight } from '@/lib/cors';
export const runtime = 'nodejs';

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

function allow(req: NextRequest, resp: NextResponse) { return withCORS(req, resp, ['GET','POST','OPTIONS']) }

const defaults: Required<Pick<AboutPayload, 'title' | 'markdown' | 'ctaLabel'>> & Partial<AboutPayload> = {
  title: 'Sobre mí',
  markdown: 'Escribe tu historia en formato Markdown.\n\n## Por qué hago lo que hago\n\n...\n\n## Qué me diferencia\n\n...',
  imageUrl: '/Fotos_Patrones/autor_web.svg',
  story: 'Tu historia aquí.',
  why: 'Por qué haces lo que haces.',
  difference: 'Qué te diferencia.',
  ctaLabel: 'Hablemos',
};

export async function GET(req: NextRequest) {
  try {
    const row = await prisma.setting.findUnique({ where: { id: 'about' } });
    let data: AboutPayload | null = null;
    if (row?.value) {
      try { data = typeof row.value === 'string' ? JSON.parse(row.value as any) : (row.value as any); } catch {}
    }
    const payload = { ...defaults, ...(data || {}) } as AboutPayload;
    return allow(req, NextResponse.json(payload));
  } catch (e) {
    return allow(req, NextResponse.json(defaults));
  }
}

export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return allow(req, NextResponse.json({ error: 'invalid json' }, { status: 400 }));
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
    return allow(req, NextResponse.json({ ok: true }));
  } catch (e: any) {
    console.error('[api/about] POST db error:', e);
    const msg = e?.message ? String(e.message).slice(0, 500) : 'db error';
    return allow(req, NextResponse.json({ error: 'db error', message: msg }, { status: 500 }));
  }
}

export async function OPTIONS(req: NextRequest) {
  return preflight(req, ['GET','POST','OPTIONS']);
}
