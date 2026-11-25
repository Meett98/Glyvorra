import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/** Subtle 3D perspective tilt following the cursor. Disabled on touch devices. */
export default function TiltCard({ children, max = 6, className = "" }: { children: ReactNode; max?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 90, damping: 18 });
  const sy = useSpring(my, { stiffness: 90, damping: 18 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-max, max]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [max, -max]);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType === "touch" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => { mx.set(0); my.set(0); };

  return (
    <div style={{ perspective: 1000 }} className={`h-full ${className}`}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
