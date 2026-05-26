import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { TireLogo } from "./TireLogo";

export function Preloader({ onDone }: { onDone: () => void }) {
  const [stage, setStage] = useState<"spin" | "move" | "done">("spin");

  useEffect(() => {
    const t1 = setTimeout(() => setStage("move"), 1800);
    const t2 = setTimeout(() => setStage("done"), 3400);
    const t3 = setTimeout(() => onDone(), 3900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {stage !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative flex items-center justify-center">
            {/* Brand text — letter "O" placeholder pops in then tire slides in */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: stage === "move" ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center font-display text-3xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
            >
              <span>CHITRANSH</span>
              <span className="mx-2 inline-flex items-center sm:mx-3">
                {/* Empty slot where the tire becomes the "O" */}
                <span className="inline-block w-[1em]" />
              </span>
              <span className="text-gradient-red">AUTO DEAL</span>
            </motion.div>

            {/* Tire — spins center then translates into the gap */}
            <motion.div
              className="absolute"
              initial={{ x: 0, y: 0, scale: 1.2 }}
              animate={
                stage === "spin"
                  ? { rotate: 720, x: 0, y: 0, scale: 1.2 }
                  : { rotate: 1440, x: "var(--target-x)", y: 0, scale: 0.55 }
              }
              transition={
                stage === "spin"
                  ? { duration: 1.8, ease: "easeInOut" }
                  : { duration: 1.4, ease: [0.65, 0, 0.35, 1] }
              }
              style={
                {
                  // Approx center-to-O target offset; tweaked responsively below
                  ["--target-x" as string]: "-0.1em",
                } as React.CSSProperties
              }
            >
              <TireLogo size={96} />
            </motion.div>
          </div>

          {/* Progress bar */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "60%" }}
            transition={{ duration: 3.4, ease: "linear" }}
            className="absolute bottom-16 h-[2px] max-w-md bg-gradient-red"
          />
          <div className="absolute bottom-8 text-xs uppercase tracking-[0.3em] text-white/40">
            Loading premium drive
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
