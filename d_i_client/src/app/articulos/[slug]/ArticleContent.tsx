import Image from 'next/image';

interface ArticleContentProps {
  content: string;
  images: string[];
}

/* ── Inline markdown → HTML ─────────────────────────── */
function inlineMarkdown(text: string): string {
  return text
    // links: [label](url)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[#1B4332] hover:text-[#1B4332]/70 underline font-semibold">$1</a>')
    // bold: **text**
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // italic: *text*
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    // strip leftover [Img:...] markers
    .replace(/\[Img:\d+(?::[a-z]+)?\]/gi, '')
    .trim();
}

/* ── Parse [Img:N] or [Img:N:position] from a block ── */
function extractImage(block: string): { index: number; position: 'center' | 'left' | 'right' } | null {
  const m = block.match(/\[Img:(\d+)(?::([a-z]+))?\]/i);
  if (!m) return null;
  const pos = (m[2] || 'center').toLowerCase();
  return {
    index: parseInt(m[1]) - 1,
    position: pos === 'left' ? 'left' : pos === 'right' ? 'right' : 'center',
  };
}

/* ── Image block component ────────────────────────────  */
function ArticleImage({ src, alt, position }: { src: string; alt: string; position: 'center' | 'left' | 'right' }) {
  if (position === 'center') {
    return (
      <figure className="my-10">
        <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden shadow-lg bg-black/5">
          <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover" />
        </div>
      </figure>
    );
  }
  // left or right — floated alongside text
  const floatCls = position === 'left'
    ? 'float-left mr-6 md:mr-8 mb-4'
    : 'float-right ml-6 md:ml-8 mb-4';
  return (
    <figure className={`${floatCls} w-full sm:w-1/2 my-2`}>
      <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg bg-black/5">
        <Image src={src} alt={alt} fill sizes="(max-width: 640px) 100vw, 400px"
          className="object-cover" />
      </div>
    </figure>
  );
}

/* ── Main component ───────────────────────────────────  */
export default function ArticleContent({ content, images }: ArticleContentProps) {
  const blocks = content.split(/\n{2,}/).filter(b => b.trim() !== '');

  const rendered: React.ReactNode[] = [];
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i].trim();

    // ── Horizontal rule ──
    if (/^[-_]{3,}\s*$/.test(block)) {
      rendered.push(<hr key={i} className="my-10 border-t border-gray-300" />);
      i++;
      continue;
    }

    // ── Standalone image block: a block that is ONLY [Img:N] ──
    const standaloneImg = block.match(/^\[Img:(\d+)(?::([a-z]+))?\]$/i);
    if (standaloneImg) {
      const imgIdx = parseInt(standaloneImg[1]) - 1;
      const pos = (standaloneImg[2] || 'center').toLowerCase() as 'center' | 'left' | 'right';
      const src = images[imgIdx];
      if (src) {
        if (pos === 'center') {
          rendered.push(<ArticleImage key={i} src={src} alt={`Imagen ${imgIdx + 1}`} position="center" />);
          i++;
          continue;
        }
        // float image: collect following paragraphs into a clearfix wrapper
        const floatChildren: React.ReactNode[] = [];
        floatChildren.push(<ArticleImage key={`img-${i}`} src={src} alt={`Imagen ${imgIdx + 1}`} position={pos} />);
        i++;
        // Grab subsequent paragraph blocks (not headings) to flow around the image
        while (i < blocks.length) {
          const next = blocks[i].trim();
          if (next.startsWith('#') || /^\[Img:\d+/i.test(next) || /^[-_]{3,}\s*$/.test(next)) break;
          floatChildren.push(
            <p key={`p-${i}`} className="mb-6 text-lg leading-relaxed text-[#1a1a1a]"
               dangerouslySetInnerHTML={{ __html: inlineMarkdown(next) }} />
          );
          i++;
        }
        rendered.push(
          <div key={`float-${i}`} className="after:content-[''] after:table after:clear-both my-8">
            {floatChildren}
          </div>
        );
        continue;
      }
      i++;
      continue;
    }

    // ── H1 heading ──
    if (block.startsWith('# ') && !block.startsWith('## ')) {
      const heading = block.replace(/^# /, '');
      const imgData = extractImage(heading);
      const headingHtml = inlineMarkdown(heading);
      if (imgData && images[imgData.index]) {
        rendered.push(
          <div key={i} className="my-12">
            <ArticleImage src={images[imgData.index]} alt="Imagen del artículo" position={imgData.position} />
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-[#0F172A] mt-6"
                dangerouslySetInnerHTML={{ __html: headingHtml }} />
          </div>
        );
      } else {
        rendered.push(
          <h2 key={i} className="text-3xl md:text-4xl font-bold leading-tight text-[#0F172A] mt-14 mb-6"
              dangerouslySetInnerHTML={{ __html: headingHtml }} />
        );
      }
      i++;
      continue;
    }

    // ── H2 heading ──
    if (block.startsWith('## ')) {
      const heading = block.replace(/^## /, '');
      const imgData = extractImage(heading);
      const headingHtml = inlineMarkdown(heading);
      if (imgData && images[imgData.index]) {
        const pos = imgData.position;
        if (pos === 'center') {
          rendered.push(
            <div key={i} className="my-12">
              <h3 className="text-2xl md:text-3xl font-bold leading-tight text-[#0F172A] mb-6"
                  dangerouslySetInnerHTML={{ __html: headingHtml }} />
              <ArticleImage src={images[imgData.index]} alt="Imagen del artículo" position="center" />
            </div>
          );
        } else {
          // Float image next to the heading + following paragraphs
          const floatChildren: React.ReactNode[] = [];
          floatChildren.push(
            <ArticleImage key={`img-${i}`} src={images[imgData.index]} alt="Imagen del artículo" position={pos} />
          );
          floatChildren.push(
            <h3 key={`h-${i}`} className="text-2xl md:text-3xl font-bold leading-tight text-[#0F172A] mb-4"
                dangerouslySetInnerHTML={{ __html: headingHtml }} />
          );
          i++;
          while (i < blocks.length) {
            const next = blocks[i].trim();
            if (next.startsWith('#') || /^\[Img:\d+/i.test(next) || /^[-_]{3,}\s*$/.test(next)) break;
            floatChildren.push(
              <p key={`p-${i}`} className="mb-6 text-lg leading-relaxed text-[#1a1a1a]"
                 dangerouslySetInnerHTML={{ __html: inlineMarkdown(next) }} />
            );
            i++;
          }
          rendered.push(
            <div key={`float-${i}`} className="after:content-[''] after:table after:clear-both my-10">
              {floatChildren}
            </div>
          );
          continue;
        }
      } else {
        rendered.push(
          <h3 key={i} className="text-2xl md:text-3xl font-bold leading-tight text-[#0F172A] mt-12 mb-4 border-b border-gray-200 pb-2"
              dangerouslySetInnerHTML={{ __html: headingHtml }} />
        );
      }
      i++;
      continue;
    }

    // ── Regular paragraph (may contain inline [Img:N]) ──
    const imgData = extractImage(block);
    if (imgData && images[imgData.index] && imgData.position !== 'center') {
      // Float image within a paragraph group
      const floatChildren: React.ReactNode[] = [];
      floatChildren.push(
        <ArticleImage key={`img-${i}`} src={images[imgData.index]} alt="Imagen del artículo" position={imgData.position} />
      );
      floatChildren.push(
        <p key={`p-${i}`} className="mb-6 text-lg leading-relaxed text-[#1a1a1a]"
           dangerouslySetInnerHTML={{ __html: inlineMarkdown(block) }} />
      );
      i++;
      while (i < blocks.length) {
        const next = blocks[i].trim();
        if (next.startsWith('#') || /^\[Img:\d+/i.test(next) || /^[-_]{3,}\s*$/.test(next)) break;
        floatChildren.push(
          <p key={`p-${i}`} className="mb-6 text-lg leading-relaxed text-[#1a1a1a]"
             dangerouslySetInnerHTML={{ __html: inlineMarkdown(next) }} />
        );
        i++;
      }
      rendered.push(
        <div key={`float-${i}`} className="after:content-[''] after:table after:clear-both my-8">
          {floatChildren}
        </div>
      );
      continue;
    }

    if (imgData && images[imgData.index] && imgData.position === 'center') {
      rendered.push(
        <div key={i} className="my-8">
          <p className="mb-6 text-lg leading-relaxed text-[#1a1a1a]"
             dangerouslySetInnerHTML={{ __html: inlineMarkdown(block) }} />
          <ArticleImage src={images[imgData.index]} alt="Imagen del artículo" position="center" />
        </div>
      );
      i++;
      continue;
    }

    // Plain paragraph
    rendered.push(
      <p key={i} className="mb-6 text-lg leading-relaxed text-[#1a1a1a]"
         dangerouslySetInnerHTML={{ __html: inlineMarkdown(block) }} />
    );
    i++;
  }

  return (
    <article className="article-body">
      {rendered}
    </article>
  );
}
