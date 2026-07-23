import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { ReplitConnectors } from "@replit/connectors-sdk";

const connectors = new ReplitConnectors();

async function sendContactEmail(name: string, email: string, message: string) {
  try {
    const response = await connectors.proxy("resend", "/emails", {
      method: "POST",
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ["nbogran0914@gmail.com"],
        subject: `New portfolio message from ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">New Contact Form Submission</h2>
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; color: #555;">${message}</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
            <p style="color: #999; font-size: 12px;">Sent via your portfolio contact form at naimabogran-portfolio.us</p>
          </div>
        `,
      }),
    });
    if (!response.ok) {
      const body = await response.text();
      console.error("[email] Resend error:", response.status, body);
    } else {
      console.log("[email] Message sent to nbogran0914@gmail.com");
    }
  } catch (err) {
    console.error("[email] Failed to send email:", err);
  }
}

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
      // Fire-and-forget: send email notification; don't fail the request if email fails
      sendContactEmail(input.name, input.email, input.message);
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
  console.log("Syncing projects...");

  await storage.upsertProjectByTitle({
    title: "BODY/DOUBLE",
    description: "A virtual coworking application where users match with other users based on work filters and camera preference to find a partner to body double with. Includes an integrated Pomodoro timer to prevent burnout.",
    imageUrl: "/images/body-double.png",
    projectUrl: "https://body-double.onrender.com/",
    techStack: ["Node.js", "Express", "Socket.io", "MongoDB"]
  });

  await storage.upsertProjectByTitle({
    title: "Bet On Me",
    description: "A social goal-setting app that allows users to join or create groups, set timelines for goals, and bet real money on achieving them. Money is returned upon success or distributed to the group on failure.",
    imageUrl: "/images/bet-on-me.png",
    projectUrl: "https://bet-on-me.onrender.com/",
    techStack: ["Node.js", "Stripe API", "PostgreSQL"]
  });

  await storage.upsertProjectByTitle({
    title: "LetGoLab",
    description: "A holistic wellness website for a women's practice, featuring appointment scheduling, resource sharing, and community engagement tools.",
    imageUrl: "/images/letgolab.png",
    projectUrl: "https://curl-date-86463638.figma.site/",
    techStack: ["CSS", "Express"]
  });

  await storage.upsertProjectByTitle({
    title: "Meeting Tax",
    description: "A productivity tool that calculates the cost of meetings based on participant salaries and duration. Helps teams understand the true cost of their meetings and optimize time management.",
    imageUrl: "/images/meeting-tax.png",
    projectUrl: "https://meeting-tax.vercel.app/",
    techStack: ["Node.js", "JavaScript", "PostgreSQL"]
  });

  console.log("Projects synced.");
}
