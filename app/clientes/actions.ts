// app/clientes/actions.ts
'use server'
import { neon } from '@neondatabase/serverless';

export async function getClientes() {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    throw new Error("DATABASE_URL no está configurada en las variables de entorno");
  }

  const sql = neon(databaseUrl);
  
  try {
    const data = await sql`SELECT * FROM clientes ORDER BY apellido ASC`;
    return data;
  } catch (error) {
    console.error("Error en Neon:", error);
    return [];
  }
}