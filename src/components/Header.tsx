import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Languages } from "lucide-react";
import { useI18n, bi } from "@/lib/i18n";

const NAV = [
  { to: "/", label: bi("Home", "首页") },
  { to: "/products", label: bi("Products", "产品中心") },
  { to: "/about", label: bi("About Us", "关于我们") },
  { to: "/contact", label: bi("Contact Us", "联系我们") },
] as const;

export function Header() {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-strong border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link to="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <div className="relative h-9 w-9 rounded-md border border-emerald/40 bg-gradient-to-br from-emerald/30 to-cyan/20">
            <div className="absolute inset-0 m-auto h-2 w-2 rounded-full bg-emerald shadow-glow" />
            <div className="absolute inset-1 rounded border border-cyan/30" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-[13px] font-bold tracking-wide text-foreground">HAOKAIDA</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Int'l Trade · 国际贸易
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {t(item.label)}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gradient-to-r from-emerald to-cyan transition-all group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center rounded-full border border-border/60 bg-surface/60 p-0.5 sm:flex">
            <Languages className="ml-2 h-3.5 w-3.5 text-muted-foreground" />
            <button
              onClick={() => setLang("en")}
              className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${lang === "en" ? "bg-emerald/20 text-emerald" : "text-muted-foreground"}`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("zh")}
              className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${lang === "zh" ? "bg-emerald/20 text-emerald" : "text-muted-foreground"}`}
            >
              中文
            </button>
          </div>
          <Link to="/contact" className="btn-primary hidden text-xs lg:inline-flex">
            {t(bi("Send Inquiry", "提交询盘"))}
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            className="rounded-md border border-border/60 p-2 lg:hidden"
            aria-label="menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background/95 px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm font-medium text-muted-foreground"
                activeProps={{ className: "text-emerald" }}
                onClick={() => setOpen(false)}
              >
                {t(item.label)}
              </Link>
            ))}
            <div className="flex items-center gap-2 pt-2">
              <button onClick={() => setLang("en")} className={`chip ${lang === "en" ? "chip-active" : ""}`}>EN</button>
              <button onClick={() => setLang("zh")} className={`chip ${lang === "zh" ? "chip-active" : ""}`}>中文</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
