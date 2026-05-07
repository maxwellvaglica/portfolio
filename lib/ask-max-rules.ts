import { PROJECTS, EMAIL } from "@/app/data";
import { CAL_COM_URL } from "@/lib/constants";

export type AskMaxReply = {
  text: string;
  cta?: { label: string; href: string; external?: boolean };
};

type Rule = {
  id: string;
  // Each inner array is an AND group: ALL keywords must be present in the
  // question. ANY of the outer groups satisfying makes the rule eligible.
  keywords: string[][];
  reply: () => AskMaxReply;
  priority?: number;
};

// ---- project lookup ----------------------------------------------------------

const PROJECT_ALIASES: { match: string[]; id: string }[] = [
  { match: ["power", "grid"], id: "power-system-nn" },
  { match: ["power", "system"], id: "power-system-nn" },
  { match: ["overload"], id: "power-system-nn" },
  { match: ["branch", "predict"], id: "power-system-nn" },
  { match: ["pytorch", "demo"], id: "power-system-nn" },
  { match: ["live", "ml"], id: "power-system-nn" },
  { match: ["onnx"], id: "power-system-nn" },

  { match: ["rat"], id: "deeplabcut" },
  { match: ["deeplabcut"], id: "deeplabcut" },
  { match: ["deep", "lab"], id: "deeplabcut" },
  { match: ["pose", "estim"], id: "deeplabcut" },
  { match: ["resnet"], id: "deeplabcut" },

  { match: ["sea", "hero"], id: "seaheroquest" },
  { match: ["dementia"], id: "seaheroquest" },
  { match: ["spatial", "navigation"], id: "seaheroquest" },
  { match: ["seaheroquest"], id: "seaheroquest" },

  { match: ["leetcode"], id: "leetcode" },
  { match: ["leet", "code"], id: "leetcode" },
  { match: ["algorithm", "challenge"], id: "leetcode" },

  { match: ["bgp", "hijack"], id: "bgp-hijacking" },
  { match: ["border", "gateway"], id: "bgp-hijacking" },
  { match: ["mininet"], id: "bgp-hijacking" },

  { match: ["bgp", "measur"], id: "bgp-measurements" },
  { match: ["pybgpstream"], id: "bgp-measurements" },

  { match: ["sdn"], id: "sdn-firewall" },
  { match: ["openflow"], id: "sdn-firewall" },
  { match: ["pox"], id: "sdn-firewall" },

  { match: ["q-learn"], id: "qlearner" },
  { match: ["qlearn"], id: "qlearner" },
  { match: ["reinforcement"], id: "qlearner" },
  { match: ["dyna"], id: "qlearner" },

  { match: ["bag", "learner"], id: "strategy-evaluation" },
  { match: ["random", "tree"], id: "strategy-evaluation" },
  { match: ["strategy", "evaluat"], id: "strategy-evaluation" },
  { match: ["ensemble", "trad"], id: "strategy-evaluation" },

  { match: ["bollinger"], id: "indicator-evaluation" },
  { match: ["technical", "indicator"], id: "indicator-evaluation" },
  { match: ["theoretically", "optimal"], id: "indicator-evaluation" },

  { match: ["api", "security"], id: "api-security" },
  { match: ["owasp", "api"], id: "api-security" },

  { match: ["web", "security"], id: "web-security" },
  { match: ["xss"], id: "web-security" },
  { match: ["csrf"], id: "web-security" },
  { match: ["sql", "injection"], id: "web-security" },

  { match: ["cryptography"], id: "cryptography" },
  { match: ["rsa"], id: "cryptography" },
  { match: ["vigenere"], id: "cryptography" },
  { match: ["cipher"], id: "cryptography" },
  { match: ["encrypt"], id: "cryptography" },

  { match: ["plc"], id: "plc-programming" },
  { match: ["structured", "text"], id: "plc-programming" },
  { match: ["industrial", "automat"], id: "plc-programming" },

  { match: ["jobcompare"], id: "jobcompare-6300" },
  { match: ["job", "compare"], id: "jobcompare-6300" },
  { match: ["android", "team"], id: "jobcompare-6300" },
  { match: ["6300"], id: "jobcompare-6300" },

  { match: ["ml", "cyber"], id: "ml-cybersecurity" },
  { match: ["machine", "learning", "cyber"], id: "ml-cybersecurity" },
  { match: ["threat", "detect"], id: "ml-cybersecurity" },
];

function findProject(lower: string) {
  for (const p of PROJECTS) {
    if (lower.includes(p.id)) return p;
    if (lower.includes(p.name.toLowerCase())) return p;
  }
  for (const k of PROJECT_ALIASES) {
    if (k.match.every((m) => lower.includes(m))) {
      const proj = PROJECTS.find((p) => p.id === k.id);
      if (proj) return proj;
    }
  }
  return null;
}

// ---- rules -------------------------------------------------------------------

const RULES: Rule[] = [
  {
    id: "greeting",
    keywords: [["hi"], ["hello"], ["hey"], ["howdy"], ["greetings"], ["yo "]],
    priority: 0,
    reply: () => ({
      text: "Hey! I'm a small assistant on Max's site. Ask me about his roles, projects, location, stack, or contact info — examples are below.",
    }),
  },

  // ---- current employment / what he does ----
  {
    id: "current_employer",
    keywords: [
      ["where", "work"],
      ["currently", "work"],
      ["current", "job"],
      ["current", "employer"],
      ["current", "company"],
      ["who", "work", "for"],
      ["where", "currently"],
      ["right now", "work"],
      ["current", "role"],
      ["where", "employ"],
      ["tempus"],
      ["computational", "biolog"],
    ],
    reply: () => ({
      text: "Computational Biologist at Tempus Labs (Chicago) since 2021. He builds production data pipelines, FastAPI services, and GCP-deployed cloud apps used daily by 100+ scientists across multiple US labs. Also integrates lab instruments with internal databases and runs the automated label-printing systems.",
    }),
  },
  {
    id: "what_does_max_do",
    keywords: [
      ["what", "do"],
      ["what", "build"],
      ["what", "max", "do"],
      ["what", "kind", "of work"],
      ["what", "type", "of work"],
      ["day", "to day"],
      ["day-to-day"],
      ["responsibilit"],
    ],
    reply: () => ({
      text: "Day-to-day: production data pipelines and cloud apps on GCP at Tempus Labs (FastAPI + Python + BigQuery + CI/CD), plus applied ML — including the trained PyTorch model running live on the power-system page of this site.",
    }),
  },
  {
    id: "previous_work",
    keywords: [
      ["before", "tempus"],
      ["previous", "job"],
      ["previous", "role"],
      ["previous", "work"],
      ["former", "employer"],
      ["last", "job"],
      ["indiana"],
      ["newman"],
      ["research", "programmer"],
      ["academia"],
    ],
    reply: () => ({
      text: "Before Tempus he was a Research Programmer at Indiana University's Newman Memory Lab (2019–2021). Built DeepLabCut-based ML pipelines for automated rat-behavior tracking and analyzed 4M+ Sea Hero Quest gameplay sessions for spatial-navigation / dementia research.",
    }),
  },
  {
    id: "years_experience",
    keywords: [
      ["how", "many", "years"],
      ["years", "experience"],
      ["years", "of"],
      ["how long", "work"],
      ["how", "long", "engineer"],
      ["seniority"],
      ["experienced"],
    ],
    reply: () => ({
      text: "4+ years of professional engineering experience: ~5 years at Tempus Labs (2021–present) plus 2 years as a Research Programmer at Indiana University before that. He's been writing code for production systems, not just notebooks, the whole time.",
    }),
  },

  // ---- availability / roles ----
  {
    id: "available",
    keywords: [
      ["available"],
      ["actively"],
      ["open", "to", "role"],
      ["open", "role"],
      ["job", "search"],
      ["looking", "for", "role"],
      ["looking", "for", "work"],
      ["looking", "for", "job"],
      ["looking", "for", "position"],
      ["interview"],
      ["new", "role"],
      ["new", "job"],
      ["new", "opportun"],
      ["next", "role"],
      ["next", "step"],
    ],
    reply: () => ({
      text: "Yes — actively exploring full-time roles in ML / AI Engineering, Data Engineering, Backend / Full-Stack, Solutions Architecture, and Applied Science. Open to remote, hybrid, or relocation.",
      cta: { label: "Book a 15-min call", href: CAL_COM_URL, external: true },
    }),
  },
  {
    id: "what_roles",
    keywords: [
      ["what", "role"],
      ["what", "kind", "of job"],
      ["what", "kind", "of role"],
      ["what", "type", "of role"],
      ["what", "type", "of job"],
      ["which", "role"],
      ["target", "role"],
      ["target", "job"],
      ["roles"],
      ["positions"],
    ],
    reply: () => ({
      text: "Top targets: ML / AI Engineer, Data Engineer, Backend / Full-Stack Engineer, Solutions Architect, and Applied Scientist / Research Engineer. He cares more about the team and the systems than the exact title.",
    }),
  },

  // ---- logistics ----
  {
    id: "location",
    keywords: [
      ["where", "based"],
      ["where", "live"],
      ["where", "located"],
      ["location"],
      ["chicago"],
      ["timezone"],
      ["time", "zone"],
      ["remote"],
      ["relocate"],
      ["relocation"],
      ["onsite"],
      ["hybrid"],
      ["in person"],
    ],
    reply: () => ({
      text: "Based in Chicago (Central Time). Open to remote, hybrid, or relocation for the right role.",
    }),
  },
  {
    id: "comp",
    keywords: [
      ["salary"],
      ["compensation"],
      ["comp"],
      ["pay"],
      ["expectation", "money"],
      ["how much"],
      ["range"],
      ["base"],
      ["package"],
      ["stock"],
      ["equity"],
    ],
    reply: () => ({
      text: "Comp is open to discussion based on role, level, and location. He's happy to share his range on a 15-min call.",
      cta: { label: "Book a 15-min call", href: CAL_COM_URL, external: true },
    }),
  },
  {
    id: "visa",
    keywords: [
      ["visa"],
      ["sponsor"],
      ["sponsorship"],
      ["citizen"],
      ["authoriz"],
      ["work permit"],
      ["green card"],
      ["us citizen"],
      ["u.s."],
    ],
    reply: () => ({
      text: "U.S. citizen — no sponsorship required.",
    }),
  },
  {
    id: "notice",
    keywords: [
      ["notice", "period"],
      ["how", "soon"],
      ["how", "quick"],
      ["when", "start"],
      ["start", "date"],
      ["available", "start"],
      ["available", "when"],
      ["earliest", "start"],
      ["lead", "time"],
    ],
    reply: () => ({
      text: "Two weeks notice at the current role. Available to start any reasonable timeline after that.",
    }),
  },

  // ---- education ----
  {
    id: "education",
    keywords: [
      ["education"],
      ["school"],
      ["degree"],
      ["college"],
      ["university"],
      ["georgia tech"],
      ["gatech"],
      ["ga tech"],
      ["omscs"],
      ["bachelor"],
      ["bs "],
      ["b.s."],
      ["master"],
      ["ms "],
      ["m.s."],
      ["graduate"],
      ["alma mater"],
    ],
    reply: () => ({
      text: "M.S. Computer Science from Georgia Tech, Computing Systems specialization (graduated April 2026, completed while working full-time at Tempus). B.S. in Cognitive Science from Indiana University Bloomington (2017–2021) — interdisciplinary mix of psychology, neuroscience, philosophy, and computer science.",
    }),
  },
  {
    id: "gpa",
    keywords: [["gpa"], ["grade"], ["grades"], ["academic", "performance"]],
    reply: () => ({
      text: "Strong academic record at Georgia Tech — happy to share specifics privately. He treats grades as a soft signal next to actual shipped projects.",
    }),
  },
  {
    id: "specialization",
    keywords: [
      ["specialization"],
      ["concentration"],
      ["focus", "area"],
      ["computing systems"],
    ],
    reply: () => ({
      text: "Computing Systems specialization at Georgia Tech — distributed systems, networks, security, advanced operating systems. Picked it specifically to deepen the systems-thinking side of his profile beyond just ML.",
    }),
  },

  // ---- stack / specific tech ----
  {
    id: "stack",
    keywords: [
      ["stack"],
      ["skills"],
      ["technologies"],
      ["tools"],
      ["languages"],
      ["framework"],
      ["tech he"],
      ["tech you"],
      ["what's his stack"],
      ["whats his stack"],
    ],
    reply: () => ({
      text: "Python is home — FastAPI, PyTorch, Pandas, scikit-learn. Cloud: GCP + BigQuery in production for years; Docker, Kubernetes, CI/CD. Also comfortable with SQL, Swift / SwiftUI (two iOS apps in the App Store), Java / Android (the JobCompare 6300 team project), and modern agentic-AI tooling like LangChain.",
    }),
  },
  {
    id: "python",
    keywords: [["python"]],
    reply: () => ({
      text: "Python is his daily driver — 4+ years professional. Most projects on the site are Python: data pipelines (Pandas / Dask), ML (PyTorch / scikit-learn), web (FastAPI), automation, and analysis.",
    }),
  },
  {
    id: "fastapi",
    keywords: [["fastapi"], ["fast api"]],
    reply: () => ({
      text: "Yes — he's used FastAPI in production at Tempus to build internal REST APIs that integrate lab instruments with databases and surface data to scientists. Comfortable with auth, async handlers, OpenAPI schemas, and CI deployment.",
    }),
  },
  {
    id: "pytorch",
    keywords: [["pytorch"], ["torch"]],
    reply: () => ({
      text: "Yes. The Power-System NN on this site is a trained PyTorch model — you can play with it on the project page. Also used PyTorch for research-side ML at Indiana and graduate ML coursework at Georgia Tech.",
      cta: {
        label: "Open the PyTorch demo",
        href: "/projects/power-system-nn",
      },
    }),
  },
  {
    id: "gcp",
    keywords: [
      ["gcp"],
      ["google cloud"],
      ["bigquery"],
      ["cloud", "platform"],
      ["cloud run"],
    ],
    reply: () => ({
      text: "GCP / BigQuery in production at Tempus for 4+ years. Cloud Run / Cloud Functions for serverless, BigQuery for analytics warehouse, IAM and service accounts for secure cross-team access.",
    }),
  },
  {
    id: "aws_azure",
    keywords: [["aws"], ["azure"], ["amazon", "web"]],
    reply: () => ({
      text: "His production cloud experience is GCP, but he picks up new clouds fast — the patterns map. The graduate cloud-computing coursework at Georgia Tech was AWS-flavored.",
    }),
  },
  {
    id: "sql",
    keywords: [["sql"], ["postgres"], ["mysql"], ["database"]],
    reply: () => ({
      text: "SQL daily at Tempus — both transactional databases and BigQuery. Comfortable with multi-table joins, window functions, and the kinds of LeetCode-grade Pandas / SQL problems on the leetcode project page.",
    }),
  },
  {
    id: "docker_k8s",
    keywords: [
      ["docker"],
      ["kubernetes"],
      ["k8s"],
      ["container"],
      ["containeriz"],
    ],
    reply: () => ({
      text: "Docker daily; Kubernetes for some deployments. CI/CD via GitHub Actions and Cloud Build at Tempus.",
    }),
  },
  {
    id: "swift_ios",
    keywords: [
      ["ios"],
      ["app store"],
      ["swift"],
      ["swiftui"],
      ["tabguard"],
      ["photoscan"],
      ["mobile", "app"],
    ],
    reply: () => ({
      text: "Two shipped iOS apps on the App Store: TabGuard (popup / tab blocker for Safari) and PhotoScan (QR + barcode reader from your photo library). Both Swift / SwiftUI, both built solo this year.",
      cta: { label: "See TabGuard", href: "/tabguard" },
    }),
  },
  {
    id: "java_android",
    keywords: [["java"], ["android"]],
    reply: () => ({
      text: "Java / Android via the JobCompare 6300 team project at Georgia Tech — full SDLC artifacts (component diagrams, class diagrams, use-case model, written test plan, weekly reports). Code-review-ready example of teamwork on a real codebase.",
      cta: { label: "See JobCompare 6300", href: "/projects/jobcompare-6300" },
    }),
  },
  {
    id: "ml_general",
    keywords: [
      ["ml"],
      ["machine learning"],
      ["deep learning"],
      ["neural network"],
      ["model"],
      ["train", "model"],
    ],
    reply: () => ({
      text: "Applied ML in production — not just notebooks. PyTorch for the Power-System NN (live on this site), classical ML for security threat detection, ensemble methods for trading strategies, RL Q-learners. Deep-learning research-side experience from the Newman Memory Lab.",
      cta: { label: "Try the live ML demo", href: "/projects/power-system-nn" },
    }),
  },
  {
    id: "ai_agentic",
    keywords: [
      ["agentic"],
      ["langchain"],
      ["rag"],
      ["llm"],
      ["llms"],
      ["chatgpt"],
      ["openai"],
      ["claude"],
      ["gpt"],
    ],
    reply: () => ({
      text: "Building agentic-AI prototypes with LangChain and modern LLM tooling. The Ask Max widget you're using is intentionally rule-based for reliability, but real LLM work shows up in the project pages.",
    }),
  },
  {
    id: "data_eng",
    keywords: [
      ["data", "pipeline"],
      ["etl"],
      ["data", "engineer"],
      ["airflow"],
      ["dbt"],
      ["data", "warehouse"],
    ],
    reply: () => ({
      text: "Production data pipelines at Tempus serving 100+ scientists for 2+ years — design, deployment, on-call. GCP / BigQuery / Python. Comfortable with the design-doc-and-architecture side as well as the day-to-day implementation.",
    }),
  },
  {
    id: "security",
    keywords: [
      ["security"],
      ["pentest"],
      ["penetration"],
      ["cybersecurity"],
      ["owasp"],
    ],
    reply: () => ({
      text: "Three security projects on the site: API security (OWASP API Top 10), Web security (SQLi / XSS / CSRF), and BGP hijacking simulation. He thinks about adversarial inputs by default — useful for fintech, infra, or any role where correctness has teeth.",
    }),
  },
  {
    id: "networks",
    keywords: [
      ["network"],
      ["networking"],
      ["bgp"],
      ["routing"],
      ["sdn"],
      ["openflow"],
    ],
    reply: () => ({
      text: "Three graduate networking projects: BGP hijacking simulation in Mininet, BGP measurements with pybgpstream, and an SDN firewall using POX / OpenFlow. The BGP hijacking project earned 150% (bonus included).",
    }),
  },
  {
    id: "research",
    keywords: [
      ["research"],
      ["paper"],
      ["publication"],
      ["academic"],
      ["thesis"],
      ["scientist"],
    ],
    reply: () => ({
      text: "Research-engineering background at Indiana's Newman Memory Lab (2019–2021): DeepLabCut pipelines for behavioral neuroscience and large-scale Sea Hero Quest data analysis (4M+ players, 78k+ complete sessions, 74-level cross-correlation). Comfortable working alongside scientists and translating their requirements into systems.",
    }),
  },

  // ---- impact / metrics ----
  {
    id: "impact",
    keywords: [
      ["impact"],
      ["users", "served"],
      ["100"],
      ["scale"],
      ["how many users"],
      ["who", "uses"],
      ["scientist", "use"],
    ],
    reply: () => ({
      text: "Tempus pipelines: 100+ scientists across multiple US labs, used daily for 2+ years, processing nucleic-acid sequencing data for clinical reports. JobCompare 6300: shipped APK with 4-person team. Sea Hero Quest analysis: 4M+ players, 78k+ complete sessions.",
    }),
  },
  {
    id: "open_source",
    keywords: [["open source"], ["github"], ["repos"], ["contributions"]],
    reply: () => ({
      text: "github.com/maxwellvaglica — most projects on this site are public there. Open-source contributions to LangChain ecosystem and a handful of smaller libraries.",
    }),
  },

  // ---- demos / projects ----
  {
    id: "live_demos",
    keywords: [
      ["demo"],
      ["live"],
      ["interactive"],
      ["try"],
      ["play with"],
      ["sandbox"],
    ],
    reply: () => ({
      text: "Two live in-browser demos: a trained PyTorch model for power-grid overload prediction (sliders + a 46-branch heatmap), and an RSA cryptography sandbox you can encrypt and decrypt against. Both run entirely client-side.",
      cta: {
        label: "Open the power-grid demo",
        href: "/projects/power-system-nn",
      },
    }),
  },
  {
    id: "projects_list",
    keywords: [
      ["projects", "list"],
      ["all", "project"],
      ["show", "project"],
      ["what", "projects"],
      ["which", "projects"],
      ["portfolio", "project"],
      ["ml", "project"],
    ],
    reply: () => ({
      text: `${PROJECTS.length} projects on the site, grouped roughly into ML / AI, networking, security, software engineering, and quant finance. Featured trio: power-system NN (live demo), DeepLabCut rat tracking, and Sea Hero Quest analysis. Full set on the homepage carousel.`,
      cta: { label: "Open homepage projects", href: "/#projects" },
    }),
  },

  // ---- contact ----
  {
    id: "contact",
    keywords: [
      ["email"],
      ["contact"],
      ["reach"],
      ["get in touch"],
      ["how", "talk"],
      ["how", "connect"],
      ["how", "message"],
      ["dm"],
    ],
    reply: () => ({
      text: `Email: ${EMAIL}. Fastest way to start a conversation is the 15-min Cal.com link below — wired into his Outlook + Gmail calendars.`,
      cta: { label: "Book a 15-min call", href: CAL_COM_URL, external: true },
    }),
  },
  {
    id: "schedule",
    keywords: [
      ["schedule"],
      ["book"],
      ["call"],
      ["meeting"],
      ["calendar"],
      ["chat"],
      ["intro", "call"],
    ],
    reply: () => ({
      text: "Pick a time on the Cal.com link below — it's wired into Max's Outlook and Gmail calendars, so what you see is real availability.",
      cta: { label: "Book a 15-min call", href: CAL_COM_URL, external: true },
    }),
  },
  {
    id: "social",
    keywords: [["linkedin"], ["social", "media"], ["github profile"]],
    reply: () => ({
      text: "LinkedIn: linkedin.com/in/max-vaglica — GitHub: github.com/maxwellvaglica. Social pills are at the bottom of the homepage too.",
    }),
  },
  {
    id: "resume",
    keywords: [["resume"], ["cv"], ["pdf"], ["download"]],
    reply: () => ({
      text: "Resume PDF is downloadable from the Opportunities page, the homepage footer, and any of the /for/{company} pages.",
      cta: {
        label: "Download resume",
        href: "/maxwell_vaglica_resume_may.pdf",
      },
    }),
  },

  // ---- pitch / strengths ----
  {
    id: "why_hire",
    keywords: [
      ["why", "hire"],
      ["why", "you"],
      ["why", "him"],
      ["why", "max"],
      ["best at"],
      ["strength"],
      ["why", "fit"],
      ["pitch"],
      ["sell"],
      ["what", "good"],
    ],
    reply: () => ({
      text: "Three things: (1) production data pipelines at Tempus serving 100+ scientists for 2+ years; (2) applied ML / agentic AI shipped in real systems, not just notebooks; (3) owns projects end-to-end — requirements gathering with non-technical stakeholders, architecture, deploy, on-call.",
    }),
  },
  {
    id: "team",
    keywords: [
      ["team"],
      ["collaborat"],
      ["communicat"],
      ["soft skills"],
      ["mentor"],
      ["lead"],
      ["work", "with"],
    ],
    reply: () => ({
      text: "Cross-functional comfort is the unusual part of his profile — four years at Tempus translating between scientists, lab ops, and infrastructure. The JobCompare 6300 project is a four-person team build with full SDLC artifacts if you want a code-review-ready example.",
    }),
  },
  {
    id: "weakness",
    keywords: [
      ["weakness"],
      ["weak"],
      ["limitations"],
      ["not good at"],
      ["bad at"],
    ],
    reply: () => ({
      text: "Honest version: front-end design beyond \"competent and clean\" isn't his strength — he leans on UI libraries instead of pixel-pushing. He'll happily sit next to a designer and ship.",
    }),
  },
  {
    id: "industries",
    keywords: [
      ["industry"],
      ["industries"],
      ["domain"],
      ["sector"],
      ["healthcare"],
      ["fintech"],
      ["energy"],
    ],
    reply: () => ({
      text: "Worked in: healthcare / life sciences (Tempus) and academic research (Indiana). Wants to learn: anything with a hard correctness or reliability bar — fintech, infra, AI tooling, climate / energy, scientific computing.",
    }),
  },

  {
    id: "thanks",
    keywords: [["thank"], ["appreciate"], ["thanks"]],
    reply: () => ({
      text: "Anytime — book a call or email if you want to dig in.",
      cta: { label: "Book a 15-min call", href: CAL_COM_URL, external: true },
    }),
  },
];

function scoreRule(rule: Rule, lower: string): number {
  let best = 0;
  for (const group of rule.keywords) {
    if (group.every((kw) => lower.includes(kw))) {
      best = Math.max(best, group.length);
    }
  }
  return best;
}

export function answerAskMax(question: string): AskMaxReply {
  const trimmed = question.trim();
  if (!trimmed) {
    return { text: "Ask me anything — short questions work best." };
  }
  const lower = trimmed.toLowerCase();

  let best: { rule: Rule; score: number } | null = null;
  for (const rule of RULES) {
    const score = scoreRule(rule, lower);
    if (score > 0 && (!best || score > best.score)) {
      best = { rule, score };
    }
  }

  // Project lookup is a tie-breaker when no high-score rule matched. A specific
  // project name beats a generic 1-keyword rule.
  const proj = findProject(lower);
  if (proj && (!best || best.score < 2)) {
    return {
      text: `${proj.name} — ${proj.description}`,
      cta: { label: "Open project page", href: `/projects/${proj.id}` },
    };
  }

  if (best) return best.rule.reply();

  return {
    text: `Not sure I have that detail on me — Max can answer directly at ${EMAIL}, or grab a 15-min slot below.`,
    cta: { label: "Book a 15-min call", href: CAL_COM_URL, external: true },
  };
}

export const SUGGESTED_QUESTIONS: string[] = [
  "Where does Max currently work?",
  "What roles is he looking for?",
  "What's his stack?",
  "Tell me about the power-system demo",
  "Is he open to relocation?",
];
