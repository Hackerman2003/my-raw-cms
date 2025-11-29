import Database from 'better-sqlite3';
import path from 'path';

// Database file stored in project root
const dbPath = path.join(process.cwd(), 'data', 'ditronics.db');

// Ensure data directory exists
import fs from 'fs';
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(dbPath);

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS laptops (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    price INTEGER NOT NULL,
    currency TEXT DEFAULT 'TZS',
    cpu TEXT,
    ram TEXT,
    storage TEXT,
    gpu TEXT,
    display TEXT,
    battery TEXT,
    image TEXT,
    stock_status TEXT DEFAULT 'In Stock',
    condition TEXT DEFAULT 'Brand New',
    notes TEXT,
    featured INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Check if admin exists, if not create default admin
const adminExists = db.prepare('SELECT COUNT(*) as count FROM admin_users').get() as { count: number };
if (adminExists.count === 0) {
  // Default admin: username: admin, password: ditronics2024
  db.prepare('INSERT INTO admin_users (username, password) VALUES (?, ?)').run('admin', 'ditronics2024');
}

export default db;

// Laptop types
export interface Laptop {
  id: number;
  name: string;
  slug: string;
  price: number;
  currency: string;
  cpu: string;
  ram: string;
  storage: string;
  gpu: string;
  display: string;
  battery: string;
  image: string;
  stock_status: string;
  condition: string;
  notes: string;
  featured: number;
  created_at: string;
  updated_at: string;
}

// Laptop CRUD operations
export function getAllLaptops(): Laptop[] {
  return db.prepare('SELECT * FROM laptops ORDER BY created_at DESC').all() as Laptop[];
}

export function getLaptopById(id: number): Laptop | undefined {
  return db.prepare('SELECT * FROM laptops WHERE id = ?').get(id) as Laptop | undefined;
}

export function getLaptopBySlug(slug: string): Laptop | undefined {
  return db.prepare('SELECT * FROM laptops WHERE slug = ?').get(slug) as Laptop | undefined;
}

export function getFeaturedLaptops(): Laptop[] {
  return db.prepare('SELECT * FROM laptops WHERE featured = 1 ORDER BY created_at DESC LIMIT 3').all() as Laptop[];
}

export function createLaptop(laptop: Omit<Laptop, 'id' | 'created_at' | 'updated_at'>): number {
  const result = db.prepare(`
    INSERT INTO laptops (name, slug, price, currency, cpu, ram, storage, gpu, display, battery, image, stock_status, condition, notes, featured)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    laptop.name,
    laptop.slug,
    laptop.price,
    laptop.currency,
    laptop.cpu,
    laptop.ram,
    laptop.storage,
    laptop.gpu,
    laptop.display,
    laptop.battery,
    laptop.image,
    laptop.stock_status,
    laptop.condition,
    laptop.notes,
    laptop.featured
  );
  return result.lastInsertRowid as number;
}

export function updateLaptop(id: number, laptop: Partial<Laptop>): void {
  const fields = Object.keys(laptop).filter(k => k !== 'id' && k !== 'created_at');
  const setClause = fields.map(f => `${f} = ?`).join(', ');
  const values = fields.map(f => (laptop as any)[f]);
  
  db.prepare(`UPDATE laptops SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`).run(...values, id);
}

export function deleteLaptop(id: number): void {
  db.prepare('DELETE FROM laptops WHERE id = ?').run(id);
}

// Admin operations
export function verifyAdmin(username: string, password: string): boolean {
  const admin = db.prepare('SELECT * FROM admin_users WHERE username = ? AND password = ?').get(username, password);
  return !!admin;
}

export function changeAdminPassword(username: string, newPassword: string): void {
  db.prepare('UPDATE admin_users SET password = ? WHERE username = ?').run(newPassword, username);
}
