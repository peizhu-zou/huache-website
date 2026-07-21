import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = { title: "联系我们" };

export default function ContactPage() {
  return <main>
    <PageHero eyebrow="CONTACT" title="先说设备要完成什么任务。" copy="以下信息越明确，技术判断和方案边界越可靠。" />
    <section className="container contact-grid" id="project-inquiry">
      <div className="contact-checklist glass-panel"><h2>建议准备</h2><ul><li>设备用途和典型任务流程</li><li>整机重量、速度、坡度和工作时间</li><li>动力源、电压、功率和主要负载</li><li>轮式、履带式或其他移动方式</li><li>温度、防护、振动和电磁环境</li><li>样机、测试和交付时间要求</li></ul></div>
      <div className="contact-card glass-panel"><p className="eyebrow">PROJECT INQUIRY</p><h2>联系工程师</h2><p>请在正式发布前，将下方占位信息替换为公司的真实邮箱、电话和地址。</p><div className="contact-placeholder"><span>商务邮箱</span><strong>business@your-domain.com</strong></div><div className="contact-placeholder"><span>联系电话</span><strong>010-0000 0000</strong></div><div className="contact-placeholder"><span>所在地</span><strong>北京</strong></div></div>
    </section>
  </main>;
}
