import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MessageSquare } from "lucide-react";
import type { Product } from "@/lib/products";
import { catLabel } from "@/lib/products";
import { useI18n, bi } from "@/lib/i18n";

export function ProductCard({ p }: { p: Product }) {
  const { lang, t } = useI18n();
  const cat = catLabel(p.category);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card transition-all hover:border-emerald/40 hover:shadow-glow">
      <div className="relative aspect-[4/3] overflow-hidden bg-white">
        <img
          src={p.image}
          alt={lang === "zh" ? p.nameZh : p.nameEn}
          loading="lazy"
          className="h-full w-full object-contain p-3 transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/80 via-transparent to-transparent" />

        <div className="absolute left-3 top-3 chip backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
          {lang === "zh" ? cat.zh : cat.en}
        </div>

        <div className="absolute bottom-3 right-3 rounded bg-background/70 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-cyan/80 backdrop-blur">
          {p.specs[0].value}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-display text-base font-semibold leading-tight text-foreground">
            {p.nameEn}
          </h3>
          <div className="mt-0.5 text-sm text-muted-foreground">{p.nameZh}</div>
        </div>

        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {lang === "zh" ? p.descZh : p.descEn}
        </p>

        <div className="mt-auto flex items-center gap-2 pt-2">
          <Link
            to="/products/$slug"
            params={{ slug: p.slug }}
            search={{} as never}
            preload="intent"
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-border/60 bg-surface/60 px-3 py-2 text-xs font-medium transition hover:border-emerald/50 hover:text-emerald"
          >
            {t(bi("View Details", "查看详情"))}
            <ArrowUpRight className="h-3 w-3" />
          </Link>

          <Link
            to="/contact"
            search={{ product: p.slug } as never}
            className="inline-flex items-center justify-center gap-1.5 rounded-md bg-emerald/15 px-3 py-2 text-xs font-medium text-emerald transition hover:bg-emerald/25"
          >
            <MessageSquare className="h-3 w-3" />
            {t(bi("Inquire", "询盘"))}
          </Link>
        </div>
      </div>
    </article>
  );
}