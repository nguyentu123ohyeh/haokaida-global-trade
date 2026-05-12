import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Building2, Send, CheckCircle2, Mail } from "lucide-react";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useI18n, bi } from "@/lib/i18n";
import { findProduct } from "@/lib/products";

const searchSchema = z.object({
  product: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/contact")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Contact · 联系我们 — HAOKAIDA" },
      { name: "description", content: "Send your product inquiry or sourcing request to SHENZHEN HAOKAIDA INTERNATIONAL TRADE CO., LTD." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useI18n();
  const sp = Route.useSearch();
  const presetProduct = sp.product ? findProduct(sp.product) : undefined;
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <>
      <section className="relative border-b border-border/60 bg-surface py-20">
        <div className="grid-bg absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <div className="font-mono text-xs uppercase tracking-widest text-emerald">// {t(bi("Contact", "联系"))}</div>
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
            <span className="text-metallic">Contact Us</span> · <span className="text-gradient">联系我们</span>
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            {t(bi(
              "Send your product inquiry or sourcing request to SHENZHEN HAOKAIDA INTERNATIONAL TRADE CO., LTD.",
              "向深圳豪凯达国际贸易有限公司提交您的产品询盘或采购需求。",
            ))}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            {/* FORM */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-border/60 bg-card p-6 lg:p-10">
                <h2 className="font-display text-2xl font-bold">{t(bi("Inquiry Form", "询盘表单"))}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t(bi("All fields with * are required.", "带 * 的字段为必填项。"))}
                </p>

                {submitted && (
                  <div className="mt-6 flex items-center gap-3 rounded-md border border-emerald/40 bg-emerald/10 p-4 text-sm text-emerald">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                    {t(bi("Thank you. Your inquiry has been received.", "感谢您！我们已收到您的询盘。"))}
                  </div>
                )}

                <form onSubmit={onSubmit} className="mt-6 grid gap-5 sm:grid-cols-2">
                  <Field label={bi("Full Name", "姓名")} required name="name" />
                  <Field label={bi("Company Name", "公司名称")} name="company" />
                  <Field label={bi("Email Address", "电子邮箱")} type="email" required name="email" />
                  <Field label={bi("Phone Number", "电话号码")} name="phone" />
                  <Field label={bi("Country / Region", "国家或地区")} name="country" />
                  <Field
                    label={bi("Product Interest", "感兴趣的产品")}
                    name="product"
                    defaultValue={presetProduct ? `${presetProduct.nameEn} · ${presetProduct.nameZh}` : ""}
                  />
                  <Field label={bi("Estimated Quantity", "预计数量")} name="qty" />
                  <div className="sm:col-span-2">
                    <Label label={bi("Message", "留言内容")} required />
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder={t(bi("Tell us about your sourcing request...", "请描述您的采购需求..."))}
                      className="mt-1.5 w-full rounded-md border border-border/60 bg-background/60 px-3 py-2.5 text-sm outline-none transition focus:border-emerald/60 focus:shadow-glow"
                    />
                  </div>
                  <button type="submit" className="btn-primary sm:col-span-2 justify-center">
                    <Send className="h-4 w-4" /> {t(bi("Submit Inquiry", "提交询盘"))}
                  </button>
                </form>
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="space-y-5 lg:col-span-5">
              <div className="rounded-2xl border border-border/60 bg-card p-6">
                <Building2 className="h-6 w-6 text-emerald" />
                <h3 className="mt-3 font-display text-lg font-bold">SHENZHEN HAOKAIDA INTERNATIONAL TRADE CO., LTD.</h3>
                <p className="text-sm text-muted-foreground">深圳豪凯达国际贸易有限公司</p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-card p-6">
                <Mail className="h-6 w-6 text-emerald" />
                <h3 className="mt-3 font-mono text-[10px] uppercase tracking-widest text-emerald">
                  {t(bi("Email", "电子邮箱"))}
                </h3>
                <a
                  href="mailto:info@shenzhenhaokaidaintl.com"
                  className="mt-1 block break-all text-sm leading-relaxed text-foreground transition hover:text-emerald"
                >
                  info@shenzhenhaokaidaintl.com
                </a>
              </div>
              <div className="rounded-2xl border border-border/60 bg-card p-6">
                <MapPin className="h-6 w-6 text-cyan" />
                <h3 className="mt-3 font-mono text-[10px] uppercase tracking-widest text-emerald">
                  {t(bi("Address (EN)", "英文地址"))}
                </h3>
                <p className="mt-1 text-sm leading-relaxed">
                  Room 2D, Building 6, Qianjin Gongshe, No. 46 Lougang Avenue, Lougang Community, Songgang Subdistrict, Bao'an District, Shenzhen, Guangdong, China
                </p>
                <h3 className="mt-4 font-mono text-[10px] uppercase tracking-widest text-emerald">
                  {t(bi("Address (CN)", "中文地址"))}
                </h3>
                <p className="mt-1 text-sm leading-relaxed">
                  深圳市宝安区松岗街道楼岗社区楼岗大道46号前进公社6栋2D
                </p>
              </div>

              {/* Map visual */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/60 bg-surface">
                <div className="grid-bg absolute inset-0 opacity-50" />
                <div className="absolute inset-0 bg-gradient-radial from-emerald/20 via-transparent to-transparent" />
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300">
                  <path d="M0 180 Q100 140 200 160 T400 130" stroke="oklch(0.74 0.16 165 / 0.3)" strokeWidth="1" fill="none" />
                  <path d="M0 220 Q120 180 240 200 T400 170" stroke="oklch(0.80 0.16 205 / 0.3)" strokeWidth="1" fill="none" />
                  <circle cx="240" cy="160" r="6" fill="oklch(0.74 0.16 165)" className="animate-pulse" />
                  <circle cx="240" cy="160" r="14" fill="none" stroke="oklch(0.74 0.16 165 / 0.4)" strokeWidth="1" />
                  <circle cx="240" cy="160" r="22" fill="none" stroke="oklch(0.74 0.16 165 / 0.2)" strokeWidth="1" />
                </svg>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-emerald">Location</div>
                    <div className="font-display text-sm font-bold">Bao'an District, Shenzhen</div>
                    <div className="text-xs text-muted-foreground">宝安区, 深圳</div>
                  </div>
                  <span className="chip chip-active">22.78°N · 113.92°E</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-16 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-2xl border border-emerald/30 bg-gradient-to-br from-surface-elevated to-surface p-10 text-center">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            {t(bi("Looking for a specific product not listed in our catalog?", "如果您正在寻找目录中未列出的特定产品？"))}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {t(bi("Send us your sourcing request — we'll respond with options.", "欢迎提交您的采购需求，我们将为您提供方案。"))}
          </p>
        </div>
      </section>
    </>
  );
}

function Label({ label, required }: { label: { en: string; zh: string }; required?: boolean }) {
  return (
    <label className="font-mono text-[10px] uppercase tracking-widest text-emerald">
      {label.en} · {label.zh} {required && <span className="text-cyan">*</span>}
    </label>
  );
}

function Field({ label, required, name, type = "text", defaultValue }: {
  label: { en: string; zh: string };
  required?: boolean;
  name: string;
  type?: string;
  defaultValue?: string;
}) {
  return (
    <div>
      <Label label={label} required={required} />
      <input
        type={type}
        name={name}
        required={required}
        defaultValue={defaultValue}
        className="mt-1.5 w-full rounded-md border border-border/60 bg-background/60 px-3 py-2.5 text-sm outline-none transition focus:border-emerald/60 focus:shadow-glow"
      />
    </div>
  );
}
