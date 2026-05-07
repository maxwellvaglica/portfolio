import type { Metadata } from "next";
import { CAL_COM_URL, WEBSITE_URL } from "@/lib/constants";
import { EMAIL } from "@/app/data";
import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/app/footer";

export const metadata: Metadata = {
  title: "Opportunities",
  description:
    "What Maxwell Vaglica is exploring next, the kinds of teams he works well with, and the easiest way to start a conversation.",
  alternates: { canonical: `${WEBSITE_URL}/opportunities` },
  openGraph: {
    title: "Opportunities | Maxwell Vaglica",
    description:
      "What Maxwell Vaglica is exploring next — ML / Data / Backend / Solutions Architecture, open to relocation.",
    url: `${WEBSITE_URL}/opportunities`,
  },
};

const TARGET_ROLES = [
  "ML / AI Engineer",
  "Data Engineer",
  "Backend / Full-stack Engineer",
  "Solutions Architect",
  "Applied Scientist / Research Engineer",
];

const STRENGTHS = [
  {
    title: "Production data pipelines",
    body: "Four years building and operating pipelines used daily by 100+ scientists across multiple US labs at Tempus. GCP, BigQuery, Python, FastAPI, CI/CD.",
  },
  {
    title: "Applied ML and deep learning",
    body: "PyTorch in production for branch-overload prediction; ensemble learning for trading; classical ML pipelines for security threat detection. Comfortable end-to-end: data → model → deployment.",
  },
  {
    title: "Agentic AI & RAG",
    body: "Building retrieval-augmented systems with LangChain and modern LLM tooling; this site itself ships a 1B-parameter Llama running entirely in the visitor's browser via WebGPU.",
  },
  {
    title: "Owning projects end-to-end",
    body: "From requirements gathering with non-technical stakeholders, to architecture design, to deployment, to on-call. M.S. CS from Georgia Tech (Computing Systems specialization).",
  },
];

const FAQ = [
  {
    q: "Where are you based?",
    a: "Chicago. I'm open to remote, hybrid, or relocation for the right role.",
  },
  {
    q: "Visa / authorization?",
    a: "U.S. citizen. No sponsorship required.",
  },
  {
    q: "Notice period?",
    a: "Two weeks at my current role. Available to start most reasonable timelines.",
  },
  {
    q: "Compensation?",
    a: "Open to discussion based on role, level, and location. Happy to share my range on a quick call.",
  },
  {
    q: "Preferred stack?",
    a: "Python is home. PyTorch, FastAPI, GCP/BigQuery, SQL, Docker/Kubernetes are everyday tools. I learn new stacks fast — I shipped two SwiftUI iOS apps to the App Store this year as proof.",
  },
  {
    q: "What kinds of teams do you do your best work with?",
    a: "Small to mid-sized teams that own real production systems and care about correctness, observability, and clear writing. I work especially well in environments where engineering and domain experts (clinical, scientific, financial) collaborate closely.",
  },
];

export default function HireMePage() {
  return (
    <>
      <div
        className="panel"
        style={{ paddingTop: "3rem", paddingBottom: "2rem" }}
      >
        <div className="mx-auto w-full max-w-3xl">
          <div className="mb-2 text-sm tracking-wide text-emerald-400 uppercase">
            For recruiters & hiring managers
          </div>
          <h1 className="text-4xl font-bold text-zinc-100 md:text-5xl">
            What I&apos;m exploring next
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-zinc-300">
            I just earned my M.S. in Computer Science from Georgia Tech
            (Computing Systems) while shipping production data and ML systems
            full-time at Tempus Labs. I&apos;m looking for the next role where I
            can keep doing both — building systems that real people depend on,
            with a team that takes engineering quality seriously.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={CAL_COM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
            >
              Book a 15-minute call
            </a>
            <a
              href="/maxwell_vaglica_resume_may.pdf"
              download
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-5 py-2.5 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-500"
            >
              Download resume (PDF)
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-5 py-2.5 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-500"
            >
              Email me
            </a>
          </div>
        </div>
      </div>

      <div
        className="panel"
        style={{ paddingTop: "1rem", paddingBottom: "2rem" }}
      >
        <div className="mx-auto w-full max-w-3xl">
          <h2 className="mb-4 text-2xl font-bold text-zinc-100">
            Roles I&apos;m most interested in
          </h2>
          <div className="flex flex-wrap gap-2">
            {TARGET_ROLES.map((r) => (
              <span
                key={r}
                className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-200"
              >
                {r}
              </span>
            ))}
          </div>
          <p className="mt-3 text-sm text-zinc-500">
            Open to remote, hybrid, or relocation. Industries I&apos;ve worked
            in: healthcare / life sciences, academic research. Industries I want
            to learn: anything with a hard correctness or reliability bar
            (fintech, infra, AI tooling, climate / energy, scientific
            computing).
          </p>
        </div>
      </div>

      <div
        className="panel"
        style={{ paddingTop: "1rem", paddingBottom: "2rem" }}
      >
        <div className="mx-auto w-full max-w-3xl">
          <h2 className="mb-4 text-2xl font-bold text-zinc-100">
            Where I&apos;m strong
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {STRENGTHS.map((s) => (
              <div
                key={s.title}
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5"
              >
                <h3 className="mb-2 font-semibold text-zinc-100">{s.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="panel"
        style={{ paddingTop: "1rem", paddingBottom: "2rem" }}
      >
        <div className="mx-auto w-full max-w-3xl">
          <h2 className="mb-4 text-2xl font-bold text-zinc-100">FAQ</h2>
          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <details
                key={i}
                className="group rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 open:border-zinc-700"
              >
                <summary className="cursor-pointer list-none font-medium text-zinc-100">
                  <span className="mr-2 inline-block text-zinc-500 transition-transform group-open:rotate-90">
                    ›
                  </span>
                  {item.q}
                </summary>
                <p className="mt-3 ml-5 text-sm leading-relaxed text-zinc-400">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>

      <div
        className="panel"
        style={{ paddingTop: "1rem", paddingBottom: "2rem" }}
      >
        <div className="mx-auto w-full max-w-3xl">
          <h2 className="mb-2 text-2xl font-bold text-zinc-100">
            Easiest way to reach me
          </h2>
          <p className="mb-5 text-sm text-zinc-400">
            Send a short note about the role and team — I read everything and
            reply within a day or two.
          </p>
          <ContactForm />
        </div>
      </div>

      <div className="panel">
        <div className="text-center">
          <Footer />
        </div>
      </div>
    </>
  );
}
