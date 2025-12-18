"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { Footer } from "@/app/footer";
import { Shield, Lock, Eye, Database } from "lucide-react";

export default function TabGuardPrivacyPage() {
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
                <Shield className="h-6 w-6 text-teal-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-zinc-100">
                  Privacy Policy
                </h1>
                <p className="text-zinc-400">
                  TabGuard: Popup & Tab Blocker for Safari
                </p>
              </div>
            </div>
            <p className="text-sm text-zinc-500">Last updated: December 2024</p>
          </motion.div>
        </div>
      </div>

      {/* Privacy Highlights */}
      <div
        className="panel"
        style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
      >
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 grid gap-4 md:grid-cols-3"
          >
            {[
              {
                icon: Lock,
                title: "No Data Collection",
                description: "We don't collect any personal information.",
              },
              {
                icon: Eye,
                title: "Local Processing",
                description: "All blocking happens entirely on your device.",
              },
              {
                icon: Database,
                title: "No External Servers",
                description: "Your browsing data never leaves your phone.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-xl border border-teal-900/50 bg-teal-950/20 p-6 text-center"
              >
                <item.icon className="mx-auto mb-3 h-8 w-8 text-teal-400" />
                <h3 className="mb-1 font-semibold text-zinc-100">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-400">{item.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Full Privacy Policy */}
      <div
        className="panel"
        style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
      >
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-invert max-w-none"
          >
            <div className="space-y-8 text-zinc-400">
              <section>
                <h2 className="mb-4 text-xl font-bold text-zinc-100">
                  Overview
                </h2>
                <p>
                  TabGuard is designed with privacy as a core principle. We
                  believe your browsing habits are personal, and we&apos;ve
                  built our app to work without collecting any of your data.
                  This privacy policy explains how TabGuard handles (or rather,
                  doesn&apos;t handle) your information.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-bold text-zinc-100">
                  Information We Don&apos;t Collect
                </h2>
                <p className="mb-4">TabGuard does NOT collect:</p>
                <ul className="ml-4 list-disc space-y-2">
                  <li>Your browsing history or the websites you visit</li>
                  <li>URLs of blocked popups or new tabs</li>
                  <li>Personal information (name, email, etc.)</li>
                  <li>Device identifiers or tracking data</li>
                  <li>Analytics or usage statistics</li>
                  <li>Any data that leaves your device</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-bold text-zinc-100">
                  How TabGuard Works
                </h2>
                <p className="mb-4">
                  TabGuard operates as a Safari Web Extension that runs entirely
                  on your device:
                </p>
                <ul className="ml-4 list-disc space-y-2">
                  <li>
                    <strong className="text-zinc-200">Popup Blocking:</strong>{" "}
                    The extension intercepts JavaScript window.open() calls and
                    blocks them based on your settings.
                  </li>
                  <li>
                    <strong className="text-zinc-200">
                      New Tab Link Blocking:
                    </strong>{" "}
                    The extension prevents links with target=&quot;_blank&quot;
                    from opening new tabs when enabled.
                  </li>
                  <li>
                    <strong className="text-zinc-200">Block History:</strong>{" "}
                    When you view your block history in the app, this
                    information is stored locally on your device and never
                    transmitted anywhere.
                  </li>
                  <li>
                    <strong className="text-zinc-200">Site Rules:</strong> Your
                    whitelist and blacklist are stored locally using iOS&apos;s
                    secure storage mechanisms.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-bold text-zinc-100">
                  Data Storage
                </h2>
                <p>
                  All data created by TabGuard (your settings, site rules, and
                  block history) is stored locally on your device using
                  iOS&apos;s built-in storage systems. This data is:
                </p>
                <ul className="mt-4 ml-4 list-disc space-y-2">
                  <li>Encrypted by iOS</li>
                  <li>Protected by your device passcode</li>
                  <li>Automatically deleted if you uninstall the app</li>
                  <li>Never uploaded to any server</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-bold text-zinc-100">
                  Third-Party Services
                </h2>
                <p>
                  TabGuard does not use any third-party analytics, advertising,
                  or tracking services. There are no SDKs, frameworks, or
                  external services that could collect your data.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-bold text-zinc-100">
                  Safari Extension Permissions
                </h2>
                <p className="mb-4">
                  TabGuard requires the following Safari permissions to
                  function:
                </p>
                <ul className="ml-4 list-disc space-y-2">
                  <li>
                    <strong className="text-zinc-200">
                      Access to webpage contents:
                    </strong>{" "}
                    Required to inject the blocking scripts that prevent popups
                    and new tabs.
                  </li>
                  <li>
                    <strong className="text-zinc-200">
                      Access to all websites:
                    </strong>{" "}
                    Required for the extension to work across all sites you
                    visit (unless you choose to restrict it).
                  </li>
                </ul>
                <p className="mt-4">
                  These permissions are used solely for blocking functionality
                  and nothing else. We do not read, store, or transmit any
                  webpage content.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-bold text-zinc-100">
                  Children&apos;s Privacy
                </h2>
                <p>
                  TabGuard does not collect any personal information from
                  anyone, including children under 13. Since we collect no data,
                  there are no special provisions needed for children&apos;s
                  privacy.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-bold text-zinc-100">
                  Changes to This Policy
                </h2>
                <p>
                  We may update this privacy policy from time to time. Any
                  changes will be posted on this page with an updated revision
                  date. We encourage you to review this policy periodically.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-bold text-zinc-100">
                  Contact Us
                </h2>
                <p>
                  If you have any questions about this privacy policy or
                  TabGuard&apos;s privacy practices, please contact us at:
                </p>
                <p className="mt-4">
                  <a
                    href="mailto:maxvaglica@gmail.com"
                    className="text-teal-400 hover:text-teal-300"
                  >
                    maxvaglica@gmail.com
                  </a>
                </p>
              </section>
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
