'use client'
import { motion } from 'motion/react'
import Link from 'next/link'
import { use } from 'react'
import { PROJECTS } from '@/app/data'
import { Footer } from '@/app/footer'

export default function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const project = PROJECTS.find((p) => p.id === id)

  if (!project) {
    return (
      <div className="panel">
        <div className="mx-auto w-full max-w-4xl text-center">
          <h1 className="text-4xl font-bold text-zinc-100">Project Not Found</h1>
          <p className="mt-4 text-zinc-400">
            The project you're looking for doesn't exist.
          </p>
          <Link
            href="/"
            className="mt-8 inline-block text-zinc-400 transition-colors hover:text-zinc-100"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="panel" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
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
              <p className="mt-3 text-lg text-zinc-400">{project.description}</p>
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
              <div className="space-y-6">
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-zinc-100">
                    Overview
                  </h2>
                  <p className="text-zinc-400">{project.details.overview}</p>
                </div>

                <div>
                  <h2 className="mb-4 text-2xl font-bold text-zinc-100">
                    Technologies
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {project.details.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="mb-4 text-2xl font-bold text-zinc-100">
                    Key Features
                  </h2>
                  <ul className="space-y-2 text-zinc-400">
                    {project.details.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2 text-zinc-500">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {project.details.challenges && (
                  <div>
                    <h2 className="mb-4 text-2xl font-bold text-zinc-100">
                      Challenges
                    </h2>
                    <p className="text-zinc-400">
                      {project.details.challenges}
                    </p>
                  </div>
                )}

                {project.details.results && (
                  <div>
                    <h2 className="mb-4 text-2xl font-bold text-zinc-100">
                      Results
                    </h2>
                    <p className="text-zinc-400">{project.details.results}</p>
                  </div>
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
  )
}

