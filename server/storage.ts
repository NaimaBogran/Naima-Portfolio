import { db } from "./db";
import { eq } from "drizzle-orm";
import { projects, messages, type InsertProject, type InsertMessage, type Project, type Message } from "@shared/schema";

export interface IStorage {
  getProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  upsertProjectByTitle(project: InsertProject): Promise<Project>;
  createMessage(message: InsertMessage): Promise<Message>;
}

export class DatabaseStorage implements IStorage {
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db.insert(projects).values(insertProject).returning();
    return project;
  }

  async upsertProjectByTitle(insertProject: InsertProject): Promise<Project> {
    const existing = await db.select().from(projects).where(eq(projects.title, insertProject.title));
    if (existing.length > 0) {
      const [updated] = await db.update(projects)
        .set(insertProject)
        .where(eq(projects.title, insertProject.title))
        .returning();
      return updated;
    } else {
      const [created] = await db.insert(projects).values(insertProject).returning();
      return created;
    }
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const [message] = await db.insert(messages).values(insertMessage).returning();
    return message;
  }
}

export const storage = new DatabaseStorage();
