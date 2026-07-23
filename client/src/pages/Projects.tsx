import { useEffect } from "react";
import { useProjects } from "@/hooks/use-projects";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SocialLinks } from "@/components/SocialLinks";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ExternalLink, ArrowLeft, Github } from "lucide-react";
import { Project } from "@shared/schema";

interface ProjectMeta {
  problem: string;
  solution: string;
  role: string;
  challenges: string;
  learnings: string;
  githubUrl?: string;
}

const projectDetails: Record<string, ProjectMeta> = {
  "BODY/DOUBLE": {
    problem:
      "Remote work can feel isolating, especially for people who focus better in the presence of others. Finding a body doubling partner (someone who works alongside you silently) was impossible to do at scale.",
    solution:
      "Built a real-time virtual coworking app that matches users based on their work type and camera preference. An integrated Pomodoro timer keeps sessions structured and prevents burnout.",
    role: "Full Stack Developer who designed and built the real-time matching system, Socket.io infrastructure, Pomodoro timer, and the full user interface from scratch.",
    challenges:
      "Managing concurrent user sessions in real time was the hardest part. Socket.io rooms needed careful lifecycle management to avoid ghost sessions when users disconnected mid-match. Getting the timer to stay in sync across two users required thinking carefully about server-side event broadcasting versus client-side state.",
    learnings:
      "Learned how to architect real-time systems with Socket.io, manage concurrent user states, and balance UX simplicity with feature complexity.",
    githubUrl: "https://github.com/NaimaBogran",
  },
  "Bet On Me": {
    problem:
      "Accountability tools exist, but most of them are passive. People needed real skin in the game to follow through on goals, something with actual consequences.",
    solution:
      "A social goal-setting app where users join groups, set a timeline for their goal, and stake real money on completing it. Success returns your money. Failure distributes it to the group.",
    role: "Full Stack Developer who integrated Stripe for payment processing, built group logic and goal tracking, and designed the full-stack architecture with PostgreSQL.",
    challenges:
      "Financial logic is unforgiving. Handling edge cases like a group disbanding mid-goal, partial completions, or payment failures required thorough transaction management. I had to think carefully about data consistency and make sure money was never stuck in an ambiguous state.",
    learnings:
      "Gained deep experience with Stripe API, financial transaction flows, and designing systems where data integrity is non-negotiable.",
    githubUrl: "https://github.com/NaimaBogran",
  },
  LetGoLab: {
    problem:
      "A women's holistic wellness practice needed a professional web presence that reflected their values: warm, accessible, and easy to navigate for clients seeking appointments and resources.",
    solution:
      "A wellness website with appointment scheduling, resource sharing, and community features, designed to feel as welcoming as the practice itself.",
    role: "Full Stack Developer and Designer who handled front-to-back implementation, from visual design direction to Express server setup and deployment.",
    challenges:
      "The challenge wasn't technical complexity. It was craft. The client cared deeply about tone and visual warmth, which meant every font choice, spacing decision, and color mattered. Translating a feeling into a layout while keeping the site fast and accessible required a lot of iteration.",
    learnings:
      "Strengthened my CSS craft and learned how design decisions affect trust and conversion for service-based businesses.",
    githubUrl: "https://github.com/NaimaBogran",
  },
  "Meeting Tax": {
    problem:
      "Teams waste thousands of dollars in unnecessary meetings, but no one stops to calculate the real cost. Without visibility into that number, meeting culture doesn't change.",
    solution:
      "A productivity tool that calculates the true cost of every meeting based on participant salaries and duration, making the invisible visible so teams can make smarter decisions.",
    role: "Full Stack Developer who built the cost calculation engine, user-facing interface, and data persistence layer.",
    challenges:
      "The logic itself is straightforward, but the UX wasn't. Users needed to input data quickly without friction, and the output needed to feel impactful rather than just informational. Finding the right balance between simplicity and enough context to motivate behavior change took iteration.",
    learnings:
      "Practiced building tools that change behavior through data transparency, and refined skills in clean UX for productivity software.",
    githubUrl: "https://github.com/NaimaBogran",
  },
};

function ProjectDetailCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const details = projectDetails[project.title];

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-card border border-border/50 dark:border-border rounded-2xl overflow-hidden hover:border-primary/40 dark:hover:border-primary/60 hover:shadow-2xl dark:hover:shadow-primary/10 transition-all duration-300 group"
      aria-labelledby={`project-title-${project.id}`}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <div
          className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-300 z-10"
          aria-hidden="true"
        />
        <img
          src={project.imageUrl}
          alt={`Screenshot of ${project.title}`}
          loading="lazy"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
          <h2
            id={`project-title-${project.id}`}
            className="text-2xl md:text-3xl font-bold text-primary"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {project.title}
          </h2>
          <div className="flex gap-2 flex-shrink-0">
            {details?.githubUrl && (
              <Button asChild variant="outline" size="sm">
                <a
                  href={details.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} source code on GitHub`}
                >
                  <Github className="mr-2 h-4 w-4" aria-hidden="true" />
                  GitHub
                </a>
              </Button>
            )}
            <Button asChild size="sm">
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} live site`}
              >
                <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
                Live Demo
              </a>
            </Button>
          </div>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-8" aria-label="Technologies used">
          {project.techStack.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="bg-secondary/50 hover:bg-secondary text-secondary-foreground"
            >
              {tech}
            </Badge>
          ))}
        </div>

        {/* Story */}
        {details ? (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                The Problem
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {details.problem}
              </p>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                The Solution
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {details.solution}
              </p>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                My Role
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {details.role}
              </p>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                Challenges
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {details.challenges}
              </p>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                What I Learned
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {details.learnings}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground text-sm leading-relaxed">
            {project.description}
          </p>
        )}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const { data: projects, isLoading } = useProjects();

  useEffect(() => {
    document.title = "All Projects | Naima Bogran | Full Stack Developer";
    const setMeta = (selector: string, content: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute("content", content);
    };
    setMeta(
      'meta[name="description"]',
      "All four full-stack projects by Naima Bogran: BODY/DOUBLE, Bet On Me, LetGoLab, and Meeting Tax. Each project includes the problem, solution, challenges, and learnings."
    );
    setMeta('meta[property="og:title"]', "All Projects | Naima Bogran");
    setMeta(
      'meta[property="og:description"]',
      "Full-stack projects built by Naima Bogran. Real problems, real software."
    );
    setMeta('meta[property="og:url"]', "https://naimabogran-portfolio.us/projects");
    setMeta('meta[name="twitter:title"]', "All Projects | Naima Bogran");
    setMeta(
      'meta[name="twitter:description"]',
      "Full-stack projects built by Naima Bogran. Real problems, real software."
    );
    setMeta('meta[name="twitter:url"]', "https://naimabogran-portfolio.us/projects");

    return () => {
      document.title = "Naima Bogran | Full Stack Developer | Boston, MA";
      setMeta(
        'meta[name="description"]',
        "Naima Bogran is a Full Stack Developer based in Boston, MA. She builds full-stack web applications, has experience with AI-powered tools, and leads the Latinas in Tech Boston chapter."
      );
      setMeta('meta[property="og:title"]', "Naima Bogran | Full Stack Developer");
      setMeta(
        'meta[property="og:description"]',
        "Full Stack Developer building real products from idea to launch. Based in Boston, MA. Chapter Lead at Latinas in Tech Boston."
      );
      setMeta('meta[property="og:url"]', "https://naimabogran-portfolio.us/");
      setMeta('meta[name="twitter:title"]', "Naima Bogran | Full Stack Developer");
      setMeta(
        'meta[name="twitter:description"]',
        "Full Stack Developer building real products from idea to launch. Based in Boston, MA. Chapter Lead at Latinas in Tech Boston."
      );
      setMeta('meta[name="twitter:url"]', "https://naimabogran-portfolio.us/");
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
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-sm"
                data-testid="button-back-home"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back home
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-16 text-center"
          >
            <h1
              className="text-4xl md:text-6xl font-bold mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              All Projects
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Every project here started with a real problem. Here's what I
              built, why I built it, and what I took away from each one.
            </p>
          </motion.div>

          {/* Project list */}
          {isLoading ? (
            <div
              className="space-y-8"
              aria-busy="true"
              aria-label="Loading projects"
            >
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-[300px] rounded-2xl bg-muted animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="space-y-10">
              {projects?.map((project, index) => (
                <ProjectDetailCard
                  key={project.id}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="py-8 border-t border-border/40 text-center text-muted-foreground text-sm">
        <div className="container mx-auto px-4 flex flex-col items-center gap-4">
          <SocialLinks />
          <p>
            &copy; {new Date().getFullYear()} Naima Bogran, Full Stack Developer, Boston MA
          </p>
        </div>
      </footer>
    </div>
  );
}
