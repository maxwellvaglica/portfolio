"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { Footer } from "@/app/footer";
import {
  Image,
  History,
  Download,
  Shield,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  QrCode,
  Layers,
  FileText,
} from "lucide-react";

const FEATURES = [
  {
    icon: Image,
    title: "Scan from Photos",
    description:
      "Select any image from your photo library and instantly detect all barcodes within it.",
  },
  {
    icon: Layers,
    title: "Batch Scanning",
    description:
      "Scan up to 20 images at once — perfect for inventory management or processing multiple codes quickly.",
  },
  {
    icon: QrCode,
    title: "20+ Barcode Types",
    description:
      "Supports QR Code, EAN-13, EAN-8, UPC-A, UPC-E, Code 128, Code 39, Code 93, ITF, Data Matrix, Aztec, PDF417, and more.",
  },
  {
    icon: History,
    title: "Scan History",
    description:
      "All your scans are automatically saved. Search, filter, and favorite important codes for quick access.",
  },
  {
    icon: Download,
    title: "Easy Export",
    description:
      "Export your scan history to CSV, JSON, or plain text. Share individual codes with one tap.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description:
      "PhotoScan processes all images locally on your device. Your photos and scan data never leave your phone.",
  },
];

const SCREENSHOTS = [
  { src: "/single_barcode_scanned.PNG", label: "Single Barcode Scan" },
  { src: "/batch_scan_4_barcodes.PNG", label: "Batch Scanning" },
  { src: "/History.PNG", label: "Scan History" },
  { src: "/History-Favorites.PNG", label: "Favorites" },
  { src: "/settings.PNG", label: "Settings" },
];

const USE_CASES = [
  "Scanning QR codes from screenshots",
  "Reading product barcodes from photos",
  "Processing codes from documents or emails",
  "Inventory management",
  "Saving and organizing scanned codes",
  "Extracting URLs and data from QR codes",
];

export default function PhotoScanPage() {
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
                src="/photoscan-icon.png"
                alt="PhotoScan App Icon"
                className="h-20 w-20 rounded-2xl shadow-lg shadow-indigo-500/30"
              />
            </div>

            <h1 className="mb-2 text-5xl font-bold tracking-tight text-zinc-100 md:text-6xl">
              PhotoScan
            </h1>
            <p className="mb-6 text-xl text-indigo-400">QR & Barcode Reader</p>

            <p className="mx-auto mb-8 max-w-2xl text-lg text-zinc-400">
              Scan QR codes and barcodes from any image in your photo library —
              no live camera needed! The fastest way to extract barcode data
              from screenshots, saved images, and photos.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:scale-105 hover:shadow-indigo-500/40"
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

              <span className="rounded-full bg-amber-900/50 px-4 py-2 text-sm font-medium text-amber-400">
                Coming Soon
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
                      ? "w-6 bg-indigo-500"
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
              Unlike other barcode scanners that require pointing your camera at
              a code, PhotoScan reads barcodes from images you already have.
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
                className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:border-indigo-900/50 hover:bg-zinc-900"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-900/30">
                  <feature.icon className="h-6 w-6 text-indigo-400" />
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
            className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-indigo-950/50 to-purple-950/50 p-8"
          >
            <div className="mb-6 flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-indigo-400" />
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
                  <div className="h-2 w-2 rounded-full bg-indigo-500" />
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
              Ready to Scan Smarter?
            </h2>
            <p className="mb-8 text-lg text-zinc-400">
              Download PhotoScan today and never struggle to scan a barcode
              again!
            </p>

            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:scale-105 hover:shadow-indigo-500/40"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Download on App Store
            </a>

            <div className="mt-8 flex justify-center gap-8">
              <Link
                href="/photoscan/support"
                className="flex items-center gap-2 text-zinc-400 transition-colors hover:text-zinc-100"
              >
                <FileText className="h-4 w-4" />
                Support
              </Link>
              <Link
                href="/photoscan/privacy"
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
