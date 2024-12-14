import pg from 'pg';  
const { Pool } = pg;


const pool = new Pool({
  user: 'admin',
  host: 'dpg-ct82a8d2ng1s73f07830-a.oregon-postgres.render.com',
  database: 'campus_event_management',
  password: 'mVPpgzQ0gNcFeJIUAAo4IzHYLbPZPF4g',
  port: 5432,
  ssl: true ,
});

const testConnection = async () => {
  try {
    const res = await pool.query('SELECT NOW()');  
    console.log('Connected to database:', res.rows[0]);
  } catch (err) {
    console.error('Database connection error:', err);
  }
};


testConnection();  


export default pool;
