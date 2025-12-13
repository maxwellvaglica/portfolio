"use client";
import { motion } from "motion/react";
import { PROJECTS, WORK_EXPERIENCE, EMAIL, SOCIAL_LINKS } from "./data";
import Link from "next/link";
import { Timeline } from "@/components/ui/timeline";
import { SectionSeparator } from "@/components/ui/section-separator";
import { Footer } from "./footer";

const SKILLS = [
  "Python",
  "SQL",
  "Cloud Computing (GCP, Azure)",
  "CI/CD",
  "Machine Learning",
  "Data Visualization/BI",
];

const TIMELINE_ITEMS = [
  // Future opportunity
  {
    title: "Your Company",
    subtitle: "Ready to make an impact",
    start: "2026",
    end: "Future",
    type: "future" as const,
  },
  // OMSCS at Georgia Tech
  {
    title: "Georgia Institute of Technology",
    subtitle: "Master of Science in Computer Science",
    start: "2024",
    end: "April 2026",
    type: "education" as const,
  },
  // Computational Biologist at Tempus Labs
  ...WORK_EXPERIENCE.filter((item) => item.title !== "Phlebotomist").map(
    (item) => ({
      title: item.title,
      subtitle: item.company,
      start: item.start,
      end: item.end,
      type: "work" as const,
    }),
  ),
  // Indiana University
  {
    title: "Indiana University, Bloomington",
    subtitle: "Bachelor of Science in Cognitive Science",
    start: "2017",
    end: "2021",
    type: "education" as const,
  },
];

export default function Personal() {
  return (
    <>
      <div className="panel">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.2 } }}
          className="text-center"
        >
          <h1 className="text-6xl font-bold text-zinc-100">Maxwell Vaglica</h1>
          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            Programmer with expertise in Python, cloud computing, SQL, and
            machine learning. Experience in designing and deploying scalable
            data pipelines, integrating laboratory devices with databases, and
            automating workflows to enhance efficiency.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <div
        className="panel"
        style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          className="mx-auto w-full max-w-6xl"
        >
          <h3 className="mb-6 text-center text-4xl font-bold text-zinc-100">
            Project Spotlight
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {PROJECTS.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="card space-y-4 overflow-hidden rounded-lg p-4 text-center transition-transform hover:scale-105"
                style={{ width: "400px" }}
              >
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.name}
                    className="aspect-video w-full rounded-xl object-cover"
                  />
                ) : project.video ? (
                  <video
                    src={project.video}
                    autoPlay
                    loop
                    muted
                    className="aspect-video w-full rounded-xl object-cover"
                  />
                ) : null}
                <div>
                  <h4 className="text-lg font-bold text-zinc-100">
                    {project.name}
                  </h4>
                  <p className="mt-1 text-zinc-400">{project.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      <SectionSeparator />

      <div className="panel">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          className="w-full"
        >
          <h3 className="mb-8 text-center text-4xl font-bold text-zinc-100">
            Experience & Education
          </h3>
          <p className="mx-auto mb-12 max-w-xl text-center text-zinc-400">
            A summary of my professional experience and academic background. I
            am a dedicated and passionate professional with a drive to create
            innovative solutions.
          </p>
          <Timeline items={TIMELINE_ITEMS} />
        </motion.div>
      </div>

      <div className="panel">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          className="text-center"
        >
          <h3 className="mb-8 text-4xl font-bold text-zinc-100">Connect</h3>
          <p className="mb-5 max-w-md text-zinc-400">
            Feel free to contact me at{" "}
            <a
              className="underline"
              style={{ color: "rgb(var(--link-color))" }}
              href={`mailto:${EMAIL}`}
            >
              {EMAIL}
            </a>
          </p>
          <div className="mt-8 flex items-center justify-center space-x-4">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-zinc-800 px-4 py-2 text-lg text-zinc-300 hover:bg-zinc-700"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="mt-24">
            <Footer />
          </div>
        </motion.div>
      </div>
    </>
  );
}
