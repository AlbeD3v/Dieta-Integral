"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronsRight, X } from 'lucide-react';
import PillarGraphic from './PillarGraphic';

export default function MobilePillarToggle() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Circular trigger button — mobile only, positioned right-center */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden absolute right-3 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border border-[#1B4332]/15 shadow-lg flex items-center justify-center hover:bg-white hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
        aria-label="Ver los 5 pilares"
      >
        <ChevronsRight className="w-5 h-5 text-[#1B4332]" />
      </button>

      {/* Full-screen overlay with PillarGraphic */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-[#F7F6F2]/95 backdrop-blur-md flex flex-col items-center justify-center p-6"
            onClick={() => setOpen(false)}
          >
            {/* Close button */}
            <button
              onClick={(e) => { e.stopPropagation(); setOpen(false); }}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white border border-black/10 shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5 text-[#0F172A]" />
            </button>

            {/* Title */}
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B08D57] mb-4"
            >
              Los 5 pilares
            </motion.p>

            {/* Graphic */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[340px]"
            >
              <PillarGraphic />
            </motion.div>

            {/* Hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-5 text-xs text-[#475569]"
            >
              Toca un pilar para más información
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
