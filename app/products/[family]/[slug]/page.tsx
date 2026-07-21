import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContactBand from "@/components/ContactBand";
import { allProducts, getProduct, getProductFamily } from "@/lib/product-catalog";

type ProductPageProps = { params: Promise<{ family: string; slug: string }> };

export function generateStaticParams() {
  return allProducts.map((product) => ({ family: product.familyId, slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { family, slug } = await params;
  const product = getProduct(family, slug);
  return {
    title: product?.title ?? "产品详情",
    description: product?.summary,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { family: familyId, slug } = await params;
  const product = getProduct(familyId, slug);
  const family = getProductFamily(familyId);
  if (!product || !family) notFound();

  const specs = [
    ["产品编号", product.id],
    ["产品型号", product.code],
    ["电压范围", product.voltage],
    ["功率范围", product.power],
    ["冷却方式", product.cooling],
    ["防护等级", product.protection],
    ["成熟度", product.maturity],
  ].filter((item): item is [string, string] => Boolean(item[1]));

  return (
    <main>
      <section className="container product-detail-hero">
        <nav className="product-breadcrumb" aria-label="面包屑">
          <Link href="/products">产品中心</Link><span>›</span>
          <Link href={`/products/${family.id}`}>{family.label}</Link><span>›</span>
          <strong>{product.title}</strong>
        </nav>
        <div className="product-detail-grid">
          <div className="product-detail-copy">
            <p className="eyebrow">{product.nameEn}</p>
            <h1>{product.title}</h1>
            <p>{product.summary}</p>
            <div className="hero-actions">
              <Link className="primary-button" href="/contact#project-inquiry">咨询该产品</Link>
              <Link className="text-button" href={`/products/${family.id}`}>返回{family.label} <span>→</span></Link>
            </div>
          </div>
          <div className="product-detail-visual glass-panel" aria-label={`${product.title}产品示意`}>
            <span>{family.nameEn}</span>
            <div className="product-blueprint" aria-hidden="true"><i /><i /><i /></div>
            <strong>{product.code}</strong>
            <small>产品图片 / 三维模型可在此替换</small>
          </div>
        </div>
      </section>

      <section className="container product-spec-section">
        <div className="product-spec-heading">
          <p className="eyebrow">TECHNICAL DATA</p>
          <h2>当前公开参数</h2>
          <p>以下参数来自现有产品资料。具体接口、外形和性能边界以最终技术协议为准。</p>
        </div>
        <dl className="product-spec-table glass-panel">
          {specs.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
        </dl>
      </section>

      <section className="container product-application-section">
        <div>
          <p className="eyebrow">APPLICATIONS</p>
          <h2>典型应用</h2>
        </div>
        <div className="product-application-list">
          {product.applications.map((application, index) => (
            <article key={application} className="glass-panel">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{application}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="container product-engineering-note glass-panel">
        <p className="eyebrow">ENGINEERING NOTE</p>
        <h2>产品可以单独交付，也可以进入完整系统。</h2>
        <p>华车时代可根据项目要求完成器件适配、控制软件、通信协议、参数标定、台架测试和整机联调。国产化工作以具体产品和项目边界为准，不作脱离验证条件的绝对承诺。</p>
      </section>

      <ContactBand />
    </main>
  );
}
