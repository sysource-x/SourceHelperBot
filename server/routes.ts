import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertServerSettingsSchema } from "@shared/schema";
import { initializeDiscordBot } from "./bot";

// Validate server ID
const serverIdSchema = z.object({
  serverId: z.string().min(1)
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize Discord bot
  try {
    await initializeDiscordBot();
  } catch (error) {
    console.error("Failed to initialize Discord bot:", error);
  }

  // API routes
  app.get("/api/bot/stats", async (req: Request, res: Response) => {
    try {
      let stats = await storage.getBotStats();
      if (!stats) {
        stats = await storage.createBotStats({
          questionsAnswered: 0,
          codeFixed: 0,
          conceptsExplained: 0
        });
      }
      res.json(stats);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Internal server error";
      res.status(500).json({ message });
    }
  });

  // Get server settings
  app.get("/api/servers/:serverId/settings", async (req: Request, res: Response) => {
    try {
      const { serverId } = serverIdSchema.parse(req.params);
      const settings = await storage.getServerSettings(serverId);
      
      if (!settings) {
        return res.status(404).json({ message: "Server settings not found" });
      }
      
      res.json(settings);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid server ID" });
      }
      
      const message = error instanceof Error ? error.message : "Internal server error";
      res.status(500).json({ message });
    }
  });

  // Create or update server settings
  app.post("/api/servers/:serverId/settings", async (req: Request, res: Response) => {
    try {
      const { serverId } = serverIdSchema.parse(req.params);
      const settingsData = insertServerSettingsSchema.parse({
        ...req.body,
        serverId
      });
      
      const existingSettings = await storage.getServerSettings(serverId);
      
      let settings;
      if (existingSettings) {
        settings = await storage.updateServerSettings(serverId, settingsData);
      } else {
        settings = await storage.createServerSettings(settingsData);
      }
      
      res.json(settings);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid server settings", 
          errors: error.errors 
        });
      }
      
      const message = error instanceof Error ? error.message : "Internal server error";
      res.status(500).json({ message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
