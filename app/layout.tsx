import type { Metadata, Viewport } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import NetworkBackground from "@/components/ui/network-background";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "./header";
import { AskMax } from "@/components/ui/ask-max";
import { WEBSITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";
import { EMAIL, SOCIAL_LINKS } from "./data";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0A0A",
};

export const metadata: Metadata = {
  metadataBase: new URL(WEBSITE_URL),
  alternates: {
    canonical: "/",
  },
  title: {
    default: `${SITE_NAME} — Data & AI/ML Engineer`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Maxwell Vaglica",
    "Data Engineer",
    "ML Engineer",
    "AI Engineer",
    "Solutions Architect",
    "Georgia Tech OMSCS",
    "PyTorch",
    "FastAPI",
    "GCP",
    "Agentic AI",
    "RAG",
    "Chicago",
  ],
  authors: [{ name: SITE_NAME, url: WEBSITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    url: WEBSITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Data & AI/ML Engineer`,
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Data & AI/ML Engineer`,
    description: SITE_DESCRIPTION,
    creator: "@maxwellvaglica",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  url: WEBSITE_URL,
  email: EMAIL,
  jobTitle: "Data & AI/ML Engineer",
  description: SITE_DESCRIPTION,
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Georgia Institute of Technology",
      url: "https://www.gatech.edu/",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "Indiana University, Bloomington",
      url: "https://www.indiana.edu/",
    },
  ],
  worksFor: {
    "@type": "Organization",
    name: "Tempus Labs",
    url: "https://www.tempus.com/",
  },
  knowsAbout: [
    "Python",
    "PyTorch",
    "FastAPI",
    "Google Cloud Platform",
    "BigQuery",
    "Machine Learning",
    "Agentic AI",
    "Retrieval-Augmented Generation",
    "Data Pipelines",
    "Solutions Architecture",
  ],
  sameAs: SOCIAL_LINKS.map((s) => s.link),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: WEBSITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: "en-US",
  author: {
    "@type": "Person",
    name: SITE_NAME,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${robotoMono.variable} bg-zinc-950 tracking-tight text-zinc-400 antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <ThemeProvider
          enableSystem={false}
          attribute="class"
          storageKey="theme"
          defaultTheme="dark"
        >
          <NetworkBackground />
          <Header />
          {children}
          <AskMax />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
