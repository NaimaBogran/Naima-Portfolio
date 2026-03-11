import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Seed database
  await seedDatabase();

  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.post(api.projects.create.path, async (req, res) => {
    try {
      const input = api.projects.create.input.parse(req.body);
      const project = await storage.createProject(input);
      res.status(201).json(project);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.post(api.messages.create.path, async (req, res) => {
    try {
      const input = api.messages.create.input.parse(req.body);
      const message = await storage.createMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  return httpServer;
}

async function seedDatabase() {
  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    console.log("Seeding database with initial projects...");
    
    await storage.createProject({
      title: "BODY/DOUBLE",
      description: "A virtual coworking application where users match with other users based on work filters and camera preference to find a partner to body double with. Includes an integrated Pomodoro timer to prevent burnout.",
      imageUrl: "/images/body-double.png",
      projectUrl: "https://body-double.onrender.com/",
      techStack: ["Node.js", "Express", "Socket.io", "MongoDB"]
    });

    await storage.createProject({
      title: "Bet On Me",
      description: "A social goal-setting app that allows users to join or create groups, set timelines for goals, and bet real money on achieving them. Money is returned upon success or distributed to the group on failure.",
      imageUrl: "/images/bet-on-me.png",
      projectUrl: "https://bet-on-me.onrender.com/",
      techStack: ["Node.js", "Stripe API", "PostgreSQL"]
    });

    await storage.createProject({
      title: "LetGoLab",
      description: "A holistic wellness website for a women's practice, featuring appointment scheduling, resource sharing, and community engagement tools.",
      imageUrl: "/images/letgolab.png",
      projectUrl: "https://curl-date-86463638.figma.site/",
      techStack: ["CSS", "Express"]
    });

    await storage.createProject({
      title: "Meeting Tax",
      description: "A productivity tool that calculates the cost of meetings based on participant salaries and duration. Helps teams understand the true cost of their meetings and optimize time management.",
      imageUrl: "/images/meeting-tax.png",
      projectUrl: "https://meeting-tax.vercel.app/",
      techStack: ["Node.js", "JavaScript", "PostgreSQL"]
    });
    
    console.log("Seeding complete.");
  }
}
