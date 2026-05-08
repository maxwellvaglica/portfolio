"use client";
import { motion } from "motion/react";
import { PROJECTS, EMAIL, SOCIAL_LINKS } from "./data";
import Link from "next/link";
import { Timeline } from "@/components/ui/timeline";
import { SectionSeparator } from "@/components/ui/section-separator";
import { Footer } from "./footer";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { ContactForm } from "@/components/contact-form";

const SKILLS = [
  "Python",
  "Agentic & Generative AI",
  "LangChain & RAG",
  "PyTorch & Machine Learning",
  "FastAPI & REST APIs",
  "GCP / Azure / GKE",
  "React & Full-Stack",
  "SQL & BigQuery",
  "CI/CD & DevOps",
  "Data Visualization / BI",
];

const HIGHLIGHTS = [
  { value: "M.S.", label: "Computer Science" },
  { value: "4+", label: "Years Exp" },
  { value: "100+", label: "Users Served" },
];

const TIMELINE_ITEMS = [
  // OMSCS at Georgia Tech
  {
    title: "Georgia Institute of Technology",
    subtitle: "Master of Science in Computer Science",
    start: "2024",
    end: "2026",
    type: "education" as const,
    description:
      "Earned a Master's degree in Computer Science with a specialization in Computing Systems while working full-time as a Computational Biologist. Coursework included advanced machine learning, computer networks, cybersecurity, and quantitative finance.",
    highlights: [
      "Graduated with Computing Systems specialization",
      "Completed graduate-level coursework while working full-time",
      "Projects spanning ML, deep learning, networking, security, and systems",
      "Graduated April 2026",
    ],
    skills: [
      "Machine Learning",
      "Deep Learning",
      "PyTorch",
      "Computer Networks",
      "Cybersecurity",
      "Reinforcement Learning",
    ],
    projects: [
      { name: "Trading Strategy Evaluation", id: "strategy-evaluation" },
      { name: "Cryptography: RSA & Vigenere", id: "cryptography" },
      { name: "BGP Hijacking Simulation", id: "bgp-hijacking" },
      { name: "Q-Learner Trading", id: "qlearner" },
      { name: "ML for Cybersecurity", id: "ml-cybersecurity" },
      { name: "Power System Neural Network", id: "power-system-nn" },
    ],
  },
  // Computational Biologist at Tempus AI
  {
    title: "Computational Biologist",
    subtitle: "Tempus AI",
    start: "2021",
    end: "Present",
    type: "work" as const,
    description:
      "Building full-stack agentic-AI systems, production data pipelines, and cloud applications for precision medicine. Systems serve 100+ scientists nationwide and run on GKE for real-time agent interactions, with FastAPI services and React front-ends connecting AI agents to internal data systems.",
    highlights: [
      "Designed and deployed a web-based agentic AI system letting users query datasets, generate insights, and execute Python dynamically using LangChain + OpenAI APIs",
      "Built tool-augmented LLM workflows that translate natural language into multi-step data analysis pipelines (code generation, execution, visualization)",
      "Deployed scalable AI applications on Google Kubernetes Engine, supporting concurrent users and real-time agent interactions",
      "Integrated AI agents with REST APIs and external data systems via FastAPI, enabling autonomous task execution across internal services and databases",
      "Built full-stack applications (React + Python) supporting AI-driven analytics, laboratory automation, and BI workflows",
      "Production data pipelines used daily by 100+ scientists across multiple US labs for 2+ years",
    ],
    skills: [
      "Python",
      "LangChain",
      "OpenAI APIs",
      "Agentic AI",
      "RAG",
      "FastAPI",
      "React",
      "GCP",
      "GKE / Kubernetes",
      "BigQuery",
      "CI/CD",
    ],
  },
  // Research Software Engineer at IU
  {
    title: "Research Software Engineer",
    subtitle: "Indiana University - Newman Memory Lab",
    start: "2019",
    end: "2021",
    type: "work" as const,
    description:
      "Developed machine learning pipelines for neuroscience research at the Newman Memory Laboratory. Built deep learning models for video analysis and conducted large-scale data analysis for cognitive science research projects.",
    highlights: [
      "Built DeepLabCut pipeline for automated rat behavior tracking",
      "Trained ResNet-50 model with 350,000+ iterations for pose estimation",
      "Analyzed 4+ million gameplay sessions for dementia research",
      "Developed automated video analysis reducing manual annotation time",
      "Created data processing pipelines for large-scale behavioral datasets",
    ],
    skills: [
      "Python",
      "DeepLabCut",
      "TensorFlow",
      "Computer Vision",
      "Pandas",
      "Data Analysis",
      "Big Data",
      "Statistical Analysis",
    ],
    projects: [
      { name: "DeepLabCut: Rat Behavior Analysis", id: "deeplabcut" },
      { name: "Sea Hero Quest: Clinical Analysis", id: "seaheroquest" },
    ],
  },
  // Indiana University
  {
    title: "Indiana University, Bloomington",
    subtitle: "Bachelor of Science in Cognitive Science",
    start: "2017",
    end: "2021",
    type: "education" as const,
    description:
      "Earned a Bachelor of Science in Cognitive Science, combining psychology, neuroscience, computer science, and philosophy. Developed a strong foundation in research methodology, statistical analysis, and programming that led to a research programmer position at the Newman Memory Laboratory.",
    highlights: [
      "Interdisciplinary degree combining psychology, neuroscience, and CS",
      "Two years as research programmer in Newman Memory Laboratory",
      "Developed programming skills in Python and data analysis",
      "Strong foundation in cognitive psychology and neuroscience",
    ],
    skills: [
      "Python",
      "Research Methods",
      "Statistical Analysis",
      "Cognitive Psychology",
      "Neuroscience",
      "Data Analysis",
    ],
    projects: [
      { name: "DeepLabCut: Rat Behavior Analysis", id: "deeplabcut" },
      { name: "Sea Hero Quest: Clinical Analysis", id: "seaheroquest" },
    ],
  },
];

// iOS Apps data
const IOS_APPS = [
  {
    id: "tabguard",
    name: "TabGuard",
    subtitle: "Popup & Tab Blocker",
    description:
      "Block annoying popups and unwanted new tabs in Safari. Features Smart Mode that allows your clicks while blocking script-triggered popups, site rules, and block history.",
    icon: "/tabguard-icon.png",
    screenshot: "/tabguard/main_page.png",
    technologies: ["Swift", "SwiftUI", "Safari Extension", "WebKit"],
    accentColor: "teal",
    href: "/tabguard",
    appStoreUrl: "https://apps.apple.com/us/app/tabguard/id6756740309",
  },
  {
    id: "photoscan",
    name: "PhotoScan",
    subtitle: "QR & Barcode Reader",
    description:
      "Scan QR codes and barcodes from any image in your photo library — no live camera needed. Features batch scanning, 20+ barcode types, scan history, and data export.",
    icon: "/photoscan-icon.png",
    screenshot: "/single_barcode_scanned.PNG",
    technologies: ["Swift", "SwiftUI", "Vision Framework", "Core Image"],
    accentColor: "indigo",
    href: "/photoscan",
    appStoreUrl:
      "https://apps.apple.com/us/app/photoscan-qr-barcode-reader/id6756690991",
  },
];

export default function Personal() {
  // Featured projects first (most impressive), then other projects
  const FEATURED_IDS = ["leetcode", "deeplabcut", "seaheroquest"];
  const FEATURED_PROJECTS = FEATURED_IDS.map((id) =>
    PROJECTS.find((p) => p.id === id),
  ).filter(Boolean) as typeof PROJECTS;

  const OTHER_PROJECTS = PROJECTS.filter((p) => !FEATURED_IDS.includes(p.id));

  // Combine: featured first, then others
  const ALL_PROJECTS_ORDERED = [...FEATURED_PROJECTS, ...OTHER_PROJECTS];

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  return (
    <>
      <div className="panel-hero">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.2 } }}
          className="text-center"
        >
          <Link
            href="/opportunities"
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-emerald-700/50 bg-emerald-950/30 px-4 py-1 text-xs text-emerald-300 transition-colors hover:border-emerald-600 hover:bg-emerald-950/50 sm:py-1.5 sm:text-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Exploring ML, Data, Backend & Solutions Architecture · open to
            relocation
          </Link>
          <h1 className="mt-4 text-5xl font-bold text-zinc-100 md:text-6xl">
            Maxwell Vaglica
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">
            <span className="text-zinc-200">Data & AI/ML Engineer</span> at
            Tempus AI, building production agentic-AI systems, full-stack apps
            (React + FastAPI on GKE), and data pipelines used daily by 100+
            scientists. M.S. in Computer Science from Georgia Tech, Computing
            Systems specialization.
          </p>
          <div className="mx-auto mt-5 flex max-w-lg justify-center gap-6 md:gap-8">
            {HIGHLIGHTS.map((item) => (
              <div key={item.label} className="text-center">
                <div className="text-2xl font-bold text-zinc-100 md:text-3xl">
                  {item.value}
                </div>
                <div className="text-xs text-zinc-500 md:text-sm">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-5 flex max-w-2xl flex-wrap justify-center gap-1.5">
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs text-zinc-300 md:text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* iOS Apps Section - Now BEFORE projects */}
      <div className="panel">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto w-full max-w-6xl"
        >
          <h3 className="mb-2 text-center text-3xl font-bold text-zinc-100 md:text-4xl">
            iOS Apps
          </h3>
          <p className="mx-auto mb-6 max-w-2xl text-center text-sm text-zinc-400 md:text-base">
            Native iOS applications built with Swift and SwiftUI
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {IOS_APPS.map((app) => (
              <div
                key={app.id}
                onClick={() => router.push(app.href)}
                className={`group relative cursor-pointer overflow-hidden rounded-3xl border-2 transition-all hover:shadow-2xl ${
                  app.accentColor === "teal"
                    ? "border-teal-900/50 bg-gradient-to-br from-teal-950/50 via-zinc-900 to-cyan-950/50 hover:border-teal-700/70 hover:shadow-teal-500/20"
                    : "border-indigo-900/50 bg-gradient-to-br from-indigo-950/50 via-zinc-900 to-purple-950/50 hover:border-indigo-700/70 hover:shadow-indigo-500/20"
                }`}
              >
                <div className="flex flex-col">
                  {/* App Info */}
                  <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
                    <div className="mb-4 flex items-center gap-4">
                      <img
                        src={app.icon}
                        alt={`${app.name} App Icon`}
                        className={`h-14 w-14 rounded-2xl shadow-lg ${
                          app.accentColor === "teal"
                            ? "shadow-teal-500/30"
                            : "shadow-indigo-500/30"
                        }`}
                      />
                      <div>
                        <h4 className="text-xl font-bold text-white md:text-2xl">
                          {app.name}
                        </h4>
                        <p
                          className={
                            app.accentColor === "teal"
                              ? "text-teal-400"
                              : "text-indigo-400"
                          }
                        >
                          {app.subtitle}
                        </p>
                      </div>
                    </div>

                    <p className="mb-4 text-sm leading-relaxed text-zinc-300">
                      {app.description}
                    </p>

                    <div className="mb-4 flex flex-wrap gap-2">
                      {app.technologies.map((tech) => (
                        <span
                          key={tech}
                          className={`rounded-full px-2.5 py-1 text-xs ${
                            app.accentColor === "teal"
                              ? "bg-teal-900/50 text-teal-300"
                              : "bg-indigo-900/50 text-indigo-300"
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={app.appStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 rounded-xl bg-zinc-800 px-3 py-1.5 text-sm font-medium text-zinc-200 transition-all hover:bg-zinc-700"
                      >
                        <svg
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                        </svg>
                        App Store
                      </a>
                      <span className="rounded-full bg-emerald-900/50 px-2.5 py-1 text-xs font-medium text-emerald-400">
                        New
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <SectionSeparator />

      {/* Live in-browser demos — featured for memorability */}
      <div className="panel">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto w-full max-w-6xl"
        >
          <div className="mb-2 flex items-center justify-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase">
              Live in-browser demos
            </span>
          </div>
          <h3 className="mb-2 text-center text-3xl font-bold text-zinc-100 md:text-4xl">
            Real models. Real math. In your browser.
          </h3>
          <p className="mx-auto mb-6 max-w-2xl text-center text-sm text-zinc-400 md:text-base">
            Two of the projects below ship with interactive sandboxes that run
            entirely client-side — no server, no API call.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/projects/power-system-nn"
              className="group flex flex-col overflow-hidden rounded-2xl border-2 border-emerald-900/40 bg-gradient-to-br from-emerald-950/30 via-zinc-900 to-emerald-950/20 p-6 transition-all hover:border-emerald-700/70 hover:shadow-2xl hover:shadow-emerald-500/10"
            >
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-400 uppercase">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Power-grid overload predictor
              </div>
              <h4 className="text-xl font-bold text-zinc-100 md:text-2xl">
                Trained PyTorch NN, running as JS matmul
              </h4>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-300">
                Slide the load and generation parameters of a 39-bus IEEE power
                system, watch the model predict overloads across all 46 branches
                in real time. Weights extracted from the trained{" "}
                <code className="font-mono text-xs">model.pth</code> and run as
                pure JavaScript — no model server, no library download.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 group-hover:text-emerald-300">
                Try the demo →
              </div>
            </Link>

            <Link
              href="/projects/cryptography"
              className="group flex flex-col overflow-hidden rounded-2xl border-2 border-violet-900/40 bg-gradient-to-br from-violet-950/30 via-zinc-900 to-violet-950/20 p-6 transition-all hover:border-violet-700/70 hover:shadow-2xl hover:shadow-violet-500/10"
            >
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-wider text-violet-400 uppercase">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m0 0a2 2 0 11-4 0 2 2 0 014 0zm6-6V7a6 6 0 10-12 0v2M5 9h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2z"
                  />
                </svg>
                RSA encryption sandbox
              </div>
              <h4 className="text-xl font-bold text-zinc-100 md:text-2xl">
                Encrypt + decrypt with BigInt RSA
              </h4>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-300">
                Type any message, watch it round-trip through textbook RSA in
                three columns: plaintext bytes, ciphertext numbers, and the
                decrypted result. All native JavaScript BigInt math — zero
                external libraries.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-violet-400 group-hover:text-violet-300">
                Try the demo →
              </div>
            </Link>
          </div>
        </motion.div>
      </div>

      <SectionSeparator />

      {/* Personal/School Project Spotlight - Single scrollable carousel */}
      <div className="panel">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          className="mx-auto w-full max-w-7xl"
        >
          <h3 className="mb-2 text-center text-3xl font-bold text-zinc-100 md:text-4xl">
            Project Spotlight
          </h3>
          <p className="mx-auto mb-5 max-w-2xl text-center text-sm text-zinc-400 md:text-base">
            Graduate studies at Georgia Tech and personal research work
          </p>

          {/* Scrollable Project Carousel */}
          <div
            ref={scrollContainerRef}
            className="scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-zinc-600 -mx-4 overflow-x-auto px-4 pb-4"
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <div className="flex gap-6" style={{ minWidth: "max-content" }}>
              {ALL_PROJECTS_ORDERED.map((project, index) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="group relative flex w-[350px] flex-shrink-0 flex-col overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-900 shadow-lg transition-all duration-300 hover:border-zinc-500 hover:shadow-xl md:w-[400px]"
                  style={{ scrollSnapAlign: "start" }}
                >
                  {/* Featured badge for first 3 */}
                  {index < 3 && (
                    <div className="absolute top-3 left-3 z-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
                      Featured
                    </div>
                  )}

                  {project.image ? (
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-800">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/30 to-transparent" />
                    </div>
                  ) : project.video ? (
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-800">
                      <video
                        src={project.video}
                        autoPlay
                        loop
                        muted
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/30 to-transparent" />
                    </div>
                  ) : (
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl text-zinc-600">📁</div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-5">
                    <h4 className="mb-2 text-xl font-bold text-white">
                      {project.name}
                    </h4>
                    <p className="mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-zinc-300">
                      {project.description}
                    </p>
                    {project.details && project.details.technologies && (
                      <div className="flex flex-wrap gap-1.5">
                        {project.details.technologies
                          .slice(0, 3)
                          .map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full bg-zinc-800 px-2.5 py-1 text-xs text-zinc-300"
                            >
                              {tech}
                            </span>
                          ))}
                        {project.details.technologies.length > 3 && (
                          <span className="rounded-full bg-zinc-800 px-2.5 py-1 text-xs text-zinc-400">
                            +{project.details.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Scroll hint */}
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-zinc-500">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            <span>Scroll to explore all projects</span>
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </motion.div>
      </div>

      <SectionSeparator />

      <div className="panel">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          className="w-full"
        >
          <h3 className="mb-2 text-center text-3xl font-bold text-zinc-100 md:text-4xl">
            Experience & Education
          </h3>
          <p className="mx-auto mb-6 max-w-2xl text-center text-sm text-zinc-400 md:text-base">
            4+ years of professional experience building production data
            pipelines, cloud applications, and AI/ML systems serving 100+ users
            across multiple laboratories. Backed by an M.S. in Computer Science
            from Georgia Tech with a Computing Systems specialization.
          </p>
          <Timeline items={TIMELINE_ITEMS} />
        </motion.div>
      </div>

      <div className="panel">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          className="flex flex-col items-center text-center"
        >
          <h3 className="mb-2 text-center text-3xl font-bold text-zinc-100 md:text-4xl">
            Get in touch
          </h3>
          <p className="mx-auto mb-5 max-w-md text-center text-sm text-zinc-400 md:text-base">
            Recruiter, hiring manager, or just curious — drop a short note and
            I&apos;ll reply within a day or two. For something more structured,
            the{" "}
            <Link
              href="/opportunities"
              className="text-emerald-400 hover:underline"
            >
              Opportunities page
            </Link>{" "}
            has roles, FAQ, and a calendar link.
          </p>
          <ContactForm />
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-zinc-800 px-3 py-1.5 text-xs text-zinc-300 transition-colors hover:bg-zinc-700"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`mailto:${EMAIL}`}
              className="rounded-full bg-zinc-800 px-3 py-1.5 text-xs text-zinc-300 transition-colors hover:bg-zinc-700"
            >
              {EMAIL}
            </a>
          </div>
          <div className="mt-12 w-full">
            <Footer />
          </div>
        </motion.div>
      </div>
    </>
  );
}
