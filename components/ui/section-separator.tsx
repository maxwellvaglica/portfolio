"use client";
import { motion } from "motion/react";

export const SectionSeparator = () => {
  return (
    <div className="my-12 flex justify-center">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "50%" }}
        viewport={{ once: true, amount: "all" }}
        transition={{ duration: 1 }}
        className="h-px bg-zinc-700"
      />
    </div>
  );
};
