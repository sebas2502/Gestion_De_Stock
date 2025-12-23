import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const url = new URL(process.env.DB_URL!);

export const pool = mysql.createPool({
  host: url.hostname,
  port: Number(url.port),
  user: url.username,
  password: url.password,
  database: url.pathname.slice(1),
  waitForConnections: true,
  connectionLimit: 10,
  ssl: { rejectUnauthorized: false }
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
