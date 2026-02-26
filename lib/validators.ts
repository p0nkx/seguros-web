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