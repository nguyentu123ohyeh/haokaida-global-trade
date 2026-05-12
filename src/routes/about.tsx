import { createFileRoute } from "@tanstack/react-router";
import { Building2, Calendar, MapPin, User, Globe2, Boxes, Handshake, MessageCircle, Layers, Truck } from "lucide-react";
import { useI18n, bi } from "@/lib/i18n";
import aboutHero from "@/assets/about-hero.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About · 关于我们 — HAOKAIDA International Trade" },
      { name: "description", content: "About SHENZHEN HAOKAIDA INTERNATIONAL TRADE CO., LTD. — a Shenzhen-based international trading company." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useI18n();

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 -z-10">
          <img src={aboutHero} alt="" className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
        </div>
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
          <div className="font-mono text-xs uppercase tracking-widest text-emerald">// {t(bi("About Us", "关于我们"))}</div>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {t(bi(
              "About SHENZHEN HAOKAIDA INTERNATIONAL TRADE CO., LTD.",
              "关于深圳豪凯达国际贸易有限公司",
            ))}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t(bi(
              "An international trading company based in Shenzhen, China — focused on wholesale and import/export of mechanical equipment, metal products, instruments/meters, office equipment, and related categories.",
              "一家位于中国深圳的国际贸易公司，专注于机械设备、金属制品、仪器仪表、办公设备及相关类别的批发与进出口业务。",
            ))}
          </p>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-emerald">// {t(bi("Overview", "公司概述"))}</div>
              <h2 className="mt-3 font-display text-3xl font-bold">
                {t(bi("Practical international trade, from Shenzhen.", "源自深圳的务实国际贸易。"))}
              </h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                {t(bi(
                  "SHENZHEN HAOKAIDA INTERNATIONAL TRADE CO., LTD. operates as a wholesale and import/export trading company. Our work centers on practical product selection, reliable sourcing coordination, and clear communication with B2B buyers.",
                  "深圳豪凯达国际贸易有限公司是一家从事批发与进出口业务的贸易公司。我们专注于务实的产品选择、可靠的采购协调，以及与B2B买家的清晰沟通。",
                ))}
              </p>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {t(bi(
                  "We share only the company information that has been verified, and present our capabilities through what we actually do — sourcing, supply, and trade coordination across our four core product categories.",
                  "我们仅展示经过核实的公司信息，通过我们实际从事的工作——围绕四大核心产品类别的采购、供应与贸易协调——来呈现我们的能力。",
                ))}
              </p>
            </div>

            {/* Business Scope */}
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { icon: Boxes, en: "Mechanical Equipment", zh: "机械设备" },
                { icon: Layers, en: "Metal Products", zh: "金属制品" },
                { icon: Globe2, en: "Instruments / Meters", zh: "仪器仪表" },
                { icon: Building2, en: "Office Equipment", zh: "办公设备" },
                { icon: Truck, en: "Related Import/Export Categories", zh: "相关进出口产品类别" },
              ].map(({ icon: Icon, en, zh }, i) => (
                <div key={i} className="glass rounded-xl p-5">
                  <Icon className="h-6 w-6 text-emerald" />
                  <div className="mt-3 font-display text-sm font-semibold">{en}</div>
                  <div className="text-xs text-muted-foreground">{zh}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMPANY INFO TABLE */}
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="font-mono text-xs uppercase tracking-widest text-emerald">// {t(bi("Company Information", "公司信息"))}</div>
          <h2 className="mt-3 font-display text-3xl font-bold">
            {t(bi("Verified Company Profile", "经核实的公司信息"))}
          </h2>
          <div className="mt-8 overflow-hidden rounded-2xl border border-border/60 bg-card">
            {[
              { icon: Building2, label: bi("Company Name (CN)", "公司中文名称"), value: "深圳豪凯达国际贸易有限公司" },
              { icon: Building2, label: bi("Company Name (EN)", "公司英文名称"), value: "SHENZHEN HAOKAIDA INTERNATIONAL TRADE CO., LTD." },
              { icon: User, label: bi("Legal Representative", "法定代表人"), value: "LAM THI BICH HIEP" },
              { icon: Calendar, label: bi("Established Date", "成立日期"), value: "21 / 04 / 2022" },
              { icon: MapPin, label: bi("Address (CN)", "中文地址"), value: "深圳市宝安区松岗街道楼岗社区楼岗大道46号前进公社6栋2D" },
              { icon: MapPin, label: bi("Address (EN)", "英文地址"), value: "Room 2D, Building 6, Qianjin Gongshe, No. 46 Lougang Avenue, Lougang Community, Songgang Subdistrict, Bao'an District, Shenzhen, Guangdong, China" },
            ].map(({ icon: Icon, label, value }, i) => (
              <div key={i} className="grid items-start gap-4 border-b border-border/40 p-5 last:border-0 sm:grid-cols-[200px_1fr]">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-emerald">
                  <Icon className="h-3.5 w-3.5" /> {label.en} · {label.zh}
                </div>
                <div className="text-sm text-foreground">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-12">
            <div className="font-mono text-xs uppercase tracking-widest text-emerald">// {t(bi("Operating Philosophy", "经营理念"))}</div>
            <h2 className="mt-3 font-display text-3xl font-bold">{t(bi("How we work.", "我们的工作方式。"))}</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              ["Reliable Sourcing", "可靠采购"],
              ["Practical Product Selection", "实用产品选择"],
              ["Long-term B2B Cooperation", "长期B2B合作"],
              ["Wholesale Supply", "批发供应"],
              ["International Trade Coordination", "国际贸易协调"],
              ["Clear Communication", "清晰沟通"],
            ].map(([en, zh], i) => (
              <div key={en} className="glass rounded-xl p-6">
                <div className="font-mono text-[10px] uppercase tracking-widest text-cyan">0{i + 1}</div>
                <div className="mt-3 font-display text-base font-semibold">{en}</div>
                <div className="text-sm text-muted-foreground">{zh}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-12">
            <div className="font-mono text-xs uppercase tracking-widest text-emerald">// {t(bi("Brand Values", "品牌价值观"))}</div>
            <h2 className="mt-3 font-display text-3xl font-bold">{t(bi("What we stand for.", "我们的坚守。"))}</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {[
              { icon: Handshake, en: "Practical Trade", zh: "务实贸易" },
              { icon: Truck, en: "Reliable Supply", zh: "可靠供应" },
              { icon: MessageCircle, en: "Professional Communication", zh: "专业沟通" },
              { icon: Layers, en: "Multi-Category Capability", zh: "多品类能力" },
              { icon: Globe2, en: "Import / Export Orientation", zh: "进出口导向" },
            ].map(({ icon: Icon, en, zh }) => (
              <div key={en} className="rounded-xl border border-border/60 bg-card p-5 transition hover:border-emerald/40 hover:shadow-glow">
                <Icon className="h-6 w-6 text-emerald" />
                <div className="mt-3 font-display text-sm font-semibold">{en}</div>
                <div className="text-xs text-muted-foreground">{zh}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
