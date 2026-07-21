import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function ContactBand() {
  return (
    <section className="contact-band container">
      <Reveal className="contact-band-inner glass-panel">
        <div>
          <p className="eyebrow">START A PROJECT</p>
          <h2>先把任务和边界说清楚。</h2>
          <p>告诉我们设备用途、功率范围、移动方式、环境条件、国产化要求和交付节点。</p>
        </div>
        <Link className="primary-button" href="/contact">提交项目需求</Link>
      </Reveal>
    </section>
  );
}
