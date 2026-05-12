import { Link } from "@tanstack/react-router";
import { useI18n, bi } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="relative mt-24 border-t border-border/60 bg-surface/40">
      <div className="grid-bg absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="font-display text-lg font-bold text-metallic">
              SHENZHEN HAOKAIDA INTERNATIONAL TRADE CO., LTD.
            </div>
            <div className="mt-1 text-sm text-muted-foreground">深圳豪凯达国际贸易有限公司</div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              {t(bi(
                "International trading company based in Shenzhen, focused on wholesale and import/export of industrial and business equipment.",
                "位于中国深圳的国际贸易公司，专注于工业及商务设备的批发与进出口业务。",
              ))}
            </p>
            <div className="mt-6 space-y-4 text-xs text-muted-foreground">
              <div>
                <div className="font-mono uppercase tracking-wider text-emerald">
                  {t(bi("Email", "电子邮箱"))}
                </div>
                <a
                  href="mailto:info@shenzhenhaokaidaintl.com"
                  className="mt-1 block break-all transition hover:text-emerald"
                >
                  info@shenzhenhaokaidaintl.com
                </a>
              </div>

              <div>
                <div className="font-mono uppercase tracking-wider text-emerald">
                  {t(bi("Address", "地址"))}
                </div>
                <div className="mt-1">
                  Room 2D, Building 6, Qianjin Gongshe, No. 46 Lougang Avenue, Lougang Community, Songgang Subdistrict, Bao'an District, Shenzhen, Guangdong, China
                </div>
                <div className="mt-1">
                  深圳市宝安区松岗街道楼岗社区楼岗大道46号前进公社6栋2D
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-emerald">
              {t(bi("Categories", "产品类别"))}
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/products" search={{ category: "mechanical" } as never} className="hover:text-foreground">{t(bi("Mechanical Equipment", "机械设备"))}</Link></li>
              <li><Link to="/products" search={{ category: "metal" } as never} className="hover:text-foreground">{t(bi("Metal Products", "金属制品"))}</Link></li>
              <li><Link to="/products" search={{ category: "instruments" } as never} className="hover:text-foreground">{t(bi("Instruments / Meters", "仪器仪表"))}</Link></li>
              <li><Link to="/products" search={{ category: "office" } as never} className="hover:text-foreground">{t(bi("Office Equipment", "办公设备"))}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-emerald">
              {t(bi("Quick Links", "快速链接"))}
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground">{t(bi("Home", "首页"))}</Link></li>
              <li><Link to="/products" className="hover:text-foreground">{t(bi("Products", "产品中心"))}</Link></li>
              <li><Link to="/about" className="hover:text-foreground">{t(bi("About Us", "关于我们"))}</Link></li>
              <li><Link to="/contact" className="hover:text-foreground">{t(bi("Contact Us", "联系我们"))}</Link></li>
            </ul>
            <Link to="/contact" className="btn-primary mt-6 w-full text-xs">
              {t(bi("Send Inquiry", "提交询盘"))}
            </Link>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} SHENZHEN HAOKAIDA INTERNATIONAL TRADE CO., LTD.</div>
          <div className="font-mono uppercase tracking-wider">Shenzhen · 中国深圳</div>
        </div>
      </div>
    </footer>
  );
}
