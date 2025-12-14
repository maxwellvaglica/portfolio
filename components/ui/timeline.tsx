"use client";
import { motion, AnimatePresence } from "motion/react";
import { Briefcase, GraduationCap, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

type TimelineProject = {
  name: string;
  id: string;
};

type TimelineItem = {
  title: string;
  subtitle: string;
  start: string;
  end: string;
  type: "work" | "education";
  description?: string;
  highlights?: string[];
  skills?: string[];
  projects?: TimelineProject[];
};

type TimelineProps = {
  items: TimelineItem[];
};

const ICONS = {
  work: <Briefcase size={20} />,
  education: <GraduationCap size={20} />,
};

export const Timeline = ({ items }: TimelineProps) => {
  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);

  return (
    <>
      <div className="relative mx-auto max-w-2xl">
        <div className="absolute top-0 left-3.5 h-full w-px bg-zinc-700" />
        <div className="space-y-10">
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="relative flex cursor-pointer items-start"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: index * 0.2 }}
              onClick={() => setSelectedItem(item)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-accent-color absolute top-2 left-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-zinc-700 bg-zinc-800 transition-colors group-hover:border-zinc-500">
                {ICONS[item.type]}
              </div>
              <div className="card ml-16 w-full rounded-lg p-4 transition-all hover:border-zinc-600 hover:bg-zinc-800/80">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-zinc-100">{item.title}</h4>
                    <p className="text-zinc-400">{item.subtitle}</p>
                    <p className="mt-1 text-sm text-zinc-500">
                      {item.start} - {item.end}
                    </p>
                  </div>
                  <span className="text-xs text-zinc-500">
                    Click for details →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
            />

            {/* Modal Content */}
            <motion.div
              className="fixed top-1/2 left-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-900 shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, y: "-45%" }}
              animate={{ opacity: 1, scale: 1, y: "0%" }}
              exit={{ opacity: 0, scale: 0.9, y: "-45%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Header */}
              <div className="relative border-b border-zinc-800 bg-zinc-900/80 p-6">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
                >
                  <X size={20} />
                </button>
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${
                      selectedItem.type === "education"
                        ? "bg-purple-900/50 text-purple-400"
                        : "bg-emerald-900/50 text-emerald-400"
                    }`}
                  >
                    {ICONS[selectedItem.type]}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-zinc-100">
                      {selectedItem.title}
                    </h3>
                    <p className="text-lg text-zinc-400">
                      {selectedItem.subtitle}
                    </p>
                    <p className="text-sm text-zinc-500">
                      {selectedItem.start} - {selectedItem.end}
                    </p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="max-h-[60vh] overflow-y-auto p-6">
                {selectedItem.description && (
                  <div className="mb-6">
                    <p className="leading-relaxed text-zinc-300">
                      {selectedItem.description}
                    </p>
                  </div>
                )}

                {selectedItem.highlights &&
                  selectedItem.highlights.length > 0 && (
                    <div className="mb-6">
                      <h4 className="mb-3 text-lg font-semibold text-zinc-100">
                        Key Highlights
                      </h4>
                      <ul className="space-y-2">
                        {selectedItem.highlights.map((highlight, idx) => (
                          <li
                            key={idx}
                            className="flex items-start text-zinc-400"
                          >
                            <span className="mt-1 mr-2 text-emerald-500">
                              ✓
                            </span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                {selectedItem.skills && selectedItem.skills.length > 0 && (
                  <div className="mb-6">
                    <h4 className="mb-3 text-lg font-semibold text-zinc-100">
                      Skills & Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedItem.projects && selectedItem.projects.length > 0 && (
                  <div>
                    <h4 className="mb-3 text-lg font-semibold text-zinc-100">
                      Related Projects
                    </h4>
                    <div className="grid gap-2">
                      {selectedItem.projects.map((project, idx) => (
                        <Link
                          key={idx}
                          href={`/projects/${project.id}`}
                          onClick={() => setSelectedItem(null)}
                          className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-800/50 p-3 transition-colors hover:border-zinc-700 hover:bg-zinc-800"
                        >
                          <span className="text-zinc-200">{project.name}</span>
                          <span className="text-zinc-500">View →</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
