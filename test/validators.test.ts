import { describe, it, expect } from "vitest";
import { validarCotizacion, validarCliente } from "@/lib/validators";

describe("Pruebas Unitarias: lib/validators.ts", () => {

  describe("Función: validarCliente()", () => {
    
    it("debe retornar objeto vacío si todos los datos son válidos", () => {
      const data = {
        nombre: "Juan Pablo",
        apellido: "García",
        celular: "11 3893 6217",
        email: "juan@mail.com",
        fecha_nacimiento: "15/05/1990",
        dni_cuit: "20304050"
      };
      const errores = validarCliente(data);
      expect(Object.keys(errores).length).toBe(0);
    });

    it("debe validar Nombre y Apellido (letras, espacios, Ñ y acentos)", () => {
      const errores = validarCliente({ nombre: "Juan123", apellido: "Pérez!" });
      expect(errores.nombre).toBe("El nombre solo puede contener letras y espacios");
      expect(errores.apellido).toBe("El apellido solo puede contener letras y espacios");
    });

    it("debe limpiar y validar el largo del Celular (mínimo 8 dígitos)", () => {
      const errores = validarCliente({ celular: "11-22 (abc)" }); // Solo 4 números
      expect(errores.celular).toBe("El celular es demasiado corto (mín. 8 dígitos)");
    });

    it("debe validar el formato de Email si se ingresa", () => {
      const errores = validarCliente({ email: "correo-invalido@" });
      expect(errores.email).toBe("El formato de email no es correcto");
    });

    describe("Blindaje de Fecha de Nacimiento", () => {
      it("debe fallar si el formato no es DD/MM/YYYY", () => {
        const errores = validarCliente({ fecha_nacimiento: "1990-05-15" });
        expect(errores.fecha_nacimiento).toBe("Usa el formato DD/MM/YYYY");
      });

      it("debe detectar fechas inexistentes (ej: 31 de febrero)", () => {
        const errores = validarCliente({ fecha_nacimiento: "31/02/1990" });
        expect(errores.fecha_nacimiento).toBe("La fecha ingresada no existe");
      });

      it("debe rechazar fechas futuras", () => {
        const errores = validarCliente({ fecha_nacimiento: "01/01/2050" });
        expect(errores.fecha_nacimiento).toBe("La fecha no puede ser futura");
      });

      it("debe rechazar años incoherentes (menores a 1900)", () => {
        const errores = validarCliente({ fecha_nacimiento: "10/05/1850" });
        expect(errores.fecha_nacimiento).toBe("Año de nacimiento no válido");
      });
    });

    it("debe validar DNI/CUIT (mínimo 8 dígitos)", () => {
      const errores = validarCliente({ dni_cuit: "123456" });
      expect(errores.dni_cuit).toBe("Ingresá un DNI o CUIT válido (mín. 8 dígitos)");
    });
  });

  describe("Función: validarCotizacion()", () => {
    
    it("debe exigir la selección de un tipo de seguro", () => {
      const errores = validarCotizacion("", {});
      expect(errores.tipoSeguro).toBe("Seleccioná un tipo de seguro");
    });

    it("debe validar campos básicos (nombre, email, teléfono)", () => {
      const errores = validarCotizacion("vida", { email: "mal", telefono: "123" });
      expect(errores.nombre).toBe("Falta ingresar nombre");
      expect(errores.email).toBe("Ingresá un email válido");
      expect(errores.telefono).toBe("Ingresá un teléfono válido (mínimo 8 dígitos)");
    });

    it("debe validar campos dinámicos obligatorios según segurosConfig", () => {
      // Para seguro 'vida', supongamos que 'edad' es required
      const errores = validarCotizacion("vida", { 
        nombre: "A", email: "a@a.com", telefono: "11223344" 
      });
      expect(errores.edad).toBeDefined(); // Verifica que el error de edad exista
    });

    it("debe validar rangos numéricos (min/max)", () => {
      const data = { 
        nombre: "A", email: "a@a.com", telefono: "11223344", 
        edad: "15" // Si el mínimo en vida es 18
      };
      const errores = validarCotizacion("vida", data);
      expect(errores.edad).toContain("El mínimo permitido es");
    });
  });
});