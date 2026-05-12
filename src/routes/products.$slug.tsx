import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, MessageSquare, FileText, ArrowRight } from "lucide-react";
import { useI18n, bi } from "@/lib/i18n";
import { findProduct, PRODUCTS, catLabel, type Product } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }): { product: Product } => {
    const product = findProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.nameEn} · ${loaderData.product.nameZh} — HAOKAIDA` },
          { name: "description", content: loaderData.product.descEn },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-md p-16 text-center">
      <h1 className="font-display text-2xl font-bold">Product not found / 产品未找到</h1>
      <Link to="/products" className="btn-primary mt-6 text-xs">Back to Products / 返回产品中心</Link>
    </div>
  ),
  errorComponent: ({ error }) => <div className="p-16 text-center text-muted-foreground">{error.message}</div>,
  component: DetailPage,
});

function DetailPage() {
  const { product } = Route.useLoaderData() as { product: Product };
  const { t, lang } = useI18n();
  const [active, setActive] = useState(0);
  const cat = catLabel(product.category);

  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <>
      <section className="border-b border-border/60 bg-surface py-6">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Link to="/products" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-emerald">
            <ArrowLeft className="h-3.5 w-3.5" /> {t(bi("Back to Products", "返回产品中心"))}
          </Link>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Gallery */}
            <div>
              <div className="overflow-hidden rounded-2xl border border-border/60 bg-card">
                <img src={product.gallery[active]} alt={product.nameEn} className="aspect-[4/3] w-full object-cover transition hover:scale-105" />
              </div>
              <div className="mt-3 grid grid-cols-5 gap-2">
                {product.gallery.map((g, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`overflow-hidden rounded-md border transition ${i === active ? "border-emerald shadow-glow" : "border-border/60 hover:border-emerald/40"}`}
                  >
                    <img src={g} alt="" className="aspect-square w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div>
              <div className="chip">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
                {cat.en} · {cat.zh}
              </div>
              <h1 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl">
                {product.nameEn}
              </h1>
              <div className="mt-1 text-lg text-muted-foreground">{product.nameZh}</div>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                {lang === "zh" ? product.descZh : product.descEn}
              </p>

              <div className="mt-6 grid grid-cols-3 gap-3 rounded-xl glass p-4 text-center">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-emerald">Code</div>
                  <div className="mt-1 font-display text-sm font-bold">{product.specs[0].value}</div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-emerald">{t(bi("Origin", "产地"))}</div>
                  <div className="mt-1 font-display text-sm font-bold">Shenzhen</div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-emerald">Trade</div>
                  <div className="mt-1 font-display text-sm font-bold">B2B</div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <Link to="/contact" search={{ product: product.slug } as never} className="btn-primary">
                  <MessageSquare className="h-4 w-4" /> {t(bi("Contact Us", "联系我们"))}
                </Link>
                <Link to="/contact" search={{ product: product.slug } as never} className="btn-outline">
                  <FileText className="h-4 w-4" /> {t(bi("Request Product Info", "索取产品资料"))}
                </Link>
              </div>

              <div className="mt-8 rounded-md border border-border/60 bg-surface/60 p-4 text-xs text-muted-foreground">
                {t(bi(
                  "This is a B2B catalog. Pricing, MOQ, packaging, and lead time will be confirmed via inquiry.",
                  "本网站为B2B产品目录。价格、起订量、包装及交货期将通过询盘确认。",
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW + FEATURES */}
      <section className="border-t border-border/60 bg-surface py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="font-mono text-xs uppercase tracking-widest text-emerald">// {t(bi("Overview", "产品概述"))}</div>
              <h2 className="mt-2 font-display text-2xl font-bold">{t(bi("Detailed Description", "详细介绍"))}</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{product.descEn}</p>
              <p className="mt-3 leading-relaxed text-muted-foreground">{product.descZh}</p>

              <h3 className="mt-10 font-display text-xl font-bold">{t(bi("Key Features", "核心特点"))}</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {product.features.map((f, i) => (
                  <div key={i} className="glass rounded-lg p-4">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-cyan">0{i + 1}</div>
                    <div className="mt-1 font-display text-sm font-semibold">{f.en}</div>
                    <div className="text-xs text-muted-foreground">{f.zh}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* SPECS */}
            <div className="lg:col-span-5">
              <div className="font-mono text-xs uppercase tracking-widest text-emerald">// {t(bi("Specifications", "技术规格"))}</div>
              <h2 className="mt-2 font-display text-2xl font-bold">{t(bi("Technical Specs", "技术参数"))}</h2>
              <div className="mt-4 overflow-hidden rounded-xl border border-border/60">
                <table className="w-full text-sm">
                  <tbody>
                    {product.specs.map((s, i) => (
                      <tr key={i} className="border-b border-border/40 last:border-0">
                        <td className="bg-surface-elevated/40 px-4 py-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                          {s.label.en} · {s.label.zh}
                        </td>
                        <td className="px-4 py-3 font-medium text-foreground">{s.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APPLICATIONS */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="font-mono text-xs uppercase tracking-widest text-emerald">// {t(bi("Applications", "应用场景"))}</div>
          <h2 className="mt-2 font-display text-2xl font-bold">{t(bi("Suitable for", "适用范围"))}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {product.applicationsEn.map((a, i) => (
              <div key={i} className="rounded-xl border border-border/60 bg-card p-6 transition hover:border-emerald/40">
                <div className="font-display text-3xl font-bold text-gradient">0{i + 1}</div>
                <div className="mt-3 font-display text-sm font-semibold">{a}</div>
                <div className="text-xs text-muted-foreground">{product.applicationsZh[i]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="border-t border-border/60 bg-surface py-16">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-emerald">// {t(bi("Related", "相关产品"))}</div>
                <h2 className="mt-2 font-display text-2xl font-bold">{t(bi("In the same category", "同类产品"))}</h2>
              </div>
              <Link to="/products" search={{ category: product.category } as never} className="text-xs text-muted-foreground hover:text-emerald">
                {t(bi("View all", "查看全部"))} <ArrowRight className="ml-1 inline h-3 w-3" />
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => <ProductCard key={p.id} p={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* INQUIRY CTA */}
      <section className="px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-2xl border border-emerald/30 bg-gradient-to-br from-surface-elevated to-surface p-10 text-center">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            {t(bi("Interested in this product?", "对该产品感兴趣？"))}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {t(bi("Send us an inquiry with your quantity and shipping requirements.", "请提交您的数量与发货要求询盘。"))}
          </p>
          <Link to="/contact" search={{ product: product.slug } as never} className="btn-primary mt-6">
            {t(bi("Send Inquiry", "提交询盘"))} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
