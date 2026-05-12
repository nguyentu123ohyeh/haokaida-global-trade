import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useI18n, bi } from "@/lib/i18n";
import { CATEGORIES, PRODUCTS, type CategoryKey } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

const searchSchema = z.object({
  category: fallback(z.enum(["all", "mechanical", "metal", "instruments", "office"]), "all").default("all"),
  q: fallback(z.string(), "").default(""),
  page: fallback(z.number(), 1).default(1),
});

export const Route = createFileRoute("/products")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Products · 产品中心 — HAOKAIDA" },
      { name: "description", content: "Browse our 28-product B2B catalog: mechanical equipment, metal products, instruments/meters, office equipment." },
    ],
  }),
  component: ProductsRouteComponent,
});

function ProductsRouteComponent() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const normalizedPath = pathname.replace(/\/$/, "");

  if (normalizedPath !== "/products") {
    return <Outlet />;
  }

  return <ProductsPage />;
}

const PER_PAGE = 9;

function ProductsPage() {
  const { t, lang } = useI18n();
  const sp = Route.useSearch();
  const navigate = Route.useNavigate();
  const [query, setQuery] = useState(sp.q);

  const filtered = useMemo(() => {
    const q = (sp.q || "").trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      if (sp.category !== "all" && p.category !== sp.category) return false;
      if (!q) return true;
      const blob = [p.nameEn, p.nameZh, p.descEn, p.descZh, p.category, ...p.applicationsEn, ...p.applicationsZh].join(" ").toLowerCase();
      return blob.includes(q);
    });
  }, [sp.category, sp.q]);

  const isFiltered = sp.q.trim().length > 0 || sp.category !== "all";
  const totalPages = isFiltered ? Math.max(1, Math.ceil(filtered.length / PER_PAGE)) : 4;
  const page = Math.min(Math.max(1, sp.page), totalPages);
  const pageItems = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const setCat = (c: CategoryKey | "all") => navigate({ search: { ...sp, category: c, page: 1 } });
  const setPage = (p: number) => {
    navigate({ search: { ...sp, page: p } });
    window.scrollTo({ top: 200, behavior: "smooth" });
  };
  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ search: { ...sp, q: query.trim(), page: 1 } });
  };

  return (
    <>
      {/* HERO */}
      <section className="relative border-b border-border/60 bg-surface py-16 lg:py-20">
        <div className="grid-bg absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <div className="font-mono text-xs uppercase tracking-widest text-emerald">// {t(bi("Catalog", "产品目录"))}</div>
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
            {t(bi("Products · ", ""))}<span className="text-gradient">{t(bi("28 Curated Items", "28 件精选产品"))}</span>
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            {t(bi(
              "Search by name, category, application, or keyword. Bilingual catalog supporting English and Simplified Chinese.",
              "支持按名称、类别、应用场景或关键词搜索。双语目录，支持中英文。",
            ))}
          </p>

          <form onSubmit={onSearch} className="mt-8 flex max-w-2xl items-stretch gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t(bi("Search products, e.g. caliper, 卡尺, motor...", "搜索产品，如 caliper、卡尺、电机..."))}
                className="w-full rounded-md border border-border/60 bg-background/60 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-emerald/60 focus:shadow-glow"
              />
            </div>
            <button type="submit" className="btn-primary text-xs">{t(bi("Search", "搜索"))}</button>
          </form>

          <div className="mt-6 flex flex-wrap gap-2">
            <button onClick={() => setCat("all")} className={`chip ${sp.category === "all" ? "chip-active" : ""}`}>
              {t(bi("All", "全部"))}
            </button>
            {CATEGORIES.map((c) => (
              <button key={c.key} onClick={() => setCat(c.key)} className={`chip ${sp.category === c.key ? "chip-active" : ""}`}>
                {lang === "zh" ? c.zh : c.en}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          {pageItems.length === 0 ? (
            <div className="mx-auto max-w-md rounded-xl border border-dashed border-border/60 p-12 text-center">
              <div className="text-5xl">🔍</div>
              <h3 className="mt-4 font-display text-xl font-bold">{t(bi("No matching products", "未找到匹配的产品"))}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {t(bi(
                  "No matching products found. Please try another keyword or contact us for sourcing support.",
                  "未找到匹配的产品。请尝试其他关键词，或联系我们获取采购支持。",
                ))}
              </p>
              <Link to="/contact" className="btn-primary mt-6 text-xs">
                {t(bi("Contact Us", "联系我们"))} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-6 flex items-center justify-between text-xs text-muted-foreground">
                <div className="font-mono uppercase tracking-widest">
                  {t(bi("Page", "第"))} {page} / {totalPages} · {filtered.length} {t(bi("items", "件"))}
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {pageItems.map((p) => <ProductCard key={p.id} p={p} />)}
              </div>

              {/* PAGINATION */}
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage(page - 1)}
                  className="inline-flex items-center gap-1 rounded-md border border-border/60 px-4 py-2 text-xs font-medium disabled:opacity-30 hover:border-emerald/50"
                >
                  <ChevronLeft className="h-3.5 w-3.5" /> {t(bi("Previous", "上一页"))}
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`grid h-9 w-9 place-items-center rounded-md text-xs font-medium ${
                      p === page
                        ? "bg-emerald/20 text-emerald border border-emerald/40 shadow-glow"
                        : "border border-border/60 hover:border-emerald/50"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage(page + 1)}
                  className="inline-flex items-center gap-1 rounded-md border border-border/60 px-4 py-2 text-xs font-medium disabled:opacity-30 hover:border-emerald/50"
                >
                  {t(bi("Next", "下一页"))} <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-16 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-2xl border border-emerald/30 bg-surface-elevated p-8 text-center lg:p-12">
          <h3 className="font-display text-2xl font-bold">
            {t(bi("Don't see what you need?", "未找到您想要的产品？"))}
          </h3>
          <p className="mt-2 text-muted-foreground">
            {t(bi("Send us your sourcing request and we'll respond with options.", "提交您的采购需求，我们将为您提供方案。"))}
          </p>
          <Link to="/contact" className="btn-primary mt-6 text-xs">{t(bi("Send Inquiry", "提交询盘"))}</Link>
        </div>
      </section>
    </>
  );
}
