"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { Footer } from "@/app/footer";
import { EMAIL } from "@/app/data";
import {
  ChevronLeft,
  Mail,
  MessageCircle,
  HelpCircle,
  QrCode,
  Image,
  History,
  Download,
  Settings,
  AlertCircle,
} from "lucide-react";

const FAQS = [
  {
    question: "How do I scan a barcode from my photo library?",
    answer:
      "Open PhotoScan, tap the 'Select Photos' button, and choose one or more images from your library. The app will automatically detect and decode any barcodes in the selected images.",
  },
  {
    question: "What barcode types are supported?",
    answer:
      "PhotoScan supports over 20 barcode types including QR Code, EAN-13, EAN-8, UPC-A, UPC-E, Code 128, Code 39, Code 93, ITF, Data Matrix, Aztec, PDF417, and many more.",
  },
  {
    question: "How many images can I scan at once?",
    answer:
      "You can scan up to 20 images in a single batch. This is perfect for inventory management or processing multiple codes quickly.",
  },
  {
    question: "Where are my scans saved?",
    answer:
      "All scans are automatically saved to your scan history within the app. You can search, filter, and favorite important codes for quick access. Data is stored locally on your device.",
  },
  {
    question: "How do I export my scan history?",
    answer:
      "Go to the History tab, tap the export button in the top right, and choose your preferred format: CSV, JSON, or plain text. You can also share individual scan results with one tap.",
  },
  {
    question: "Does PhotoScan require an internet connection?",
    answer:
      "No! PhotoScan processes all images locally on your device. Your photos and scan data never leave your phone, and the app works completely offline.",
  },
  {
    question: "Why can't the app detect a barcode in my image?",
    answer:
      "Make sure the barcode in your image is clear, well-lit, and not too blurry. Very small barcodes or those at extreme angles may not be detected. Try cropping the image to focus on the barcode area.",
  },
  {
    question: "How do I delete my scan history?",
    answer:
      "Go to Settings and tap 'Clear All History' to remove all saved scans. You can also swipe left on individual scan records in the History view to delete them one by one.",
  },
];

const FEATURES_HELP = [
  {
    icon: Image,
    title: "Photo Selection",
    description:
      "Tap 'Select Photos' to open your photo library. You can select multiple images for batch scanning.",
  },
  {
    icon: QrCode,
    title: "Barcode Detection",
    description:
      "Once you select images, PhotoScan automatically detects and decodes all barcodes. Tap any result to copy or share.",
  },
  {
    icon: History,
    title: "Scan History",
    description:
      "View all your past scans in the History tab. Use the search bar to find specific scans, or tap the star to favorite.",
  },
  {
    icon: Download,
    title: "Export Data",
    description:
      "Export your scan history to CSV, JSON, or text format. Perfect for inventory management or data backup.",
  },
  {
    icon: Settings,
    title: "Settings",
    description:
      "Customize haptic feedback, sound effects, and other preferences. You can also clear your scan history here.",
  },
];

export default function SupportPage() {
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
              PhotoScan Support
            </h1>
            <p className="text-lg text-zinc-400">
              Get help with PhotoScan: QR & Barcode Reader
            </p>
          </div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12 rounded-2xl border border-indigo-900/50 bg-indigo-950/20 p-6"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-900/50">
                <MessageCircle className="h-6 w-6 text-indigo-400" />
              </div>
              <div>
                <h2 className="mb-2 text-xl font-semibold text-zinc-100">
                  Contact Support
                </h2>
                <p className="mb-4 text-zinc-400">
                  Have a question or found a bug? I&apos;d love to hear from
                  you! I typically respond within 24-48 hours.
                </p>
                <a
                  href={`mailto:${EMAIL}?subject=PhotoScan Support Request`}
                  className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition-all hover:bg-indigo-500"
                >
                  <Mail className="h-4 w-4" />
                  {EMAIL}
                </a>
              </div>
            </div>
          </motion.div>

          {/* How to Use Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-zinc-100">
              <HelpCircle className="h-6 w-6 text-indigo-400" />
              How to Use PhotoScan
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              {FEATURES_HELP.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800">
                      <feature.icon className="h-5 w-5 text-zinc-300" />
                    </div>
                    <h3 className="font-semibold text-zinc-100">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-sm text-zinc-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-zinc-100">
              <AlertCircle className="h-6 w-6 text-indigo-400" />
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {FAQS.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.03 }}
                  className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5"
                >
                  <h3 className="mb-2 font-semibold text-zinc-100">
                    {faq.question}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-400">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* App Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 text-center"
          >
            <p className="text-sm text-zinc-500">
              PhotoScan: QR & Barcode Reader
              <br />
              Version 1.0 • Developed by Maxwell Vaglica
              <br />
              <Link
                href="/photoscan/privacy"
                className="text-indigo-400 hover:underline"
              >
                Privacy Policy
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
