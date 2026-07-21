"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { navItems } from "@/lib/content";
import { productFamilies } from "@/lib/product-catalog";

const CLOSE_DELAY = 220;

export default function SiteHeader() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeFamilyId, setActiveFamilyId] = useState(productFamilies[0].id);
  const [activeGroupId, setActiveGroupId] = useState(productFamilies[0].groups[0].id);

  const activeFamily = useMemo(
    () => productFamilies.find((family) => family.id === activeFamilyId) ?? productFamilies[0],
    [activeFamilyId],
  );
  const activeGroup = useMemo(
    () => activeFamily.groups.find((group) => group.id === activeGroupId) ?? activeFamily.groups[0],
    [activeFamily, activeGroupId],
  );

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openMega = () => {
    cancelClose();
    setMegaOpen(true);
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setMegaOpen(false), CLOSE_DELAY);
  };

  const activateFamily = (familyId: string) => {
    const family = productFamilies.find((item) => item.id === familyId);
    if (!family) return;
    setActiveFamilyId(family.id);
    setActiveGroupId(family.groups[0].id);
  };

  const closeMenus = () => {
    cancelClose();
    setMegaOpen(false);
    setMobileOpen(false);
    setMobileProductsOpen(false);
  };

  useEffect(() => closeMenus(), [pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) closeMenus();
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      cancelClose();
    };
  }, []);

  return (
    <header className="site-header" ref={headerRef}>
      <div className="nav-shell">
        <Link className="brand" href="/" aria-label="华车时代首页">
          <span className="brand-mark" aria-hidden="true">H</span>
          <span>华车时代</span>
        </Link>

        <nav className="desktop-nav" aria-label="主导航">
          <div className="product-nav-trigger" onMouseEnter={openMega} onMouseLeave={scheduleClose}>
            <Link
              className={pathname.startsWith("/products") ? "active" : ""}
              href="/products"
              aria-haspopup="true"
              aria-expanded={megaOpen}
              onFocus={openMega}
            >
              产品中心 <span className="nav-chevron" aria-hidden="true">⌄</span>
            </Link>
          </div>
          {navItems.filter((item) => item.href !== "/products").map((item) => (
            <Link key={item.href} className={pathname === item.href ? "active" : ""} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link className="nav-cta" href="/contact#project-inquiry">提交项目需求</Link>
        <button
          className="menu-button"
          type="button"
          aria-label={mobileOpen ? "关闭菜单" : "打开菜单"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>

      <div
        className={`product-mega-menu${megaOpen ? " is-open" : ""}`}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
        aria-hidden={!megaOpen}
      >
        <div className="mega-menu-head">
          <div>
            <span>PRODUCT CENTER</span>
            <strong>按产品族查找</strong>
          </div>
          <Link href="/products" onClick={closeMenus}>查看全部产品 <b>→</b></Link>
        </div>
        <div className="mega-menu-columns">
          <div className="mega-column mega-family-column" aria-label="产品大类">
            <p>产品大类</p>
            {productFamilies.map((family) => (
              <button
                type="button"
                key={family.id}
                className={family.id === activeFamily.id ? "active" : ""}
                onMouseEnter={() => activateFamily(family.id)}
                onFocus={() => activateFamily(family.id)}
                onClick={() => activateFamily(family.id)}
              >
                <span>{family.label}</span><b>›</b>
              </button>
            ))}
          </div>

          <div className="mega-column mega-group-column" aria-label={`${activeFamily.label}产品系列`}>
            <p>产品系列</p>
            <div className="mega-context">
              <span>{activeFamily.nameEn}</span>
              <strong>{activeFamily.label}</strong>
              <small>{activeFamily.summary}</small>
            </div>
            {activeFamily.groups.map((group) => (
              <button
                type="button"
                key={group.id}
                className={group.id === activeGroup.id ? "active" : ""}
                onMouseEnter={() => setActiveGroupId(group.id)}
                onFocus={() => setActiveGroupId(group.id)}
                onClick={() => setActiveGroupId(group.id)}
              >
                <span>{group.label}</span><b>›</b>
              </button>
            ))}
          </div>

          <div className="mega-column mega-product-column" aria-label={`${activeGroup.label}具体产品`}>
            <p>具体产品</p>
            <div className="mega-group-intro">
              <strong>{activeGroup.label}</strong>
              <span>{activeGroup.description}</span>
            </div>
            {activeGroup.products.length > 0 ? (
              <div className="mega-product-list">
                {activeGroup.products.map((product) => (
                  <Link
                    key={product.slug}
                    href={`/products/${activeFamily.id}/${product.slug}`}
                    onClick={closeMenus}
                  >
                    <span><small>{product.code}</small><strong>{product.title}</strong></span>
                    <b>↗</b>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="mega-empty-state">
                <span>该系列正在整理公开产品资料。</span>
                <Link href={`/products/${activeFamily.id}#${activeGroup.id}`} onClick={closeMenus}>
                  查看系列能力 →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <nav className={`mobile-nav${mobileOpen ? " is-open" : ""}`} aria-label="移动端主导航">
        <button
          type="button"
          className="mobile-products-toggle"
          aria-expanded={mobileProductsOpen}
          onClick={() => setMobileProductsOpen((value) => !value)}
        >
          <span>产品中心</span><b>{mobileProductsOpen ? "−" : "+"}</b>
        </button>
        {mobileProductsOpen && (
          <div className="mobile-product-tree">
            <Link className="mobile-all-products" href="/products">查看全部产品</Link>
            {productFamilies.map((family) => (
              <details key={family.id}>
                <summary>{family.label}</summary>
                <Link className="mobile-family-link" href={`/products/${family.id}`}>进入{family.label}</Link>
                {family.groups.map((group) => (
                  <div className="mobile-product-group" key={group.id}>
                    <strong>{group.label}</strong>
                    {group.products.map((product) => (
                      <Link key={product.slug} href={`/products/${family.id}/${product.slug}`}>{product.title}</Link>
                    ))}
                    {group.products.length === 0 && <span>产品资料整理中</span>}
                  </div>
                ))}
              </details>
            ))}
          </div>
        )}
        {navItems.filter((item) => item.href !== "/products").map((item) => (
          <Link key={item.href} className={pathname === item.href ? "active" : ""} href={item.href}>
            {item.label}
          </Link>
        ))}
        <Link className="mobile-project-link" href="/contact#project-inquiry">提交项目需求</Link>
      </nav>
    </header>
  );
}
