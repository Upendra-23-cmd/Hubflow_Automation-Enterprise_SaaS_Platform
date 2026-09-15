import React, { useEffect, useRef } from 'react';

export const GradientCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = Math.min(window.innerHeight * 0.95, 840);
    };

    resize();
    window.addEventListener('resize', resize);

    // Color nodes drifting organically
    const nodes = [
      { x: 0.2, y: 0.3, vx: 0.0004, vy: 0.0003, r: 0.55, color: 'rgba(99, 91, 255, 0.85)' },    // Stripe Indigo
      { x: 0.7, y: 0.2, vx: -0.0003, vy: 0.0004, r: 0.6, color: 'rgba(255, 91, 148, 0.75)' },   // Pink/Coral
      { x: 0.4, y: 0.6, vx: 0.0002, vy: -0.0003, r: 0.5, color: 'rgba(0, 212, 255, 0.65)' },    // Electric Cyan
      { x: 0.8, y: 0.7, vx: -0.0004, vy: -0.0002, r: 0.55, color: 'rgba(255, 179, 71, 0.65)' }, // Warm Gold
      { x: 0.1, y: 0.8, vx: 0.0003, vy: 0.0002, r: 0.5, color: 'rgba(121, 40, 202, 0.7)' }     // Deep Violet
    ];

    let t = 0;

    const render = () => {
      t += 0.008;

      // Base gradient
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#f9fafb');
      bgGrad.addColorStop(1, '#eef2ff');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Save before skewed clipping to achieve signature Stripe angled plane
      ctx.save();

      // Stripe signature diagonal slice
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(width, 0);
      ctx.lineTo(width, height * 0.75);
      ctx.lineTo(0, height * 0.98);
      ctx.closePath();
      ctx.clip();

      // Base fill inside polygon
      ctx.fillStyle = '#f6f9fc';
      ctx.fillRect(0, 0, width, height);

      // Multi-layer organic blobs
      ctx.globalCompositeOperation = 'multiply';

      nodes.forEach((node, i) => {
        // Subtle sinusoidal oscillation
        const currX = (node.x + Math.sin(t + i * 1.5) * 0.15) * width;
        const currY = (node.y + Math.cos(t + i * 1.2) * 0.12) * height;
        const radius = node.r * Math.max(width, height);

        const radial = ctx.createRadialGradient(currX, currY, radius * 0.05, currX, currY, radius);
        radial.addColorStop(0, node.color);
        radial.addColorStop(0.7, node.color.replace(/[\d\.]+\)$/, '0.2)'));
        radial.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = radial;
        ctx.beginPath();
        ctx.arc(currX, currY, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Overlay soft wash
      ctx.globalCompositeOperation = 'source-over';
      const wash = ctx.createLinearGradient(0, 0, width, height);
      wash.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
      wash.addColorStop(0.5, 'rgba(255, 255, 255, 0.05)');
      wash.addColorStop(1, 'rgba(255, 255, 255, 0.3)');
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, width, height);

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="absolute inset-x-0 top-0 h-[720px] md:h-[820px] overflow-hidden pointer-events-none -z-10 select-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-90 transition-opacity duration-1000"
      />
      {/* Skewed separator line */}
      <div 
        className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#f6f9fc] to-transparent pointer-events-none"
      />
    </div>
  );
};
