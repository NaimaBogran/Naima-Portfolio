import { useProjects } from "@/hooks/use-projects";
import { ProjectCard } from "@/components/ProjectCard";
import { ContactForm } from "@/components/ContactForm";
import { SocialLinks } from "@/components/SocialLinks";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import {
  Code,
  Database,
  Globe,
  Layers,
  Layout,
  Server,
  Cpu,
} from "lucide-react";

export default function Home() {
  const { data: projects, isLoading } = useProjects();

  const skills = [
    { name: "JavaScript", icon: Code },
    { name: "Node.js", icon: Server },
    { name: "Express", icon: Layout },
    { name: "MongoDB", icon: Database },
    { name: "Full Stack", icon: Layers },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-display font-bold text-xl tracking-tighter">
            NB<span className="text-primary">.</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-6 text-sm font-medium">
              <ScrollLink
                to="about"
                smooth={true}
                className="cursor-pointer hover:text-primary transition-colors"
              >
                About
              </ScrollLink>
              <ScrollLink
                to="projects"
                smooth={true}
                className="cursor-pointer hover:text-primary transition-colors"
              >
                Projects
              </ScrollLink>
              <ScrollLink
                to="contact"
                smooth={true}
                className="cursor-pointer hover:text-primary transition-colors"
              >
                Contact
              </ScrollLink>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section
          id="about"
          className="pt-32 pb-20 md:pt-48 md:pb-32 px-4 relative overflow-hidden"
        >
          {/* Background decorative elements */}
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -z-10" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] -z-10" />

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
                <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] mb-6">
                  Hi, I'm <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                    Naima Bogran
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-lg">
                  Full Stack Developer crafting impressive applications
                  with modern web technologies. Specializing in the MERN stack
                  to bring creative ideas to life.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                  <ScrollLink to="projects" smooth={true}>
                    <Button
                      size="lg"
                      className="rounded-full px-8 text-lg h-14 shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all"
                    >
                      View My Work
                    </Button>
                  </ScrollLink>
                  <ScrollLink to="contact" smooth={true}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full px-8 text-lg h-14 border-2"
                    >
                      Contact Me
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
                  {/* Decorative rings */}
                  <motion.div 
                    className="absolute inset-0 rounded-full border-2 border-primary/20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div 
                    className="absolute inset-4 rounded-full border-2 border-dashed border-primary/30"
                    animate={{ rotate: -360, scale: [1, 1.05, 1] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                  />

                  {/* Avatar Container */}
                  <div className="absolute inset-8 rounded-full overflow-hidden border-4 border-background shadow-2xl">
                    <img
                      src="/images/headshot.jpg"
                      alt="Naima Bogran"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Tech Stack Ticker/Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-24 pt-12 border-t border-border/40"
            >
              <p className="text-center text-muted-foreground mb-8 font-medium">
                Powering applications with
              </p>
              <div className="flex flex-wrap justify-center gap-8 md:gap-16 grayscale hover:grayscale-0 transition-all duration-500">
                {skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <skill.icon className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-sm font-medium">{skill.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 bg-secondary/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
                Featured Projects
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A selection of full-stack applications built to solve real-world
                problems.
              </p>
            </div>

            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-[400px] rounded-2xl bg-muted animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects?.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 relative">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                  Let's work together
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  I'm currently looking for new opportunities. Whether you have
                  a question or just want to say hi, I'll try my best to get
                  back to you!
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Globe className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground">Boston, MA</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Cpu className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-medium">Status</p>
                      <p className="text-muted-foreground">
                        Open to opportunities
                      </p>
                    </div>
                  </div>
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
            © {new Date().getFullYear()} Naima Bogran. Built with React &
            Tailwind.
          </p>
        </div>
      </footer>
    </div>
  );
}
