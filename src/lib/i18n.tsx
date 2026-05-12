import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "zh";

type Bi = { en: string; zh: string };

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (b: Bi) => string }>({
  lang: "en",
  setLang: () => {},
  t: (b) => b.en,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? (localStorage.getItem("lang") as Lang | null) : null;
    if (stored === "en" || stored === "zh") setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", l);
      document.documentElement.lang = l === "zh" ? "zh-CN" : "en";
    }
  };

  const t = (b: Bi) => (lang === "zh" ? b.zh : b.en);

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);

export const bi = (en: string, zh: string): Bi => ({ en, zh });
