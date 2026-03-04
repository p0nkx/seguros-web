// /lib/validators.ts
import { segurosConfig } from "./segurosConfig";

export function validarCotizacion(
  tipoSeguro: string,
  formData: any
) {
  const errores: Record<string, string> = {};

  if (!tipoSeguro) {
    errores.tipoSeguro = "Seleccioná un tipo de seguro";
  }

  if (!formData.nombre?.trim()) {
    errores.nombre = "Falta ingresar nombre";
  }

  if (!formData.email?.trim()) {
    errores.email = "Falta ingresar email";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      errores.email = "Ingresá un email válido";
    }
  }

  if (!formData.telefono?.trim()) {
    errores.telefono = "Falta ingresar teléfono";
  }else{
    const telefonoRegex = /^\d{8,}$/;

    if (!telefonoRegex.test(formData.telefono)) {
      errores.telefono = "Ingresá un teléfono válido (mínimo 8 dígitos)";
    }
  }

  const config = segurosConfig[tipoSeguro as keyof typeof segurosConfig];

  if (!config) return errores;

  config.campos.forEach((campo) => {
    const valor = formData[campo.name];

    if (campo.required && !valor) {
      errores[campo.name] = `Falta completar ${campo.label}`;
      return;
    }

    // Validaciones para campos number
    if (campo.type === "number" && valor) {
      const numero = Number(valor);

      if (campo.min !== undefined && numero < campo.min) {
        errores[campo.name] = `El mínimo permitido es ${campo.min}`;
      }

      if (campo.max !== undefined && numero > campo.max) {
        errores[campo.name] = `El máximo permitido es ${campo.max}`;
      }
    }
  });

  return errores;
}


// --- AGREGA ESTO AL FINAL DE /lib/validators.ts ---

export function validarCliente(formData: any) {
  const errores: Record<string, string> = {};

  // Validación de Nombre
  if (!formData.nombre?.trim()) {
    errores.nombre = "Falta ingresar nombre";
  }

  // Validación de Apellido
  if (!formData.apellido?.trim()) {
    errores.apellido = "Falta ingresar apellido";
  }

 // Validación de Celular (Limpieza y comprobación)
if (!formData.celular || String(formData.celular).trim() === "") {
  errores.celular = "Falta ingresar celular";
} else {
  // 1. LIMPIEZA: Quitamos todo lo que no sea un número (paréntesis, guiones, espacios)
  const celularSoloNumeros = String(formData.celular).replace(/\D/g, "");

  // 2. COMPROBACIÓN: ¿Tiene el largo mínimo para ser un teléfono real?
  if (celularSoloNumeros.length < 8) {
    errores.celular = "El celular es demasiado corto (mín. 8 dígitos)";
  } 
  
  // 3. OPCIONAL: Si quieres guardar el celular ya limpio en el objeto original
  // formData.celular = celularSoloNumeros; 
}

  // Validación de Email (Opcional, pero si hay algo, que sea válido)
  if (formData.email?.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errores.email = "El formato de email no es correcto";
    }
  }

  // Validación de Fecha de Nacimiento (Opcional, formato DD/MM/YYYY)
  if (formData.fecha_nacimiento?.trim()) {
    const fechaRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!fechaRegex.test(formData.fecha_nacimiento)) {
      errores.fecha_nacimiento = "Usa el formato DD/MM/YYYY";
    }
  }

  // Validación de DNI o cuit
  if (!formData.dni_cuit?.trim()) {
    errores.dni_cuit = "Falta ingresar DNI o CUIT";
  } else {
    const dniCuitRegex = /^\d{8,}$/;
    if (!dniCuitRegex.test(formData.dni_cuit)) {
      errores.dni_cuit = "Ingresá un DNI o CUIT válido (mín. 8 dígitos)";
    }
  }

  return errores;
}