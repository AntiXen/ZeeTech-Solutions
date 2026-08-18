'use client';

import React, { useRef, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import styles from './Signal.module.css';

export default function SignalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio);
    let height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left) * window.devicePixelRatio;
      targetMouseY = (e.clientY - rect.top) * window.devicePixelRatio;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Grid points with subtle harmonic oscillation
    const cols = 28;
    const rows = 16;
    let time = 0;

    const render = () => {
      time += prefersReduced ? 0.002 : 0.012;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const cellW = width / cols;
      const cellH = height / rows;

      // Draw subtle grid intersections & dynamic connecting node pulses
      for (let i = 1; i < cols; i++) {
        for (let j = 1; j < rows; j++) {
          const baseX = i * cellW;
          const baseY = j * cellH;

          // Distance to mouse
          const dx = mouseX - baseX;
          const dy = mouseY - baseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = width * 0.35;

          const influence = Math.max(0, 1 - dist / maxDist);
          const wave = Math.sin(time + i * 0.3 + j * 0.3) * 3;

          const px = baseX + (dx / dist || 0) * influence * -18;
          const py = baseY + (dy / dist || 0) * influence * -18 + wave;

          // Dot alpha & size
          const alpha = 0.06 + influence * 0.35;
          const size = 1.2 + influence * 2;

          ctx.fillStyle = influence > 0.35 ? 'rgba(16, 185, 129, ' + (alpha * 1.5) + ')' : 'rgba(148, 163, 184, ' + alpha + ')';
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();

          // Connect nearby dots with fine hairline if near cursor
          if (influence > 0.45 && i < cols - 1 && j < rows - 1) {
            ctx.strokeStyle = 'rgba(16, 185, 129, ' + (influence * 0.18) + ')';
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(px + cellW * 0.8, py + cellH * 0.8);
            ctx.stroke();
          }
        }
      }

      // Draw subtle ambient glow around cursor
      const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, width * 0.3);
      gradient.addColorStop(0, 'rgba(16, 185, 129, 0.08)');
      gradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.02)');
      gradient.addColorStop(1, 'transparent');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReduced]);

  return (
    <div ref={containerRef} className={styles.canvasContainer} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.vignetteOverlay} />
    </div>
  );
}
