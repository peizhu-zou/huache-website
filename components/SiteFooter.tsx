import Link from "next/link";

const footerGroups = [
  {
    title: "产品中心",
    links: [
      ["电机", "/products/motors"],
      ["电机控制器", "/products/motor-controllers"],
      ["增程器", "/products/range-extenders"],
      ["电源与配电", "/products/power-systems"],
    ],
  },
  {
    title: "解决方案",
    links: [
      ["任务解决方案", "/solutions#solutions"],
      ["行业应用", "/solutions#industries"],
    ],
  },
  {
    title: "服务与支持",
    links: [
      ["工程流程", "/support#process"],
      ["服务范围", "/support#services"],
      ["交付资料", "/support#deliverables"],
    ],
  },
  {
    title: "公司",
    links: [
      ["关于我们", "/about"],
      ["核心研发能力", "/about#capabilities"],
      ["联系我们", "/contact"],
    ],
  },
] as const;

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <div className="footer-brand">华车时代</div>
          <p>由北京理工大学相关科研团队孵化，为特种装备提供自主可控的动力、配电、底盘与核心控制系统。</p>
        </div>
        <div className="footer-groups">
          {footerGroups.map((group) => (
            <div className="footer-group" key={group.title}>
              <strong>{group.title}</strong>
              {group.links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
            </div>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 北京华车时代科技有限公司</span>
        <span>科研转化 · 自主可控 · 工程交付</span>
      </div>
    </footer>
  );
}
