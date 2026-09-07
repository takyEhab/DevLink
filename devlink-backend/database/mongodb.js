import mysql from "mysql2/promise";

const databaseName = process.env.DB_NAME || "devlink";

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "1234",
};

export let pool;

// Create database if it doesn't exist
const createDatabaseIfNeeded = async () => {
  const connection = await mysql.createConnection(dbConfig);

  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${databaseName}\`
     CHARACTER SET utf8mb4
     COLLATE utf8mb4_unicode_ci`
  );

  await connection.end();
};

// Initialize connection pool
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

// Initialize database tables
const initializeDatabase = async () => {
  if (!pool) {
    await initializePool();
  }

  // USERS
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(50) NOT NULL DEFAULT 'user',

      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NULL DEFAULT NULL
    )
  `);

  // PROFILES
  await pool.query(`
    CREATE TABLE IF NOT EXISTS profiles (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL UNIQUE,
      title VARCHAR(255),
      location VARCHAR(255),
      skills TEXT,
      bio TEXT,
      education VARCHAR(255),
      portfolio VARCHAR(500),
      github VARCHAR(500),
      linkedin VARCHAR(500),
      avatar VARCHAR(500),

      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NULL DEFAULT NULL,

      FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
    )
  `);

  // PROJECTS
  await pool.query(`
    CREATE TABLE IF NOT EXISTS projects (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      technologies TEXT,
      github_link VARCHAR(500),
      live_demo VARCHAR(500),
      image VARCHAR(500),
      duration VARCHAR(100),

      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NULL DEFAULT NULL,

      FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
    )
  `);

  // CONVERSATIONS
  await pool.query(`
    CREATE TABLE IF NOT EXISTS conversations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      participant_one_id INT NOT NULL,
      participant_two_id INT NOT NULL,

      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NULL DEFAULT NULL,

      UNIQUE KEY unique_conversation (
        participant_one_id,
        participant_two_id
      ),

      FOREIGN KEY (participant_one_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

      FOREIGN KEY (participant_two_id)
        REFERENCES users(id)
        ON DELETE CASCADE
    )
  `);

  // MESSAGES
  await pool.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      conversation_id INT NOT NULL,
      sender_id INT NOT NULL,
      content TEXT NOT NULL,

      read_at TIMESTAMP NULL DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

      FOREIGN KEY (conversation_id)
        REFERENCES conversations(id)
        ON DELETE CASCADE,

      FOREIGN KEY (sender_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

      INDEX messages_conversation_created (
        conversation_id,
        created_at
      )
    )
  `);

  // NOTIFICATIONS
  await pool.query(`
    CREATE TABLE IF NOT EXISTS notifications (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      actor_id INT NULL,
      type VARCHAR(50) NOT NULL,
      title VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      link VARCHAR(500),

      read_at TIMESTAMP NULL DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

      FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

      FOREIGN KEY (actor_id)
        REFERENCES users(id)
        ON DELETE SET NULL,

      INDEX notifications_user_read (
        user_id,
        read_at,
        created_at
      )
    )
  `);

  console.log("MySQL database initialized successfully");
};

// General query function
export const query = async (sql, params = []) => {
  if (!pool) {
    await initializePool();
  }

  return pool.query(sql, params);
};

// Connect to database
const connectToDatabase = async () => {
  try {
    if (!pool) {
      await initializePool();
    }

    const [rows] = await pool.query(
      "SELECT 1 + 1 AS result"
    );

    console.log("MySQL connection successful:", rows[0]);
    console.log("Database Name:", databaseName);

    await initializeDatabase();

  } catch (error) {
    console.error(
      "MySQL connection failed:",
      error.message
    );

    throw error;
  }
};

export default connectToDatabase;