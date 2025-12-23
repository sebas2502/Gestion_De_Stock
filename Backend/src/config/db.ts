import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  ssl: {
    rejectUnauthorized: false
  }
});

// Método para testear la conexión
export async function testDBConnection() {
  try {
    // Tomamos una conexión del pool
    const connection = await pool.getConnection();

    
    console.log("Conexión a la DB exitosa");

    // Liberamos la conexión
    connection.release();
    return true;
  } catch (err) {
    console.error("Error al conectar a la DB:", err);
    return false;
  }
}
