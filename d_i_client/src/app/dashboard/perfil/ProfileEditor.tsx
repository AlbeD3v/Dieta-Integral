"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Loader2, CheckCircle2 } from 'lucide-react';

/* ── Option data (same as onboarding) ─────────── */
const goalOptions = [
  { value: 'lose', label: 'Bajar de peso', emoji: '📉' },
  { value: 'gain', label: 'Subir de peso', emoji: '📈' },
  { value: 'maintain', label: 'Mantener peso', emoji: '⚖️' },
  { value: 'energy', label: 'Más energía', emoji: '⚡' },
  { value: 'health', label: 'Mejorar salud', emoji: '💚' },
];

const activityOptions = [
  { value: 'sedentary', label: 'Sedentario' },
  { value: 'light', label: 'Ligeramente activo' },
  { value: 'moderate', label: 'Moderadamente activo' },
  { value: 'active', label: 'Muy activo' },
  { value: 'athlete', label: 'Atleta' },
];

const conditionOptions = [
  'Diabetes', 'Hipertensión', 'Hipotiroidismo', 'Resistencia a insulina',
  'Síndrome metabólico', 'Problemas digestivos', 'Ansiedad / estrés crónico',
  'Problemas de sueño', 'Ninguno',
];

const preferenceOptions = [
  { value: 'fasting', label: 'Ayuno intermitente', emoji: '⏳' },
  { value: 'ancestral', label: 'Dieta ancestral', emoji: '🥩' },
  { value: 'sleep', label: 'Mejorar sueño', emoji: '💤' },
  { value: 'circadian', label: 'Ritmos circadianos', emoji: '☀️' },
  { value: 'recipes', label: 'Recetas saludables', emoji: '🍳' },
  { value: 'movement', label: 'Rutinas de movimiento', emoji: '🏃' },
  { value: 'stress', label: 'Manejo de estrés', emoji: '🧘' },
  { value: 'supplements', label: 'Suplementación', emoji: '💊' },
];

const sexOptions = [
  { value: 'male', label: 'Masculino' },
  { value: 'female', label: 'Femenino' },
  { value: 'other', label: 'Prefiero no decir' },
];

/* ── Types ─────────────────────────────────────── */
interface ProfileData {
  age: number | null;
  sex: string | null;
  weight: number | null;
  height: number | null;
  goal: string | null;
  activityLevel: string | null;
  conditions: string[] | null;
  preferences: string[] | null;
  freeText: string | null;
}

export default function ProfileEditor({ profile }: { profile: ProfileData | null }) {
  const router = useRouter();
  const [form, setForm] = useState({
    age: profile?.age?.toString() || '',
    sex: profile?.sex || '',
    weight: profile?.weight?.toString() || '',
    height: profile?.height?.toString() || '',
    goal: profile?.goal || '',
    activityLevel: profile?.activityLevel || '',
    conditions: (profile?.conditions as string[]) || [],
    preferences: (profile?.preferences as string[]) || [],
    freeText: profile?.freeText || '',
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const toggleArray = (field: 'conditions' | 'preferences', value: string) => {
    setForm(f => {
      const arr = f[field];
      if (field === 'conditions' && value === 'Ninguno') {
        return { ...f, [field]: arr.includes(value) ? [] : ['Ninguno'] };
      }
      if (field === 'conditions' && arr.includes('Ninguno')) {
        return { ...f, [field]: [value] };
      }
      return {
        ...f,
        [field]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value],
      };
    });
    setSaved(false);
  };

  const save = async () => {
    setSaving(true);
    setError('');
    setSaved(false);
    try {
      const res = await fetch('/api/user/health-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          age: form.age ? Number(form.age) : undefined,
          sex: form.sex || undefined,
          weight: form.weight ? Number(form.weight) : undefined,
          height: form.height ? Number(form.height) : undefined,
          goal: form.goal || undefined,
          activityLevel: form.activityLevel || undefined,
          conditions: form.conditions.filter(c => c !== 'Ninguno'),
          preferences: form.preferences,
          freeText: form.freeText || undefined,
        }),
      });
      if (!res.ok) throw new Error('Error al guardar');
      setSaved(true);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full rounded-xl border border-black/10 bg-[#F7F6F2] px-4 py-2.5 text-sm text-[#0F172A] placeholder:text-black/25 focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 focus:border-[#1B4332]/30 transition-all";

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Mi perfil de salud</h1>
        <p className="text-sm text-[#475569] mt-1">Actualiza tu información cuando quieras.</p>
      </div>

      {/* Datos básicos */}
      <Section title="Datos básicos">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Edad">
            <input type="number" min={10} max={120} value={form.age}
              onChange={e => { setForm(f => ({ ...f, age: e.target.value })); setSaved(false); }}
              placeholder="30" className={inputClass} />
          </Field>
          <Field label="Sexo">
            <div className="flex gap-2">
              {sexOptions.map(o => (
                <button key={o.value} onClick={() => { setForm(f => ({ ...f, sex: o.value })); setSaved(false); }}
                  className={`flex-1 rounded-xl border px-2 py-2.5 text-xs font-medium transition-all ${
                    form.sex === o.value
                      ? 'border-[#1B4332] bg-[#1B4332]/8 text-[#1B4332]'
                      : 'border-black/10 bg-[#F7F6F2] text-[#475569] hover:border-black/20'
                  }`}>{o.label}</button>
              ))}
            </div>
          </Field>
          <Field label="Peso (kg)">
            <input type="number" min={20} max={400} step={0.1} value={form.weight}
              onChange={e => { setForm(f => ({ ...f, weight: e.target.value })); setSaved(false); }}
              placeholder="70" className={inputClass} />
          </Field>
          <Field label="Altura (cm)">
            <input type="number" min={50} max={300} value={form.height}
              onChange={e => { setForm(f => ({ ...f, height: e.target.value })); setSaved(false); }}
              placeholder="170" className={inputClass} />
          </Field>
        </div>
      </Section>

      {/* Objetivo */}
      <Section title="Objetivo">
        <div className="flex flex-wrap gap-2">
          {goalOptions.map(o => (
            <button key={o.value} onClick={() => { setForm(f => ({ ...f, goal: o.value })); setSaved(false); }}
              className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-all flex items-center gap-2 ${
                form.goal === o.value
                  ? 'border-[#1B4332] bg-[#1B4332]/8 text-[#1B4332]'
                  : 'border-black/8 bg-[#F7F6F2] text-[#475569] hover:border-black/15'
              }`}>
              <span>{o.emoji}</span> {o.label}
            </button>
          ))}
        </div>
      </Section>

      {/* Actividad */}
      <Section title="Nivel de actividad">
        <div className="flex flex-wrap gap-2">
          {activityOptions.map(o => (
            <button key={o.value} onClick={() => { setForm(f => ({ ...f, activityLevel: o.value })); setSaved(false); }}
              className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                form.activityLevel === o.value
                  ? 'border-[#1B4332] bg-[#1B4332]/8 text-[#1B4332]'
                  : 'border-black/8 bg-[#F7F6F2] text-[#475569] hover:border-black/15'
              }`}>{o.label}</button>
          ))}
        </div>
      </Section>

      {/* Condiciones */}
      <Section title="Condiciones de salud">
        <div className="flex flex-wrap gap-2">
          {conditionOptions.map(c => (
            <button key={c} onClick={() => toggleArray('conditions', c)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                form.conditions.includes(c)
                  ? 'border-[#1B4332] bg-[#1B4332] text-white'
                  : 'border-black/10 bg-[#F7F6F2] text-[#475569] hover:border-black/20'
              }`}>{c}</button>
          ))}
        </div>
      </Section>

      {/* Intereses */}
      <Section title="Temas de interés">
        <div className="grid grid-cols-2 gap-2.5">
          {preferenceOptions.map(o => (
            <button key={o.value} onClick={() => toggleArray('preferences', o.value)}
              className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-3 text-left transition-all ${
                form.preferences.includes(o.value)
                  ? 'border-[#1B4332] bg-[#1B4332]/6 shadow-sm'
                  : 'border-black/8 bg-[#F7F6F2] hover:border-black/15'
              }`}>
              <span className="text-lg flex-shrink-0">{o.emoji}</span>
              <span className={`text-xs font-medium ${
                form.preferences.includes(o.value) ? 'text-[#1B4332]' : 'text-[#475569]'
              }`}>{o.label}</span>
            </button>
          ))}
        </div>
      </Section>

      {/* Nota personal */}
      <Section title="Nota personal (opcional)">
        <textarea value={form.freeText}
          onChange={e => { setForm(f => ({ ...f, freeText: e.target.value })); setSaved(false); }}
          placeholder="Cuéntanos algo más sobre tu situación..."
          rows={3} className={inputClass + " resize-none"} />
      </Section>

      {/* Error / Success */}
      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200/60 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      {/* Save */}
      <div className="flex items-center gap-4">
        <button onClick={save} disabled={saving}
          className="flex items-center gap-2 rounded-xl bg-[#1B4332] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#2D6A4F] disabled:opacity-60 transition-all">
          {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Guardando...</>
            : saved ? <><CheckCircle2 className="w-4 h-4" /> Guardado</>
            : <><Save className="w-4 h-4" /> Guardar cambios</>}
        </button>
        {saved && <span className="text-sm text-emerald-600 font-medium">Cambios guardados correctamente.</span>}
      </div>
    </div>
  );
}

/* ── Helpers ─────────────────────────────────── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-bold uppercase tracking-wide text-[#94A3B8]">{title}</h2>
      {children}
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold uppercase tracking-wide text-[#475569]">{label}</label>
      {children}
    </div>
  );
}
