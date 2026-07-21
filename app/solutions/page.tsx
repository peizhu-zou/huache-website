import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import ContactBand from "@/components/ContactBand";
import { industries, solutions } from "@/lib/content";

export const metadata: Metadata = { title: "解决方案" };

export default function SolutionsPage() {
  return <main>
    <PageHero eyebrow="SOLUTIONS" title="先定义任务，再组织系统。" copy="解决方案按客户最终要完成的任务组织；行业应用则说明同一套能力如何适配不同工况。" />

    <nav className="container page-subnav" aria-label="解决方案页面导航">
      <a href="#solutions">任务解决方案</a>
      <a href="#industries">行业应用</a>
    </nav>

    <section className="container content-section" id="solutions">
      <SectionTitle eyebrow="WHAT TO BUILD" title="任务解决方案" copy="先明确设备要完成什么、在什么环境下运行，再确定动力、控制、底盘和产品组合。" />
      <div className="detail-list">
        {solutions.map((item, index) => <Reveal key={item.title} delay={index * 0.05}>
          <article className="detail-card glass-panel">
            <div className="detail-heading"><span>{item.index}</span><div><h2>{item.title}</h2><p>{item.summary}</p></div></div>
            <ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul>
          </article>
        </Reveal>)}
      </div>
    </section>

    <section className="container content-section" id="industries">
      <SectionTitle eyebrow="INDUSTRIES" title="行业应用" copy="应用不同，工程原则相同：明确工况、识别风险、控制能量、管理故障。" />
      <div className="industry-page-grid">
        {industries.map(([title, copy], index) => <Reveal key={title} delay={(index % 4) * 0.04}>
          <article className="industry-feature glass-panel"><span>{String(index + 1).padStart(2, "0")}</span><h2>{title}</h2><p>{copy}</p><div className="industry-line" /></article>
        </Reveal>)}
      </div>
    </section>
    <ContactBand />
  </main>;
}
