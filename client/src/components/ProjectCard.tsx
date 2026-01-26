import { Project } from "@shared/schema";
import { ExternalLink, Code2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="group h-full flex flex-col overflow-hidden border-border/50 bg-card hover:border-primary/50 hover:shadow-2xl transition-all duration-300">
        <div className="relative aspect-video overflow-hidden">
          <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-300 z-10" />
          {/* Using a placeholder if no image URL, or the actual URL */}
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        <CardHeader>
          <div className="flex justify-between items-start gap-4">
            <CardTitle className="text-2xl font-bold font-display text-primary">
              {project.title}
            </CardTitle>
          </div>
          <CardDescription className="text-base mt-2 line-clamp-3">
            {project.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-grow">
          <div className="flex flex-wrap gap-2">
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
        </CardContent>

        <CardFooter className="pt-4 border-t border-border/50">
          <Button 
            asChild 
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          >
            <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Project
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
