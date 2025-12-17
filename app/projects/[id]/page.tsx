"use client";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { use, useState } from "react";
import { PROJECTS, EMAIL } from "@/app/data";
import { Footer } from "@/app/footer";
import { X, Lock, Mail, Github, ChevronDown, ChevronUp } from "lucide-react";

export default function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const project = PROJECTS.find((p) => p.id === id);
  const [currentIterationIndex, setCurrentIterationIndex] = useState(0);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [expandedProblem, setExpandedProblem] = useState<number | null>(null);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-emerald-900/50 text-emerald-400 border-emerald-700";
      case "Medium":
        return "bg-amber-900/50 text-amber-400 border-amber-700";
      case "Hard":
        return "bg-red-900/50 text-red-400 border-red-700";
      default:
        return "bg-zinc-800 text-zinc-400 border-zinc-700";
    }
  };

  if (!project) {
    return (
      <div className="panel">
        <div className="mx-auto w-full max-w-4xl text-center">
          <h1 className="text-4xl font-bold text-zinc-100">
            Project Not Found
          </h1>
          <p className="mt-4 text-zinc-400">
            The project you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/"
            className="mt-8 inline-block text-zinc-400 transition-colors hover:text-zinc-100"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="panel"
        style={{ paddingTop: "3rem", paddingBottom: "3rem" }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.2 } }}
          className="mx-auto w-full max-w-4xl"
        >
          <Link
            href="/"
            className="mb-8 inline-block text-zinc-400 transition-colors hover:text-zinc-100"
          >
            ← Back to Home
          </Link>

          <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-5xl font-bold text-zinc-100">
                  {project.name}
                </h1>
                <p className="mt-3 text-lg text-zinc-400">
                  {project.description}
                </p>
              </div>
              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex shrink-0 items-center gap-2 rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-200 transition-all hover:bg-zinc-700"
                >
                  <Github className="h-4 w-4" />
                  View on GitHub
                </a>
              ) : (
                <button
                  onClick={() => setShowCodeModal(true)}
                  className="flex shrink-0 items-center gap-1.5 text-xs text-zinc-500 transition-colors hover:text-zinc-300"
                >
                  <Lock className="h-3 w-3" />
                  Request Code
                </button>
              )}
            </div>

            {(project.image || project.video) && (
              <div className="aspect-video w-full overflow-hidden rounded-xl">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.name}
                    className="h-full w-full object-cover"
                  />
                ) : project.video ? (
                  <video
                    src={project.video}
                    autoPlay
                    loop
                    muted
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </div>
            )}

            {/* LeetCode Problems Section */}
            {project.problems && project.problems.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-zinc-100">
                    Problems Solved ({project.problems.length})
                  </h2>
                  <div className="flex gap-2 text-xs">
                    <span className="rounded-full bg-emerald-900/50 px-2 py-1 text-emerald-400">
                      Easy
                    </span>
                    <span className="rounded-full bg-amber-900/50 px-2 py-1 text-amber-400">
                      Medium
                    </span>
                    <span className="rounded-full bg-red-900/50 px-2 py-1 text-red-400">
                      Hard
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {project.problems.map((problem, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50"
                    >
                      <button
                        onClick={() =>
                          setExpandedProblem(
                            expandedProblem === index ? null : index,
                          )
                        }
                        className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-zinc-800/50"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}
                          >
                            {problem.difficulty}
                          </span>
                          <span className="font-semibold text-zinc-100">
                            {problem.name}
                          </span>
                          <span className="text-sm text-zinc-500">
                            {problem.language}
                          </span>
                        </div>
                        {expandedProblem === index ? (
                          <ChevronUp className="h-5 w-5 text-zinc-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-zinc-400" />
                        )}
                      </button>

                      <AnimatePresence>
                        {expandedProblem === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-4 border-t border-zinc-800 p-4">
                              <div>
                                <h4 className="mb-1 text-sm font-semibold text-zinc-300">
                                  Problem
                                </h4>
                                <p className="text-sm text-zinc-400">
                                  {problem.description}
                                </p>
                              </div>

                              <div>
                                <h4 className="mb-1 text-sm font-semibold text-zinc-300">
                                  Example
                                </h4>
                                <p className="font-mono text-sm text-zinc-500">
                                  {problem.example}
                                </p>
                              </div>

                              <div>
                                <h4 className="mb-1 text-sm font-semibold text-zinc-300">
                                  Approach
                                </h4>
                                <p className="text-sm text-zinc-400">
                                  {problem.approach}
                                </p>
                              </div>

                              <div>
                                <h4 className="mb-2 text-sm font-semibold text-zinc-300">
                                  Solution
                                </h4>
                                <pre className="overflow-x-auto rounded-lg bg-zinc-950 p-4 text-xs">
                                  <code className="text-zinc-300">
                                    {problem.code}
                                  </code>
                                </pre>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Training Iterations Carousel */}
            {project.iterationImages && project.iterationImages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="rounded-xl border border-purple-900/50 bg-purple-950/20 p-6"
              >
                <h2 className="mb-4 text-2xl font-bold text-zinc-100">
                  Training Progress
                </h2>
                <p className="mb-6 text-zinc-400">
                  Watch how the model improves from{" "}
                  {project.iterationImages[0].iterations} to{" "}
                  {
                    project.iterationImages[project.iterationImages.length - 1]
                      .iterations
                  }{" "}
                  training iterations. The pose estimation becomes dramatically
                  more accurate with additional training.
                </p>

                <div className="relative">
                  {/* Main Image Display */}
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-zinc-900">
                    <img
                      src={project.iterationImages[currentIterationIndex].src}
                      alt={project.iterationImages[currentIterationIndex].label}
                      className="h-full w-full object-contain"
                    />
                    <div className="absolute bottom-4 left-4 rounded-lg bg-zinc-900/90 px-4 py-2">
                      <span className="text-lg font-bold text-purple-400">
                        {project.iterationImages[currentIterationIndex].label}
                      </span>
                    </div>
                  </div>

                  {/* Navigation Arrows */}
                  {project.iterationImages.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setCurrentIterationIndex(
                            (prev) =>
                              (prev - 1 + project.iterationImages!.length) %
                              project.iterationImages!.length,
                          )
                        }
                        className="absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full bg-zinc-800/80 p-3 text-white transition-all hover:bg-zinc-700"
                        aria-label="Previous iteration"
                      >
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() =>
                          setCurrentIterationIndex(
                            (prev) =>
                              (prev + 1) % project.iterationImages!.length,
                          )
                        }
                        className="absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full bg-zinc-800/80 p-3 text-white transition-all hover:bg-zinc-700"
                        aria-label="Next iteration"
                      >
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnail Navigation */}
                <div className="mt-4 flex justify-center gap-3">
                  {project.iterationImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIterationIndex(index)}
                      className={`overflow-hidden rounded-lg border-2 transition-all ${
                        index === currentIterationIndex
                          ? "border-purple-500 ring-2 ring-purple-500/50"
                          : "border-zinc-700 hover:border-zinc-600"
                      }`}
                    >
                      <div className="relative h-16 w-24">
                        <img
                          src={img.src}
                          alt={img.label}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/60">
                          <span className="text-xs font-bold text-white">
                            {img.iterations}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {project.details && (
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6"
                >
                  <h2 className="mb-4 text-2xl font-bold text-zinc-100">
                    Overview
                  </h2>
                  <p className="leading-relaxed text-zinc-400">
                    {project.details.overview}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h2 className="mb-4 text-2xl font-bold text-zinc-100">
                    Technologies
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {project.details.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-gradient-to-r from-zinc-800 to-zinc-700 px-4 py-2 text-sm font-medium text-zinc-200 shadow-lg transition-all hover:scale-105 hover:from-zinc-700 hover:to-zinc-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6"
                >
                  <h2 className="mb-4 text-2xl font-bold text-zinc-100">
                    Key Features
                  </h2>
                  <ul className="space-y-3 text-zinc-400">
                    {project.details.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.05 }}
                        className="flex items-start"
                      >
                        <span className="mt-1 mr-3 text-lg text-zinc-500">
                          ✓
                        </span>
                        <span className="leading-relaxed">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {project.details.challenges && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="rounded-xl border border-amber-900/50 bg-amber-950/20 p-6"
                  >
                    <h2 className="mb-4 text-2xl font-bold text-zinc-100">
                      Challenges
                    </h2>
                    <p className="leading-relaxed text-zinc-400">
                      {project.details.challenges}
                    </p>
                  </motion.div>
                )}

                {project.details.results && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="rounded-xl border border-emerald-900/50 bg-emerald-950/20 p-6"
                  >
                    <h2 className="mb-4 text-2xl font-bold text-zinc-100">
                      Results
                    </h2>
                    <p className="leading-relaxed text-zinc-400">
                      {project.details.results}
                    </p>
                  </motion.div>
                )}
              </div>
            )}

            {!project.details && (
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-8 text-center">
                <p className="text-zinc-400">
                  Project details coming soon. Check back later for more
                  information!
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <div className="panel">
        <div className="text-center">
          <Footer />
        </div>
      </div>

      {/* Code Request Modal */}
      <AnimatePresence>
        {showCodeModal && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCodeModal(false)}
            />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative w-full max-w-md overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-900 p-6 shadow-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowCodeModal(false)}
                  className="absolute top-4 right-4 rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
                >
                  <X size={20} />
                </button>

                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-900/30">
                    <Lock className="h-8 w-8 text-amber-400" />
                  </div>

                  <h3 className="mb-2 text-2xl font-bold text-zinc-100">
                    Confidential Code
                  </h3>

                  <p className="mb-6 text-zinc-400">
                    This project&apos;s source code is confidential and can only
                    be shared with potential employers upon request. If
                    you&apos;re interested in reviewing the code for this
                    project, please contact me directly.
                  </p>

                  <a
                    href={`mailto:${EMAIL}?subject=Code Access Request: ${project?.name}&body=Hi Maxwell,%0D%0A%0D%0AI'm interested in reviewing the code for your "${project?.name}" project.%0D%0A%0D%0A[Please include your name, company, and role]%0D%0A%0D%0AThank you!`}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition-all hover:bg-emerald-500"
                  >
                    <Mail className="h-5 w-5" />
                    Contact: {EMAIL}
                  </a>

                  <p className="mt-4 text-sm text-zinc-500">
                    I typically respond within 24-48 hours
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
