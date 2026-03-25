"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  BookOpen, ArrowRight, Sparkles, Search, Bookmark,
  BookmarkCheck, Filter, X, Heart,
} from 'lucide-react';

/* ── Types ──────────────────────────────── */
interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  image: string | null;
  date: string | null;
  category: { name: string; slug: string; color: string | null } | null;
}

interface CategoryItem {
  slug: string;
  name: string;
  color: string | null;
}

interface Props {
  preferences: string[];
  categories: CategoryItem[];
  articles: ArticleItem[];
  bookmarkedIds: string[];
}

/* ── Preference map ─────────────────────── */
const prefMap: Record<string, string> = {
  fasting: 'Ayuno intermitente',
  ancestral: 'Dieta ancestral',
  sleep: 'Mejorar sueño',
  circadian: 'Ritmos circadianos',
  recipes: 'Recetas saludables',
  movement: 'Rutinas de movimiento',
  stress: 'Manejo de estrés',
  supplements: 'Suplementación',
};

type Tab = 'all' | 'recommended' | 'saved';

/* ── Component ──────────────────────────── */
export default function ContentHub({ preferences, categories, articles, bookmarkedIds }: Props) {
  const [tab, setTab] = useState<Tab>('all');
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set(bookmarkedIds));
  const [togglingId, setTogglingId] = useState<string | null>(null);

  /* Bookmark toggle */
  const toggleBookmark = async (articleId: string) => {
    setTogglingId(articleId);
    const isSaved = savedIds.has(articleId);
    try {
      const res = await fetch('/api/user/bookmarks', {
        method: isSaved ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleId }),
      });
      if (res.ok || res.status === 409) {
        setSavedIds(prev => {
          const next = new Set(prev);
          isSaved ? next.delete(articleId) : next.add(articleId);
          return next;
        });
      }
    } catch { /* silently fail */ }
    setTogglingId(null);
  };

  /* Filtering logic */
  const filtered = useMemo(() => {
    let list = articles;

    // Tab filter
    if (tab === 'saved') {
      list = list.filter(a => savedIds.has(a.id));
    }
    if (tab === 'recommended' && preferences.length > 0) {
      // Simple recommendation: prioritize articles whose category slug
      // matches a user preference, or title/summary mentions it
      list = list.filter(a => {
        const catSlug = a.category?.slug?.toLowerCase() || '';
        const text = `${a.title} ${a.summary}`.toLowerCase();
        return preferences.some(p => {
          const term = prefMap[p]?.toLowerCase() || p.toLowerCase();
          return catSlug.includes(p) || text.includes(term) || text.includes(p);
        });
      });
    }

    // Category filter
    if (catFilter) {
      list = list.filter(a => a.category?.slug === catFilter);
    }

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        (a.category?.name || '').toLowerCase().includes(q)
      );
    }

    return list;
  }, [articles, tab, search, catFilter, savedIds, preferences]);

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'Todo', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'recommended', label: 'Para ti', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'saved', label: `Guardados (${savedIds.size})`, icon: <Heart className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Contenido</h1>
        <p className="text-sm text-[#475569] mt-1">
          Artículos y recursos seleccionados según tus intereses.
        </p>
      </div>

      {/* Preferences badges */}
      {preferences.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <Sparkles className="w-4 h-4 text-[#1B4332]" />
          <span className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider">Intereses:</span>
          {preferences.map(p => (
            <span key={p} className="rounded-full bg-[#1B4332]/8 px-2.5 py-0.5 text-[10px] font-medium text-[#1B4332]">
              {prefMap[p] || p}
            </span>
          ))}
        </div>
      )}

      {/* Tabs + Search */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex gap-1 bg-white rounded-xl border border-black/8 p-1">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                tab === t.id
                  ? 'bg-[#1B4332] text-white shadow-sm'
                  : 'text-[#475569] hover:bg-black/4'
              }`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar artículos..."
            className="w-full pl-9 pr-8 py-2 rounded-xl border border-black/10 bg-white text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 transition-all"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-black/5">
              <X className="w-3.5 h-3.5 text-[#94A3B8]" />
            </button>
          )}
        </div>
      </div>

      {/* Category chips */}
      {categories.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-3.5 h-3.5 text-[#94A3B8]" />
          <button
            onClick={() => setCatFilter(null)}
            className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-all ${
              !catFilter
                ? 'bg-[#1B4332] text-white'
                : 'bg-[#F7F6F2] text-[#475569] hover:bg-black/8'
            }`}
          >
            Todas
          </button>
          {categories.map(c => (
            <button
              key={c.slug}
              onClick={() => setCatFilter(catFilter === c.slug ? null : c.slug)}
              className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-all ${
                catFilter === c.slug
                  ? 'bg-[#1B4332] text-white'
                  : 'bg-[#F7F6F2] text-[#475569] hover:bg-black/8'
              }`}
              style={catFilter === c.slug && c.color ? { backgroundColor: c.color } : undefined}
            >
              {c.name}
            </button>
          ))}
        </div>
      )}

      {/* Article grid */}
      {filtered.length === 0 ? (
        <EmptyState tab={tab} search={search} catFilter={catFilter} />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(a => (
            <article key={a.id} className="rounded-2xl border border-black/8 bg-white hover:shadow-md hover:border-black/12 transition-all flex flex-col group relative">
              {/* Bookmark button */}
              <button
                onClick={(e) => { e.preventDefault(); toggleBookmark(a.id); }}
                disabled={togglingId === a.id}
                className="absolute top-3 right-3 z-10 p-1.5 rounded-lg bg-white/90 backdrop-blur border border-black/8 hover:border-black/15 transition-all"
                title={savedIds.has(a.id) ? 'Quitar de guardados' : 'Guardar'}
              >
                {savedIds.has(a.id) ? (
                  <BookmarkCheck className="w-4 h-4 text-[#1B4332]" />
                ) : (
                  <Bookmark className="w-4 h-4 text-[#94A3B8]" />
                )}
              </button>

              <Link href={`/blog/${a.slug}`} className="p-5 flex flex-col flex-1 space-y-3">
                {a.category && (
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider w-fit"
                    style={{ color: a.category.color || '#40916C' }}
                  >
                    {a.category.name}
                  </span>
                )}
                <h3 className="text-sm font-semibold text-[#0F172A] group-hover:text-[#1B4332] transition-colors line-clamp-2 flex-1">
                  {a.title}
                </h3>
                <p className="text-xs text-[#475569] line-clamp-2">{a.summary}</p>
                <div className="flex items-center justify-between pt-1">
                  {a.date && (
                    <span className="text-[10px] text-[#94A3B8]">
                      {new Date(a.date).toLocaleDateString('es', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  )}
                  <span className="text-xs font-semibold text-[#1B4332] flex items-center gap-1 ml-auto">
                    Leer <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Empty state ────────────────────────── */
function EmptyState({ tab, search, catFilter }: { tab: Tab; search: string; catFilter: string | null }) {
  let message = 'Pronto se publicarán nuevos contenidos.';
  if (tab === 'saved') message = 'No has guardado artículos todavía. Pulsa el icono de marcador para guardar.';
  if (tab === 'recommended') message = 'No hay artículos que coincidan con tus intereses por ahora.';
  if (search) message = `No se encontraron resultados para "${search}".`;
  if (catFilter) message = 'No hay artículos en esta categoría.';

  return (
    <div className="text-center py-16 space-y-3">
      <div className="w-16 h-16 rounded-full bg-[#F7F6F2] flex items-center justify-center mx-auto">
        <BookOpen className="w-8 h-8 text-[#94A3B8]" />
      </div>
      <h3 className="font-semibold text-[#0F172A]">Sin resultados</h3>
      <p className="text-sm text-[#475569] max-w-xs mx-auto">{message}</p>
    </div>
  );
}
