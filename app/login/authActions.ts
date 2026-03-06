// app/login/authActions.ts
"use server";
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers'; // Importación necesaria

// --- FUNCIÓN 1: REGISTRAR USUARIO (Nueva función para el registro) ---
export async function registrarUsuario(formData: FormData) {
  const sql = neon(process.env.DATABASE_URL!);

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const nombre = formData.get('nombre') as string;
  const username = formData.get('username') as string;

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  try {
    await sql`
      INSERT INTO usuarios (email, password_hash, nombre, username)
      VALUES (${email}, ${hash}, ${nombre}, ${username})
    `;
    return { success: true };
  } catch (error) {
    console.error("Error al crear usuario:", error);
    return { success: false, error: "El usuario o email ya existe." };
  }
}

// --- FUNCIÓN 2: VALIDAR LOGIN (Nueva función para el login) ---
export async function validarLogin(identificador: string, pass: string) {
  const sql = neon(process.env.DATABASE_URL!);

  try {
    // Buscamos al usuario por email o nombre de usuario
    const usuarios = await sql`SELECT * FROM usuarios WHERE email = ${identificador} OR username = ${identificador} LIMIT 1`;

    if (usuarios.length === 0) {
      return { success: false, message: "Usuario no encontrado" };
    }

    const usuario = usuarios[0];

    // Comparamos la clave ingresada con el hash guardado en Neon
    const esValida = await bcrypt.compare(pass, usuario.password_hash);

    if (esValida) {
      registrarConexion(usuario.id); // Actualizamos la última conexión

      // Crear la cookie de sesión y la cookie de rol
      const cookieStore = await cookies();
      cookieStore.set('auth-session', 'true', { httpOnly: true, secure: true, sameSite: 'lax' });
      cookieStore.set('user-role', usuario.role, { httpOnly: true, secure: true, sameSite: 'lax' });

      return {
        success: true,
        user: { email: usuario.email, nombre: usuario.nombre, role: usuario.role } // Asegúrate de tener un campo 'role' en tu tabla
      };
    } else {
      return { success: false, message: "Contraseña incorrecta" };
    }
  } catch (error) {
    console.error("Error en validarLogin:", error);
    return { success: false, message: "Error de conexión con la base de datos" };
  }
}

// --- OBTENER TODOS LOS USUARIOS ---
export async function obtenerUsuarios() {
  const sql = neon(process.env.DATABASE_URL!);
  return await sql`SELECT id, nombre, email, username, role, fecha_creacion, ultima_conexion FROM usuarios ORDER BY fecha_creacion DESC`;
}

// --- ELIMINAR USUARIO ---
export async function eliminarUsuario(id: number) {
  const sql = neon(process.env.DATABASE_URL!);
  await sql`DELETE FROM usuarios WHERE id = ${id}`;
  return { success: true };
}

// --- ACTUALIZAR USUARIO (Sin cambiar contraseña aquí por seguridad) ---
export async function actualizarUsuario(id: number, datos: { nombre: string, email: string, username: string, role: string }) {
  const sql = neon(process.env.DATABASE_URL!);
  try {
    await sql`
      UPDATE usuarios 
      SET nombre = ${datos.nombre}, email = ${datos.email}, username = ${datos.username}, role = ${datos.role}
      WHERE id = ${id}
    `;
    return { success: true };
  } catch (error) {
    return { success: false, error: "Error al actualizar" };
  }
}

// --- ACTUALIZAR ÚLTIMA CONEXIÓN (Llamar esto en validarLogin) ---
export async function registrarConexion(id: number) {
  const sql = neon(process.env.DATABASE_URL!);
  await sql`UPDATE usuarios SET ultima_conexion = CURRENT_TIMESTAMP WHERE id = ${id}`;
}