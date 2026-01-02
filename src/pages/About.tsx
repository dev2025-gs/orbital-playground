import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

function distance(a: [number, number], b: [number, number]) {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  return Math.hypot(dx, dy);
}

export default function About() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointsRef = useRef<Array<[number, number]>>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      c.width = c.clientWidth * dpr;
      c.height = c.clientHeight * dpr;
      ctx.scale(dpr, dpr);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const start = (x: number, y: number) => {
    pointsRef.current = [[x, y]];
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, c.width, c.height);
  };

  const move = (x: number, y: number) => {
    const pts = pointsRef.current;
    pts.push([x, y]);
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = "rgba(255,215,0,0.95)";
    ctx.shadowColor = "rgba(255,215,0,0.9)";
    ctx.shadowBlur = 18;
    ctx.lineWidth = 8;
    ctx.beginPath();
    const last = pts[pts.length - 2];
    const cur = pts[pts.length - 1];
    if (last) {
      ctx.moveTo(last[0], last[1]);
      ctx.lineTo(cur[0], cur[1]);
      ctx.stroke();
    }
  };

  const end = () => {
    const pts = pointsRef.current;
    if (pts.length < 10) {
      setMessage("Draw a clear shape (star / quad / circle)");
      return;
    }

    let perim = 0;
    for (let i = 1; i < pts.length; i++) perim += distance(pts[i - 1], pts[i]);

    const cx = pts.reduce((s, p) => s + p[0], 0) / pts.length;
    const cy = pts.reduce((s, p) => s + p[1], 0) / pts.length;
    const radii = pts.map((p) => distance([cx, cy], p));
    const meanR = radii.reduce((s, r) => s + r, 0) / radii.length;
    const variance = radii.reduce((s, r) => s + Math.pow(r - meanR, 2), 0) / radii.length;
    const stddev = Math.sqrt(variance);

    let corners = 0;
    for (let i = 2; i < pts.length; i++) {
      const a = pts[i - 2];
      const b = pts[i - 1];
      const cpt = pts[i];
      const v1 = [b[0] - a[0], b[1] - a[1]];
      const v2 = [cpt[0] - b[0], cpt[1] - b[1]];
      const dot = v1[0] * v2[0] + v1[1] * v2[1];
      const mag1 = Math.hypot(v1[0], v1[1]);
      const mag2 = Math.hypot(v2[0], v2[1]);
      if (mag1 * mag2 === 0) continue;
      const cos = dot / (mag1 * mag2);
      const angle = Math.acos(Math.max(-1, Math.min(1, cos))) * (180 / Math.PI);
      if (angle > 40) corners++;
    }

    let shape: string | null = null;
    const startPt = pts[0];
    const endPt = pts[pts.length - 1];
    const closedDist = distance(startPt, endPt);
    if (stddev / meanR < 0.28 && closedDist < perim * 0.15) {
      shape = "circle";
    } else if (corners >= 5) {
      shape = "star";
    } else if (corners >= 3 && corners <= 5) {
      shape = "quadrilateral";
    }

    if (shape) {
      setMessage(`Detected ${shape}`);
      setTimeout(() => setRevealed(true), 700);
    } else {
      setMessage("Could not recognise the shape — try a clear star, square or circle.");
    }
  };

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const rect = () => c.getBoundingClientRect();

    const onPointerDown = (e: PointerEvent) => {
      (e.target as Element).setPointerCapture(e.pointerId);
      const r = rect();
      start(e.clientX - r.left, e.clientY - r.top);
    };
    const onPointerMove = (e: PointerEvent) => {
      if ((e.buttons ?? 0) === 0) return;
      const r = rect();
      move(e.clientX - r.left, e.clientY - r.top);
    };
    const onPointerUp = () => end();
    c.addEventListener("pointerdown", onPointerDown);
    c.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      c.removeEventListener("pointerdown", onPointerDown);
      c.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  return (
    <div className="p-6 w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">About</h2>
      <p className="mb-4 text-muted-foreground">Draw a star, quadrilateral or circle to reveal the creator.</p>

      <div className="border border-border rounded-lg overflow-hidden">
        <div className="relative" style={{ height: 360 }}>
          <canvas ref={canvasRef} className="w-full h-full block bg-gradient-to-b from-black/80 to-neutral/95" />
          {!revealed && (
            <div className="absolute inset-0 flex items-end p-4 pointer-events-none">
              <div className="bg-black/40 text-sm text-muted-foreground rounded px-3 py-1">Draw here</div>
            </div>
          )}
        </div>
      </div>

      {message && <p className="mt-3 text-sm text-accent">{message}</p>}

      {revealed && (
        <div className="mt-6 p-6 bg-gradient-to-r from-amber-700 via-amber-500 to-yellow-400 text-black rounded-lg shadow-lg animate-fade-in">
          <h3 className="text-2xl font-bold mb-2">Creator & Developer</h3>
          <p className="text-xl font-medium tracking-wide mb-4">Gautam Subramanian</p>
          <div className="overflow-hidden whitespace-nowrap">
            <div className="animate-marquee py-2">
              <span className="mr-8">LinkedIn: https://www.linkedin.com/in/gautam-subramanian</span>
              <span className="mr-8">Twitter: https://twitter.com/gautam</span>
              <span className="mr-8">Email: hello@gautam.dev</span>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/" className="text-sm text-muted-foreground underline">Return Home</Link>
          </div>
        </div>
      )}

      <style>{`@keyframes marquee { from { transform: translateX(0%);} to { transform: translateX(-50%);} } .animate-marquee { display:inline-block; animation: marquee 18s linear infinite; } .animate-fade-in { animation: fadein 0.9s ease both; } @keyframes fadein { from { opacity: 0; transform: translateY(8px) } to { opacity:1; transform:none } }`}</style>
    </div>
  );
}
