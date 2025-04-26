import { 
  users, type User, type InsertUser, 
  serverSettings, type ServerSettings, type InsertServerSettings,
  botStats, type BotStats, type InsertBotStats
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Server settings operations
  getServerSettings(serverId: string): Promise<ServerSettings | undefined>;
  createServerSettings(settings: InsertServerSettings): Promise<ServerSettings>;
  updateServerSettings(serverId: string, settings: Partial<InsertServerSettings>): Promise<ServerSettings | undefined>;
  
  // Bot stats operations
  getBotStats(): Promise<BotStats | undefined>;
  createBotStats(stats: InsertBotStats): Promise<BotStats>;
  updateBotStats(stats: Partial<InsertBotStats>): Promise<BotStats | undefined>;
  incrementStats(key: 'questionsAnswered' | 'codeFixed' | 'conceptsExplained'): Promise<BotStats | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private servers: Map<string, ServerSettings>;
  private stats: BotStats | undefined;
  currentId: number;
  serverSettingsId: number;
  botStatsId: number;

  constructor() {
    this.users = new Map();
    this.servers = new Map();
    this.currentId = 1;
    this.serverSettingsId = 1;
    this.botStatsId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Server settings methods
  async getServerSettings(serverId: string): Promise<ServerSettings | undefined> {
    return this.servers.get(serverId);
  }

  async createServerSettings(settings: InsertServerSettings): Promise<ServerSettings> {
    const id = this.serverSettingsId++;
    const serverSetting: ServerSettings = { ...settings, id };
    this.servers.set(settings.serverId, serverSetting);
    return serverSetting;
  }

  async updateServerSettings(serverId: string, settings: Partial<InsertServerSettings>): Promise<ServerSettings | undefined> {
    const currentSettings = this.servers.get(serverId);
    if (!currentSettings) return undefined;

    const updatedSettings: ServerSettings = {
      ...currentSettings,
      ...settings,
    };
    this.servers.set(serverId, updatedSettings);
    return updatedSettings;
  }

  // Bot stats methods
  async getBotStats(): Promise<BotStats | undefined> {
    return this.stats;
  }

  async createBotStats(stats: InsertBotStats): Promise<BotStats> {
    const id = this.botStatsId;
    const lastUpdated = new Date();
    this.stats = { ...stats, id, lastUpdated };
    return this.stats;
  }

  async updateBotStats(stats: Partial<InsertBotStats>): Promise<BotStats | undefined> {
    if (!this.stats) return undefined;

    const lastUpdated = new Date();
    this.stats = {
      ...this.stats,
      ...stats,
      lastUpdated
    };

    return this.stats;
  }

  async incrementStats(key: 'questionsAnswered' | 'codeFixed' | 'conceptsExplained'): Promise<BotStats | undefined> {
    if (!this.stats) {
      // Initialize with default values if stats don't exist
      return this.createBotStats({
        questionsAnswered: key === 'questionsAnswered' ? 1 : 0,
        codeFixed: key === 'codeFixed' ? 1 : 0,
        conceptsExplained: key === 'conceptsExplained' ? 1 : 0
      });
    }

    const update: Partial<InsertBotStats> = {};
    update[key] = this.stats[key] + 1;
    return this.updateBotStats(update);
  }
}

export const storage = new MemStorage();
