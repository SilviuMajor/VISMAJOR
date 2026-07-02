"use client";

import { CSSProperties } from "react";

type TubeProps = {
  width?: number;
  label?: "cream" | "balm";
  className?: string;
};

const aluminium =
  "linear-gradient(90deg,#d8d5cc 0%,#f3f1ea 16%,#ffffff 44%,#ffffff 56%,#eeebe4 82%,#d4d1c8 100%)";

export function Tube({ width = 220, label = "cream", className = "" }: TubeProps) {
  const labelText = label === "cream" ? "Cooling\nChest Primer" : "Recovery Balm";
  const subline = label === "cream" ? "With Caffeine & Menthol Agents" : "Soothe + Protect";
  const netQty = label === "cream" ? "20ml ℮" : "8g ℮";

  return (
    <div
      className={`relative flex flex-col items-center ${className}`}
      style={{ width }}
    >
      {/* tube neck cap (light, matches body) */}
      <div
        style={{
          width: width * 0.72,
          height: 15,
          borderRadius: "3px 3px 0 0",
          background:
            "linear-gradient(90deg,#cecbc2,#efece6 45%,#efece6 55%,#c8c5bc)",
          boxShadow:
            "inset 0 2px 3px rgba(255,255,255,0.4), inset 0 -3px 4px rgba(0,0,0,0.25)",
        }}
      />
      {/* tube body */}
      <div
        className="relative overflow-hidden"
        style={{
          width,
          height: width * 1.46,
          borderRadius: "30px 30px 5px 5px",
          background: aluminium,
        }}
      >
        {/* top sheen */}
        <div
          className="absolute inset-x-0 top-0"
          style={{
            height: 46,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.55), transparent)",
          }}
        />
        {/* label area */}
        <div
          className="absolute flex flex-col"
          style={{ left: 22, right: 22, top: 70, bottom: 30, padding: "16px 14px" }}
        >
          <span
            className="text-center font-semibold text-ink-1"
            style={{
              fontSize: 9,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            VISMAJOR
          </span>
          <div className="mt-auto">
            <span
              className="block font-bold text-ink-0"
              style={{
                fontSize: width * 0.135,
                letterSpacing: "0.02em",
                lineHeight: 0.9,
              }}
            >
              GY{"‑"}NO!
            </span>
            <span
              className="block mt-2 font-medium text-ink-0"
              style={{
                fontSize: 8.5,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                lineHeight: 1.4,
                whiteSpace: "pre-line",
              }}
            >
              {labelText}
            </span>
            <span
              className="block mt-1.5 font-medium text-ink-2"
              style={{
                fontSize: 6.5,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                lineHeight: 1.4,
              }}
            >
              {subline}
            </span>
            <span
              className="flex justify-between mt-2.5 pt-2 font-semibold text-ink-1"
              style={{
                borderTop: "1px solid rgba(20,19,15,0.18)",
                fontSize: 6.5,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              <span>For Men</span>
              <span>{netQty}</span>
            </span>
          </div>
        </div>
      </div>
      {/* matte-black base */}
      <div
        style={{
          width: width * 0.85,
          height: width * 0.3,
          marginTop: -4,
          borderRadius: "0 0 12px 12px",
          background:
            "linear-gradient(180deg,#2b2a27,#161512 55%,#0c0b09)",
          boxShadow:
            "inset 0 3px 4px rgba(255,255,255,0.12), 0 26px 36px -22px rgba(0,0,0,0.7)",
        }}
      />
      {/* contact shadow */}
      <div
        style={{
          width: width * 1.1,
          height: 20,
          marginTop: 6,
          borderRadius: "50%",
          background:
            "radial-gradient(50% 50%, rgba(20,19,15,0.4), transparent 72%)",
          filter: "blur(5px)",
        }}
      />
    </div>
  );
}
