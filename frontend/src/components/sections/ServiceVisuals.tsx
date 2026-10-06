"use client";
import { motion } from "motion/react";

export type VisualType = "browser" | "phone" | "growth" | "vr" | "model" | "ui";

export default function ServiceVisual({ type }: { type: VisualType }) {
  switch (type) {
    case "browser":
      return (
        <div className="h-full w-full rounded-lg border border-gold/40 bg-black/60 p-2">
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-2 w-2 rounded-full bg-gold/60" />
            ))}
          </div>
          <div className="mt-3 space-y-2">
            {[100, 70, 85].map((w, i) => (
              <motion.div
                key={i}
                className="h-2 rounded bg-gold/50"
                style={{ width: `${w}%` }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </div>
        </div>
      );

    case "phone":
      return (
        <motion.div
          className="mx-auto h-full w-16 rounded-2xl border-2 border-gold/60 bg-black/60 p-2"
          animate={{ rotateY: [-25, 25, -25] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="mx-auto h-1 w-6 rounded bg-gold/60" />
          <div className="mt-3 grid grid-cols-2 gap-1">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-5 rounded bg-gold/40" />
            ))}
          </div>
        </motion.div>
      );

    case "growth":
      return (
        <div className="flex h-full items-end justify-center gap-2">
          {[30, 50, 40, 70, 90].map((h, i) => (
            <motion.div
              key={i}
              className="w-4 rounded-t bg-gold"
              initial={{ height: 4 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 1.2, delay: i * 0.15, repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
            />
          ))}
        </div>
      );

    case "vr":
      return (
        <div className="flex h-full items-center justify-center">
          <motion.div
            className="relative h-12 w-28 rounded-xl border-2 border-gold/60 bg-black/60"
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="absolute left-3 top-3 h-5 w-5 rounded-full bg-gold/50" />
            <span className="absolute right-3 top-3 h-5 w-5 rounded-full bg-gold/50" />
          </motion.div>
        </div>
      );

    case "model":
      return (
        <div className="flex h-full items-center justify-center [perspective:600px]">
          <motion.div
            className="h-16 w-16 border-2 border-gold bg-gold/10"
            animate={{ rotateX: 360, rotateY: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        </div>
      );

    case "ui":
      return (
        <div className="relative h-full w-full">
          {[
            { t: "10%", l: "8%", w: "50%" },
            { t: "40%", l: "30%", w: "55%" },
            { t: "68%", l: "12%", w: "40%" },
          ].map((p, i) => (
            <motion.div
              key={i}
              className="absolute h-6 rounded-md border border-gold/50 bg-gold/20"
              style={{ top: p.t, left: p.l, width: p.w }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
            />
          ))}
        </div>
      );
  }
}