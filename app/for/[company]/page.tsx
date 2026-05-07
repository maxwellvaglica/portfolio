import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/app/data";
import companies from "@/app/for/companies.json";
import { CAL_COM_URL, WEBSITE_URL } from "@/lib/constants";
import { Footer } from "@/app/footer";

type CompanyEntry = {
  slug: string;
  companyName: string;
  roleTitle: string;
  intro: string;
  featuredProjectIds: string[];
  whyImAFit: string[];
  ctaText: string;
};

const COMPANIES = companies as CompanyEntry[];

export async function generateStaticParams() {
  return COMPANIES.map((c) => ({ company: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ company: string }>;
}): Promise<Metadata> {
  const { company } = await params;
  const entry = COMPANIES.find((c) => c.slug === company);
  if (!entry) return { title: "Not found" };
  const title = `For ${entry.companyName}`;
  const description = `Why I'd be a great fit for ${entry.roleTitle} at ${entry.companyName}.`;
  return {
    title,
    description,
    alternates: { canonical: `${WEBSITE_URL}/for/${entry.slug}` },
    openGraph: {
      title: `${title} | Maxwell Vaglica`,
      description,
      url: `${WEBSITE_URL}/for/${entry.slug}`,
      type: "profile",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ company: string }>;
}) {
  const { company } = await params;
  const entry = COMPANIES.find((c) => c.slug === company);
  if (!entry) notFound();

  const featuredProjects = entry.featuredProjectIds
    .map((id) => PROJECTS.find((p) => p.id === id))
    .filter(Boolean) as typeof PROJECTS;

  return (
    <>
      <div
        className="panel"
        style={{ paddingTop: "3rem", paddingBottom: "2rem" }}
      >
        <div className="mx-auto w-full max-w-3xl">
          <Link
            href="/"
            className="mb-6 inline-block text-sm text-zinc-500 transition-colors hover:text-zinc-200"
          >
            ← Maxwell Vaglica
          </Link>

          <div className="mb-2 text-sm tracking-wide text-emerald-400 uppercase">
            For {entry.companyName}
          </div>
          <h1 className="text-4xl font-bold text-zinc-100 md:text-5xl">
            Why I&apos;d be a great fit for {entry.roleTitle}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-zinc-300">
            {entry.intro}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={CAL_COM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
            >
              {entry.ctaText}
            </a>
            <Link
              href="/opportunities"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-5 py-2.5 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-500"
            >
              Full opportunities page →
            </Link>
            <a
              href="/maxwell_vaglica_resume_may.pdf"
              download
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-5 py-2.5 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-500"
            >
              Download resume
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
            Why I&apos;m a fit
          </h2>
          <ul className="space-y-3">
            {entry.whyImAFit.map((point, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4"
              >
                <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                <span className="leading-relaxed text-zinc-300">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {featuredProjects.length > 0 && (
        <div
          className="panel"
          style={{ paddingTop: "1rem", paddingBottom: "3rem" }}
        >
          <div className="mx-auto w-full max-w-3xl">
            <h2 className="mb-2 text-2xl font-bold text-zinc-100">
              Most relevant projects
            </h2>
            <p className="mb-6 text-sm text-zinc-500">
              Hand-picked because they map most directly to the work at{" "}
              {entry.companyName}.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {featuredProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 transition-all hover:border-zinc-600 hover:bg-zinc-900"
                >
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-white">
                      {project.name}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-400">
                      {project.description}
                    </p>
                    <div className="mt-3 text-xs text-emerald-400 group-hover:text-emerald-300">
                      View project →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="panel">
        <div className="text-center">
          <Footer />
        </div>
      </div>
    </>
  );
}
