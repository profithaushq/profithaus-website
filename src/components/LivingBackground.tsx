"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const VERTEX = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uRes;
  uniform vec2 uMouse;
  varying vec2 vUv;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = m * p;
      a *= 0.5;
    }
    return v;
  }

  float fbm2(vec2 p) {
    return 0.65 * noise(p) + 0.35 * noise(p * 2.03 + 7.1);
  }

  // Slow, low-frequency warp: reads as folds of satin rather than flame.
  float field(vec2 p, float t) {
    vec2 q = vec2(
      fbm2(p * 0.6 + vec2(0.0, t)),
      fbm2(p * 0.6 + vec2(5.2, 1.3) - t)
    );
    float w = fbm2(p * 0.7 + 1.6 * q);
    return 0.5 + 0.5 * sin(w * 7.0 + p.x * 0.8 + p.y * 0.6);
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uRes.x / uRes.y;
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0) * 1.25;
    float t = uTime * 0.018;

    // Height of the cloth and its surface normal from finite differences.
    float e = 0.015;
    float h = field(p, t);
    float hx = field(p + vec2(e, 0.0), t) - h;
    float hy = field(p + vec2(0.0, e), t) - h;
    vec3 n = normalize(vec3(-hx / e * 0.2, -hy / e * 0.2, 1.0));

    // A soft key light that drifts toward the pointer.
    vec2 m = (uMouse - 0.5) * 0.9;
    vec3 L = normalize(vec3(-0.45 + m.x, 0.55 + m.y, 0.75));
    vec3 V = vec3(0.0, 0.0, 1.0);
    float diff = clamp(dot(n, L), 0.0, 1.0);
    vec3 H = normalize(L + V);
    float spec = pow(clamp(dot(n, H), 0.0, 1.0), 70.0);
    float sheen = pow(clamp(dot(n, H), 0.0, 1.0), 7.0);

    vec3 black = vec3(0.17, 0.034, 0.068);   // deep wine shadow
    vec3 oxblood = vec3(0.369, 0.078, 0.141); // #5e1424 oxblood
    vec3 red = vec3(0.525, 0.102, 0.176);     // #861a2d burgundy
    vec3 pearl = vec3(0.91, 0.81, 0.81);     // #e8cfcf powder

    vec3 col = black;
    col = mix(col, oxblood, smoothstep(0.3, 0.9, diff) * 0.95);
    col += red * sheen * 0.30;
    col += mix(red, pearl, 0.6) * spec * 0.55;

    float g = hash(gl_FragCoord.xy + floor(uTime * 24.0)) - 0.5;
    col += g * 0.03;

    float v = smoothstep(1.2, 0.3, length(uv - 0.5) * 1.3);
    col *= mix(0.5, 1.0, v);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function LivingBackground({
  className = "",
  paused = false,
}: {
  className?: string;
  paused?: boolean;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(paused);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isSmall = window.matchMedia("(max-width: 767px)").matches;
    // Phones draw a single frame (no per-frame GPU work while scrolling) and
    // the canvas drifts with a CSS animation instead.
    const isStatic = reduceMotion || isSmall;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    async function start() {
      try {
        const { Renderer, Program, Mesh, Triangle } = await import("ogl");
        if (disposed || !host) return;

        const renderer = new Renderer({ alpha: false, antialias: false });
        const gl = renderer.gl;
        const canvas = gl.canvas as HTMLCanvasElement;
        canvas.style.cssText = isSmall
          ? "position:absolute;left:-15%;top:-15%;display:block;"
          : "position:absolute;inset:0;width:100%;height:100%;display:block;";
        if (isSmall && !reduceMotion) canvas.classList.add("ph-bg-drift");
        host.appendChild(canvas);

        const geometry = new Triangle(gl);
        const program = new Program(gl, {
          vertex: VERTEX,
          fragment: FRAGMENT,
          uniforms: {
            uTime: { value: 0 },
            uRes: { value: [1, 1] },
            uMouse: { value: [0.5, 0.5] },
          },
        });
        const mesh = new Mesh(gl, { geometry, program });

        const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
        let visible = true;
        let running = false;
        const startTime = gsap.ticker.time;

        function resize() {
          if (!host) return;
          const w = host.clientWidth;
          const h = host.clientHeight;
          if (!w || !h) return;
          const dpr = Math.max(
            0.6,
            Math.min(
              window.devicePixelRatio || 1,
              isSmall ? 1 : 1.5,
              Math.sqrt(2.2e6 / (w * h)),
            ),
          );
          // On phones the canvas is drawn 30% oversized so it can drift.
          const k = isSmall ? 1.3 : 1;
          renderer.dpr = dpr;
          renderer.setSize(w * k, h * k);
          program.uniforms.uRes.value = [w * k * dpr, h * k * dpr];
          if (isStatic) draw(14);
        }

        function draw(time: number) {
          program.uniforms.uTime.value = time;
          program.uniforms.uMouse.value = [mouse.x, mouse.y];
          renderer.render({ scene: mesh });
        }

        function tick() {
          if (!visible || pausedRef.current || document.hidden) return;
          mouse.x += (mouse.tx - mouse.x) * 0.05;
          mouse.y += (mouse.ty - mouse.y) * 0.05;
          draw(gsap.ticker.time - startTime + 14);
        }

        function onPointerMove(e: PointerEvent) {
          if (!host) return;
          const rect = host.getBoundingClientRect();
          mouse.tx = (e.clientX - rect.left) / rect.width;
          mouse.ty = 1 - (e.clientY - rect.top) / rect.height;
        }

        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(host);
        resize();

        const intersection = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
        });
        intersection.observe(host);

        if (!isStatic) {
          window.addEventListener("pointermove", onPointerMove, {
            passive: true,
          });
          gsap.ticker.add(tick);
          running = true;
        }

        cleanup = () => {
          if (running) gsap.ticker.remove(tick);
          window.removeEventListener("pointermove", onPointerMove);
          resizeObserver.disconnect();
          intersection.disconnect();
          renderer.gl.getExtension("WEBGL_lose_context")?.loseContext();
          canvas.remove();
        };
      } catch {
        // WebGL unavailable: the solid dark background remains.
      }
    }

    const hasIdle = typeof window.requestIdleCallback === "function";
    const idle = hasIdle
      ? window.requestIdleCallback(() => void start(), { timeout: 800 })
      : window.setTimeout(() => void start(), 250);

    return () => {
      disposed = true;
      if (hasIdle) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className={`pointer-events-none overflow-hidden bg-oxblood ${className}`}
    />
  );
}
