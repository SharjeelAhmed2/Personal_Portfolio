
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { EXPERIENCE } from "./data/experience";

type Project = {
  id: string;
  title: string;
  year: number;
  tags: string[];
  blurb: string;
  links: { github?: string; demo?: string };
};

// helper to format dates quickly
function fmt(ym: string | undefined) {
  if (!ym) return "Present";
  const [y, m] = ym.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1).toLocaleString(undefined, { month: "short", year: "numeric" });
}
// --- Replace this with your real data later ---
const PROJECTS: Project[] = [
  {
    id: "budget-tracker",
    title: "Budget Tracker API & Dashboard",
    year: 2025,
    tags: ["Spring Boot", "React", "PostgreSQL", "JWT", "AWS S3"],
    blurb:
      "End-to-end budgeting app with JWT auth, S3 uploads, and email alerts.",
    links: {
      github: "https://github.com/SharjeelAhmed2/BudgetTracking",
      demo: "https://your-demo-url.com",
    },
  },
  {
    id: "lila-bot",
    title: "Mood-aware ChatGPT Wrapper",
    year: 2025,
    tags: ["FastAPI", "React", "OpenAI API", "Session Memory"],
    blurb:
      "Custom web client that tracks mood per message, supports journal mode, remembers the whole conversation, and many frontend customization",
    links: {
      github: "https://github.com/SharjeelAhmed2/Chat-GPT-Wrapper",
    },
  },
  {
    id: "image-uploader",
    title: "Image Uploader (NestJS + JWT + AWS S3)",
    year: 2024,
    tags: ["NestJS", "S3", "JWT", "PostgreSQL"],
    blurb: "Role-gated gallery with secure uploads and per-user access. Images uploaded on AWS S3 Bucket",
    links: {
      github: "https://github.com/SharjeelAhmed2/NestJS-with-S3",
    },
  },
  {
    id: "task-manager",
    title: "Task Management Application (Node + React)",
    year: 2023,
    tags: ["Express", "React", "MongoDB"],
    blurb: "",
    links: {
      github: "https://github.com/SharjeelAhmed2/Task-Management-App",
    },
  },
    {
    id: "crm-pipeline",
    title: "CRM Pipeline",
    year: 2023,
    tags: ["React"],
    blurb: "Chrome extension that enhances Gmail with CRM pipeline functionality, helping you manage your email communications more efficiently.",
    links: {
      github: "https://github.com/SharjeelAhmed2/CRM-Pipeline",
    },
  },
];

const ALL_TAGS = Array.from(new Set(PROJECTS.flatMap((p) => p.tags))).sort();

export default function App() {
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchesQuery =
        !query ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.blurb.toLowerCase().includes(query.toLowerCase());
      const matchesTags =
        activeTags.length === 0 || activeTags.every((t) => p.tags.includes(t));
      return matchesQuery && matchesTags;
    });
  }, [query, activeTags]);

  function toggleTag(tag: string) {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Navbar */}
      <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60 border-b border-neutral-800">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <a href="#home" className="font-semibold tracking-tight text-lg">
            Sharjeel · Portfolio
          </a>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#projects" className="hover:text-white/90">Projects</a>
            <a href="#experience" className="hover:text-white/90">Experience</a>
            <a href="#about" className="hover:text-white/90">About</a>
            <a href="#contact" className="hover:text-white/90">Contact</a>
            <a 
              href="/Sharjeel_Resume.pdf" 
              target="_blank" 
              rel="noreferrer"
              className="px-3 py-1.5 rounded-xl bg-white text-neutral-900 font-medium hover:opacity-90"
            >
              Resume
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight"
          >
            Software Engineer building practical, clean solutions.
          </motion.h1>
          <p className="mt-5 max-w-2xl text-neutral-300">
            I specialize in Java/Spring, NestJS, and React — lately exploring AI features
            like mood tracking, prompt tooling, and lightweight RAG. Here are a few
            projects you might like.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              "Java • Spring Boot",
              "NestJS • FastAPI",
              "React • Vite • Tailwind",
              "PostgreSQL • MongoDB",
              "AWS S3 • JWT • Email",
            ].map((chip) => (
              <span
                key={chip}
                className="text-xs md:text-sm border border-neutral-800 rounded-full px-3 py-1 bg-neutral-900"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="border-y border-neutral-800 bg-neutral-950/60">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full md:w-80 rounded-xl bg-neutral-900 border border-neutral-800 px-4 py-2 outline-none focus:ring-2 focus:ring-neutral-700"
            />
            <div className="flex flex-wrap gap-2">
              {ALL_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={
                    "rounded-full border px-3 py-1 text-sm transition " +
                    (activeTags.includes(tag)
                      ? "bg-white text-neutral-900 border-white"
                      : "bg-neutral-900 border-neutral-800 text-neutral-200 hover:border-neutral-700")
                  }
                >
                  {tag}
                </button>
              ))}
              {activeTags.length > 0 && (
                <button
                  onClick={() => setActiveTags([])}
                  className="text-sm underline decoration-dotted underline-offset-4"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Featured Projects</h2>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, idx) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.25, delay: idx * 0.05 }}
              className="group rounded-2xl border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-900 p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg leading-tight group-hover:underline underline-offset-4">
                  {p.title}
                </h3>
                <span className="text-xs text-neutral-400">{p.year}</span>
              </div>
              <p className="mt-2 text-sm text-neutral-300">{p.blurb}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="text-xs border border-neutral-700 px-2 py-0.5 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex gap-3 text-sm">
                {p.links.demo && (
                  <a
                    className="underline decoration-dotted underline-offset-4 hover:no-underline"
                    href={p.links.demo}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live Demo
                  </a>
                )}
                {p.links.github && (
                  <a
                    className="underline decoration-dotted underline-offset-4 hover:no-underline"
                    href={p.links.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </section>
          {/* Experience */}
<section id="experience" className="mx-auto max-w-6xl px-4 py-16">
  <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Experience</h2>
  <div className="mt-8 relative">
    {/* vertical line */}
    <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-neutral-800" />
    <ul className="space-y-8">
      {EXPERIENCE.map((job, i) => (
        <li key={i} className="relative pl-10 md:pl-14">
          {/* dot */}
          <span className="absolute left-3 md:left-5 top-1.5 h-2.5 w-2.5 rounded-full bg-white ring-4 ring-neutral-900 border border-neutral-800" />
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h3 className="font-semibold leading-tight">{job.title}</h3>
              <span className="text-neutral-400">·</span>
              <div className="text-neutral-300">{job.company}</div>
              {job.location && (
                <>
                  <span className="text-neutral-400">·</span>
                  <div className="text-neutral-400">{job.location}</div>
                </>
              )}
            </div>
            <div className="mt-1 text-sm text-neutral-400">
              {fmt(job.start)} — {fmt(job.end)}
              {job.employmentType ? ` · ${job.employmentType}` : ""}
            </div>
            <ul className="mt-3 list-disc pl-5 space-y-1.5 text-neutral-300 text-sm">
              {job.bullets.map((b, idx) => <li key={idx}>{b}</li>)}
            </ul>
            {job.skills && job.skills.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {job.skills.map((s) => (
                  <span key={s} className="text-xs border border-neutral-700 px-2 py-0.5 rounded-full">{s}</span>
                ))}
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  </div>
</section>
      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-4 pb-8">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6">
          <h2 className="text-2xl font-bold tracking-tight">About</h2>
          <p className="mt-3 text-neutral-300">
           Software Engineer | Backend & Full-Stack | Spring Boot • Node.js • PostgreSQL • T24
          With over 3.5 years of professional experience in fintech and enterprise systems, I specialize in building scalable backend services, automating workflows, and integrating AI into modern applications.
          I’ve worked on projects ranging from core banking APIs (T24) to full-stack budget management apps using GPT-4. My passion lies in solving real-world problems through elegant code — and learning new tech stacks like NestJS, FastAPI, and AWS along the way.

          Currently open to new challenges where I can grow, contribute, and bring fun tech ideas to life.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-4 pb-20">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6">
          <h2 className="text-2xl font-bold tracking-tight">Contact</h2>
          <p className="mt-3 text-neutral-300">
            Open to backend, full‑stack, and AI‑adjacent roles. The fastest way to reach me:
            <a className="ml-1 underline decoration-dotted underline-offset-4" href="mailto:sharjeelahmed614@gmail.com">sharjeelahmed614@gmail.com</a>.
          </p>
        </div>
      </section>

      <footer className="border-t border-neutral-800">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-neutral-400 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <span>© {new Date().getFullYear()} Sharjeel.</span>
          <span className="text-neutral-500">Built with React & Tailwind. Deployed on your platform of choice.</span>
        </div>
      </footer>
    </div>
  );
}
