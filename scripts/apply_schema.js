const fs = require('fs');
const path = require('path');
const { Pool } = require('@neondatabase/serverless');

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

const pool = new Pool({ connectionString: dbUrl });

async function init() {
  const client = await pool.connect();
  try {
    console.log('Connected via Pool! Reading schema.sql...');
    const schemaSql = fs.readFileSync(path.join(__dirname, '..', 'src', 'lib', 'schema.sql'), 'utf-8');
    console.log('Executing schema.sql...');
    await client.query(schemaSql);
    console.log('Schema executed successfully!');

    const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);
    console.log('Created tables:', res.rows.map(r => r.table_name));
  } catch (err) {
    console.error('Error applying schema:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

init();
