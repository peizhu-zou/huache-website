import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import ContactBand from "@/components/ContactBand";
import { technologies } from "@/lib/content";

export const metadata: Metadata = { title: "关于我们" };

const technologyDetail = [
  ["需求与边界", "任务剖面、功率平衡、接口定义、故障策略"],
  ["能量与驱动", "发电、储能、配电、逆变、电机与热管理"],
  ["实时控制", "驱动层、通信层、应用层与诊断服务"],
  ["车辆运动", "纵向、横向、差速、履带与执行器协调"],
  ["器件与平台", "国产器件选型、替代验证、底层平台适配与供应保障"],
  ["验证与交付", "SIL/HIL、台架、样车、工况与生产一致性"],
] as const;

export default function AboutPage() {
  return <main>
    <PageHero eyebrow="ABOUT HUACHE" title="源自高校科研，面向工程交付。" copy="华车时代由北京理工大学相关科研团队孵化，专注于特种装备动力系统、智能底盘、嵌入式控制与自主可控系统研发。" />

    <nav className="container page-subnav" aria-label="关于我们页面导航">
      <a href="#positioning">公司定位</a>
      <a href="#principles">工作原则</a>
      <a href="#autonomy">自主可控</a>
      <a href="#capabilities">核心研发能力</a>
    </nav>

    <section className="container about-grid content-section" id="positioning">
      <Reveal className="about-main glass-panel"><p className="eyebrow">RESEARCH ORIGIN</p><h2>由北京理工大学相关科研团队孵化。</h2><p>核心研发人员具有车辆工程、电气工程、自动控制和机械工程背景，长期围绕特种电驱系统、整车控制、起发一体系统、智能底盘和无人移动平台开展研发。我们将科研积累转化为可验证、可制造、可交付的产品与系统。</p></Reveal>
      <Reveal className="about-side glass-panel" delay={0.08}><h3 id="principles">工作原则</h3><ul><li>先定义边界，再开始开发</li><li>先验证关键风险，再扩大投入</li><li>软硬件统一考虑，不互相甩锅</li><li>交付资料必须能够继续维护</li></ul></Reveal>
    </section>

    <section className="container value-row value-row-four">
      <Reveal><span>01</span><h3>科研转化能力</h3><p>把车辆、电气与控制领域的研究积累转化为工程系统。</p></Reveal>
      <Reveal delay={0.04}><span>02</span><h3>系统设计能力</h3><p>把动力、电气、控制、通信和任务设备组织成完整架构。</p></Reveal>
      <Reveal delay={0.08}><span>03</span><h3>核心控制能力</h3><p>完成控制器、底层软件、算法和车辆控制策略。</p></Reveal>
      <Reveal delay={0.12}><span>04</span><h3>工程交付能力</h3><p>从样机联调推进到测试、资料和小批量交付。</p></Reveal>
    </section>

    <section className="container content-section" id="autonomy">
      <SectionTitle eyebrow="AUTONOMOUS & CONTROLLABLE" title="面向自主可控需求的工程研发体系" copy="国产化不是简单更换器件，而是系统架构、关键器件、软件平台、控制算法和可靠性验证的协同工作。" />
      <div className="autonomy-grid">
        <Reveal><article className="autonomy-card glass-panel"><span>01</span><h2>关键器件适配</h2><p>从性能、可靠性、环境适应、供应稳定性和可制造性出发，开展器件选型、替代与验证。</p></article></Reveal>
        <Reveal delay={0.05}><article className="autonomy-card glass-panel"><span>02</span><h2>核心软件自研</h2><p>掌握底层驱动、通信协议、控制算法、故障管理和系统标定等关键软件环节。</p></article></Reveal>
        <Reveal delay={0.1}><article className="autonomy-card glass-panel"><span>03</span><h2>系统级验证</h2><p>通过台架、样机和典型工况验证国产化方案，避免把部件替换问题留到整机阶段。</p></article></Reveal>
      </div>
    </section>

    <section className="container content-section" id="capabilities">
      <SectionTitle eyebrow="CORE CAPABILITIES" title="核心研发能力" copy="技术能力必须落到接口、算法、测试和可维护的工程资料。" />
      <div className="tech-page-list">
        {technologies.map(([index, title, copy], i) => <Reveal key={title} delay={i * 0.04}>
          <article className="tech-feature">
            <span>{index}</span><div><h2>{title}</h2><p>{copy}</p></div>
            <dl><dt>{technologyDetail[i][0]}</dt><dd>{technologyDetail[i][1]}</dd></dl>
          </article>
        </Reveal>)}
      </div>
    </section>
    <ContactBand />
  </main>;
}
