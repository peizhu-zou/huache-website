const stages = [
  ["01", "增程 / 储能", "Range Extender / ESS"],
  ["02", "电源转换", "DCDC / DCAC / ACDC"],
  ["03", "配电系统", "Vehicle / Aircraft PDU"],
  ["04", "电机控制", "Motor Controller"],
  ["05", "电机输出", "Traction / ISG Motor"],
  ["06", "智能底盘", "Wheel / Track / Mission"],
] as const;

export default function PowerFlow() {
  return (
    <div className="power-flow glass-panel" aria-label="产品能量链路示意图">
      <div className="flow-header">
        <span>产品能量链路</span>
        <span className="status-dot">系统在线</span>
      </div>
      <div className="flow-track">
        <div className="energy-pulse" aria-hidden="true" />
        {stages.map(([index, title, detail]) => (
          <div className="flow-stage" key={title}>
            <span className="flow-index">{index}</span>
            <strong>{title}</strong>
            <small>{detail}</small>
          </div>
        ))}
      </div>
      <div className="flow-footer">
        <span>能量可控</span><span>状态可见</span><span>故障可诊断</span>
      </div>
    </div>
  );
}
