import Link from "next/link";

export default function NotFound() {
  return <main className="not-found container"><p className="eyebrow">404</p><h1>页面不存在。</h1><p>该页面可能已移动，或尚未建立。</p><Link className="primary-button" href="/">返回首页</Link></main>;
}
