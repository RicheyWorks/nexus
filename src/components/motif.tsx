import { useEffect, useRef } from "react";

export type Motif = "fern" | "sigil" | "panda" | "maze" | "ring";

type Props = {
  motif: Motif;
  angle?: number;
  depth?: number;
  className?: string;
  label?: string;
};

export function MotifCanvas({ motif, angle = 24, depth = 8, className, label }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = Math.max(1, Math.floor(w * dpr));
    canvas.height = Math.max(1, Math.floor(h * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#07090e";
    ctx.fillRect(0, 0, w, h);
    if (motif === "fern") drawFern(ctx, w, h, angle, depth);
    if (motif === "sigil") drawSigil(ctx, w, h);
    if (motif === "panda") drawPanda(ctx, w, h);
    if (motif === "maze") drawMaze(ctx, w, h);
    if (motif === "ring") drawRing(ctx, w, h);
  }, [motif, angle, depth]);

  return (
    <canvas
      ref={ref}
      className={className}
      role="img"
      aria-label={label ?? motif}
    />
  );
}

function drawFern(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  angleDeg: number,
  depth: number,
) {
  const angle = (angleDeg * Math.PI) / 180;
  ctx.strokeStyle = "#d7b56a";
  ctx.lineWidth = 1.15;
  const branch = (x: number, y: number, len: number, dir: number, d: number) => {
    if (d === 0 || len < 2) return;
    const x2 = x + Math.cos(dir) * len;
    const y2 = y + Math.sin(dir) * len;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    branch(x2, y2, len * 0.72, dir - angle, d - 1);
    branch(x2, y2, len * 0.72, dir + angle, d - 1);
    if (d > 3) branch(x2, y2, len * 0.62, dir, d - 1);
  };
  branch(w * 0.5, h - 18, h * 0.26, -Math.PI / 2, depth);
}

function drawSigil(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const cx = w / 2;
  const cy = h / 2;
  ctx.strokeStyle = "#d7b56a";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(cx, cy, Math.min(w, h) * 0.32, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = "#5ee0d4";
  ctx.lineWidth = 1.4;
  for (let i = 0; i < 7; i++) {
    const y = cy - 70 + i * 22;
    ctx.beginPath();
    ctx.arc(cx + Math.sin(i) * 28, y, 7, 0, Math.PI * 2);
    ctx.stroke();
    if (i < 6) {
      ctx.beginPath();
      ctx.moveTo(cx + Math.sin(i) * 28, y + 7);
      ctx.lineTo(cx + Math.sin(i + 1) * 28, y + 15);
      ctx.stroke();
    }
  }
}

function drawPanda(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const cx = w / 2;
  const cy = h * 0.55;
  ctx.fillStyle = "#c4552a";
  ctx.beginPath();
  ctx.ellipse(cx, cy, 54, 62, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#efe8d8";
  ctx.beginPath();
  ctx.ellipse(cx, cy + 8, 28, 24, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#17120e";
  ctx.beginPath();
  ctx.arc(cx - 16, cy - 46, 16, 0, Math.PI * 2);
  ctx.arc(cx + 16, cy - 46, 16, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#1a120e";
  ctx.beginPath();
  ctx.arc(cx - 10, cy - 2, 4, 0, Math.PI * 2);
  ctx.arc(cx + 10, cy - 2, 4, 0, Math.PI * 2);
  ctx.fill();
}

function drawMaze(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.strokeStyle = "#d7b56a";
  ctx.lineWidth = 2;
  const step = 18;
  let x = 24;
  let y = 24;
  ctx.beginPath();
  ctx.moveTo(x, y);
  const dirs = [
    [step, 0],
    [0, step],
    [step, 0],
    [0, step],
    [-step, 0],
    [0, step],
    [step, 0],
    [step, 0],
    [0, -step],
    [step, 0],
  ];
  for (let i = 0; i < 28; i++) {
    const d = dirs[i % dirs.length];
    x = Math.max(16, Math.min(w - 16, x + d[0] * ((i % 3) + 1)));
    y = Math.max(16, Math.min(h - 16, y + d[1] * ((i % 2) + 1)));
    ctx.lineTo(x, y);
  }
  ctx.stroke();
}

function drawRing(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const cx = w / 2;
  const cy = h / 2;
  const r = Math.min(w, h) * 0.28;
  ctx.strokeStyle = "#5ee0d4";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    ctx.fillStyle = "#d7b56a";
    ctx.fillRect(cx + Math.cos(a) * r - 5, cy + Math.sin(a) * r - 5, 10, 10);
  }
}
