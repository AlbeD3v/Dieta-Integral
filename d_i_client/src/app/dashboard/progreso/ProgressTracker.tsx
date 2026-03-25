"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus, Scale, Zap, Smile, FileText,
  Loader2, CheckCircle2, TrendingUp, X,
} from 'lucide-react';

interface LogEntry {
  id: string;
  date: string;
  weight: number | null;
  energy: number | null;
  mood: number | null;
  notes: string | null;
}

export default function ProgressTracker({ logs }: { logs: LogEntry[] }) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [weight, setWeight] = useState('');
  const [energy, setEnergy] = useState<number | null>(null);
  const [mood, setMood] = useState<number | null>(null);
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const submit = async () => {
    if (!weight && !energy && !mood) return;
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/user/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          weight: weight ? Number(weight) : undefined,
          energy: energy || undefined,
          mood: mood || undefined,
          notes: notes || undefined,
        }),
      });
      if (!res.ok) throw new Error('Error al guardar');
      setShowForm(false);
      setWeight('');
      setEnergy(null);
      setMood(null);
      setNotes('');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const moodEmoji = ['😞', '😐', '🙂', '😊', '🤩'];
  const energyEmoji = ['🔋', '⚡', '⚡⚡', '🔥', '💥'];

  return (
    <div className="space-y-8 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Mi progreso</h1>
          <p className="text-sm text-[#475569] mt-1">Registra cómo te sientes cada día.</p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 rounded-xl bg-[#1B4332] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#2D6A4F] transition-all"
          >
            <Plus className="w-4 h-4" /> Nuevo registro
          </button>
        )}
      </div>

      {/* New entry form */}
      {showForm && (
        <div className="rounded-2xl border border-[#1B4332]/15 bg-white p-6 space-y-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-[#0F172A]">Registro de hoy</h2>
            <button onClick={() => setShowForm(false)} className="p-1.5 rounded-lg hover:bg-black/5 text-[#94A3B8]">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide text-[#475569] flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5" /> Peso (kg)
              </label>
              <input
                type="number" min={20} max={400} step={0.1}
                value={weight}
                onChange={e => setWeight(e.target.value)}
                placeholder="70.5"
                className="w-full rounded-xl border border-black/10 bg-[#F7F6F2] px-4 py-2.5 text-sm text-[#0F172A] placeholder:text-black/25 focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 transition-all"
              />
            </div>
          </div>

          {/* Energy level */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-[#475569] flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" /> Nivel de energía
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(n => (
                <button
                  key={n}
                  onClick={() => setEnergy(energy === n ? null : n)}
                  className={`flex-1 rounded-xl border py-3 text-center transition-all ${
                    energy === n
                      ? 'border-[#1B4332] bg-[#1B4332]/8 shadow-sm'
                      : 'border-black/8 bg-[#F7F6F2] hover:border-black/15'
                  }`}
                >
                  <span className="text-lg">{energyEmoji[n - 1]}</span>
                  <p className={`text-[10px] font-medium mt-0.5 ${energy === n ? 'text-[#1B4332]' : 'text-[#94A3B8]'}`}>{n}/5</p>
                </button>
              ))}
            </div>
          </div>

          {/* Mood */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-[#475569] flex items-center gap-1.5">
              <Smile className="w-3.5 h-3.5" /> Estado de ánimo
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(n => (
                <button
                  key={n}
                  onClick={() => setMood(mood === n ? null : n)}
                  className={`flex-1 rounded-xl border py-3 text-center transition-all ${
                    mood === n
                      ? 'border-[#1B4332] bg-[#1B4332]/8 shadow-sm'
                      : 'border-black/8 bg-[#F7F6F2] hover:border-black/15'
                  }`}
                >
                  <span className="text-lg">{moodEmoji[n - 1]}</span>
                  <p className={`text-[10px] font-medium mt-0.5 ${mood === n ? 'text-[#1B4332]' : 'text-[#94A3B8]'}`}>{n}/5</p>
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wide text-[#475569] flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" /> Notas (opcional)
            </label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="¿Cómo te sientes hoy? ¿Qué comiste? ¿Dormiste bien?"
              rows={2}
              className="w-full rounded-xl border border-black/10 bg-[#F7F6F2] px-4 py-2.5 text-sm text-[#0F172A] placeholder:text-black/25 focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 transition-all resize-none"
            />
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200/60 px-4 py-2.5 text-sm text-red-700">{error}</div>
          )}

          <button
            onClick={submit}
            disabled={saving || (!weight && !energy && !mood)}
            className="flex items-center gap-2 rounded-xl bg-[#1B4332] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#2D6A4F] disabled:opacity-50 transition-all"
          >
            {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Guardando...</>
              : <><CheckCircle2 className="w-4 h-4" /> Guardar registro</>}
          </button>
        </div>
      )}

      {/* Log history */}
      {logs.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <div className="w-16 h-16 rounded-full bg-[#F7F6F2] flex items-center justify-center mx-auto">
            <TrendingUp className="w-8 h-8 text-[#94A3B8]" />
          </div>
          <h3 className="font-semibold text-[#0F172A]">Sin registros todavía</h3>
          <p className="text-sm text-[#475569] max-w-xs mx-auto">
            Empieza a registrar tu peso, energía y estado de ánimo diariamente para ver tu evolución.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {logs.map(log => (
            <div key={log.id} className="rounded-2xl border border-black/8 bg-white px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="text-center min-w-[50px]">
                  <p className="text-lg font-bold text-[#0F172A]">
                    {new Date(log.date).getDate()}
                  </p>
                  <p className="text-[10px] font-semibold uppercase text-[#94A3B8]">
                    {new Date(log.date).toLocaleDateString('es', { month: 'short' })}
                  </p>
                </div>
                <div className="flex items-center gap-5 text-sm">
                  {log.weight != null && (
                    <span className="flex items-center gap-1.5 text-[#475569]">
                      <Scale className="w-4 h-4 text-amber-500" /> {log.weight} kg
                    </span>
                  )}
                  {log.energy != null && (
                    <span className="flex items-center gap-1.5 text-[#475569]">
                      <span className="text-base">{energyEmoji[log.energy - 1]}</span> {log.energy}/5
                    </span>
                  )}
                  {log.mood != null && (
                    <span className="flex items-center gap-1.5 text-[#475569]">
                      <span className="text-base">{moodEmoji[log.mood - 1]}</span> {log.mood}/5
                    </span>
                  )}
                </div>
              </div>
              {log.notes && (
                <p className="text-xs text-[#94A3B8] max-w-[200px] truncate hidden md:block">{log.notes}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
