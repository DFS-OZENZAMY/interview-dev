import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle, Vec3 } from "ogl";

export type OrbState = "ready" | "speaking" | "listening" | "thinking" | "paused" | "done" | "error";

// Shader repris de l'orbe vocal d'ai-interview-platform : la teinte suit l'état, l'amplitude suit la voix.
const vertex = `
precision highp float;
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main(){vUv=uv;gl_Position=vec4(position,0.0,1.0);}
`;
const fragment = `
precision highp float;
uniform float iTime;
uniform vec3 iResolution;
uniform float hue;
uniform float hover;
uniform float rot;
varying vec2 vUv;
vec3 rgb2yiq(vec3 c){return vec3(dot(c,vec3(.299,.587,.114)),dot(c,vec3(.596,-.274,-.322)),dot(c,vec3(.211,-.523,.312)));}
vec3 yiq2rgb(vec3 c){return vec3(c.x+.956*c.y+.621*c.z,c.x-.272*c.y-.647*c.z,c.x-1.106*c.y+1.703*c.z);}
vec3 adjustHue(vec3 c,float deg){float a=radians(deg);vec3 y=rgb2yiq(c);return yiq2rgb(vec3(y.x,y.y*cos(a)-y.z*sin(a),y.y*sin(a)+y.z*cos(a)));}
float hash(vec3 p){p=fract(p*.1031);p+=dot(p,p.yxz+33.33);return fract((p.x+p.y)*p.z);}
float noise(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);}
void main(){
  vec2 pixel=vUv*iResolution.xy;
  vec2 uv=(pixel-iResolution.xy*.5)/min(iResolution.x,iResolution.y)*2.;
  float sn=sin(rot),cs=cos(rot);uv=mat2(cs,-sn,sn,cs)*uv;
  float radius=length(uv),angle=atan(uv.y,uv.x);
  float n=noise(vec3(uv*2.5,iTime*.32));
  float wave=.075*sin(angle*5.+iTime*.8)+.055*sin(angle*9.-iTime*.65);
  float boundary=.68+wave+hover*.13*(n-.3);
  float alpha=1.-smoothstep(boundary-.12,boundary+.07,radius);
  float core=1.-smoothstep(.1,.72,radius);
  vec3 purple=adjustHue(vec3(.56,.36,.96),hue);
  vec3 blue=adjustHue(vec3(.27,.67,.99),hue);
  vec3 deep=adjustHue(vec3(.19,.24,.68),hue);
  vec3 color=mix(deep,mix(purple,blue,.5+.5*sin(angle*2.+iTime*.4)),clamp(core+.25*n,0.,1.));
  float glow=exp(-12.*pow(radius-(boundary-.15),2.));
  color+=vec3(.28,.26,.45)*glow*.42;
  color+=vec3(.28,.4,.55)*hover*.22;
  gl_FragColor=vec4(clamp(color,0.,1.)*alpha,alpha);
}
`;
const stateHue: Record<OrbState, number> = { ready: 0, speaking: 0, listening: 95, thinking: 35, paused: -40, done: 85, error: -95 };

/** `level` est lu à chaque image : il peut suivre en direct la voix de Lina ou le micro. */
export function VoiceOrb({ state = "ready", level, className = "", light = false }: { state?: OrbState; level?: () => number; className?: string; light?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const stateRef = useRef(state);
  const levelRef = useRef(level);
  useEffect(() => {
    stateRef.current = state;
    levelRef.current = level;
  }, [state, level]);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let renderer: Renderer | null = null;
    let raf = 0;
    let observer: ResizeObserver | null = null;
    try {
      renderer = new Renderer({ alpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio || 1, 2) });
      const gl = renderer.gl;
      gl.clearColor(0, 0, 0, 0);
      const program = new Program(gl, {
        vertex,
        fragment,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        uniforms: { iTime: { value: 0 }, iResolution: { value: new Vec3(300, 300, 1) }, hue: { value: 0 }, hover: { value: 0 }, rot: { value: 0 } },
      });
      const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
      container.appendChild(gl.canvas);
      Object.assign(gl.canvas.style, { width: "100%", height: "100%", display: "block" });
      const resize = () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (!renderer || !w || !h) return;
        renderer.setSize(w, h);
        program.uniforms.iResolution.value.set(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height);
      };
      observer = new ResizeObserver(resize);
      observer.observe(container);
      resize();
      let last = 0, time = 0, rot = 0, smooth = 0, hue = 0;
      const frame = (t: number) => {
        const delta = Math.min((t - last) / 1000 || 0, 0.05);
        last = t;
        const st = stateRef.current;
        // Niveau compressé : l'orbe respire avec la voix sans se déformer.
        const live = Math.min(1, levelRef.current?.() ?? 0);
        const target =
          st === "speaking" ? 0.2 + live * 0.28 : st === "listening" ? 0.1 + live * 0.32 : st === "thinking" ? 0.12 : 0.025;
        smooth += (target - smooth) * Math.min(1, delta * 6);
        hue += (stateHue[st] - hue) * Math.min(1, delta * 3);
        if (!reduced) {
          time += delta * (st === "paused" ? 0.12 : 1);
          rot += delta * (0.15 + smooth * 0.9);
        }
        program.uniforms.iTime.value = time;
        program.uniforms.rot.value = rot;
        program.uniforms.hover.value = smooth;
        program.uniforms.hue.value = hue;
        renderer?.render({ scene: mesh });
        raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
    } catch {
      container.dataset.fallback = "true";
    }
    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
      if (renderer) {
        renderer.gl.canvas.remove();
        renderer.gl.getExtension("WEBGL_lose_context")?.loseContext();
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`relative h-full w-full overflow-hidden rounded-full ${light ? "bg-[radial-gradient(circle,#F1E9FD_0%,#F8F5FF_51%,transparent_73%)]" : "bg-[radial-gradient(circle,rgba(83,101,255,.16)_0%,transparent_70%)]"} data-[fallback=true]:bg-[radial-gradient(circle_at_36%_29%,#E7D2FF_2%,#B4A1FF_33%,#6D6CF5_65%,#E56FDD_100%)] ${className}`}
    />
  );
}
