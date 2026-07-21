import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import ContactBand from "@/components/ContactBand";
import PlatformMedia from "@/components/PlatformMedia";
import { platforms } from "@/lib/content";
import { allProducts, productFamilies } from "@/lib/product-catalog";

export const metadata: Metadata = { title: "产品中心" };

export default function ProductsPage() {
  const featuredProducts = allProducts.filter((product) => product.featured);

  return (
    <main>
      <PageHero
        eyebrow="PRODUCT CENTER"
        title="围绕电能生成、转换、分配与驱动，建立完整产品体系。"
        copy="六大产品族覆盖电机、电机控制器、增程器、电源系统、配电系统和智能底盘。产品可以独立交付，也可以按任务组合为完整系统。"
      />

      <nav className="container page-subnav" aria-label="产品中心页面导航">
        <a href="#families">六大产品族</a>
        <a href="#featured">重点产品</a>
        <a href="#platforms">系统集成平台</a>
      </nav>

      <section className="container product-flow-summary" aria-label="产品系统关系">
        {[
          ["01", "增程器", "生成电能"],
          ["02", "电源系统", "转换电能"],
          ["03", "配电系统", "分配电能"],
          ["04", "电机控制器", "控制功率"],
          ["05", "电机", "输出动力"],
          ["06", "智能底盘", "完成任务"],
        ].map(([index, title, copy]) => (
          <div key={title}>
            <span>{index}</span>
            <strong>{title}</strong>
            <small>{copy}</small>
          </div>
        ))}
      </section>

      <section className="container content-section" id="families">
        <SectionTitle
          eyebrow="PRODUCT FAMILIES"
          title="六大产品族"
          copy="导航按照客户查找产品的习惯组织；进入产品页面后，再展开系统组成、接口和工程能力。"
        />
        <div className="product-family-grid">
          {productFamilies.map((family, index) => {
            const count = family.groups.reduce((total, group) => total + group.products.length, 0);
            return (
              <Reveal key={family.id} delay={(index % 3) * 0.04}>
                <Link className="product-family-card glass-panel" href={`/products/${family.id}`}>
                  <div className="family-card-top">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <small>{family.nameEn}</small>
                  </div>
                  <h2>{family.label}</h2>
                  <p>{family.summary}</p>
                  <div className="family-series-list">
                    {family.groups.map((group) => <span key={group.id}>{group.label}</span>)}
                  </div>
                  <div className="family-card-bottom">
                    <span>{count > 0 ? `${count} 项公开产品` : "系列能力已建立"}</span>
                    <b>查看产品 →</b>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="container content-section" id="featured">
        <SectionTitle
          eyebrow="FEATURED PRODUCTS"
          title="重点产品"
          copy="以下产品参数来自当前产品资料。最终配置、接口和交付边界以项目技术协议为准。"
        />
        <div className="featured-product-grid">
          {featuredProducts.map((product, index) => (
            <Reveal key={product.slug} delay={(index % 3) * 0.04}>
              <Link className="featured-product-card glass-panel" href={`/products/${product.familyId}/${product.slug}`}>
                <div className="featured-product-heading">
                  <span>{product.familyLabel}</span>
                  <small>{product.code}</small>
                </div>
                <h2>{product.title}</h2>
                <p>{product.summary}</p>
                <dl>
                  {product.voltage && <div><dt>电压</dt><dd>{product.voltage}</dd></div>}
                  {product.power && <div><dt>功率</dt><dd>{product.power}</dd></div>}
                  {product.protection && <div><dt>防护</dt><dd>{product.protection}</dd></div>}
                </dl>
                <span className="product-card-link">查看产品详情 ↗</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container content-section" id="platforms">
        <SectionTitle
          eyebrow="SYSTEM INTEGRATION"
          title="产品进入系统，才真正完成任务。"
          copy="系统平台保留架构、接口、控制方法和工程验证经验，用于缩短定制产品的集成周期。"
        />
        <div className="platform-page-grid">
          {platforms.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <article className={`platform-feature glass-panel${item.media ? " has-media" : ""}`}>
                {item.media && <PlatformMedia media={item.media} />}
                <div className="platform-feature-body">
                  <span className="platform-code">{item.code}</span>
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                  <div className="chip-row">{item.metrics.map((metric) => <span key={metric}>{metric}</span>)}</div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <ContactBand />
    </main>
  );
}
