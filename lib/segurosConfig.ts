
// ============================
// TIPOS
// ============================

export type CampoBase = {
  name: string;
  label: string;
  required: boolean;
};

export type CampoTextual = CampoBase & {
  type: "text" | "email" | "tel";
};

export type CampoNumber = CampoBase & {
  type: "number";
  min?: number;
  max?: number;
};

export type CampoSelect = CampoBase & {
  type: "select";
  options: string[];
};

export type Campo =
  | CampoTextual
  | CampoNumber
  | CampoSelect;

export type SeguroConfig = {
  titulo: string;
  campos: Campo[];
};


// ============================
// CONFIG
// ============================

export const segurosConfig: Record<string, SeguroConfig> = {
  automotor: {
    titulo: "Datos del Vehículo",
    campos: [
      {
        name: "cobertura",
        label: "Tipo de Cobertura automotor",
        type: "select",
        required: true,
        options: ["Responsabilidad Civil", "Terceros Completos", "Todo Riesgo"],
      },
      { name: "marca", label: "Marca", type: "text", required: true },
      { name: "modelo", label: "Modelo", type: "text", required: true },
      { name: "anio", label: "Año", type: "number", required: true, min: 1980, max: new Date().getFullYear() },
      {
        name: "uso",
        label: "Uso del vehículo",
        type: "select",
        required: true,
        options: ["particular", "comercial"],
      },
      {
        name: "gnc",
        label: "¿Posee GNC?",
        type: "select",
        required: false,
        options: ["si", "no"],
      },
      { name: "localidad", label: "Localidad", type: "text", required: true },
    ],
  },

  vida: {
    titulo: "Datos del Seguro de Vida",
    campos: [
      { name: "edad", label: "Edad", type: "number", required: true, min: 18, max: 90 },
    ],
  },
  hogar: {
    titulo: "Datos del Seguro de Hogar",
    campos: [
      { name: "metros", label: "Metros cuadrados", type: "number", required: true, min: 1 },
      {
        name: "Vivienda",
        label: "Tipo de Vivienda",
        type: "select",
        required: true,
        options: ["CASAS Y DEPARTAMENTOS EN PLANTA BAJA", "DEPTOS. EN ALTURA Y CASAS EN COUNTRIES Y BARRIOS PRIVADOS"],
      },
      { name: "localidad", label: "Localidad", type: "text", required: true },
    ],
  },

  responsabilidad: {
    titulo: "Datos del Seguro de Responsabilidad Civil",
    campos: [
      { name: "actividad", label: "Actividad a Realizar", type: "text", required: true },
      {
        name: "sumaAsegurada",
        label: "Suma Asegurada",
        min: 100000,
        type: "number",
        required: true,
      },
    ],
  },

  accidentes: {
    titulo: "Datos del Seguro de Accidentes Personales",
    campos: [ 
      { name: "edad", label: "Edad", type: "number", required: true ,min: 18, max: 80},
      {
        name: "actividad", 
        label: "Actividad Profesional",
        type: "text",
        required: true,
      },
      { name: "sumaAsegurada", label: "Suma Asegurada", type: "number", required: true , min: 3000000, max: 60000000},
      { name: "tipo", label: "Tipo de cobertura", type: "select", required: true, options: ["Colectivo", "Individual"] },
      { name: "localidad", label: "Localidad", type: "text", required: true },
      { name: "periodo", label: "Periodo de cobertura", type: "select", required: true, options: ["Periodo corto", "Periodo largo"] },
    ],
  },

  incendio: {
    titulo: "Datos del Seguro de Incendio",
    campos: [
      { name: "metros", label: "Metros cuadrados", type: "number", required: true },
      {
        name: "Tipo de Vivienda",
        label: "Tipo de Vivienda",
        type: "select",
        required: true,
        options: ["CASAS Y DEPARTAMENTOS EN PLANTA BAJA", "DEPTOS EN PISOS ALTOS"],
      },
      { name: "localidad", label: "Localidad", type: "text", required: true },
    ],
  },
  
  otros:{
    titulo: "otros",
    campos: [
      { name: "detalle", label: "Detalle del seguro", type: "text", required: true},
  ],
  },
  

}
