"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { use, useState } from "react";
import { PROJECTS } from "@/app/data";
import { Footer } from "@/app/footer";

export default function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const project = PROJECTS.find((p) => p.id === id);
  const [currentIterationIndex, setCurrentIterationIndex] = useState(0);

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
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-5xl font-bold text-zinc-100">
                  {project.name}
                </h1>
                <p className="mt-3 text-lg text-zinc-400">
                  {project.description}
                </p>
              </div>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-200 transition-all hover:bg-zinc-700"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  View on GitHub
                </a>
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
    </>
  );
}
