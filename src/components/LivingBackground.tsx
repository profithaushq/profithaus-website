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

  void main() {
    vec2 uv = vUv;
    float aspect = uRes.x / uRes.y;
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
    vec2 m = (uMouse - 0.5) * vec2(aspect, 1.0);
    float t = uTime * 0.05;

    vec2 toM = m - p;
    float pull = exp(-dot(toM, toM) * 2.5);
    p += toM * pull * 0.18;

    vec2 q = vec2(fbm(p * 1.4 + vec2(0.0, t)), fbm(p * 1.4 + vec2(5.2, 1.3) - t));
    vec2 r = vec2(
      fbm(p * 1.8 + 3.2 * q + vec2(1.7, 9.2) + t * 1.3),
      fbm(p * 1.8 + 3.2 * q + vec2(8.3, 2.8) - t * 1.1)
    );
    float f = fbm(p * 1.6 + 3.6 * r);

    float body = smoothstep(0.48, 0.56, f);
    float core = smoothstep(0.60, 0.72, f + r.x * 0.25);
    float hair = smoothstep(0.015, 0.0, abs(f - 0.52) - 0.004);

    vec3 black = vec3(0.075);
    vec3 deep = vec3(0.30, 0.055, 0.065);
    vec3 red = vec3(0.64, 0.137, 0.141);

    vec3 col = black;
    col = mix(col, deep, body);
    col = mix(col, red, core);
    col += hair * vec3(0.55, 0.12, 0.12) * 0.45;

    float g = hash(gl_FragCoord.xy + floor(uTime * 24.0)) - 0.5;
    col += g * 0.075;

    float v = smoothstep(1.15, 0.35, length(uv - 0.5) * 1.25);
    col *= mix(0.55, 1.0, v);

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
        canvas.style.cssText =
          "position:absolute;inset:0;width:100%;height:100%;display:block;";
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
            0.75,
            Math.min(window.devicePixelRatio || 1, 1.5, Math.sqrt(2.2e6 / (w * h))),
          );
          renderer.dpr = dpr;
          renderer.setSize(w, h);
          program.uniforms.uRes.value = [w * dpr, h * dpr];
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
          window.addEventListener("pointermove", onPointerMove, { passive: true });
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
      className={`pointer-events-none overflow-hidden bg-brand-black ${className}`}
    />
  );
}
