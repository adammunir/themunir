"use client";

import { useEffect, useRef } from "react";

const vertex = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uPulse;
  attribute float aSeed;
  varying float vLift;
  varying float vSeed;

  void main() {
    vec3 p = position;
    // Slow swell across the field, like wind over turf.
    float swell = sin(p.x * 0.35 + uTime * 0.45) * 0.35 + sin(p.z * 0.5 - uTime * 0.3) * 0.25;
    // Ripple rings radiating from the pointer, the way a sprinkler wets a lawn.
    float d = distance(p.xz, uPointer);
    float ring = sin(d * 2.2 - uTime * 3.0) * exp(-d * 0.42) * (0.55 + uPulse);
    p.y += swell + ring;
    vLift = ring;
    vSeed = aSeed;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (1.6 + aSeed * 1.4 + max(ring, 0.0) * 3.0) * (28.0 / -mv.z);
  }
`;

const fragment = /* glsl */ `
  varying float vLift;
  varying float vSeed;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    if (dot(c, c) > 0.25) discard;
    vec3 paper = vec3(0.93, 0.92, 0.89);
    vec3 signal = vec3(1.0, 0.30, 0.18);
    float heat = smoothstep(0.15, 0.7, vLift);
    vec3 col = mix(paper, signal, heat);
    float alpha = 0.32 + vSeed * 0.3 + heat * 0.6;
    gl_FragColor = vec4(col, alpha);
  }
`;

export default function HeroField() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let disposed = false;
    let cleanup = () => {};

    import("three").then((THREE) => {
      if (disposed) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "low-power" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
      camera.position.set(0, 7.5, 15);
      camera.lookAt(0, 0, -2);

      // Rows of points, slightly jittered so the field reads as organic, not a grid.
      const cols = 180;
      const rows = 90;
      const positions = new Float32Array(cols * rows * 3);
      const seeds = new Float32Array(cols * rows);
      for (let r = 0, i = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++, i++) {
          const jitter = (Math.sin(i * 12.9898) * 43758.5453) % 1;
          positions[i * 3] = (c / (cols - 1) - 0.5) * 40 + jitter * 0.08;
          positions[i * 3 + 1] = 0;
          positions[i * 3 + 2] = (r / (rows - 1) - 0.5) * 26 - 4;
          seeds[i] = Math.abs(jitter);
        }
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

      const uniforms = {
        uTime: { value: 0 },
        uPointer: { value: new THREE.Vector2(0, 2) },
        uPulse: { value: 0 },
      };
      const material = new THREE.ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        uniforms,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      scene.add(new THREE.Points(geometry, material));

      const resize = () => {
        const { clientWidth: w, clientHeight: h } = el;
        renderer.setSize(w, h, false);
        renderer.domElement.style.width = "100%";
        renderer.domElement.style.height = "100%";
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(el);

      // Project the pointer onto the ground plane so ripples start under the cursor.
      const target = new THREE.Vector2(0, 2);
      const ray = new THREE.Raycaster();
      const ground = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
      const hit = new THREE.Vector3();
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const ndc = new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
        ray.setFromCamera(ndc, camera);
        if (ray.ray.intersectPlane(ground, hit)) target.set(hit.x, hit.z);
      };
      const onDown = () => (uniforms.uPulse.value = 1.2);
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerdown", onDown);

      // Only render while the hero is on screen.
      let visible = true;
      const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
      io.observe(el);

      const clock = new THREE.Clock();
      let frame = 0;
      const tick = () => {
        frame = requestAnimationFrame(tick);
        if (!visible) return;
        const dt = Math.min(clock.getDelta(), 0.05);
        uniforms.uTime.value += reduce ? 0 : dt;
        uniforms.uPointer.value.lerp(target, 0.06);
        uniforms.uPulse.value *= 0.95;
        renderer.render(scene, camera);
      };
      tick();
      el.dataset.ready = "true";

      cleanup = () => {
        cancelAnimationFrame(frame);
        ro.disconnect();
        io.disconnect();
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerdown", onDown);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div
      ref={host}
      aria-hidden
      className="absolute inset-0 opacity-0 transition-opacity duration-[2000ms] data-[ready=true]:opacity-100"
    />
  );
}
