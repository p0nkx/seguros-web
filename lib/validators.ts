export function validarCotizacion(
  tipoSeguro: string,
  coberturaAuto: string,
  formData: any
) {
  const errores: Record<string, string> = {};

  // Tipo de seguro
  if (!tipoSeguro) {
    errores.tipoSeguro = "Seleccioná un tipo de seguro";
  }

  // Datos personales
  if (!formData.nombre.trim()) {
    errores.nombre = "Falta ingresar nombre";
  }

  if (!formData.email?.trim()) {
    errores.email = "Falta ingresar email";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errores.email = "Ingresá un email válido";
  }

  if (!formData.telefono.trim()) {
    errores.telefono = "Falta ingresar teléfono";
  }

  // Automotor
  if (tipoSeguro === "automotor") {
    if (!coberturaAuto) {
      errores.coberturaAuto = "Seleccioná una cobertura";
    }

    if (!formData.marca.trim()) {
      errores.marca = "Falta ingresar marca";
    }

    if (!formData.modelo.trim()) {
      errores.modelo = "Falta ingresar modelo";
    }

    const currentYear = new Date().getFullYear();

    if (!formData.anio) {
      errores.anio = "Falta ingresar año";
    } else if (
      Number(formData.anio) < 1900 ||
      Number(formData.anio) > currentYear
    ) {
      errores.anio = "Ingresá un año válido";
    }

    if (!formData.uso) {
      errores.uso = "Seleccioná el uso del vehículo";
    }

    if (!formData.localidad.trim()) {
      errores.localidad = "Falta ingresar localidad";
    }
  }

  return errores;
}