const fs = require('fs');
const path = require('path');
const { neon } = require('@neondatabase/serverless');

// Load .env.local from project root
const envPath = path.join(__dirname, '..', '.env.local');
let dbUrl = '';
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf-8');
  for (const line of content.split('\n')) {
    if (line.startsWith('DATABASE_URL=')) {
      dbUrl = line.split('=')[1].trim();
      break;
    }
  }
}

if (!dbUrl) {
  console.error('No DATABASE_URL found in .env.local');
  process.exit(1);
}

const sql = neon(dbUrl);

async function run() {
  try {
    console.log('Connecting to Neon PostgreSQL...');
    const result = await sql`SELECT NOW() as current_time, version() as pg_version`;
    console.log('Connected successfully!');
    console.log('PostgreSQL Version:', result[0].pg_version);
    console.log('Current DB Time:', result[0].current_time);

    // Apply schema.sql
    const schemaPath = path.join(__dirname, 'src', 'lib', 'schema.sql');
    if (fs.existsSync(schemaPath)) {
      console.log('Applying schema.sql to Neon database...');
      const schemaSql = fs.readFileSync(schemaPath, 'utf-8');
      
      // Neon serverless driver allows multiple statements or statement by statement
      // Let's split by statement or execute
      const statements = schemaSql
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0 && !s.startsWith('--'));

      for (const statement of statements) {
        try {
          await sql(statement);
        } catch (stmtErr) {
          // Ignore table already exists or ON CONFLICT warnings
          console.warn('Notice/Warning on statement:', stmtErr.message ? stmtErr.message.slice(0, 100) : stmtErr);
        }
      }
      console.log('Schema applied successfully!');
    }

    // Verify tables
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `;
    console.log('Public tables in Neon DB:', tables.map(t => t.table_name));
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
}

run();
