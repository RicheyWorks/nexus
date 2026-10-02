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
    const paint = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w < 2 || h < 2) return;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#07090e";
      ctx.fillRect(0, 0, w, h);
      if (motif === "fern") drawFern(ctx, w, h, angle, depth);
      if (motif === "sigil") drawSigil(ctx, w, h);
      if (motif === "panda") drawPanda(ctx, w, h);
      if (motif === "maze") drawMaze(ctx, w, h);
      if (motif === "ring") drawRing(ctx, w, h);
    };
    paint();
    const obs = new ResizeObserver(paint);
    obs.observe(canvas);
    return () => obs.disconnect();
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
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  const branch = (x: number, y: number, len: number, dir: number, d: number, width: number) => {
    if (d === 0 || len < 2) return;
    const x2 = x + Math.cos(dir) * len;
    const y2 = y + Math.sin(dir) * len;
    ctx.lineWidth = width;
    ctx.strokeStyle = d <= 2 ? "#5ee0d4" : "#d7b56a";
    ctx.globalAlpha = d <= 2 ? 0.85 : 1;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    const next = Math.max(0.7, width * 0.72);
    branch(x2, y2, len * 0.72, dir - angle, d - 1, next);
    branch(x2, y2, len * 0.72, dir + angle, d - 1, next);
    if (d > 3) branch(x2, y2, len * 0.58, dir, d - 1, next * 0.85);
  };
  ctx.globalAlpha = 1;
  branch(w * 0.5, h - 16, h * 0.28, -Math.PI / 2, depth, Math.max(2.2, h * 0.012));
  ctx.globalAlpha = 1;
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
