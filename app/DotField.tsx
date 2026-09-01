"use client";

import { memo, useEffect, useRef } from "react";
import "./DotField.css";

type DotFieldProps = {
  dotRadius?: number;
  dotSpacing?: number;
  cursorRadius?: number;
  cursorForce?: number;
  bulgeOnly?: boolean;
  bulgeStrength?: number;
  glowRadius?: number;
  sparkle?: boolean;
  waveAmplitude?: number;
  gradientFrom?: string;
  gradientTo?: string;
  glowColor?: string;
};

type Dot = { ax: number; ay: number; sx: number; sy: number; vx: number; vy: number };

const DotField = memo(function DotField({
  dotRadius = 1.5, dotSpacing = 14, cursorRadius = 500, cursorForce = 0.1,
  bulgeOnly = true, bulgeStrength = 67, glowRadius = 160, sparkle = false,
  waveAmplitude = 0, gradientFrom = "rgba(168, 85, 247, 0.35)",
  gradientTo = "rgba(180, 151, 207, 0.25)", glowColor = "#120F17",
}: DotFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 });
  const sizeRef = useRef({ w: 0, h: 0, offsetX: 0, offsetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let frameId = 0;
    let frame = 0;
    let glowOpacity = 0;
    let engagement = 0;

    const buildDots = (width: number, height: number) => {
      const step = dotRadius + dotSpacing;
      const cols = Math.floor(width / step);
      const rows = Math.floor(height / step);
      const padX = (width % step) / 2;
      const padY = (height % step) / 2;
      dotsRef.current = Array.from({ length: rows * cols }, (_, index) => {
        const row = Math.floor(index / cols);
        const col = index % cols;
        const ax = padX + col * step + step / 2;
        const ay = padY + row * step + step / 2;
        return { ax, ay, sx: ax, sy: ay, vx: 0, vy: 0 };
      });
    };

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w: rect.width, h: rect.height, offsetX: rect.left + window.scrollX, offsetY: rect.top + window.scrollY };
      buildDots(rect.width, rect.height);
    };

    const onMouseMove = (event: MouseEvent) => {
      const size = sizeRef.current;
      mouseRef.current.x = event.pageX - size.offsetX;
      mouseRef.current.y = event.pageY - size.offsetY;
    };

    const updateMouseSpeed = () => {
      const mouse = mouseRef.current;
      const distance = Math.hypot(mouse.prevX - mouse.x, mouse.prevY - mouse.y);
      mouse.speed += (distance - mouse.speed) * 0.5;
      if (mouse.speed < 0.001) mouse.speed = 0;
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
    };

    const paint = () => {
      frame += 1;
      const { w, h } = sizeRef.current;
      const mouse = mouseRef.current;
      const isInside = mouse.x >= 0 && mouse.x <= w && mouse.y >= 0 && mouse.y <= h;
      const targetEngagement = isInside ? 1 : 0;
      engagement += (targetEngagement - engagement) * 0.06;
      if (engagement < 0.001) engagement = 0;
      glowOpacity += (engagement - glowOpacity) * 0.08;
      if (glowRef.current) {
        glowRef.current.setAttribute("cx", String(mouse.x));
        glowRef.current.setAttribute("cy", String(mouse.y));
        glowRef.current.style.opacity = String(glowOpacity);
      }
      context.clearRect(0, 0, w, h);
      const gradient = context.createLinearGradient(0, 0, w, h);
      gradient.addColorStop(0, gradientFrom);
      gradient.addColorStop(1, gradientTo);
      context.fillStyle = gradient;
      context.beginPath();
      const cursorRadiusSquared = cursorRadius * cursorRadius;
      const radius = dotRadius / 2;

      dotsRef.current.forEach((dot, index) => {
        const dx = mouse.x - dot.ax;
        const dy = mouse.y - dot.ay;
        const distanceSquared = dx * dx + dy * dy;
        if (distanceSquared < cursorRadiusSquared && engagement > 0.01) {
          const distance = Math.sqrt(distanceSquared);
          const angle = Math.atan2(dy, dx);
          if (bulgeOnly) {
            const amount = (1 - distance / cursorRadius) ** 2 * bulgeStrength * engagement;
            dot.sx += (dot.ax - Math.cos(angle) * amount - dot.sx) * 0.15;
            dot.sy += (dot.ay - Math.sin(angle) * amount - dot.sy) * 0.15;
          } else {
            const amount = (500 / Math.max(distance, 1)) * (mouse.speed * cursorForce);
            dot.vx += Math.cos(angle) * -amount;
            dot.vy += Math.sin(angle) * -amount;
          }
        } else if (bulgeOnly) {
          dot.sx += (dot.ax - dot.sx) * 0.1;
          dot.sy += (dot.ay - dot.sy) * 0.1;
        }
        if (!bulgeOnly) {
          dot.vx *= 0.9; dot.vy *= 0.9;
          dot.sx += (dot.ax + dot.vx - dot.sx) * 0.1;
          dot.sy += (dot.ay + dot.vy - dot.sy) * 0.1;
        }
        let x = dot.sx;
        let y = dot.sy;
        if (waveAmplitude) {
          y += Math.sin(dot.ax * 0.03 + frame * 0.02) * waveAmplitude;
          x += Math.cos(dot.ay * 0.03 + frame * 0.014) * waveAmplitude * 0.5;
        }
        const sparkleRadius = sparkle && ((index * 2654435761 ^ (frame >> 3)) >>> 0) % 100 < 3 ? radius * 1.8 : radius;
        context.moveTo(x + sparkleRadius, y);
        context.arc(x, y, sparkleRadius, 0, Math.PI * 2);
      });
      context.fill();
      frameId = requestAnimationFrame(paint);
    };

    resize();
    const observer = new ResizeObserver(resize);
    if (canvas.parentElement) observer.observe(canvas.parentElement);
    const speedId = window.setInterval(updateMouseSpeed, 20);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    frameId = requestAnimationFrame(paint);
    return () => { cancelAnimationFrame(frameId); window.clearInterval(speedId); observer.disconnect(); window.removeEventListener("mousemove", onMouseMove); };
  }, [bulgeOnly, bulgeStrength, cursorForce, cursorRadius, dotRadius, dotSpacing, gradientFrom, gradientTo, sparkle, waveAmplitude]);

  const glowId = useRef(`dot-field-glow-${Math.random().toString(36).slice(2, 9)}`);
  return <div className="dot-field-container" aria-hidden="true"><canvas ref={canvasRef} /><svg><defs><radialGradient id={glowId.current}><stop offset="0%" stopColor={glowColor} /><stop offset="100%" stopColor="transparent" /></radialGradient></defs><circle ref={glowRef} cx="-9999" cy="-9999" r={glowRadius} fill={`url(#${glowId.current})`} /></svg></div>;
});

export default DotField;
