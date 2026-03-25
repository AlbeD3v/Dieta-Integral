"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Leaf, Moon, TreePine, Zap, Timer, ArrowRight, X } from 'lucide-react';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';

/* ── Pillar data ─────────────────────────────────────── */
interface Pillar {
  id: string;
  icon: LucideIcon;
  emoji: string;
  label: string;
  shortLabel: string;
  description: string;
  image: string;
  /* position around the circle (CSS %) */
  top: string;
  left: string;
  right?: string;
  bottom?: string;
}

const pillars: Pillar[] = [
  {
    id: 'ritmos',
    icon: Sun,
    emoji: '☀',
    label: 'Ritmos circadianos',
    shortLabel: 'Ritmos',
    description: 'Tu cuerpo tiene un reloj interno. Sincronizarlo con la luz y la oscuridad cambia tu energía, sueño y metabolismo.',
    image: '/images/pilares/ritmos.webp',
    top: '4%', right: '12%', left: 'auto',
  },
  {
    id: 'nutricion',
    icon: Leaf,
    emoji: '🥩',
    label: 'Nutrición real',
    shortLabel: 'Nutrición',
    description: 'Alimentos densos que tu biología reconoce y aprovecha. Sin ultraprocesados, sin dogmas, solo ciencia y ancestralidad.',
    image: '/images/pilares/nutricion.webp',
    top: '4%', left: '10%',
  },
  {
    id: 'sueno',
    icon: Moon,
    emoji: '💤',
    label: 'Sueño reparador',
    shortLabel: 'Sueño',
    description: 'La base de toda recuperación y equilibrio hormonal. Sin sueño profundo, nada más funciona.',
    image: '/images/pilares/sueno.webp',
    top: 'auto', bottom: '4%', left: '50%',
  },
  {
    id: 'entorno',
    icon: TreePine,
    emoji: '🌿',
    label: 'Entorno y luz natural',
    shortLabel: 'Entorno',
    description: 'Las señales ambientales que regulan tu sistema. Luz solar, temperatura, naturaleza: el contexto que tu cuerpo necesita.',
    image: '/images/pilares/entorno.webp',
    top: '42%', left: '-6%',
  },
  {
    id: 'movimiento',
    icon: Zap,
    emoji: '⚡',
    label: 'Movimiento funcional',
    shortLabel: 'Movimiento',
    description: 'No como castigo, sino como información para tu cuerpo. Moverse es la señal más potente de que estás vivo.',
    image: '/images/pilares/movimiento.webp',
    top: '42%', right: '-4%', left: 'auto',
  },
  {
    id: 'ayuno',
    icon: Timer,
    emoji: '⏳',
    label: 'Ayuno estratégico',
    shortLabel: 'Ayuno',
    description: 'Dar descanso digestivo activa la reparación celular, la autofagia y el equilibrio metabólico. Tu cuerpo sabe regenerarse cuando dejas de interrumpirlo.',
    image: '/images/pilares/ayuno.webp',
    top: 'auto', bottom: '22%', left: '-4%',
  },
];

/* ── Orbiting dot component ──────────────────────────── */
function OrbitDot({ size, duration, reverse, color, delay = 0 }: {
  size: number; duration: number; reverse?: boolean; color: string; delay?: number;
}) {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear', delay }}
    >
      <div
        className="absolute rounded-full shadow-sm"
        style={{
          width: size,
          height: size,
          background: color,
          top: 0,
          left: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: `0 0 ${size * 1.5}px ${color}40`,
        }}
      />
    </motion.div>
  );
}

/* ── Info card component ─────────────────────────────── */
function PillarCard({ pillar, onClose }: { pillar: Pillar; onClose: () => void }) {
  const Icon = pillar.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.97 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="absolute z-50 w-[260px] bg-white rounded-xl shadow-xl border border-black/8 overflow-hidden"
      style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
    >
      {/* Image header */}
      <div className="relative h-28 bg-gradient-to-br from-[#1B4332] to-[#40916C] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_40%,white_0%,transparent_60%)]" />
        <Icon className="w-12 h-12 text-white/90 relative z-10" strokeWidth={1.5} />
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors z-20"
        >
          <X className="w-3.5 h-3.5 text-white" />
        </button>
      </div>
      {/* Content */}
      <div className="p-4 space-y-2.5">
        <h4 className="font-bold text-sm text-[#0F172A]">{pillar.label}</h4>
        <p className="text-xs leading-relaxed text-[#475569]">{pillar.description}</p>
        <Link
          href="/los-6-pilares"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1B4332] hover:text-[#40916C] transition-colors group"
        >
          Los 6 pilares
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}

/* ── Main graphic component ──────────────────────────── */
export default function PillarGraphic() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activePillar = pillars.find(p => p.id === activeId) || null;

  return (
    <div className="relative w-full max-w-[400px] aspect-square">
      {/* Glow */}
      <div className="absolute inset-0 rounded-full bg-[#1B4332]/10 blur-3xl scale-110" />

      {/* Outer ring */}
      <div className="relative w-full h-full rounded-full border border-[#1B4332]/10 bg-gradient-to-br from-[#1B4332]/6 to-[#40916C]/10 flex items-center justify-center">

        {/* Orbit dot - outer ring */}
        <OrbitDot size={8} duration={20} color="#40916C" />
        <OrbitDot size={6} duration={20} color="#1B4332" delay={10} reverse />

        {/* Middle ring */}
        <div className="w-[68%] h-[68%] rounded-full border border-[#1B4332]/8 bg-gradient-to-br from-[#1B4332]/5 to-transparent flex items-center justify-center relative">

          {/* Orbit dot - middle ring */}
          <OrbitDot size={7} duration={14} reverse color="#B08D57" delay={3} />
          <OrbitDot size={5} duration={14} color="#6B8E6B" delay={7} />

          {/* Inner ring */}
          <div className="w-[58%] h-[58%] rounded-full bg-[#1B4332]/8 flex items-center justify-center relative">

            {/* Orbit dot - inner ring */}
            <OrbitDot size={6} duration={9} color="#1B4332" delay={1} />

            <Leaf className="w-10 h-10 text-[#1B4332]/40" />
          </div>
        </div>

        {/* ── Pillar buttons ─────────────────────── */}
        {pillars.map((p) => (
          <button
            key={p.id}
            onClick={() => setActiveId(activeId === p.id ? null : p.id)}
            className={`
              absolute bg-white rounded-full px-3 py-1.5 shadow-sm border text-xs font-medium
              transition-all duration-200 cursor-pointer select-none z-10
              hover:shadow-md hover:scale-105 active:scale-95
              ${activeId === p.id
                ? 'border-[#1B4332]/30 shadow-md ring-2 ring-[#1B4332]/15 text-[#1B4332]'
                : 'border-black/6 text-[#0F172A] hover:border-[#1B4332]/20'}
            `}
            style={{
              top: p.top !== 'auto' ? p.top : undefined,
              bottom: p.bottom,
              left: p.left !== 'auto' ? p.left : undefined,
              right: p.right,
            }}
          >
            {p.emoji} {p.shortLabel}
          </button>
        ))}

        {/* ── Active pillar card ─────────────────── */}
        <AnimatePresence mode="wait">
          {activePillar && (
            <PillarCard
              key={activePillar.id}
              pillar={activePillar}
              onClose={() => setActiveId(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
