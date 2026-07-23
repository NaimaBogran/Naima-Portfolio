import { useEffect } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SocialLinks } from "@/components/SocialLinks";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Download, ExternalLink, MapPin, Mail, Github, Linkedin, Globe } from "lucide-react";

export default function Resume() {
  useEffect(() => {
    document.title = "Resume | Naima Bogran | Full Stack Developer";
    const setMeta = (selector: string, content: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute("content", content);
    };
    setMeta("meta[name=\"description\"]", "Resume of Naima Bogran, Full Stack Developer based in Boston, MA.");
    setMeta("meta[property=\"og:title\"]", "Resume | Naima Bogran");
    setMeta("meta[property=\"og:url\"]", "https://naimabogran-portfolio.us/resume");
    setMeta("meta[name=\"twitter:title\"]", "Resume | Naima Bogran");
    setMeta("meta[name=\"twitter:url\"]", "https://naimabogran-portfolio.us/resume");
    return () => {
      document.title = "Naima Bogran | Full Stack Developer | Boston, MA";
      setMeta("meta[property=\"og:url\"]", "https://naimabogran-portfolio.us/");
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <span
              className="font-bold text-xl tracking-tighter cursor-pointer"
              style={{ fontFamily: "var(--font-display)" }}
            >
              NB<span className="text-primary">.</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2 text-sm" data-testid="button-back-home">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back home
              </Button>
            </Link>
            <Button asChild size="sm" className="gap-2 rounded-full" data-testid="button-download-resume-nav">
              <a href="/resume.pdf" download="Naima_Bogran_Resume.pdf">
                <Download className="h-4 w-4" aria-hidden="true" />
                Download PDF
              </a>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="pt-28 pb-24 px-4">
        <div className="container mx-auto max-w-3xl">

          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <h1
              className="text-4xl md:text-5xl font-bold mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Resume
            </h1>
            <p className="text-muted-foreground mb-6">
              View below or save a copy to your device.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
                <a href="/resume.pdf" download="Naima_Bogran_Resume.pdf" data-testid="button-download-resume">
                  <Download className="mr-2 h-5 w-5" aria-hidden="true" />
                  Download PDF
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-border dark:border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" data-testid="button-open-resume">
                  <ExternalLink className="mr-2 h-5 w-5" aria-hidden="true" />
                  Open in New Tab
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Resume card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="bg-card border border-border/60 dark:border-border rounded-2xl overflow-hidden shadow-xl"
            data-testid="resume-content"
          >
            {/* Resume header */}
            <div className="bg-primary/5 dark:bg-primary/10 border-b border-border/40 p-8 md:p-10">
              <h2
                className="text-3xl md:text-4xl font-bold text-foreground mb-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Naima Bogran
              </h2>
              <p className="text-primary font-semibold text-lg mb-5">Software Engineer</p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <a href="mailto:naima.e.bogran@gmail.com" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  naima.e.bogran@gmail.com
                </a>
                <a href="https://linkedin.com/in/naimabogran" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                  <Linkedin className="w-4 h-4 flex-shrink-0" />
                  linkedin.com/in/naimabogran
                </a>
                <a href="https://github.com/naimabogran" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                  <Github className="w-4 h-4 flex-shrink-0" />
                  github.com/naimabogran
                </a>
                <a href="https://naimabogran-portfolio.us" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                  <Globe className="w-4 h-4 flex-shrink-0" />
                  naimabogran-portfolio.us
                </a>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  Boston, MA
                </span>
              </div>
            </div>

            <div className="p-8 md:p-10 space-y-8">

              {/* Summary */}
              <ResumeSection title="Summary">
                <p className="text-muted-foreground leading-relaxed">
                  Software engineer with hands-on experience building full-stack and AI-powered applications using JavaScript, TypeScript, Next.js, and Node.js. Experienced collaborating on production-oriented AI systems, REST APIs, and modern web applications through Resilient Coders while leading technical community initiatives as Boston Chapter Lead for Latinas in Tech. Interested in building scalable software and AI-powered applications that improve how people work and interact with technology.
                </p>
              </ResumeSection>

              {/* Skills */}
              <ResumeSection title="Skills">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><span className="font-medium text-foreground">Languages:</span> JavaScript, TypeScript, HTML, CSS</p>
                  <p><span className="font-medium text-foreground">Frameworks & Technologies:</span> Next.js, Node.js, Express.js, Bootstrap, Docker, EJS, Figma, MongoDB, Git, GitHub, CI/CD, Vercel, REST APIs, WebRTC, Socket.io</p>
                  <p><span className="font-medium text-foreground">AI & Development:</span> RAG, LLMs, Prompt Engineering, Semantic Search, Model Evaluation, Data Preprocessing, Agile/Scrum, Object-Oriented Programming, API Integrations, Responsive Design</p>
                </div>
              </ResumeSection>

              {/* Work Experience */}
              <ResumeSection title="Work Experience">
                <div className="space-y-6">
                  <ResumeJob
                    title="AI Engineering Fellow"
                    org="Resilient Coders"
                    location="Boston, MA (Remote)"
                    dates="February 2026 – May 2026"
                    bullets={[
                      "Implemented data preprocessing workflows that boosted consistency across model evaluation pipelines, facilitating reliable testing and experimentation within a cross-functional AI engineering team.",
                      "Evaluated LLM performance through iterative testing and quantitative evaluation metrics, uncovering opportunities to increase model quality and response accuracy.",
                      "Debugged AI application workflows by identifying issues across model pipelines and collaborating with teammates to deliver stable, production-ready features.",
                    ]}
                  />
                  <ResumeJob
                    title="Full-Stack Developer"
                    org="Resilient Coders"
                    location="Boston, MA (Remote)"
                    dates="August 2025 – December 2025"
                    bullets={[
                      "Designed RESTful APIs to handle scalable backend functionality, enabling efficient data exchange between client and server applications.",
                      "Built 8 full-stack web applications using JavaScript, Node.js, Express, and EJS, including RESTful APIs and responsive user interfaces, while applying scalable backend architecture principles.",
                      "Collaborated in Agile sprints with a 20-person engineering team, participating in code reviews, pull requests, and weekly feature releases while following Git-based development workflows.",
                    ]}
                  />
                  <ResumeJob
                    title="Data Processing Assistant"
                    org="Northern Essex Community College"
                    location="Haverhill, MA"
                    dates="December 2024 – August 2025"
                    bullets={[
                      "Maintained and validated institutional datasets supporting academic and administrative reporting, ensuring data accuracy across multiple internal systems.",
                      "Streamlined data verification processes by identifying recurring inconsistencies and improving the reliability of institutional reporting.",
                      "Digitized thousands of institutional records spanning over 65 years, transforming historical paper records into searchable digital data that improved accessibility and long-term data preservation.",
                    ]}
                  />
                </div>
              </ResumeSection>

              {/* Projects */}
              <ResumeSection title="Projects">
                <div className="space-y-5">
                  <ResumeProject
                    title="BODY/DOUBLE"
                    link="github.com/NaimaBogran/body-double"
                    subtitle="Virtual Coworking Platform"
                    bullets={[
                      "Designed a responsive user experience that enabled users to create, join, and manage virtual coworking sessions across devices.",
                      "Developed intelligent partner-matching logic that allowed users to filter compatible work partners based on shared preferences and availability.",
                      "Integrated Socket.io and WebRTC to support reliable real-time communication and seamless virtual coworking sessions.",
                    ]}
                  />
                  <ResumeProject
                    title="Multilingual AI Document Assistant"
                    link="github.com/Resilient-Labs/multilingual-ai-document-assistant"
                    subtitle="Document Assistant"
                    bullets={[
                      "Built an AI-powered multilingual document assistant using Next.js, TypeScript, and retrieval-augmented generation (RAG) to enable multilingual document understanding and question answering.",
                      "Implemented semantic search, LLM-powered summarization, safety detection, and multilingual question answering to improve information retrieval across uploaded documents.",
                      "Collaborated on a privacy-first architecture using stateless APIs and zero-retention processing to protect sensitive user data while maintaining application performance.",
                    ]}
                  />
                </div>
              </ResumeSection>

              {/* Education */}
              <ResumeSection title="Education">
                <div>
                  <p className="font-semibold text-foreground">Northern Essex Community College</p>
                  <p className="text-muted-foreground text-sm">Associate's Degree, Computer Science</p>
                </div>
              </ResumeSection>

              {/* Certifications */}
              <ResumeSection title="Certifications">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <p className="text-muted-foreground">Google AI Fundamentals — Coursera</p>
                  <p className="text-sm text-muted-foreground">March 2026</p>
                </div>
              </ResumeSection>

              {/* Volunteer */}
              <ResumeSection title="Volunteer Experience">
                <ResumeJob
                  title="Chapter Lead"
                  org="Latinas in Tech Boston"
                  location="Boston, MA"
                  dates="March 2026 – Present"
                  bullets={[
                    "Lead marketing and communications initiatives for the LiT Boston Chapter, creating social media content and managing email campaigns to support community engagement and chapter events.",
                    "Drove 88.5% follower growth, 74% increase in unique visitors, and 50% rise in page views for LiT Boston's LinkedIn by leading marketing and communications strategy.",
                  ]}
                />
              </ResumeSection>

            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 text-center"
          >
            <p className="text-muted-foreground text-sm mb-4">Want the PDF version?</p>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-border dark:border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
              <a href="/resume.pdf" download="Naima_Bogran_Resume.pdf">
                <Download className="mr-2 h-5 w-5" aria-hidden="true" />
                Download PDF
              </a>
            </Button>
          </motion.div>

        </div>
      </main>

      <footer className="py-8 border-t border-border/40 text-center text-muted-foreground text-sm">
        <div className="container mx-auto px-4 flex flex-col items-center gap-4">
          <SocialLinks />
          <p>&copy; {new Date().getFullYear()} Naima Bogran, Full Stack Developer, Boston MA</p>
        </div>
      </footer>
    </div>
  );
}

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3
        className="text-xs font-bold uppercase tracking-widest text-primary mb-4 pb-2 border-b border-border/50"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

function ResumeJob({
  title, org, location, dates, bullets,
}: {
  title: string;
  org: string;
  location: string;
  dates: string;
  bullets: string[];
}) {
  return (
    <div>
      <div className="flex items-start justify-between gap-4 flex-wrap mb-1">
        <div>
          <p className="font-semibold text-foreground">{title}</p>
          <p className="text-sm text-primary font-medium">{org} <span className="text-muted-foreground font-normal">· {location}</span></p>
        </div>
        <p className="text-sm text-muted-foreground flex-shrink-0">{dates}</p>
      </div>
      <ul className="mt-2 space-y-1.5 list-disc list-outside ml-4">
        {bullets.map((b, i) => (
          <li key={i} className="text-sm text-muted-foreground leading-relaxed">{b}</li>
        ))}
      </ul>
    </div>
  );
}

function ResumeProject({
  title, link, subtitle, bullets,
}: {
  title: string;
  link: string;
  subtitle: string;
  bullets: string[];
}) {
  return (
    <div>
      <div className="flex items-start gap-2 flex-wrap mb-1">
        <p className="font-semibold text-foreground">{title}</p>
        <span className="text-muted-foreground text-sm">·</span>
        <a
          href={`https://${link}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary hover:underline"
        >
          {link}
        </a>
        <span className="text-muted-foreground text-sm">· {subtitle}</span>
      </div>
      <ul className="mt-2 space-y-1.5 list-disc list-outside ml-4">
        {bullets.map((b, i) => (
          <li key={i} className="text-sm text-muted-foreground leading-relaxed">{b}</li>
        ))}
      </ul>
    </div>
  );
}
