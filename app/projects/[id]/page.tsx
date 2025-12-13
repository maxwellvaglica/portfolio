"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { use } from "react";
import { PROJECTS } from "@/app/data";
import { Footer } from "@/app/footer";

export default function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const project = PROJECTS.find((p) => p.id === id);

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
            <div>
              <h1 className="text-5xl font-bold text-zinc-100">
                {project.name}
              </h1>
              <p className="mt-3 text-lg text-zinc-400">
                {project.description}
              </p>
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
