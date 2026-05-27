import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { TireLogo } from "./TireLogo";

export function Preloader({ onDone }: { onDone: () => void }) {
  const [stage, setStage] = useState<"spin" | "settle" | "done">("spin");
  const [startOffset, setStartOffset] = useState({ x: 0, y: 0 });
  const [measured, setMeasured] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLSpanElement>(null);
  const tireSize = 96;

  useEffect(() => {
    const t1 = setTimeout(() => setStage("settle"), 1500);
    const t2 = setTimeout(() => setStage("done"), 3200);
    const t3 = setTimeout(() => onDone(), 3700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onDone]);

  useEffect(() => {
    const updateTarget = () => {
      if (!shellRef.current || !slotRef.current) return;
      const shell = shellRef.current.getBoundingClientRect();
      const slot = slotRef.current.getBoundingClientRect();

      setStartOffset({
        x: shell.left + shell.width / 2 - (slot.left + slot.width / 2),
        y: shell.top + shell.height / 2 - (slot.top + slot.height / 2),
      });
      setMeasured(true);
    };

    updateTarget();
    window.addEventListener("resize", updateTarget);
    return () => window.removeEventListener("resize", updateTarget);
  }, []);

  return (
    <AnimatePresence>
      {stage !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div ref={shellRef} className="relative flex items-center justify-center px-5">
            <motion.div
              initial={{ opacity: 0, y: 12, letterSpacing: "0.02em" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "-0.03em" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex flex-wrap items-center justify-center font-display text-3xl font-bold leading-none text-foreground sm:text-5xl md:text-6xl"
            >
              <span>Chitransh&nbsp;</span>
              <span>Aut</span>
              <span
                ref={slotRef}
                aria-hidden="true"
                className="relative mx-0.5 inline-flex h-[0.74em] w-[0.74em] shrink-0 items-center justify-center align-[-0.05em] sm:mx-1"
              >
                <motion.span
                  className="absolute left-1/2 top-1/2 block"
                  style={{
                    width: tireSize,
                    height: tireSize,
                    marginLeft: -tireSize / 2,
                    marginTop: -tireSize / 2,
                  }}
                  initial={{
                    opacity: 0,
                    x: startOffset.x,
                    y: startOffset.y,
                    rotate: 0,
                    scale: 1.15,
                  }}
                  animate={
                    stage === "spin"
                      ? {
                          opacity: measured ? 1 : 0,
                          rotate: 1080,
                          x: startOffset.x,
                          y: startOffset.y,
                          scale: 1.15,
                        }
                      : {
                          opacity: 1,
                          rotate: 1800,
                          x: 0,
                          y: 0,
                          scale: 0.42,
                        }
                  }
                  transition={
                    stage === "spin"
                      ? { duration: 1.5, ease: "easeInOut" }
                      : { duration: 1.35, ease: [0.16, 1, 0.3, 1] }
                  }
                >
                  <TireLogo size={tireSize} />
                </motion.span>
              </span>
              <span>&nbsp;Deal</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "60%" }}
            transition={{ duration: 3.15, ease: "linear" }}
            className="absolute bottom-16 h-[2px] max-w-md bg-gradient-red shadow-glow"
          />
          <div className="absolute bottom-8 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Loading premium drive
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
