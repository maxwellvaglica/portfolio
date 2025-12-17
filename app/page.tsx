"use client";
import { motion } from "motion/react";
import { PROJECTS, EMAIL, SOCIAL_LINKS } from "./data";
import Link from "next/link";
import { Timeline } from "@/components/ui/timeline";
import { SectionSeparator } from "@/components/ui/section-separator";
import { Footer } from "./footer";
import { useState, useEffect } from "react";

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

export default function Personal() {
  // Top 3 featured projects (most impressive/important)
  const FEATURED_PROJECTS = [
    PROJECTS.find((p) => p.id === "leetcode"),
    PROJECTS.find((p) => p.id === "deeplabcut"),
    PROJECTS.find((p) => p.id === "seaheroquest"),
  ].filter(Boolean) as typeof PROJECTS;

  // Remaining projects
  const OTHER_PROJECTS = PROJECTS.filter(
    (p) => !FEATURED_PROJECTS.some((fp) => fp.id === p.id),
  );

  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);

  // Auto-rotate carousel (8 seconds per slide)
  useEffect(() => {
    if (FEATURED_PROJECTS.length === 0) return;
    const interval = setInterval(() => {
      setCurrentFeaturedIndex((prev) => (prev + 1) % FEATURED_PROJECTS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [FEATURED_PROJECTS.length]);

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
          <h3 className="mb-8 text-center text-4xl font-bold text-zinc-100">
            Featured Projects
          </h3>

          {/* Featured Projects Carousel */}
          {FEATURED_PROJECTS.length > 0 && (
            <div className="mb-12">
              <div className="relative h-[600px] w-full overflow-hidden rounded-2xl">
                {FEATURED_PROJECTS.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={false}
                    animate={{
                      opacity: index === currentFeaturedIndex ? 1 : 0,
                      x: `${(index - currentFeaturedIndex) * 100}%`,
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <Link
                      href={`/projects/${project.id}`}
                      className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border-2 border-zinc-700 bg-zinc-900 shadow-2xl"
                    >
                      {project.image ? (
                        <div className="relative h-2/3 w-full overflow-hidden bg-zinc-800">
                          <img
                            src={project.image}
                            alt={project.name}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/95 via-zinc-900/50 to-transparent" />
                        </div>
                      ) : project.video ? (
                        <div className="relative h-2/3 w-full overflow-hidden bg-zinc-800">
                          <video
                            src={project.video}
                            autoPlay
                            loop
                            muted
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/95 via-zinc-900/50 to-transparent" />
                        </div>
                      ) : (
                        <div className="relative h-2/3 w-full overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-8xl text-zinc-500">📁</div>
                          </div>
                        </div>
                      )}
                      <div className="relative z-10 flex h-1/3 flex-col justify-center bg-zinc-900 px-8 py-6">
                        <h4 className="mb-2 text-3xl font-bold text-white">
                          {project.name}
                        </h4>
                        <p className="mb-4 line-clamp-2 text-base leading-relaxed text-zinc-200">
                          {project.description}
                        </p>
                        {project.details && project.details.technologies && (
                          <div className="flex flex-wrap gap-2">
                            {project.details.technologies
                              .slice(0, 4)
                              .map((tech) => (
                                <span
                                  key={tech}
                                  className="rounded-full bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-200"
                                >
                                  {tech}
                                </span>
                              ))}
                          </div>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                ))}

                {/* Carousel Navigation Dots */}
                <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
                  {FEATURED_PROJECTS.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentFeaturedIndex(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === currentFeaturedIndex
                          ? "w-8 bg-white"
                          : "w-2 bg-white/50 hover:bg-white/75"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Navigation Arrows */}
                {FEATURED_PROJECTS.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setCurrentFeaturedIndex(
                          (prev) =>
                            (prev - 1 + FEATURED_PROJECTS.length) %
                            FEATURED_PROJECTS.length,
                        )
                      }
                      className="absolute top-1/2 left-4 z-20 -translate-y-1/2 rounded-full bg-zinc-800/80 p-3 text-white transition-all hover:bg-zinc-700"
                      aria-label="Previous project"
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
                        setCurrentFeaturedIndex(
                          (prev) => (prev + 1) % FEATURED_PROJECTS.length,
                        )
                      }
                      className="absolute top-1/2 right-4 z-20 -translate-y-1/2 rounded-full bg-zinc-800/80 p-3 text-white transition-all hover:bg-zinc-700"
                      aria-label="Next project"
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
            </div>
          )}

          {/* Other Projects Scrollable Grid */}
          {OTHER_PROJECTS.length > 0 && (
            <div>
              <h4 className="mb-4 text-2xl font-bold text-zinc-100">
                Other Projects
              </h4>
              <div className="overflow-x-auto pb-4">
                <div className="flex gap-4" style={{ minWidth: "max-content" }}>
                  {OTHER_PROJECTS.map((project) => (
                    <Link
                      key={project.id}
                      href={`/projects/${project.id}`}
                      className="group relative flex min-w-[280px] flex-col overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 shadow-lg transition-all duration-300 hover:border-zinc-600 hover:shadow-xl"
                    >
                      {project.image ? (
                        <div className="relative aspect-video w-full overflow-hidden bg-zinc-800">
                          <img
                            src={project.image}
                            alt={project.name}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-zinc-900/20 to-transparent" />
                        </div>
                      ) : project.video ? (
                        <div className="relative aspect-video w-full overflow-hidden bg-zinc-800">
                          <video
                            src={project.video}
                            autoPlay
                            loop
                            muted
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-zinc-900/20 to-transparent" />
                        </div>
                      ) : (
                        <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-4xl text-zinc-500">📁</div>
                          </div>
                        </div>
                      )}
                      <div className="p-4">
                        <h5 className="mb-2 text-lg font-bold text-white">
                          {project.name}
                        </h5>
                        <p className="line-clamp-2 text-sm leading-relaxed text-zinc-300">
                          {project.description}
                        </p>
                        {project.details && project.details.technologies && (
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {project.details.technologies
                              .slice(0, 2)
                              .map((tech) => (
                                <span
                                  key={tech}
                                  className="rounded-full bg-zinc-800 px-2 py-1 text-xs text-zinc-300"
                                >
                                  {tech}
                                </span>
                              ))}
                            {project.details.technologies.length > 2 && (
                              <span className="rounded-full bg-zinc-800 px-2 py-1 text-xs text-zinc-400">
                                +{project.details.technologies.length - 2}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
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
