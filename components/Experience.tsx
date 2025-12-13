"use client";
import { motion } from "motion/react";
import { Briefcase, GraduationCap, Rocket } from "lucide-react";

type ExperienceItem = {
  title: string;
  subtitle: string;
  start: string;
  end: string;
  type: "work" | "education" | "future";
};

type ExperienceProps = {
  items: ExperienceItem[];
};

const ICONS = {
  work: <Briefcase size={20} />,
  education: <GraduationCap size={20} />,
  future: <Rocket size={20} />,
};

export const Experience = ({ items }: ExperienceProps) => {
  return (
    <div className="relative mx-auto max-w-2xl">
      <div className="absolute top-0 left-3.5 h-full w-px bg-zinc-700" />
      <div className="space-y-10">
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="relative flex items-start"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="text-accent-color absolute top-2 left-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-zinc-700 bg-zinc-800">
              {ICONS[item.type]}
            </div>
            <div className="card ml-16 w-full rounded-lg p-4">
              <h4 className="font-bold text-zinc-100">{item.title}</h4>
              <p className="text-zinc-400">{item.subtitle}</p>
              <p className="mt-1 text-sm text-zinc-500">
                {item.start} - {item.end}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

