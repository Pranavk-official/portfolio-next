"use client";

import { useEffect, useRef } from "react";

interface FireworksProps {
  className?: string;
  duration?: number;
}

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  decay: number;

  constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 3 + 1;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.alpha = 1;
    this.color = color;
    this.decay = Math.random() * 0.015 + 0.01;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.05; // gravity
    this.alpha -= this.decay;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

class Rocket {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  exploded: boolean;
  canvasWidth: number;
  canvasHeight: number;
  particles: Particle[];

  constructor(canvasWidth: number, canvasHeight: number, particles: Particle[]) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.particles = particles;
    this.x = Math.random() * canvasWidth;
    this.y = canvasHeight;
    this.vx = (Math.random() - 0.5) * 4;
    this.vy = -(Math.random() * 10 + 10);
    this.color = `hsl(${Math.random() * 360}, 50%, 50%)`;
    this.exploded = false;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.15; // gravity

    if (this.vy >= 0 || Math.random() < 0.02) {
      this.explode();
    }
  }

  explode() {
    this.exploded = true;
    for (let i = 0; i < 50; i++) {
      this.particles.push(new Particle(this.x, this.y, this.color));
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    ctx.fill();
  }
}

export const Fireworks = ({ className, duration }: FireworksProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let rockets: Rocket[] = [];
    const startTime = Date.now();

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const animate = () => {
      if (duration && Date.now() - startTime > duration) {
        // Fade out
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        if (particles.length === 0 && rockets.length === 0) {
           return; // Stop animation
        }
      } else {
        // Clear with trail effect
        ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        if (Math.random() < 0.05) {
            rockets.push(new Rocket(canvas.width, canvas.height, particles));
        }
      }

      rockets = rockets.filter((rocket) => {
        rocket.update();
        rocket.draw(ctx);
        return !rocket.exploded;
      });

      particles = particles.filter((particle) => {
        particle.update();
        particle.draw(ctx);
        return particle.alpha > 0;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [duration]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-50 ${className}`}
    />
  );
};
