import { useEffect } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SocialLinks } from "@/components/SocialLinks";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Download, FileText } from "lucide-react";

export default function Resume() {
  useEffect(() => {
    document.title = "Resume | Naima Bogran | Full Stack Developer";
    const setMeta = (selector: string, content: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute("content", content);
    };
    setMeta(
      'meta[name="description"]',
      "Resume of Naima Bogran, Full Stack Developer based in Boston, MA. View and download her full resume."
    );
    setMeta('meta[property="og:title"]', "Resume | Naima Bogran");
    setMeta(
      'meta[property="og:description"]',
      "Full Stack Developer resume — Naima Bogran, Boston, MA."
    );
    setMeta('meta[property="og:url"]', "https://naimabogran-portfolio.us/resume");
    setMeta('meta[name="twitter:title"]', "Resume | Naima Bogran");
    setMeta(
      'meta[name="twitter:description"]',
      "Full Stack Developer resume — Naima Bogran, Boston, MA."
    );
    setMeta('meta[name="twitter:url"]', "https://naimabogran-portfolio.us/resume");

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
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-10 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
              <FileText className="w-4 h-4" aria-hidden="true" />
              2-page resume
            </div>
            <h1
              className="text-4xl md:text-6xl font-bold mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Resume
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed mb-8">
              Full Stack Developer with experience building production web apps, AI-powered tools, and leading technical community in Boston.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 h-12 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
              data-testid="button-download-resume"
            >
              <a href="/resume.pdf" download="Naima_Bogran_Resume.pdf">
                <Download className="mr-2 h-5 w-5" aria-hidden="true" />
                Download Resume
              </a>
            </Button>
          </motion.div>

          {/* PDF viewer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="rounded-2xl overflow-hidden border border-border/60 dark:border-border shadow-xl"
          >
            <iframe
              src="/resume.pdf"
              title="Naima Bogran Resume"
              className="w-full"
              style={{ height: "calc(2 * 1056px)" }}
              data-testid="iframe-resume"
            />
          </motion.div>

          {/* Bottom download CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 text-center"
          >
            <p className="text-muted-foreground mb-4 text-sm">
              Prefer to save it for later?
            </p>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-8 h-12 border-border dark:border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
            >
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
          <p>
            &copy; {new Date().getFullYear()} Naima Bogran, Full Stack Developer, Boston MA
          </p>
        </div>
      </footer>
    </div>
  );
}
