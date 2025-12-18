"use client";
import { motion } from "motion/react";
import { PROJECTS, EMAIL, SOCIAL_LINKS } from "./data";
import Link from "next/link";
import { Timeline } from "@/components/ui/timeline";
import { SectionSeparator } from "@/components/ui/section-separator";
import { Footer } from "./footer";
import { useRef } from "react";
import { useRouter } from "next/navigation";

const SKILLS = [
  "Python",
  "SQL & BigQuery",
  "Cloud Computing (GCP)",
  "FastAPI & REST APIs",
  "Machine Learning",
  "PyTorch & Scikit-learn",
  "Data Pipelines",
  "CI/CD & DevOps",
];

const HIGHLIGHTS = [
  { value: "3.9", label: "GPA (MS)" },
  { value: "4+", label: "Years Exp" },
  { value: "12", label: "Projects" },
  { value: "100+", label: "Users Served" },
];

const TIMELINE_ITEMS = [
  // OMSCS at Georgia Tech
  {
    title: "Georgia Institute of Technology",
    subtitle: "Master of Science in Computer Science",
    start: "2024",
    end: "April 2026",
    type: "education" as const,
    description:
      "Pursuing a Master's degree in Computer Science with a specialization in Machine Learning. Maintaining a 3.9 GPA while working full-time as a Computational Biologist. Coursework includes advanced machine learning, computer networks, cybersecurity, and quantitative finance.",
    highlights: [
      "Machine Learning specialization with 3.9 GPA",
      "Completed 8 graduate-level courses while working full-time",
      "Projects spanning ML, networking, security, and systems",
      "Expected graduation: April 2026",
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
  // Computational Biologist at Tempus Labs
  {
    title: "Computational Biologist",
    subtitle: "Tempus Labs",
    start: "2021",
    end: "Present",
    type: "work" as const,
    description:
      "Building production data pipelines, cloud applications, and automation systems for precision medicine. Developed systems serving 100+ users across multiple laboratories nationwide, integrating laboratory devices with databases and deploying cloud-based applications on GCP.",
    highlights: [
      "Developed nucleic acid sequencing pipeline used by 100+ users for 2+ years",
      "Built and maintained large-scale databases handling 30+ concurrent users",
      "Established RESTful APIs using FastAPI for third-party integrations",
      "Deployed cloud-based web applications for laboratory automation on GCP",
      "Integrated laboratory devices with internal databases reducing manual entry",
      "Set up automated label printing systems across Chicago laboratories",
    ],
    skills: [
      "Python",
      "FastAPI",
      "GCP",
      "BigQuery",
      "SQL",
      "Data Pipelines",
      "CI/CD",
      "Kubernetes",
      "Docker",
      "REST APIs",
    ],
  },
  // Research Programmer at IU
  {
    title: "Research Programmer",
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
      <div className="panel">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.2 } }}
          className="text-center"
        >
          <h1 className="text-6xl font-bold text-zinc-100">Maxwell Vaglica</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-zinc-400">
            <span className="text-zinc-200">
              Data Engineer & Software Developer
            </span>{" "}
            with expertise in building scalable data pipelines, cloud-based
            applications, and machine learning systems. Currently pursuing an MS
            in Computer Science at Georgia Tech with a focus on Machine
            Learning.
          </p>
          <div className="mx-auto mt-6 flex max-w-lg justify-center gap-8">
            {HIGHLIGHTS.map((item) => (
              <div key={item.label} className="text-center">
                <div className="text-3xl font-bold text-zinc-100">
                  {item.value}
                </div>
                <div className="text-sm text-zinc-500">{item.label}</div>
              </div>
            ))}
          </div>
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

      {/* iOS Apps Section - Now BEFORE projects */}
      <div
        className="panel"
        style={{ paddingTop: "3rem", paddingBottom: "3rem" }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto w-full max-w-6xl"
        >
          <h3 className="mb-4 text-center text-4xl font-bold text-zinc-100">
            iOS Apps
          </h3>
          <p className="mx-auto mb-10 max-w-2xl text-center text-zinc-400">
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

      {/* Personal/School Project Spotlight - Single scrollable carousel */}
      <div
        className="panel"
        style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          className="mx-auto w-full max-w-7xl"
        >
          <h3 className="mb-4 text-center text-4xl font-bold text-zinc-100">
            Personal/School Project Spotlight
          </h3>
          <p className="mx-auto mb-8 max-w-2xl text-center text-zinc-400">
            A collection of projects from my graduate studies at Georgia Tech
            and personal research work
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
          <h3 className="mb-8 text-center text-4xl font-bold text-zinc-100">
            Experience & Education
          </h3>
          <p className="mx-auto mb-12 max-w-2xl text-center text-zinc-400">
            4+ years of professional experience building production data
            pipelines, cloud applications, and automation systems serving 100+
            users across multiple laboratories. Strong academic foundation in
            Computer Science and Machine Learning.
          </p>
          <Timeline items={TIMELINE_ITEMS} />
        </motion.div>
      </div>

      <div className="panel">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
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
