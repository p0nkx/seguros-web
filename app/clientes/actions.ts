// app/clientes/actions.ts
'use server'
import { neon } from '@neondatabase/serverless';
import { revalidatePath } from 'next/cache';

const databaseUrl = process.env.DATABASE_URL!;
const sql = neon(databaseUrl);

export async function getClientes() {
  try {
    const data = await sql`SELECT * FROM clientes ORDER BY apellido ASC`;
    return data;
  } catch (error) {
    console.error("Error en Neon:", error);
    return [];
  }
}

export async function guardarCliente(formData: any) {
  try {
    // Función interna para convertir DD/MM/YYYY a YYYY-MM-DD
    const formatearFechaParaDB = (fechaStr: string) => {
      if (!fechaStr || !fechaStr.includes('/')) return null;
      const [dia, mes, anio] = fechaStr.split('/');
      return `${anio}-${mes}-${dia}`;
    };

    const fechaNacFormatted = formatearFechaParaDB(formData.fecha_nacimiento);

    if (formData.id) {
      // ACTUALIZAR
      await sql`
        UPDATE clientes 
        SET nombre = ${formData.nombre}, 
            apellido = ${formData.apellido}, 
            dni_cuit = ${formData.dni_cuit}, 
            email = ${formData.email}, 
            celular = ${formData.celular}, 
            direccion = ${formData.direccion}, 
            fecha_nacimiento = ${fechaNacFormatted}, 
            activo = ${formData.activo}, 
            observaciones = ${formData.observaciones}
        WHERE id = ${formData.id}
      `;
    } else {
      // INSERTAR NUEVO
      await sql`
        INSERT INTO clientes (nombre, apellido, dni_cuit, email, celular, direccion, fecha_nacimiento, activo, observaciones, fecha_alta)
        VALUES (${formData.nombre}, ${formData.apellido}, ${formData.dni_cuit}, ${formData.email}, ${formData.celular}, ${formData.direccion}, ${fechaNacFormatted}, true, ${formData.observaciones}, CURRENT_DATE)
      `;
    }

    revalidatePath('/clientes'); // Refresca la lista automáticamente
    return { success: true };
  } catch (error) {
    console.error("Error al guardar:", error);
    throw new Error("No se pudo guardar el cliente");
  }
}