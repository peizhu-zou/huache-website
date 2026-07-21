import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContactBand from "@/components/ContactBand";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import { getProductFamily, productFamilies } from "@/lib/product-catalog";

type FamilyPageProps = { params: Promise<{ family: string }> };

export function generateStaticParams() {
  return productFamilies.map((family) => ({ family: family.id }));
}

export async function generateMetadata({ params }: FamilyPageProps): Promise<Metadata> {
  const { family: familyId } = await params;
  const family = getProductFamily(familyId);
  return { title: family ? `${family.label}产品` : "产品分类" };
}

export default async function ProductFamilyPage({ params }: FamilyPageProps) {
  const { family: familyId } = await params;
  const family = getProductFamily(familyId);
  if (!family) notFound();

  const productCount = family.groups.reduce((total, group) => total + group.products.length, 0);

  return (
    <main>
      <PageHero eyebrow={family.nameEn} title={family.label} copy={family.summary} />

      <nav className="container product-breadcrumb" aria-label="面包屑">
        <Link href="/products">产品中心</Link><span>›</span><strong>{family.label}</strong>
      </nav>

      <section className="container family-overview glass-panel">
        <div>
          <span>PRODUCT FAMILY</span>
          <h2>{family.label}</h2>
          <p>{family.summary}</p>
        </div>
        <dl>
          <div><dt>产品系列</dt><dd>{family.groups.length}</dd></div>
          <div><dt>公开产品</dt><dd>{productCount}</dd></div>
          <div><dt>开发方式</dt><dd>标准产品 / 项目定制</dd></div>
        </dl>
      </section>

      <section className="container content-section family-groups-section">
        <SectionTitle eyebrow="PRODUCT SERIES" title={`${family.label}产品系列`} />
        <div className="family-group-list">
          {family.groups.map((group, groupIndex) => (
            <Reveal key={group.id} delay={groupIndex * 0.04}>
              <article className="family-group-block" id={group.id}>
                <div className="family-group-heading">
                  <span>{String(groupIndex + 1).padStart(2, "0")}</span>
                  <div><h2>{group.label}</h2><p>{group.description}</p></div>
                </div>
                {group.products.length > 0 ? (
                  <div className="family-product-list">
                    {group.products.map((product) => (
                      <Link key={product.slug} href={`/products/${family.id}/${product.slug}`}>
                        <div>
                          <small>{product.code}</small>
                          <h3>{product.title}</h3>
                          <p>{product.summary}</p>
                        </div>
                        <dl>
                          {product.voltage && <div><dt>电压</dt><dd>{product.voltage}</dd></div>}
                          {product.power && <div><dt>功率</dt><dd>{product.power}</dd></div>}
                          <div><dt>成熟度</dt><dd>{product.maturity}</dd></div>
                        </dl>
                        <b>↗</b>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="family-empty-product glass-panel">
                    <strong>系列能力已建立，公开产品资料正在整理。</strong>
                    <p>可根据电压、功率、接口、结构和环境要求开展项目咨询。</p>
                    <Link href="/contact#project-inquiry">提交需求 →</Link>
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <ContactBand />
    </main>
  );
}
