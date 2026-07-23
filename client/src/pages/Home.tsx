import { useEffect, useState } from "react";
import { useProjects } from "@/hooks/use-projects";
import { ProjectCard } from "@/components/ProjectCard";
import { ContactForm } from "@/components/ContactForm";
import { SocialLinks } from "@/components/SocialLinks";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "wouter";
import {
  Code,
  Database,
  Globe,
  Layers,
  Server,
  MapPin,
  Briefcase,
  Users,
  Heart,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  const { data: projects, isLoading } = useProjects();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.title = "Naima Bogran | Full Stack Developer | Boston, MA";
    const setMeta = (selector: string, content: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute("content", content);
    };
    setMeta('meta[name="description"]', "Naima Bogran is a Full Stack Developer based in Boston, MA. She builds full-stack web applications, has experience with AI-powered tools, and leads the Latinas in Tech Boston chapter.");
    setMeta('meta[property="og:title"]', "Naima Bogran | Full Stack Developer");
    setMeta('meta[property="og:description"]', "Full Stack Developer building real products from idea to launch. Based in Boston, MA. Chapter Lead at Latinas in Tech Boston.");
    setMeta('meta[name="twitter:title"]', "Naima Bogran | Full Stack Developer");
    setMeta('meta[name="twitter:description"]', "Full Stack Developer building real products from idea to launch. Based in Boston, MA. Chapter Lead at Latinas in Tech Boston.");
  }, []);

  const skills = [
    { name: "JavaScript", icon: Code },
    { name: "Node.js", icon: Server },
    { name: "Express", icon: Layers },
    { name: "MongoDB", icon: Database },
    { name: "PostgreSQL", icon: Database },
    { name: "Full Stack", icon: Globe },
  ];

  const communityCards = [
    {
      icon: Users,
      title: "Latinas in Tech Boston",
      role: "Chapter Lead",
      description:
        "Leading and growing Latinas in Tech Boston, organizing events, building community, and creating space for Latina engineers to connect, grow, and thrive.",
    },
    {
      icon: Code,
      title: "Resilient Coders",
      role: "Member & Volunteer",
      description:
        "Actively involved with Resilient Coders, a Boston-based nonprofit that trains people of color for careers in software engineering. Giving back to a community that believes in expanding access to tech.",
    },
    {
      icon: Heart,
      title: "Mentorship",
      role: "Mentor",
      description:
        "Mentoring engineers who are early in their careers, sharing what I've learned, helping people navigate job searches, and paying forward the support I've received along the way.",
    },
    {
      icon: Globe,
      title: "Boston Tech Ecosystem",
      role: "Community Organizer",
      description:
        "Networking, attending hackathons, and showing up for the Boston tech community. Connecting builders, founders, and engineers who are doing meaningful work.",
    },
  ];

  const navLinks = [
    { label: "About", to: "about" },
    { label: "Projects", to: "projects" },
    { label: "Community", to: "community" },
    { label: "Contact", to: "contact" },
  ];

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

          <div className="flex items-center gap-6">
            {/* Desktop nav */}
            <div className="hidden md:flex gap-6 text-sm font-medium">
              {navLinks.map((link) => (
                <ScrollLink
                  key={link.label}
                  to={link.to}
                  smooth={true}
                  offset={-64}
                  className="cursor-pointer hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                  tabIndex={0}
                >
                  {link.label}
                </ScrollLink>
              ))}
              <Link href="/projects">
                <span className="cursor-pointer hover:text-primary transition-colors text-sm font-medium">
                  All Projects
                </span>
              </Link>
              <Link href="/resume">
                <span className="cursor-pointer hover:text-primary transition-colors text-sm font-medium">
                  Resume
                </span>
              </Link>
            </div>
            <ThemeToggle />

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-muted/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-md"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <ScrollLink
                  key={link.label}
                  to={link.to}
                  smooth={true}
                  offset={-64}
                  className="cursor-pointer text-base font-medium hover:text-primary transition-colors py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </ScrollLink>
              ))}
              <Link href="/projects" onClick={() => setMobileMenuOpen(false)}>
                <span className="cursor-pointer text-base font-medium hover:text-primary transition-colors py-1 block">
                  All Projects
                </span>
              </Link>
              <Link href="/resume" onClick={() => setMobileMenuOpen(false)}>
                <span className="cursor-pointer text-base font-medium hover:text-primary transition-colors py-1 block">
                  Resume
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </nav>

      <main>
        {/* Hero */}
        <section
          id="hero"
          aria-label="Introduction"
          className="pt-32 pb-20 md:pt-48 md:pb-32 px-4 relative overflow-hidden"
        >
          <div
            className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -z-10"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] -z-10"
            aria-hidden="true"
          />

          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
                  Available for Hire
                </div>
                <h1
                  className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Hi, I'm <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                    Naima Bogran
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed mb-4 max-w-lg">
                  Full Stack Developer building products from idea to launch. I
                  turn real problems into real software: clean, functional, and
                  built to matter.
                </p>
                <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-lg">
                  I've built full-stack web apps, worked on AI-powered document
                  tools, and collaborated with early-stage startups. When I'm
                  not coding, I'm leading community at{" "}
                  <span className="text-foreground font-medium">
                    Latinas in Tech Boston
                  </span>
                  .
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                  <ScrollLink to="projects" smooth={true} offset={-64}>
                    <Button
                      size="lg"
                      data-testid="button-view-work"
                      className="rounded-full px-8 text-lg h-14 shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all w-full sm:w-auto"
                    >
                      View My Work
                    </Button>
                  </ScrollLink>
                  <ScrollLink to="contact" smooth={true} offset={-64}>
                    <Button
                      size="lg"
                      variant="outline"
                      data-testid="button-contact"
                      className="rounded-full px-8 text-lg h-14 border-2 w-full sm:w-auto"
                    >
                      Let's Talk
                    </Button>
                  </ScrollLink>
                </div>

                <SocialLinks />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative flex justify-center"
              >
                <div className="relative w-72 h-72 md:w-96 md:h-96">
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-primary/40 dark:border-primary/70"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    aria-hidden="true"
                  />
                  <motion.div
                    className="absolute inset-4 rounded-full border-2 border-dashed border-purple-400/40 dark:border-purple-400/70"
                    animate={{ rotate: -360, scale: [1, 1.05, 1] }}
                    transition={{
                      duration: 25,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    aria-hidden="true"
                  />
                  <div
                    className="absolute inset-8 rounded-full ring-4 ring-primary/30 dark:ring-primary/60 shadow-2xl shadow-primary/30 dark:shadow-primary/50"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-8 rounded-full overflow-hidden">
                    <img
                      src="/images/headshot.jpg"
                      alt="Naima Bogran, Full Stack Developer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Skills bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-24 pt-12 border-t border-border/40"
              aria-label="Tech stack"
            >
              <p className="text-center text-muted-foreground mb-8 font-medium text-sm uppercase tracking-widest">
                Built with
              </p>
              <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                {skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex flex-col items-center gap-2 group cursor-default"
                  >
                    <skill.icon
                      className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors duration-300"
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* About */}
        <section
          id="about"
          aria-labelledby="about-heading"
          className="py-24 bg-secondary/30"
        >
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                <h2
                  id="about-heading"
                  className="text-3xl md:text-5xl font-bold mb-8"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  About Me
                </h2>
                <div className="space-y-5 text-muted-foreground leading-relaxed text-base">
                  <p>
                    I'm a Full Stack Developer based in Boston who genuinely
                    loves building software. Not just writing it. Building it.
                    Taking something from a rough idea, figuring out the right
                    architecture, and shipping something real that people
                    actually use.
                  </p>
                  <p>
                    My background spans full-stack web development, backend
                    APIs, and database design. I've also worked on AI-powered
                    applications, including document understanding tools that
                    help people interact with information in smarter ways. I
                    enjoy environments where I can wear multiple hats and move
                    fast.
                  </p>
                  <p>
                    Startup culture fits me well. I thrive when there's
                    ambiguity to navigate, problems to solve creatively, and a
                    team that cares about what they're building. I've
                    collaborated with founders, designers, and engineers across
                    early-stage projects where the work actually shapes the
                    product.
                  </p>
                  <p>
                    Outside of code, I lead{" "}
                    <span className="text-foreground font-semibold">
                      Latinas in Tech Boston
                    </span>{" "}
                    and stay involved with{" "}
                    <span className="text-foreground font-semibold">
                      Resilient Coders
                    </span>
                    , a nonprofit expanding access to software engineering
                    careers. I mentor early-career engineers and show up for the
                    Boston tech community because I believe who gets to build
                    technology matters just as much as what gets built.
                  </p>
                  <p className="text-foreground font-medium">
                    I build software. I build community. Both matter.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { icon: MapPin, label: "Based in", value: "Boston, MA" },
                  { icon: Briefcase, label: "Focus", value: "Full Stack Dev" },
                  {
                    icon: Users,
                    label: "Community",
                    value: "Latinas in Tech Boston",
                  },
                  {
                    icon: Heart,
                    label: "Passion",
                    value: "Meaningful software",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-card border border-border/60 dark:border-border rounded-2xl p-5 flex flex-col gap-3 hover:border-primary/50 dark:hover:border-primary/70 hover:shadow-lg dark:hover:shadow-primary/10 transition-all duration-300"
                  >
                    <item.icon
                      className="w-6 h-6 text-primary"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        {item.label}
                      </p>
                      <p className="font-semibold text-foreground text-sm">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section
          id="projects"
          aria-labelledby="projects-heading"
          className="py-24 border-t border-border/30 dark:border-border/40"
        >
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 text-primary font-medium text-sm mb-4">
                Selected Work
              </div>
              <h2
                id="projects-heading"
                className="text-3xl md:text-5xl font-bold mb-4 text-foreground"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Featured Projects
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Full-stack applications built to solve real problems. Each one
                is a story of a challenge, a solution, and something learned.
              </p>
            </div>

            {isLoading ? (
              <div
                className="grid md:grid-cols-2 gap-8"
                aria-busy="true"
                aria-label="Loading projects"
              >
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-[400px] rounded-2xl bg-muted animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {projects
                  ?.filter((p) =>
                    ["BODY/DOUBLE", "Bet On Me", "Multilingual AI Document Assistant", "Meeting Tax"].includes(p.title)
                  )
                  .map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                    />
                  ))}
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <Link href="/projects">
                <Button
                  variant="outline"
                  size="lg"
                  data-testid="button-all-projects"
                  className="rounded-full px-8 h-12 border-2 border-border dark:border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all group"
                >
                  Deep-dive into each project
                  <ArrowRight
                    className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Community Impact */}
        <section
          id="community"
          aria-labelledby="community-heading"
          className="py-24 bg-secondary/30"
        >
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2
                id="community-heading"
                className="text-3xl md:text-5xl font-bold mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Community Impact
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Building technology is only part of what I do. I'm equally
                committed to building the communities that make tech more
                equitable, accessible, and human.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {communityCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card border border-border/60 dark:border-border rounded-2xl p-6 hover:border-primary/50 dark:hover:border-primary/70 hover:shadow-xl dark:hover:shadow-primary/10 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary/20 transition-colors"
                      aria-hidden="true"
                    >
                      <card.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3
                          className="font-semibold text-foreground text-lg"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {card.title}
                        </h3>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                          {card.role}
                        </span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="py-24 relative"
        >
          <div
            className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] -z-10"
            aria-hidden="true"
          />
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div>
                <h2
                  id="contact-heading"
                  className="text-4xl md:text-5xl font-bold mb-6"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Let's Build Something Together
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Whether you're a recruiter, a startup founder, an engineering
                  team, or someone building something meaningful, I'd love to
                  connect.
                </p>
                <p className="text-base text-muted-foreground mb-10 leading-relaxed">
                  I'm open to software engineering roles, startup
                  collaborations, technical consulting, community speaking, and
                  honest coffee chats with people doing interesting work.
                </p>

                <div className="space-y-5">
                  {[
                    { icon: MapPin, label: "Location", value: "Boston, MA" },
                    {
                      icon: Briefcase,
                      label: "Status",
                      value: "Open to opportunities",
                    },
                    {
                      icon: Users,
                      label: "Community",
                      value: "Latinas in Tech Boston · Resilient Coders",
                    },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-4">
                      <div
                        className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0"
                        aria-hidden="true"
                      >
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{item.label}</p>
                        <p className="text-muted-foreground text-sm">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-border/40 text-center text-muted-foreground text-sm">
        <div className="container mx-auto px-4">
          <p>
            &copy; {new Date().getFullYear()} Naima Bogran, Full Stack Developer, Boston MA
          </p>
        </div>
      </footer>
    </div>
  );
}
