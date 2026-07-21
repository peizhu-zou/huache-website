import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import ContactBand from "@/components/ContactBand";
import { engineeringSteps, supportServices } from "@/lib/content";

export const metadata: Metadata = { title: "服务与支持" };

export default function SupportPage() {
  return <main>
    <PageHero eyebrow="SERVICE & SUPPORT" title="把研发过程做清楚，把交付资料留完整。" copy="我们以项目边界、阶段评审和测试记录管理定制研发，并围绕已交付系统提供持续技术支持。" />

    <nav className="container page-subnav" aria-label="服务与支持页面导航">
      <a href="#process">工程流程</a>
      <a href="#services">服务范围</a>
      <a href="#deliverables">交付资料</a>
    </nav>

    <section className="container content-section" id="process">
      <SectionTitle eyebrow="ENGINEERING PROCESS" title="工程流程" copy="每个阶段都有输入、输出、评审和验证记录，减少后期返工。" />
      <div className="engineering-timeline">
        {engineeringSteps.map(([index, title, copy], i) => <Reveal key={title} delay={i * 0.05}>
          <article><span>{index}</span><div><h2>{title}</h2><p>{copy}</p><small>{i === 0 ? "输入：任务与约束" : i === 4 ? "输出：可交付系统与资料" : "阶段评审与风险关闭"}</small></div></article>
        </Reveal>)}
      </div>
    </section>

    <section className="container content-section" id="services">
      <SectionTitle eyebrow="SERVICE SCOPE" title="服务范围" copy="不把所有工作都包装成标准套餐，而是根据项目需求明确责任边界。" />
      <div className="service-grid">
        {supportServices.map((item, index) => <Reveal key={item.title} delay={index * 0.04}>
          <article className="service-card glass-panel"><span>{String(index + 1).padStart(2, "0")}</span><h2>{item.title}</h2><p>{item.description}</p></article>
        </Reveal>)}
      </div>
    </section>

    <section className="container deliverables glass-panel" id="deliverables">
      <div><p className="eyebrow">DELIVERABLES</p><h2>交付的不只是样机。</h2><p className="deliverables-copy">具体交付项以项目合同和技术协议为准。</p></div>
      <ul><li>系统架构与接口文件</li><li>硬件图纸与生产资料</li><li>软件版本与标定参数</li><li>测试记录与问题清单</li><li>使用、维护与诊断说明</li></ul>
    </section>
    <ContactBand />
  </main>;
}
