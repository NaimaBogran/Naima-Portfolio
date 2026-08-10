import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { ReplitConnectors } from "@replit/connectors-sdk";

const connectors = new ReplitConnectors();

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

const ipSubmissions = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  const timestamps = (ipSubmissions.get(ip) ?? []).filter(t => t > cutoff);
  if (timestamps.length >= RATE_LIMIT_MAX) {
    return true;
  }
  timestamps.push(now);
  ipSubmissions.set(ip, timestamps);
  return false;
}

type EmailRecord = { name: string; email: string; message: string; sentAt: string };
let lastEmailAttempt: EmailRecord | null = null;

async function sendContactEmail(name: string, email: string, message: string) {
  lastEmailAttempt = { name, email, message, sentAt: new Date().toISOString() };
  try {
    const response = await connectors.proxy("resend", "/emails", {
      method: "POST",
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ["naima.e.bogran@gmail.com"],
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
      console.log("[email] Message sent to naima.e.bogran@gmail.com");
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
    const ip = req.ip ?? req.socket.remoteAddress ?? "unknown";
    if (isRateLimited(ip)) {
      return res.status(429).json({ message: "Too many messages sent. Please wait an hour before trying again." });
    }
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

  // Development-only endpoint: returns the last email payload attempted by sendContactEmail.
  // Used by automated tests to assert that an email notification was triggered without
  // relying on the Resend API actually delivering it.
  if (process.env.NODE_ENV !== "production") {
    app.get("/api/test/last-email", (_req, res) => {
      res.json(lastEmailAttempt ?? null);
    });

    app.post("/api/test/reset-rate-limit", (_req, res) => {
      ipSubmissions.clear();
      res.json({ ok: true });
    });
  }

  return httpServer;
}

async function seedDatabase() {
  console.log("Syncing projects...");

  await storage.upsertProjectByTitle({
    title: "BODY/DOUBLE",
    description: "Remote work is isolating — especially if you focus better alongside others. I built a real-time virtual coworking app that matches users by work type and camera preference, so you can focus with a partner from anywhere. Includes an integrated Pomodoro timer to keep sessions structured.",
    imageUrl: "/images/body-double.png",
    projectUrl: "https://body-double.onrender.com/",
    techStack: ["Node.js", "Express", "Socket.io", "MongoDB"]
  });

  await storage.upsertProjectByTitle({
    title: "Bet On Me",
    description: "Most accountability tools are passive. This one puts real money on the line — stake cash on a goal, get it back when you succeed, or watch it distributed to your group if you don't. Real consequences change behavior.",
    imageUrl: "/images/bet-on-me.png",
    projectUrl: "https://bet-on-me.onrender.com/",
    techStack: ["Node.js", "Stripe API", "PostgreSQL"]
  });

  await storage.upsertProjectByTitle({
    title: "LetGoLab",
    description: "A women's holistic wellness practice needed a home online that felt as warm and welcoming as the practice itself. I built the full thing — UI, backend, scheduling, and community features — with care for how every detail makes visitors feel.",
    imageUrl: "/images/letgolab.png",
    projectUrl: "https://curl-date-86463638.figma.site/",
    techStack: ["CSS", "Express"]
  });

  await storage.upsertProjectByTitle({
    title: "Meeting Tax",
    description: "Every meeting has a real dollar cost most teams never see. This tool makes it visible — input attendee salaries and meeting duration, and get an instant breakdown of what that calendar block actually costs your organization.",
    imageUrl: "/images/meeting-tax.png",
    projectUrl: "https://meeting-tax.vercel.app/",
    techStack: ["Node.js", "JavaScript", "PostgreSQL"]
  });

  await storage.upsertProjectByTitle({
    title: "Multilingual AI Document Assistant",
    description: "Language shouldn't be a barrier to understanding your own documents. I helped build an AI-powered tool that lets anyone upload a file and instantly translate, summarize, and ask questions about it — in 19+ languages — with zero data retention.",
    imageUrl: "/images/ai-document-assistant.png",
    projectUrl: "https://multilingual-ai-document-assistant-sigma.vercel.app/",
    techStack: ["Next.js", "TypeScript", "RAG", "Node.js"]
  });

  await storage.upsertProjectByTitle({
    title: "Qreate Media",
    description: "UGC creators and brands both have a problem: finding each other. Qreate is a marketplace that connects everyday creators with brands looking for authentic content for ads and campaigns. I improved the frontend and fixed key upload flows for video and image content.",
    imageUrl: "/images/qreate-media.png",
    projectUrl: "https://qreatemedia.com",
    techStack: ["JavaScript", "Node.js", "Express"]
  });

  await storage.upsertProjectByTitle({
    title: "Brianne Beatrice",
    description: "Decades of teaching, directing, performance, and recognition needed one cohesive home. I designed and developed a personal brand site that brings Brianne's work together while positioning her growing career as a motivational speaker.",
    imageUrl: "/images/brianne-beatrice.png",
    projectUrl: "https://briannebeatrice.com",
    techStack: ["Web Development", "UI/UX", "Responsive Design", "Client Work"]
  });

  console.log("Projects synced.");
}
