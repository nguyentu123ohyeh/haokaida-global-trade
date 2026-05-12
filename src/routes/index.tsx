import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Globe2, Package, Boxes, FileSearch, Truck, ShieldCheck, Handshake, Sparkles } from "lucide-react";
import { useI18n, bi } from "@/lib/i18n";
import { CATEGORIES, PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HAOKAIDA International Trade · 深圳豪凯达国际贸易" },
      { name: "description", content: "Global trading solutions for industrial, mechanical and business equipment from Shenzhen." },
    ],
  }),
  component: HomePage,
});

const FLOATING_CHIPS = [
  bi("Mechanical Equipment", "机械设备"),
  bi("Metal Products", "金属制品"),
  bi("Instruments & Meters", "仪器仪表"),
  bi("Office Equipment", "办公设备"),
  bi("Import / Export Trade", "进出口贸易"),
];

function HomePage() {
  const { t, lang } = useI18n();
  const featured = PRODUCTS.slice(0, 6);

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={heroImg} alt="" className="h-full w-full object-cover opacity-50" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
          <div className="grid-bg absolute inset-0 opacity-40" />
        </div>
        <div className="mx-auto max-w-7xl px-5 pb-32 pt-24 lg:px-8 lg:pt-36">
          <div className="max-w-3xl animate-fade-up">
            <div className="chip mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-glow" />
              <span className="font-mono uppercase tracking-widest">Shenzhen · 中国深圳 · Est. 2022</span>
            </div>
            <h1 className="font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              {lang === "zh" ? (
                <>
                  <span className="text-metallic">工业、机械及商务设备</span>
                  <br />
                  <span className="text-gradient">的全球贸易解决方案</span>
                </>
              ) : (
                <>
                  <span className="text-metallic">Global Trading Solutions for</span>
                  <br />
                  <span className="text-gradient">Industrial, Mechanical & Business Equipment</span>
                </>
              )}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t(bi(
                "Professional wholesale and import/export product sourcing for mechanical equipment, metal products, instruments/meters, office equipment, and related product categories.",
                "为机械设备、金属制品、仪器仪表、办公设备及相关产品类别提供专业的批发与进出口产品采购支持。",
              ))}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/products" className="btn-primary">
                {t(bi("Explore Products", "浏览产品"))} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="btn-outline">
                {t(bi("Contact Us", "联系我们"))}
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-2">
              {FLOATING_CHIPS.map((c, i) => (
                <span
                  key={i}
                  className="chip chip-active animate-float"
                  style={{ animationDelay: `${i * 0.4}s` }}
                >
                  <Sparkles className="h-3 w-3" />
                  {t(c)}
                </span>
              ))}
            </div>
          </div>

          {/* Floating data block */}
          <div className="pointer-events-none absolute right-8 top-32 hidden w-72 rounded-xl glass p-5 lg:block animate-float">
            <div className="font-mono text-[10px] uppercase tracking-widest text-emerald">// Live Catalog</div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <div className="font-display text-3xl font-bold text-metallic">28</div>
                <div className="text-[11px] text-muted-foreground">{t(bi("Active SKUs", "在售商品"))}</div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-metallic">04</div>
                <div className="text-[11px] text-muted-foreground">{t(bi("Categories", "产品类别"))}</div>
              </div>
            </div>
            <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-surface">
              <div className="h-full w-3/4 shimmer rounded-full bg-emerald/30" />
            </div>
          </div>
        </div>
        <div className="diagonal-divider" />
      </section>

      {/* BRAND IDENTITY */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="font-mono text-xs uppercase tracking-widest text-emerald">// 01 — {t(bi("Brand Identity", "品牌定位"))}</div>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">
                {t(bi("A Shenzhen-based international trading partner.", "深圳本地的国际贸易合作伙伴。"))}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                {t(bi(
                  "SHENZHEN HAOKAIDA INTERNATIONAL TRADE CO., LTD. is an international trading company based in Shenzhen, China, focusing on wholesale and import/export business for mechanical equipment, metal products, instruments/meters, office equipment, and related product categories.",
                  "深圳豪凯达国际贸易有限公司是一家位于中国深圳的国际贸易公司，主要从事机械设备、金属制品、仪器仪表、办公设备及相关产品类别的批发与进出口贸易业务。",
                ))}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:col-span-7">
              {[
                { icon: Globe2, en: "Global Sourcing", zh: "全球采购" },
                { icon: Package, en: "Product Supply", zh: "产品供应" },
                { icon: Boxes, en: "Wholesale Trading", zh: "批发贸易" },
                { icon: Truck, en: "Import & Export Support", zh: "进出口支持" },
              ].map(({ icon: Icon, en, zh }, i) => (
                <div key={i} className="group glass relative overflow-hidden rounded-xl p-6 transition-all hover:border-emerald/40">
                  <Icon className="h-7 w-7 text-emerald transition-transform group-hover:scale-110" />
                  <div className="mt-4 font-display text-base font-semibold">{en}</div>
                  <div className="text-sm text-muted-foreground">{zh}</div>
                  <div className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-emerald/10 blur-3xl transition-all group-hover:bg-emerald/30" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY GRID */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-12 flex items-end justify-between gap-6">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-emerald">// 02 — {t(bi("Product Categories", "产品类别"))}</div>
              <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
                {t(bi("Four core categories.", "四大核心产品类别。"))}
              </h2>
            </div>
            <Link to="/products" className="hidden text-sm text-muted-foreground hover:text-emerald sm:inline-flex items-center gap-1">
              {t(bi("All Products", "全部产品"))} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((c, i) => (
              <Link
                key={c.key}
                to="/products"
                search={{ category: c.key } as never}
                className={`group relative overflow-hidden rounded-2xl border border-border/60 bg-card transition-all hover:border-emerald/50 hover:shadow-glow ${i % 2 === 0 ? "lg:translate-y-4" : ""}`}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.en}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-cyan">0{i + 1}</div>
                  <div className="mt-2 font-display text-lg font-bold">{c.en}</div>
                  <div className="text-sm text-muted-foreground">{c.zh}</div>
                  <div className="mt-3 inline-flex items-center gap-1 text-xs text-emerald opacity-0 transition-all group-hover:opacity-100">
                    {t(bi("View products", "查看产品"))} <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TRADE CAPABILITY TIMELINE */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-16 max-w-2xl">
            <div className="font-mono text-xs uppercase tracking-widest text-emerald">// 03 — {t(bi("Trade Capability", "贸易能力"))}</div>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              {t(bi("End-to-end international trade workflow.", "端到端的国际贸易工作流程。"))}
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-emerald/40 to-transparent lg:block" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              {[
                ["Sourcing", "采购"],
                ["Product Selection", "产品选择"],
                ["Wholesale Supply", "批发供应"],
                ["Quality Review", "质量审核"],
                ["Export Preparation", "出口准备"],
                ["Documentation", "文件协调"],
                ["B2B Cooperation", "B2B合作"],
              ].map(([en, zh], i) => (
                <div key={en} className="relative">
                  <div className="relative z-10 mx-auto grid h-16 w-16 place-items-center rounded-full glass-strong border-glow">
                    <span className="font-mono text-sm font-bold text-emerald">0{i + 1}</span>
                  </div>
                  <div className="mt-4 text-center">
                    <div className="font-display text-sm font-semibold">{en}</div>
                    <div className="text-xs text-muted-foreground">{zh}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-12 flex items-end justify-between gap-6">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-emerald">// 04 — {t(bi("Featured", "精选产品"))}</div>
              <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
                {t(bi("Selected from our catalog.", "目录精选产品。"))}
              </h2>
            </div>
            <Link to="/products" className="btn-outline text-xs">
              {t(bi("All 28 Products", "全部 28 件"))}
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        </div>
      </section>

      {/* COMPANY CREDIBILITY */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="font-mono text-xs uppercase tracking-widest text-emerald">// 05 — {t(bi("Company Profile", "公司信息"))}</div>
              <h2 className="mt-3 font-display text-3xl font-bold">
                {t(bi("Verified company. Clear information.", "正式公司，信息清晰。"))}
              </h2>
              <p className="mt-5 text-muted-foreground">
                {t(bi(
                  "We share only verified company information. No invented credentials, no exaggerated numbers.",
                  "我们仅展示经核实的公司信息，不编造资质，不夸大数据。",
                ))}
              </p>
              <Link to="/about" className="btn-outline mt-6 text-xs">
                {t(bi("More About Us", "了解更多"))} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="glass-strong rounded-xl p-8 lg:col-span-7">
              <dl className="grid gap-5 sm:grid-cols-2">
                <Info label={bi("Company Name (EN)", "公司英文名称")} value="SHENZHEN HAOKAIDA INTERNATIONAL TRADE CO., LTD." />
                <Info label={bi("Company Name (CN)", "公司中文名称")} value="深圳豪凯达国际贸易有限公司" />
                <Info label={bi("Legal Representative", "法定代表人")} value="LAM THI BICH HIEP" />
                <Info label={bi("Established", "成立日期")} value="21 / 04 / 2022" />
                <Info wide label={bi("Address (EN)", "英文地址")} value="Room 2D, Building 6, Qianjin Gongshe, No. 46 Lougang Avenue, Lougang Community, Songgang Subdistrict, Bao'an District, Shenzhen, Guangdong, China" />
                <Info wide label={bi("Address (CN)", "中文地址")} value="深圳市宝安区松岗街道楼岗社区楼岗大道46号前进公社6栋2D" />
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { v: "04", en: "Core Categories", zh: "核心产品类别" },
              { v: "B2B", en: "Trading Focus", zh: "专注B2B贸易" },
              { v: "SZ", en: "Shenzhen Operation", zh: "深圳本地运营" },
              { v: "I/E", en: "Import & Export", zh: "进出口产品支持" },
            ].map((s) => (
              <div key={s.en} className="bg-card p-8">
                <div className="font-display text-4xl font-bold text-gradient">{s.v}</div>
                <div className="mt-3 font-display text-sm font-semibold">{s.en}</div>
                <div className="text-xs text-muted-foreground">{s.zh}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-12">
            <div className="font-mono text-xs uppercase tracking-widest text-emerald">// 06 — {t(bi("Why Choose Us", "为何选择我们"))}</div>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              {t(bi("Practical advantages for B2B buyers.", "面向B2B买家的实际优势。"))}
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Boxes, en: "Broad product sourcing capability", zh: "多品类产品采购能力" },
              { icon: Handshake, en: "Suitable for wholesale buyers", zh: "适合批发采购客户" },
              { icon: ShieldCheck, en: "Clear company information", zh: "清晰的公司信息" },
              { icon: Truck, en: "Import / export oriented operation", zh: "面向进出口业务" },
              { icon: FileSearch, en: "Responsive inquiry handling", zh: "快速响应询盘" },
              { icon: Globe2, en: "Multi-category trading support", zh: "多品类贸易支持" },
            ].map(({ icon: Icon, en, zh }) => (
              <div key={en} className="glass rounded-xl p-6 transition hover:border-emerald/40 hover:shadow-glow">
                <Icon className="h-6 w-6 text-cyan" />
                <div className="mt-4 font-display text-base font-semibold">{en}</div>
                <div className="text-sm text-muted-foreground">{zh}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-emerald/30 bg-gradient-to-br from-surface-elevated via-surface to-background p-10 lg:p-16 relative">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-emerald/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-cyan/20 blur-3xl" />
          <div className="relative max-w-2xl">
            <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
              {t(bi("Looking for reliable wholesale product sourcing?", "正在寻找可靠的批发产品采购支持？"))}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {t(bi(
                "Tell us what you need. We'll respond with practical sourcing options.",
                "告诉我们您的需求，我们将提供切实可行的采购方案。",
              ))}
            </p>
            <Link to="/contact" className="btn-primary mt-8">
              {t(bi("Send an Inquiry", "提交询盘"))} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Info({ label, value, wide }: { label: { en: string; zh: string }; value: string; wide?: boolean }) {
  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <dt className="font-mono text-[10px] uppercase tracking-widest text-emerald">
        {label.en} · {label.zh}
      </dt>
      <dd className="mt-1.5 text-sm leading-relaxed text-foreground">{value}</dd>
    </div>
  );
}
