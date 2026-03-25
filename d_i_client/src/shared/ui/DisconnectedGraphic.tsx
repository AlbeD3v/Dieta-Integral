"use client";

import { motion } from 'framer-motion';

const DOT_COUNT = 6;
const RADIUS = 42; // % from center

function getDotPosition(index: number, total: number) {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
  return {
    x: 50 + RADIUS * Math.cos(angle),
    y: 50 + RADIUS * Math.sin(angle),
  };
}

export default function DisconnectedGraphic() {
  return (
    <div className="relative w-64 h-64 md:w-72 md:h-72">
      {/* Outer ring — fades in after split */}
      <motion.div
        className="absolute inset-0 rounded-full border border-white/8"
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Inner ring — fades in after split */}
      <motion.div
        className="absolute inset-5 rounded-full border border-white/6"
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ delay: 0.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Initial single circle that splits into dots */}
      {Array.from({ length: DOT_COUNT }).map((_, i) => {
        const pos = getDotPosition(i, DOT_COUNT);
        return (
          <motion.div
            key={i}
            className="absolute w-8 h-8 rounded-full border border-white/15 bg-white/5 flex items-center justify-center"
            style={{ left: '50%', top: '50%', marginLeft: -16, marginTop: -16 }}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0.3 }}
            whileInView={{
              x: `${(pos.x - 50) * 2.8}px`,
              y: `${(pos.y - 50) * 2.8}px`,
              opacity: 1,
              scale: 1,
            }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
              delay: 0.3 + i * 0.08,
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
              opacity: { delay: 0.1 + i * 0.05, duration: 0.4 },
            }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-white/25"
              initial={{ scale: 2, opacity: 0.8 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: 0.6 + i * 0.08, duration: 0.5 }}
            />
          </motion.div>
        );
      })}

      {/* Center label — appears after dots split */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ delay: 1.1, duration: 0.6, ease: 'easeOut' }}
      >
        <p className="text-white/20 text-[10px] tracking-[0.3em] uppercase font-medium text-center">
          Desconectado
        </p>
      </motion.div>

      {/* Initial merged glow — the single circle that everything starts from */}
      <motion.div
        className="absolute rounded-full bg-white/10 blur-md"
        style={{ width: 32, height: 32, left: '50%', top: '50%', marginLeft: -16, marginTop: -16 }}
        initial={{ opacity: 1, scale: 1.5 }}
        whileInView={{ opacity: 0, scale: 0.2 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
      />
    </div>
  );
}
