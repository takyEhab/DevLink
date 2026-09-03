import mysql from "mysql2/promise";

const databaseName = process.env.DB_NAME || "devlink";
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "1234",
};

export let pool;

const createDatabaseIfNeeded = async () => {
  const connection = await mysql.createConnection(dbConfig);
  await connection.query(`CREATE DATABASE IF NOT EXISTS ${databaseName}`);
  await connection.end();
};

const initializePool = async () => {
  await createDatabaseIfNeeded();

  pool = mysql.createPool({
    ...dbConfig,
    database: databaseName,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    charset: "utf8mb4",
  });

  return pool;
};

const initializeDatabase = async () => {
  if (!pool) {
    await initializePool();
  }

  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(50) NOT NULL DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS profiles (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL UNIQUE,
      title VARCHAR(255),
      location VARCHAR(255),
      skills JSON,
      bio TEXT,
      education VARCHAR(255),
      portfolio VARCHAR(500),
      github VARCHAR(500),
      linkedin VARCHAR(500),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS projects (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      technologies JSON,
      github_link VARCHAR(500),
      live_demo VARCHAR(500),
      image VARCHAR(500),
      duration VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS conversations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      participant_one_id INT NOT NULL,
      participant_two_id INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY unique_conversation (participant_one_id, participant_two_id),
      FOREIGN KEY (participant_one_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (participant_two_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      conversation_id INT NOT NULL,
      sender_id INT NOT NULL,
      content TEXT NOT NULL,
      read_at TIMESTAMP NULL DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
      FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
      INDEX messages_conversation_created (conversation_id, created_at)
    )
  `);

  console.log("MySQL database initialized");
};

export const query = async (sql, params = []) => {
  if (!pool) {
    await initializePool();
  }
  return pool.query(sql, params);
};

const connectToDatabase = async () => {
  try {
    if (!pool) {
      await initializePool();
    }

    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    console.log("MySQL connection successful:", rows[0]);
    await initializeDatabase();
  } catch (error) {
    console.error("MySQL connection failed:", error.message);
    throw error;
  }
};

export default connectToDatabase;
