"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { Footer } from "@/app/footer";
import {
  Shield,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Zap,
  Clock,
  List,
  Eye,
  Settings,
  FileText,
} from "lucide-react";

const FEATURES = [
  {
    icon: Shield,
    title: "Block Popup Windows",
    description:
      "Stop sites from using window.open() to spawn unwanted popup windows in your face.",
  },
  {
    icon: Zap,
    title: "Block New Tab Links",
    description:
      "Prevent links from forcing new tabs to open. Keep browsing in your current tab.",
  },
  {
    icon: Eye,
    title: "Block Popunders",
    description:
      "Stop sneaky scripts that try to open tabs behind your current window.",
  },
  {
    icon: Settings,
    title: "Three Protection Modes",
    description:
      "Block All for maximum protection, Smart Mode allows your clicks, or Allow All when needed.",
  },
  {
    icon: List,
    title: "Site-Specific Rules",
    description:
      "Whitelist sites you trust to allow their popups. Blacklist annoying sites to always block them.",
  },
  {
    icon: Clock,
    title: "Block History",
    description:
      "Track everything TabGuard blocks. See which sites are the worst offenders.",
  },
];

const SCREENSHOTS = [
  { src: "/tabguard/main_page.png", label: "Dashboard" },
  { src: "/tabguard/block_types.png", label: "Block Types" },
  { src: "/tabguard/history.png", label: "Block History" },
  {
    src: "/tabguard/whitelist_and_blacklist_ffor_sites.png",
    label: "Site Rules",
  },
  { src: "/tabguard/setup_guide.png", label: "Setup Guide" },
  { src: "/tabguard/sleek_safari_interface.png", label: "Safari Extension" },
];

const USE_CASES = [
  "Stopping ad popups on streaming sites",
  "Preventing shopping sites from opening new tabs",
  "Blocking redirect chains on sketchy sites",
  "Keeping your browsing focused and clean",
  "Protecting yourself from popup spam",
  "Blocking annoying new-tab ads",
];

export default function TabGuardPage() {
  const [currentScreenshot, setCurrentScreenshot] = useState(0);

  const nextScreenshot = () => {
    setCurrentScreenshot((prev) => (prev + 1) % SCREENSHOTS.length);
  };

  const prevScreenshot = () => {
    setCurrentScreenshot(
      (prev) => (prev - 1 + SCREENSHOTS.length) % SCREENSHOTS.length,
    );
  };

  return (
    <>
      {/* Hero Section */}
      <div
        className="panel relative overflow-hidden"
        style={{ paddingTop: "3rem", paddingBottom: "2rem" }}
      >
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.2 } }}
          >
            <Link
              href="/"
              className="mb-8 inline-block text-zinc-400 transition-colors hover:text-zinc-100"
            >
              ← Back to Home
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="mb-6 flex items-center justify-center gap-3">
              <img
                src="/tabguard-icon.png"
                alt="TabGuard App Icon"
                className="h-20 w-20 rounded-2xl shadow-lg shadow-teal-500/30"
              />
            </div>

            <h1 className="mb-2 text-5xl font-bold tracking-tight text-zinc-100 md:text-6xl">
              TabGuard
            </h1>
            <p className="mb-6 text-xl text-teal-400">Popup & Tab Blocker</p>

            <p className="mx-auto mb-8 max-w-2xl text-lg text-zinc-400">
              Take back control of your Safari tabs! TabGuard blocks annoying
              popups and unwanted new tabs while you browse. Stop websites from
              hijacking your browsing experience.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://apps.apple.com/us/app/tabguard/id6756740309"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 px-8 py-4 font-semibold text-white shadow-lg shadow-teal-500/30 transition-all hover:scale-105 hover:shadow-teal-500/40"
              >
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Download on App Store
              </a>

              <span className="rounded-full bg-emerald-900/50 px-4 py-2 text-sm font-medium text-emerald-400">
                New
              </span>
            </div>
          </motion.div>

          {/* Screenshot Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-16"
          >
            <div className="relative flex items-center justify-center">
              <button
                onClick={prevScreenshot}
                className="absolute left-0 z-10 rounded-full bg-zinc-800/80 p-3 text-white transition-all hover:bg-zinc-700 md:left-8"
                aria-label="Previous screenshot"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <div className="relative mx-16 md:mx-24">
                {/* Phone Frame */}
                <div className="relative mx-auto w-[280px] rounded-[3rem] border-4 border-zinc-700 bg-zinc-900 p-2 shadow-2xl md:w-[320px]">
                  <div className="overflow-hidden rounded-[2.5rem] bg-black">
                    <img
                      src={SCREENSHOTS[currentScreenshot].src}
                      alt={SCREENSHOTS[currentScreenshot].label}
                      className="h-auto w-full"
                    />
                  </div>
                  {/* Dynamic Island */}
                  <div className="absolute top-6 left-1/2 h-6 w-24 -translate-x-1/2 rounded-full bg-black"></div>
                </div>
              </div>

              <button
                onClick={nextScreenshot}
                className="absolute right-0 z-10 rounded-full bg-zinc-800/80 p-3 text-white transition-all hover:bg-zinc-700 md:right-8"
                aria-label="Next screenshot"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Screenshot Label */}
            <p className="mt-4 text-center text-zinc-400">
              {SCREENSHOTS[currentScreenshot].label}
            </p>

            {/* Thumbnail Navigation */}
            <div className="mt-4 flex justify-center gap-2">
              {SCREENSHOTS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentScreenshot(index)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    index === currentScreenshot
                      ? "w-6 bg-teal-500"
                      : "bg-zinc-600 hover:bg-zinc-500"
                  }`}
                  aria-label={`Go to screenshot ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div
        className="panel"
        style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
      >
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-zinc-100 md:text-4xl">
              Key Features
            </h2>
            <p className="mx-auto max-w-2xl text-zinc-400">
              TabGuard puts you back in control — block everything, allow
              trusted sites, or let Smart Mode decide automatically.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:border-teal-900/50 hover:bg-zinc-900"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-900/30">
                  <feature.icon className="h-6 w-6 text-teal-400" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-zinc-100">
                  {feature.title}
                </h3>
                <p className="text-sm text-zinc-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Smart Mode Section */}
      <div
        className="panel"
        style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
      >
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-teal-950/50 to-cyan-950/50 p-8"
          >
            <div className="mb-6 flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-teal-400" />
              <h2 className="text-2xl font-bold text-zinc-100">Smart Mode</h2>
            </div>

            <p className="mb-6 text-zinc-400">
              Don&apos;t want to block everything? Smart Mode intelligently
              distinguishes between:
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-3 rounded-lg bg-teal-900/20 p-4">
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <div>
                  <p className="font-medium text-zinc-200">YOUR clicks</p>
                  <p className="text-sm text-zinc-400">
                    Allowed — you meant to do that
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-red-900/20 p-4">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div>
                  <p className="font-medium text-zinc-200">
                    Script-triggered popups
                  </p>
                  <p className="text-sm text-zinc-400">
                    Blocked — the site is being annoying
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-zinc-500">
              The perfect balance between protection and usability.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div
        className="panel"
        style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
      >
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-8"
          >
            <div className="mb-6 flex items-center gap-3">
              <Shield className="h-6 w-6 text-teal-400" />
              <h2 className="text-2xl font-bold text-zinc-100">Perfect For</h2>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {USE_CASES.map((useCase, index) => (
                <motion.div
                  key={useCase}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <div className="h-2 w-2 rounded-full bg-teal-500" />
                  <span className="text-zinc-300">{useCase}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div
        className="panel"
        style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
      >
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="mb-4 text-3xl font-bold text-zinc-100 md:text-4xl">
              Ready to Browse in Peace?
            </h2>
            <p className="mb-8 text-lg text-zinc-400">
              Download TabGuard today and take back control of your Safari tabs!
            </p>

            <a
              href="https://apps.apple.com/us/app/tabguard/id6756740309"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 px-8 py-4 font-semibold text-white shadow-lg shadow-teal-500/30 transition-all hover:scale-105 hover:shadow-teal-500/40"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Download on App Store
            </a>

            <div className="mt-8 flex justify-center gap-8">
              <Link
                href="/tabguard/support"
                className="flex items-center gap-2 text-zinc-400 transition-colors hover:text-zinc-100"
              >
                <FileText className="h-4 w-4" />
                Support
              </Link>
              <Link
                href="/tabguard/privacy"
                className="flex items-center gap-2 text-zinc-400 transition-colors hover:text-zinc-100"
              >
                <Shield className="h-4 w-4" />
                Privacy Policy
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="panel">
        <div className="text-center">
          <Footer />
        </div>
      </div>
    </>
  );
}
