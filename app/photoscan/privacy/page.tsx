"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { Footer } from "@/app/footer";
import { EMAIL } from "@/app/data";
import {
  ChevronLeft,
  Shield,
  QrCode,
  Eye,
  Database,
  Share2,
  Lock,
  Mail,
} from "lucide-react";

export default function PrivacyPage() {
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
            href="/photoscan"
            className="mb-8 inline-flex items-center gap-2 text-zinc-400 transition-colors hover:text-zinc-100"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to PhotoScan
          </Link>

          {/* Header */}
          <div className="mb-12 text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
                <QrCode className="h-6 w-6 text-white" />
              </div>
            </div>
            <h1 className="mb-2 text-4xl font-bold text-zinc-100">
              Privacy Policy
            </h1>
            <p className="text-lg text-zinc-400">
              PhotoScan: QR & Barcode Reader
            </p>
            <p className="mt-2 text-sm text-zinc-500">
              Last updated: December 17, 2025
            </p>
          </div>

          {/* Privacy Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12 rounded-2xl border border-emerald-900/50 bg-emerald-950/20 p-6"
          >
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-emerald-400" />
              <h2 className="text-xl font-semibold text-zinc-100">
                Privacy First
              </h2>
            </div>
            <p className="mt-3 text-zinc-400">
              PhotoScan is designed with your privacy in mind.{" "}
              <strong className="text-emerald-400">
                All image processing happens locally on your device.
              </strong>{" "}
              Your photos and scan data never leave your phone.
            </p>
          </motion.div>

          {/* Policy Sections */}
          <div className="space-y-8">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800">
                  <Eye className="h-5 w-5 text-zinc-300" />
                </div>
                <h2 className="text-xl font-semibold text-zinc-100">
                  Information We Collect
                </h2>
              </div>
              <div className="space-y-4 text-zinc-400">
                <p>
                  <strong className="text-zinc-200">
                    PhotoScan does not collect any personal information.
                  </strong>{" "}
                  The app operates entirely offline and does not transmit any
                  data to external servers.
                </p>
                <p>Here&apos;s what happens with your data:</p>
                <ul className="ml-4 list-disc space-y-2 pl-4">
                  <li>
                    <strong className="text-zinc-300">Photos:</strong> Images
                    you select are processed locally on your device to detect
                    barcodes. We do not access, store, or transmit your photos
                    to any server.
                  </li>
                  <li>
                    <strong className="text-zinc-300">Scan Results:</strong>{" "}
                    Barcode data decoded from your images is stored locally on
                    your device in the app&apos;s scan history. This data never
                    leaves your device unless you explicitly choose to share or
                    export it.
                  </li>
                  <li>
                    <strong className="text-zinc-300">Analytics:</strong> We do
                    not use any third-party analytics services. No usage data is
                    collected or transmitted.
                  </li>
                </ul>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800">
                  <Database className="h-5 w-5 text-zinc-300" />
                </div>
                <h2 className="text-xl font-semibold text-zinc-100">
                  Data Storage
                </h2>
              </div>
              <div className="space-y-4 text-zinc-400">
                <p>All data is stored locally on your device:</p>
                <ul className="ml-4 list-disc space-y-2 pl-4">
                  <li>
                    <strong className="text-zinc-300">Scan History:</strong>{" "}
                    Your scan history is stored in the app&apos;s local storage
                    on your device. You can clear this data at any time from the
                    Settings menu.
                  </li>
                  <li>
                    <strong className="text-zinc-300">Preferences:</strong> App
                    settings (like haptic feedback preferences) are stored
                    locally using iOS standard storage mechanisms.
                  </li>
                  <li>
                    <strong className="text-zinc-300">No Cloud Sync:</strong>{" "}
                    PhotoScan does not sync data to iCloud or any other cloud
                    service.
                  </li>
                </ul>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800">
                  <Lock className="h-5 w-5 text-zinc-300" />
                </div>
                <h2 className="text-xl font-semibold text-zinc-100">
                  Photo Library Access
                </h2>
              </div>
              <div className="space-y-4 text-zinc-400">
                <p>
                  PhotoScan requires access to your photo library to function.
                  This permission is used solely to:
                </p>
                <ul className="ml-4 list-disc space-y-2 pl-4">
                  <li>
                    Allow you to select images containing barcodes to scan
                  </li>
                  <li>Process selected images locally to detect barcodes</li>
                </ul>
                <p>
                  We do not access photos you don&apos;t explicitly select. Your
                  photo library contents are never transmitted anywhere.
                </p>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800">
                  <Share2 className="h-5 w-5 text-zinc-300" />
                </div>
                <h2 className="text-xl font-semibold text-zinc-100">
                  Data Sharing
                </h2>
              </div>
              <div className="space-y-4 text-zinc-400">
                <p>
                  <strong className="text-zinc-200">
                    We do not share any data with third parties.
                  </strong>
                </p>
                <p>
                  The only way data leaves your device is if you explicitly
                  choose to:
                </p>
                <ul className="ml-4 list-disc space-y-2 pl-4">
                  <li>Share a scan result using the iOS share sheet</li>
                  <li>Export your scan history to a file</li>
                  <li>Copy scan data to your clipboard</li>
                </ul>
                <p>These actions are entirely user-initiated.</p>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800">
                  <Mail className="h-5 w-5 text-zinc-300" />
                </div>
                <h2 className="text-xl font-semibold text-zinc-100">
                  Contact Us
                </h2>
              </div>
              <div className="space-y-4 text-zinc-400">
                <p>
                  If you have any questions about this Privacy Policy or
                  PhotoScan&apos;s privacy practices, please contact us:
                </p>
                <a
                  href={`mailto:${EMAIL}?subject=PhotoScan Privacy Inquiry`}
                  className="inline-flex items-center gap-2 rounded-lg bg-zinc-800 px-4 py-2 text-zinc-200 transition-all hover:bg-zinc-700"
                >
                  <Mail className="h-4 w-4" />
                  {EMAIL}
                </a>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6"
            >
              <h2 className="mb-4 text-xl font-semibold text-zinc-100">
                Changes to This Policy
              </h2>
              <div className="space-y-4 text-zinc-400">
                <p>
                  We may update this Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page and updating the &quot;Last updated&quot; date.
                </p>
                <p>
                  You are advised to review this Privacy Policy periodically for
                  any changes.
                </p>
              </div>
            </motion.section>
          </div>

          {/* Summary Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 rounded-xl border border-zinc-700 bg-zinc-800/50 p-6"
          >
            <h3 className="mb-4 text-lg font-semibold text-zinc-100">
              Summary
            </h3>
            <ul className="space-y-2 text-zinc-400">
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span>
                All processing happens locally on your device
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span>
                No data is transmitted to external servers
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span>
                No analytics or tracking
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span>
                No data sharing with third parties
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span>
                You control your data completely
              </li>
            </ul>
          </motion.div>

          {/* App Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-8 text-center text-sm text-zinc-500"
          >
            <p>
              PhotoScan: QR & Barcode Reader
              <br />
              Developed by Maxwell Vaglica
              <br />
              <Link
                href="/photoscan/support"
                className="text-indigo-400 hover:underline"
              >
                Support
              </Link>
            </p>
          </motion.div>
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
