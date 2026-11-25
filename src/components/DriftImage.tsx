import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Image frame that slowly settles from a zoomed-in state to its natural scale when scrolled into view. */
export default function DriftImage({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="h-full w-full"
        initial={{ scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
