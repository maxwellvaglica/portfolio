"use client";
import { useRef, useEffect } from "react";

const NetworkBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollProgressRef = useRef(0);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(window.scrollY / scrollHeight, 1);
      scrollProgressRef.current = progress;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }

    const nodes: Node[] = [];
    const nodeCount = 50;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 1,
      });
    }

    // Color interpolation function
    const interpolateColor = (progress: number) => {
      // Start: Teal (10, 200, 150)
      // Middle (0.5): Yellow (255, 200, 50)
      // End (1.0): Orange (255, 120, 30)

      let r, g, b;

      if (progress < 0.5) {
        // Teal to Yellow (0 to 0.5)
        const t = progress * 2; // normalize to 0-1
        r = Math.round(10 + (255 - 10) * t);
        g = Math.round(200 + (200 - 200) * t);
        b = Math.round(150 + (50 - 150) * t);
      } else {
        // Yellow to Orange (0.5 to 1)
        const t = (progress - 0.5) * 2; // normalize to 0-1
        r = Math.round(255 + (255 - 255) * t);
        g = Math.round(200 + (120 - 200) * t);
        b = Math.round(50 + (30 - 50) * t);
      }

      return { r, g, b };
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const color = interpolateColor(scrollProgressRef.current);
      const strokeColor = `rgba(${color.r}, ${color.g}, ${color.b}, 0.2)`;
      const fillColor = `rgba(${color.r}, ${color.g}, ${color.b}, 0.5)`;

      ctx.strokeStyle = strokeColor;
      ctx.fillStyle = fillColor;

      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const update = () => {
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      });
    };

    const animate = () => {
      draw();
      update();
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 -z-10" />;
};

export default NetworkBackground;
