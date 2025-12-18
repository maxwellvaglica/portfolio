"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { Footer } from "@/app/footer";
import { Mail, Shield, HelpCircle, Settings, Zap } from "lucide-react";

const FAQS = [
  {
    question: "How do I enable TabGuard in Safari?",
    answer:
      "After installing TabGuard, open Safari Settings (Safari → Settings), go to the Extensions tab, and enable 'TabGuard Extension'. Make sure to allow it for all websites for full protection.",
  },
  {
    question: "What's the difference between Block All and Smart Mode?",
    answer:
      "Block All mode blocks ALL popups and new tabs, regardless of how they were triggered. Smart Mode is more intelligent — it allows popups that result from your direct clicks but blocks script-triggered popups. Smart Mode is recommended for most users.",
  },
  {
    question: "Why isn't TabGuard blocking popups on a specific site?",
    answer:
      "First, check if the site is in your whitelist (allowed sites list). Also verify that the extension is enabled in Safari Settings → Extensions. Some sites use advanced techniques that may require Block All mode.",
  },
  {
    question: "Can I allow popups for specific trusted sites?",
    answer:
      "Yes! Use the Site Rules feature to add sites to your whitelist. Sites on your whitelist will be allowed to open popups and new tabs normally.",
  },
  {
    question: "Does TabGuard affect my browsing speed?",
    answer:
      "No. TabGuard is designed to be lightweight and efficient. It only intercepts popup and new tab events, which has negligible impact on browsing performance.",
  },
  {
    question: "Why do I see 'TabGuard blocked a popup' notifications?",
    answer:
      "These notifications let you know when TabGuard is actively protecting you. You can customize or disable these notifications in the app settings.",
  },
  {
    question: "Does TabGuard work with other ad blockers?",
    answer:
      "Yes! TabGuard complements ad blockers by focusing specifically on popup and new tab blocking. It works alongside content blockers without conflicts.",
  },
  {
    question: "How do I view my block history?",
    answer:
      "Open the TabGuard app and tap on the History tab. You'll see a complete log of all blocked popups and new tabs, including which sites triggered them.",
  },
];

export default function TabGuardSupportPage() {
  return (
    <>
      <div
        className="panel relative overflow-hidden"
        style={{ paddingTop: "3rem", paddingBottom: "2rem" }}
      >
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.2 } }}
          >
            <Link
              href="/tabguard"
              className="mb-8 inline-block text-zinc-400 transition-colors hover:text-zinc-100"
            >
              ← Back to TabGuard
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-900/30">
                <HelpCircle className="h-6 w-6 text-teal-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-zinc-100">
                  TabGuard Support
                </h1>
                <p className="text-zinc-400">Get help with TabGuard</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Contact Section */}
      <div
        className="panel"
        style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
      >
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-teal-900/50 bg-gradient-to-br from-teal-950/30 to-cyan-950/30 p-8"
          >
            <h2 className="mb-4 text-2xl font-bold text-zinc-100">
              Contact Support
            </h2>
            <p className="mb-6 text-zinc-400">
              Having issues or questions? We&apos;re here to help!
            </p>
            <a
              href="mailto:maxvaglica@gmail.com?subject=TabGuard Support"
              className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white transition-all hover:bg-teal-700"
            >
              <Mail className="h-5 w-5" />
              Email Support
            </a>
            <p className="mt-4 text-sm text-zinc-500">
              We typically respond within 24 hours.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Quick Setup Guide */}
      <div
        className="panel"
        style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
      >
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 text-2xl font-bold text-zinc-100">
              Quick Setup Guide
            </h2>

            <div className="space-y-4">
              {[
                {
                  step: 1,
                  icon: Settings,
                  title: "Install TabGuard",
                  description:
                    "Download TabGuard from the App Store and open the app.",
                },
                {
                  step: 2,
                  icon: Shield,
                  title: "Enable in Safari",
                  description:
                    "Go to Safari Settings → Extensions and enable 'TabGuard Extension'. Allow it for all websites.",
                },
                {
                  step: 3,
                  icon: Zap,
                  title: "Choose Your Mode",
                  description:
                    "Select Block All for maximum protection or Smart Mode for balanced browsing.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex items-start gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-900/50 text-lg font-bold text-teal-400">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="mb-1 flex items-center gap-2 text-lg font-semibold text-zinc-100">
                      <item.icon className="h-5 w-5 text-teal-400" />
                      {item.title}
                    </h3>
                    <p className="text-zinc-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* FAQs */}
      <div
        className="panel"
        style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
      >
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 text-2xl font-bold text-zinc-100">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {FAQS.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6"
                >
                  <h3 className="mb-2 text-lg font-semibold text-zinc-100">
                    {faq.question}
                  </h3>
                  <p className="text-zinc-400">{faq.answer}</p>
                </motion.div>
              ))}
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
