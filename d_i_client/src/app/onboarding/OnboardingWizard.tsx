"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import {
  User, Target, Activity, HeartPulse, Sparkles, CheckCircle2,
  ArrowRight, ArrowLeft, Loader2,
} from 'lucide-react';

/* ── Types ────────────────────────────────────────────── */
interface FormData {
  name: string;
  age: string;
  sex: string;
  weight: string;
  height: string;
  goal: string;
  activityLevel: string;
  conditions: string[];
  conditionOther: string;
  preferences: string[];
  freeText: string;
}

const initial: FormData = {
  name: '',
  age: '',
  sex: '',
  weight: '',
  height: '',
  goal: '',
  activityLevel: '',
  conditions: [],
  conditionOther: '',
  preferences: [],
  freeText: '',
};

/* ── Step metadata ────────────────────────────────────── */
const steps = [
  { id: 'basics', label: 'Datos básicos', icon: User },
  { id: 'goal', label: 'Tu objetivo', icon: Target },
  { id: 'activity', label: 'Actividad física', icon: Activity },
  { id: 'conditions', label: 'Salud', icon: HeartPulse },
  { id: 'preferences', label: 'Intereses', icon: Sparkles },
  { id: 'summary', label: 'Resumen', icon: CheckCircle2 },
];

/* ── Option data ──────────────────────────────────────── */
const goalOptions = [
  { value: 'lose', label: 'Bajar de peso', emoji: '📉', desc: 'Reducir grasa corporal de forma saludable' },
  { value: 'gain', label: 'Subir de peso', emoji: '📈', desc: 'Ganar masa muscular y peso saludable' },
  { value: 'maintain', label: 'Mantener peso', emoji: '⚖️', desc: 'Mantener mi composición corporal actual' },
  { value: 'energy', label: 'Más energía', emoji: '⚡', desc: 'Sentirme con más vitalidad en el día a día' },
  { value: 'health', label: 'Mejorar salud', emoji: '💚', desc: 'Optimizar mi salud general y prevenir enfermedades' },
];

const activityOptions = [
  { value: 'sedentary', label: 'Sedentario', desc: 'Poco o nada de ejercicio, trabajo de escritorio' },
  { value: 'light', label: 'Ligeramente activo', desc: 'Ejercicio ligero 1-3 días/semana' },
  { value: 'moderate', label: 'Moderadamente activo', desc: 'Ejercicio moderado 3-5 días/semana' },
  { value: 'active', label: 'Muy activo', desc: 'Ejercicio intenso 6-7 días/semana' },
  { value: 'athlete', label: 'Atleta', desc: 'Entrenamiento intenso diario o doble sesión' },
];

const conditionOptions = [
  'Diabetes',
  'Hipertensión',
  'Hipotiroidismo',
  'Resistencia a insulina',
  'Síndrome metabólico',
  'Problemas digestivos',
  'Ansiedad / estrés crónico',
  'Problemas de sueño',
  'Ninguno',
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

/* ── Animation variants ───────────────────────────────── */
const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

/* ── Main component ───────────────────────────────────── */
export default function OnboardingWizard() {
  const router = useRouter();
  const { data: session, update } = useSession();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [form, setForm] = useState<FormData>({
    ...initial,
    name: session?.user?.name || '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const canNext = (): boolean => {
    switch (step) {
      case 0: return !!(form.age && form.sex && form.weight && form.height);
      case 1: return !!form.goal;
      case 2: return !!form.activityLevel;
      case 3: return form.conditions.length > 0;
      case 4: return form.preferences.length > 0;
      case 5: return true;
      default: return false;
    }
  };

  const next = () => { if (canNext() && step < 5) { setDir(1); setStep(s => s + 1); } };
  const prev = () => { if (step > 0) { setDir(-1); setStep(s => s - 1); } };

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
        [field]: arr.includes(value)
          ? arr.filter(v => v !== value)
          : [...arr, value],
      };
    });
  };

  const submit = async () => {
    setSubmitting(true);
    setError('');
    try {
      const conditions = form.conditions.filter(c => c !== 'Ninguno');
      if (form.conditionOther.trim()) conditions.push(form.conditionOther.trim());

      const res = await fetch('/api/user/health-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          age: Number(form.age),
          sex: form.sex,
          weight: Number(form.weight),
          height: Number(form.height),
          goal: form.goal,
          activityLevel: form.activityLevel,
          conditions,
          preferences: form.preferences,
          freeText: form.freeText || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Error al guardar');
      }

      // Update the JWT session so middleware knows onboarding is done
      await update({ onboardingComplete: true });
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error. Inténtalo de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center px-4 py-10 md:py-16">
      {/* Logo + title */}
      <div className="flex items-center gap-3 mb-8">
        <Image src="/imagen_logo_svg.svg" alt="Dieta Integral" width={32} height={32} className="w-8 h-8" />
        <span className="font-brand text-lg font-bold tracking-wide uppercase text-[#1B4332]">Tu perfil</span>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-lg mb-8">
        <div className="flex items-center justify-between mb-2">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const isActive = i === step;
            const isDone = i < step;
            return (
              <div key={s.id} className="flex flex-col items-center gap-1">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isActive ? 'bg-[#1B4332] text-white scale-110 shadow-md' :
                  isDone ? 'bg-[#40916C] text-white' :
                  'bg-black/5 text-black/30'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`text-[10px] font-medium transition-colors ${
                  isActive ? 'text-[#1B4332]' : isDone ? 'text-[#40916C]' : 'text-black/30'
                } hidden sm:block`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
        <div className="h-1.5 bg-black/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#1B4332] to-[#40916C] rounded-full"
            animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>

      {/* Step content card */}
      <div className="w-full max-w-lg">
        <div className="rounded-2xl border border-black/8 bg-white shadow-lg overflow-hidden">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 md:p-8"
            >
              {step === 0 && <StepBasics form={form} setForm={setForm} />}
              {step === 1 && <StepGoal form={form} setForm={setForm} />}
              {step === 2 && <StepActivity form={form} setForm={setForm} />}
              {step === 3 && <StepConditions form={form} setForm={setForm} toggleArray={toggleArray} />}
              {step === 4 && <StepPreferences form={form} toggleArray={toggleArray} setForm={setForm} />}
              {step === 5 && <StepSummary form={form} />}
            </motion.div>
          </AnimatePresence>

          {/* Error */}
          {error && (
            <div className="mx-6 mb-4 rounded-lg bg-red-50 border border-red-200/60 px-4 py-2.5 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between px-6 md:px-8 py-4 border-t border-black/5 bg-[#FAFAF8]">
            <button
              onClick={prev}
              disabled={step === 0}
              className="flex items-center gap-1.5 text-sm font-medium text-[#475569] hover:text-[#0F172A] disabled:opacity-0 disabled:pointer-events-none transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> Atrás
            </button>

            {step < 5 ? (
              <button
                onClick={next}
                disabled={!canNext()}
                className="flex items-center gap-1.5 rounded-xl bg-[#1B4332] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#2D6A4F] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Siguiente <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={submit}
                disabled={submitting}
                className="flex items-center gap-2 rounded-xl bg-[#1B4332] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#2D6A4F] disabled:opacity-60 transition-all"
              >
                {submitting ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Guardando...</>
                ) : (
                  <>Comenzar mi camino <CheckCircle2 className="w-4 h-4" /></>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Step 1: Datos básicos ────────────────────────────── */
function StepBasics({ form, setForm }: { form: FormData; setForm: React.Dispatch<React.SetStateAction<FormData>> }) {
  const update = (field: keyof FormData, value: string) => setForm(f => ({ ...f, [field]: value }));

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-[#0F172A]">Cuéntanos sobre ti</h2>
        <p className="text-sm text-[#475569]">Esta información nos ayuda a personalizar tu experiencia.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wide text-[#475569]">Edad</label>
          <input
            type="number"
            min={10}
            max={120}
            value={form.age}
            onChange={e => update('age', e.target.value)}
            placeholder="30"
            className="w-full rounded-xl border border-black/10 bg-[#F7F6F2] px-4 py-2.5 text-sm text-[#0F172A] placeholder:text-black/25 focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 focus:border-[#1B4332]/30 transition-all"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wide text-[#475569]">Sexo</label>
          <div className="flex gap-2">
            {sexOptions.map(o => (
              <button
                key={o.value}
                onClick={() => update('sex', o.value)}
                className={`flex-1 rounded-xl border px-2 py-2.5 text-xs font-medium transition-all ${
                  form.sex === o.value
                    ? 'border-[#1B4332] bg-[#1B4332]/8 text-[#1B4332]'
                    : 'border-black/10 bg-[#F7F6F2] text-[#475569] hover:border-black/20'
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wide text-[#475569]">Peso (kg)</label>
          <input
            type="number"
            min={20}
            max={400}
            step={0.1}
            value={form.weight}
            onChange={e => update('weight', e.target.value)}
            placeholder="70"
            className="w-full rounded-xl border border-black/10 bg-[#F7F6F2] px-4 py-2.5 text-sm text-[#0F172A] placeholder:text-black/25 focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 focus:border-[#1B4332]/30 transition-all"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wide text-[#475569]">Altura (cm)</label>
          <input
            type="number"
            min={50}
            max={300}
            value={form.height}
            onChange={e => update('height', e.target.value)}
            placeholder="170"
            className="w-full rounded-xl border border-black/10 bg-[#F7F6F2] px-4 py-2.5 text-sm text-[#0F172A] placeholder:text-black/25 focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 focus:border-[#1B4332]/30 transition-all"
          />
        </div>
      </div>
    </div>
  );
}

/* ── Step 2: Objetivo ─────────────────────────────────── */
function StepGoal({ form, setForm }: { form: FormData; setForm: React.Dispatch<React.SetStateAction<FormData>> }) {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-[#0F172A]">¿Cuál es tu objetivo principal?</h2>
        <p className="text-sm text-[#475569]">Elige el que más se alinee con lo que buscas ahora.</p>
      </div>

      <div className="space-y-2.5">
        {goalOptions.map(o => (
          <button
            key={o.value}
            onClick={() => setForm(f => ({ ...f, goal: o.value }))}
            className={`w-full flex items-center gap-4 rounded-xl border px-4 py-3.5 text-left transition-all ${
              form.goal === o.value
                ? 'border-[#1B4332] bg-[#1B4332]/6 shadow-sm'
                : 'border-black/8 bg-[#F7F6F2] hover:border-black/15 hover:bg-[#F0EFEB]'
            }`}
          >
            <span className="text-2xl flex-shrink-0">{o.emoji}</span>
            <div>
              <p className={`text-sm font-semibold ${form.goal === o.value ? 'text-[#1B4332]' : 'text-[#0F172A]'}`}>{o.label}</p>
              <p className="text-xs text-[#475569] mt-0.5">{o.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Step 3: Actividad física ─────────────────────────── */
function StepActivity({ form, setForm }: { form: FormData; setForm: React.Dispatch<React.SetStateAction<FormData>> }) {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-[#0F172A]">¿Cuál es tu nivel de actividad física?</h2>
        <p className="text-sm text-[#475569]">Sé honesto — no hay respuesta correcta o incorrecta.</p>
      </div>

      <div className="space-y-2.5">
        {activityOptions.map(o => (
          <button
            key={o.value}
            onClick={() => setForm(f => ({ ...f, activityLevel: o.value }))}
            className={`w-full flex items-start gap-3.5 rounded-xl border px-4 py-3.5 text-left transition-all ${
              form.activityLevel === o.value
                ? 'border-[#1B4332] bg-[#1B4332]/6 shadow-sm'
                : 'border-black/8 bg-[#F7F6F2] hover:border-black/15 hover:bg-[#F0EFEB]'
            }`}
          >
            <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 transition-all ${
              form.activityLevel === o.value
                ? 'border-[#1B4332] bg-[#1B4332]'
                : 'border-black/20'
            }`}>
              {form.activityLevel === o.value && (
                <div className="w-full h-full rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
              )}
            </div>
            <div>
              <p className={`text-sm font-semibold ${form.activityLevel === o.value ? 'text-[#1B4332]' : 'text-[#0F172A]'}`}>{o.label}</p>
              <p className="text-xs text-[#475569] mt-0.5">{o.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Step 4: Padecimientos ────────────────────────────── */
function StepConditions({ form, setForm, toggleArray }: {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  toggleArray: (field: 'conditions' | 'preferences', value: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-[#0F172A]">¿Tienes algún padecimiento de salud?</h2>
        <p className="text-sm text-[#475569]">Selecciona todos los que apliquen. Esto nos ayuda a cuidarte mejor.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {conditionOptions.map(c => (
          <button
            key={c}
            onClick={() => toggleArray('conditions', c)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
              form.conditions.includes(c)
                ? 'border-[#1B4332] bg-[#1B4332] text-white'
                : 'border-black/10 bg-[#F7F6F2] text-[#475569] hover:border-black/20'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {!form.conditions.includes('Ninguno') && (
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wide text-[#475569]">Otro padecimiento (opcional)</label>
          <input
            type="text"
            value={form.conditionOther}
            onChange={e => setForm(f => ({ ...f, conditionOther: e.target.value }))}
            placeholder="Escribe aquí si no aparece en la lista"
            className="w-full rounded-xl border border-black/10 bg-[#F7F6F2] px-4 py-2.5 text-sm text-[#0F172A] placeholder:text-black/25 focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 focus:border-[#1B4332]/30 transition-all"
          />
        </div>
      )}
    </div>
  );
}

/* ── Step 5: Preferencias ─────────────────────────────── */
function StepPreferences({ form, toggleArray, setForm }: {
  form: FormData;
  toggleArray: (field: 'conditions' | 'preferences', value: string) => void;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-[#0F172A]">¿Qué te interesa explorar?</h2>
        <p className="text-sm text-[#475569]">Selecciona los temas que más te llaman la atención.</p>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {preferenceOptions.map(o => (
          <button
            key={o.value}
            onClick={() => toggleArray('preferences', o.value)}
            className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-3 text-left transition-all ${
              form.preferences.includes(o.value)
                ? 'border-[#1B4332] bg-[#1B4332]/6 shadow-sm'
                : 'border-black/8 bg-[#F7F6F2] hover:border-black/15'
            }`}
          >
            <span className="text-lg flex-shrink-0">{o.emoji}</span>
            <span className={`text-xs font-medium ${
              form.preferences.includes(o.value) ? 'text-[#1B4332]' : 'text-[#475569]'
            }`}>
              {o.label}
            </span>
          </button>
        ))}
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold uppercase tracking-wide text-[#475569]">
          ¿Qué te gustaría aprender primero? (opcional)
        </label>
        <textarea
          value={form.freeText}
          onChange={e => setForm(f => ({ ...f, freeText: e.target.value }))}
          placeholder="Cuéntanos en tus propias palabras..."
          rows={3}
          className="w-full rounded-xl border border-black/10 bg-[#F7F6F2] px-4 py-2.5 text-sm text-[#0F172A] placeholder:text-black/25 focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 focus:border-[#1B4332]/30 transition-all resize-none"
        />
      </div>
    </div>
  );
}

/* ── Step 6: Resumen ──────────────────────────────────── */
function StepSummary({ form }: { form: FormData }) {
  const goalLabel = goalOptions.find(o => o.value === form.goal)?.label || form.goal;
  const actLabel = activityOptions.find(o => o.value === form.activityLevel)?.label || form.activityLevel;
  const sexLabel = sexOptions.find(o => o.value === form.sex)?.label || form.sex;
  const prefLabels = form.preferences.map(p => preferenceOptions.find(o => o.value === p)?.label || p);

  const rows = [
    { label: 'Edad', value: `${form.age} años` },
    { label: 'Sexo', value: sexLabel },
    { label: 'Peso', value: `${form.weight} kg` },
    { label: 'Altura', value: `${form.height} cm` },
    { label: 'Objetivo', value: goalLabel },
    { label: 'Actividad', value: actLabel },
    { label: 'Padecimientos', value: form.conditions.join(', ') || 'Ninguno' },
    { label: 'Intereses', value: prefLabels.join(', ') },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-[#0F172A]">Todo listo</h2>
        <p className="text-sm text-[#475569]">Revisa tu información. Puedes volver atrás si necesitas corregir algo.</p>
      </div>

      <div className="rounded-xl border border-black/8 bg-[#F7F6F2] divide-y divide-black/6">
        {rows.map(r => (
          <div key={r.label} className="flex items-start justify-between px-4 py-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">{r.label}</span>
            <span className="text-sm font-medium text-[#0F172A] text-right max-w-[60%]">{r.value}</span>
          </div>
        ))}
      </div>

      {form.freeText && (
        <div className="rounded-xl border border-black/8 bg-[#F7F6F2] p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8] mb-1">Nota personal</p>
          <p className="text-sm text-[#475569]">{form.freeText}</p>
        </div>
      )}

      <div className="rounded-xl border border-[#1B4332]/15 bg-[#1B4332]/5 p-4 text-center space-y-1">
        <p className="font-semibold text-[#0F172A] text-sm">¡Estás a un paso!</p>
        <p className="text-xs text-[#475569]">Al confirmar, crearemos tu panel personalizado basado en estas respuestas.</p>
      </div>
    </div>
  );
}
