import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function SocialLinks() {
  const socials = [
    {
      name: "GitHub",
      url: "https://github.com/NaimaBogran",
      icon: Github,
      color: "hover:text-gray-900 dark:hover:text-white",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/NaimaBogran",
      icon: Linkedin,
      color: "hover:text-blue-600 dark:hover:text-blue-400",
    },
    {
      name: "Email",
      url: "mailto:naima.e.bogran@gmail.com",
      icon: Mail,
      color: "hover:text-red-500 dark:hover:text-red-400",
    },
  ];

  return (
    <div className="flex gap-4">
      {socials.map((social) => (
        <Tooltip key={social.name}>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              asChild
              className={`rounded-full h-12 w-12 border-2 transition-all duration-300 hover:scale-110 hover:shadow-lg ${social.color}`}
            >
              <a href={social.url} target="_blank" rel="noopener noreferrer">
                <social.icon className="h-5 w-5" />
                <span className="sr-only">{social.name}</span>
              </a>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{social.name}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
