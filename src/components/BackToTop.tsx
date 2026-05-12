import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [v, setV] = useState(false);
  useEffect(() => {
    const onScroll = () => setV(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!v) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full border border-emerald/40 bg-surface-elevated/80 text-emerald backdrop-blur transition hover:scale-110 hover:shadow-glow"
      aria-label="Back to top"
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}
