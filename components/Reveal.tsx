import type { CSSProperties, ReactNode } from "react";

type RevealStyle = CSSProperties & { "--reveal-delay"?: string };

export default function Reveal({
  children,
  delay = 0,
  className = "",
  immediate = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  immediate?: boolean;
}) {
  const style: RevealStyle = { "--reveal-delay": `${Math.max(0, delay)}s` };
  const visibilityClass = immediate ? " is-visible reveal-immediate" : "";

  return (
    <div
      className={`reveal${visibilityClass} ${className}`.trim()}
      data-reveal={immediate ? "immediate" : "scroll"}
      style={style}
    >
      {children}
    </div>
  );
}
