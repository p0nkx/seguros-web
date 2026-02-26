import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import CotizacionForm from "../app/components/CotizacionForm";

vi.stubGlobal("open", vi.fn());

describe("Formulario de Cotización Completo", () => {

 /////tests del formulario principal nombre, email, telefono y tipo de seguro////
describe("Validaciones del formulario principal", () => {
 
  it("Muestra error si se envía vacío", async () => {
    render(<CotizacionForm />);

    await userEvent.click(
      screen.getByText("Enviar por WhatsApp")
    );

    expect(
      screen.getByText("Seleccioná un tipo de seguro")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Falta ingresar nombre")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Falta ingresar email")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Falta ingresar teléfono")
    ).toBeInTheDocument();
  });

  it("Envía correctamente si todo está bien", async () => {
    const openSpy = vi.spyOn(window, "open");

    render(<CotizacionForm />);

    await userEvent.selectOptions(
      screen.getByDisplayValue("Seleccionar tipo de seguro"),
      "vida"
    );

    await userEvent.type(
      screen.getByPlaceholderText("Nombre Completo"),
      "Juan"
    );

    await userEvent.type(
      screen.getByPlaceholderText("Email"),
      "juan@mail.com"
    );

    await userEvent.type(
      screen.getByPlaceholderText("Teléfono"),
      "12345678"
    );

    await userEvent.type(
      screen.getByPlaceholderText("Edad"),
      "30"
    );

    await userEvent.click(
      screen.getByText("Enviar por WhatsApp")
    );

    expect(openSpy).toHaveBeenCalled();
  });

  //test nombre//
  it("No permite enviar si el nombre es vacío", async () => {
    render(<CotizacionForm />);

    await userEvent.selectOptions(
      screen.getByDisplayValue("Seleccionar tipo de seguro"),
      "vida"
    );

    await userEvent.type(
      screen.getByPlaceholderText("Email"),
      "juan@mail.com"
    );

    await userEvent.type(
      screen.getByPlaceholderText("Teléfono"),
      "123456"
    );

    await userEvent.type(
      screen.getByPlaceholderText("Edad"),
      "30"
    );

    await userEvent.click(
      screen.getByText("Enviar por WhatsApp")
    );

    expect(
      screen.getByText("Falta ingresar nombre")
    ).toBeInTheDocument();

  });

  //test email//
  it("No permite enviar si el email es vacío", async () => {
    render(<CotizacionForm />);
    await userEvent.selectOptions(
      screen.getByDisplayValue("Seleccionar tipo de seguro"),
      "vida"
    );
    await userEvent.type(
      screen.getByPlaceholderText("Nombre Completo"),
      "Juan"
    );

    await userEvent.type(
      screen.getByPlaceholderText("Teléfono"),
      "123456"
    );
    await userEvent.type(
      screen.getByPlaceholderText("Edad"),
      "30"
    );
    await userEvent.click(
      screen.getByText("Enviar por WhatsApp")
    );
    expect(
      screen.getByText("Falta ingresar email")
    ).toBeInTheDocument();
  });
  test("No permite enviar si el email es inválido", async () => {
    render(<CotizacionForm />);
    await userEvent.selectOptions(
      screen.getByDisplayValue("Seleccionar tipo de seguro"),
      "vida"
    );
    await userEvent.type(
      screen.getByPlaceholderText("Nombre Completo"),
      "Juan"
    );
    await userEvent.type(
      screen.getByPlaceholderText("Email"),
      "correo-invalido"
    );
    await userEvent.type(
      screen.getByPlaceholderText("Teléfono"),
      "123456"
    );
    await userEvent.click(
      screen.getByText("Enviar por WhatsApp")
    );
    expect(
      screen.getByText("Ingresá un email válido")
    ).toBeInTheDocument();
  });

  //test telefono//
  it("No permite enviar si el teléfono es vacío", async () => {
    render(<CotizacionForm />);
    await userEvent.selectOptions(
      screen.getByDisplayValue("Seleccionar tipo de seguro"),
      "vida"
    );
    await userEvent.type(
      screen.getByPlaceholderText("Nombre Completo"),
      "Juan"
    );
    await userEvent.type(
      screen.getByPlaceholderText("Email"),
      "juan@mail.com"
    );
    await userEvent.type(
      screen.getByPlaceholderText("Edad"),
      "30"
    );
    await userEvent.click(
      screen.getByText("Enviar por WhatsApp")
    );
    expect(
      screen.getByText("Falta ingresar teléfono")
    ).toBeInTheDocument();
  });

  it("No permite enviar si el teléfono es inválido", async () => {
    render(<CotizacionForm />);
    await userEvent.selectOptions(
      screen.getByDisplayValue("Seleccionar tipo de seguro"),
      "vida"
    );
    await userEvent.type(
      screen.getByPlaceholderText("Nombre Completo"),
      "Juan"
    );

    await userEvent.type(
      screen.getByPlaceholderText("Email"),
      "juan@mail.com"
    );

    await userEvent.type(
      screen.getByPlaceholderText("Teléfono"),
      "12345" // Inválido: menos de 8 dígitos
    );

    await userEvent.type(
      screen.getByPlaceholderText("Edad"),
      "30"
    );

    await userEvent.click(
      screen.getByText("Enviar por WhatsApp")
    );

    expect(
      screen.getByText("Ingresá un teléfono válido (mínimo 8 dígitos)")
    ).toBeInTheDocument();
  });

  //test tipo de seguro//
  it("No permite enviar si no se selecciona un tipo de seguro", async () => {
    render(<CotizacionForm />);

    await userEvent.type(
      screen.getByPlaceholderText("Nombre Completo"),
      "Juan"
    );
    await userEvent.type(
      screen.getByPlaceholderText("Email"),
      "juan@mail.com"
    );

    await userEvent.type(
      screen.getByPlaceholderText("Teléfono"),
      "123456"
    );

    await userEvent.click(
      screen.getByText("Enviar por WhatsApp")
    );

    expect(
      screen.getByText("Seleccioná un tipo de seguro")
    ).toBeInTheDocument();
  });
});


 ////test campos dinámicos segun seleccion de tipo de seguro////
describe("Validaciones de campos dinámicos según tipo de seguro", () => {
 

   //test formulario vida//
  describe("Validaciones para Seguro de Vida", () => {
 
  it("Muestra campos dinámicos al seleccionar vida", async () => {
    render(<CotizacionForm />);

    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: /tipo de seguro/i }), // Es mejor usar el rol que el valor actual
      "vida"
    );

    expect(screen.getByText("Datos del Seguro de Vida")).toBeInTheDocument();//titulo del formulario
    expect(screen.getByPlaceholderText("Edad")).toBeInTheDocument();

    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: /tipo de seguro/i }),
      "" // O el valor que represente "Seleccionar..."
    );

    expect(screen.queryByPlaceholderText("Edad")).not.toBeInTheDocument();
  });

  it("No permite enviar si la edad es menor a 18", async () => {
    render(<CotizacionForm />);
    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: /tipo de seguro/i }),
      "vida"
    );
    await userEvent.type(
      screen.getByPlaceholderText("Nombre Completo"),
      "Juan"
    );
    await userEvent.type(
      screen.getByPlaceholderText("Email"),
      "juan@mail.com"
    );
    await userEvent.type(
      screen.getByPlaceholderText("Teléfono"),
      "12345678"
    );
    await userEvent.type(
      screen.getByPlaceholderText("Edad"),
      "15" // Menor a 18
    );
    await userEvent.click(
      screen.getByText("Enviar por WhatsApp")
    );
    expect(
      screen.getByText("El mínimo permitido es 18")
    ).toBeInTheDocument();
  });

  it("No permite enviar si la edad es mayor a 90 en vida", async () => {
    render(<CotizacionForm />);
    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: /tipo de seguro/i }),
      "vida"
    );
    await userEvent.type(
      screen.getByPlaceholderText("Nombre Completo"),
      "Juan"
    );
    await userEvent.type(
      screen.getByPlaceholderText("Email"),
      "juan@mail.com"
    );
    await userEvent.type(
      screen.getByPlaceholderText("Teléfono"),
      "12345678"
    );
    await userEvent.type(
      screen.getByPlaceholderText("Edad"),
      "95" // Mayor a 90
    );
    await userEvent.click(
      screen.getByText("Enviar por WhatsApp")
    );
    expect(
      screen.getByText("El máximo permitido es 90")
    ).toBeInTheDocument();
  });
  it("no permite enviar si la edad esta incompleto", async () => {
    render(<CotizacionForm />);
    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: /tipo de seguro/i }),
      "vida"
    );
    await userEvent.type(
      screen.getByPlaceholderText("Nombre Completo"),
      "Juan"
    );
    await userEvent.type(
      screen.getByPlaceholderText("Email"),
      "juan@mail.com"
    );
    await userEvent.type(
      screen.getByPlaceholderText("Teléfono"),
      "12345678"
    );
    await userEvent.click(
      screen.getByText("Enviar por WhatsApp")
    );
    expect(
      screen.getByText("Falta completar Edad")
    ).toBeInTheDocument();
  });
});


//test formulario hogar//
describe("Validaciones para Seguro de Hogar", () => {

it("Muestra campos dinámicos al seleccionar hogar", async () => {
  render(<CotizacionForm />);
  await userEvent.selectOptions(
    screen.getByRole("combobox", { name: /tipo de seguro/i }),
    "hogar"
  );
  expect(screen.getByText("Datos del Seguro de Hogar")).toBeInTheDocument();//titulo del formulario
  expect(screen.getByPlaceholderText("Metros cuadrados")).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/localidad/i)).toBeInTheDocument();//se usa /localidad/i para hacer la búsqueda sin importar mayúsculas o minúsculas
  expect(screen.getByRole("combobox", { name: /tipo de vivienda/i })).toBeInTheDocument();

  await userEvent.selectOptions(
    screen.getByRole("combobox", { name: /tipo de seguro/i }),
    "" // O el valor que represente "Seleccionar..."
  );
  expect(screen.queryByPlaceholderText("Metros cuadrados")).not.toBeInTheDocument();
  expect(screen.queryByPlaceholderText(/localidad/i)).not.toBeInTheDocument();//se usa /localidad/i para hacer la búsqueda sin importar mayúsculas o minúsculas
  expect(screen.queryByRole("combobox", { name: /tipo de vivienda/i })).not.toBeInTheDocument();

});

it("No permite enviar si los metros cuadrados están incompletos", async () => {
  render(<CotizacionForm />);
  await userEvent.selectOptions(
    screen.getByRole("combobox", { name: /tipo de seguro/i }),
    "hogar"
  );
  await userEvent.type(
    screen.getByPlaceholderText("Nombre Completo"),
    "Juan"
  );
  await userEvent.type(
    screen.getByPlaceholderText("Email"),
    "juan@mail.com"
  );
  await userEvent.type(
    screen.getByPlaceholderText("Teléfono"),
    "12345678"
  );
  await userEvent.click(
    screen.getByText("Enviar por WhatsApp")
  );
  expect(
    screen.getByText("Falta completar Metros cuadrados")
  ).toBeInTheDocument();
});
it("No permite enviar si los metros cuadrados son menores a 1", async () => {
  render(<CotizacionForm />);
  await userEvent.selectOptions(
    screen.getByRole("combobox", { name: /tipo de seguro/i }),
    "hogar"
  );
  await userEvent.type(
    screen.getByPlaceholderText("Metros cuadrados"),
    "0"
  );
  await userEvent.type(
    screen.getByPlaceholderText("Nombre Completo"),
    "Juan"
  );
  await userEvent.type(
    screen.getByPlaceholderText("Email"),
    "juan@mail.com"
  );
  await userEvent.type(
    screen.getByPlaceholderText("Teléfono"),
    "12345678"
  );
  await userEvent.click(
    screen.getByText("Enviar por WhatsApp")
  );
  expect(
    screen.getByText("El mínimo permitido es 1")
  ).toBeInTheDocument();
});

it("No permite enviar si localidad está vacía", async () => {
  render(<CotizacionForm />);
  await userEvent.selectOptions(
    screen.getByRole("combobox", { name: /tipo de seguro/i }),
    "hogar"
  );
  await userEvent.type(
    screen.getByPlaceholderText("Nombre Completo"),
    "Juan"
  );
  await userEvent.type(
    screen.getByPlaceholderText("Email"),
    "juan@mail.com"
  );
  await userEvent.type(
    screen.getByPlaceholderText("Teléfono"),
    "12345678"
  );
  await userEvent.type(
    screen.getByPlaceholderText("Metros cuadrados"),
    "100"
  );
  await userEvent.selectOptions(
    screen.getByRole("combobox", { name: /tipo de vivienda/i }),
    "CASAS Y DEPARTAMENTOS EN PLANTA BAJA"
  );
   
  await userEvent.click(
    screen.getByText("Enviar por WhatsApp")
  );
  expect(
    screen.getByText("Falta completar Localidad")
  ).toBeInTheDocument();
});
it("No permite enviar si el tipo de vivienda no está seleccionado", async () => {
  render(<CotizacionForm />);
  await userEvent.selectOptions(
    screen.getByRole("combobox", { name: /tipo de seguro/i }),
    "hogar"
  );
  await userEvent.type(
    screen.getByPlaceholderText("Metros cuadrados"),
    "100"
  );
  await userEvent.type(
    screen.getByPlaceholderText("Nombre Completo"),
    "Juan"
  );
  await userEvent.type(
    screen.getByPlaceholderText("Email"),
    "juan@mail.com"
  );
  await userEvent.type(
    screen.getByPlaceholderText("Teléfono"),
    "12345678"
  );
  await userEvent.type(
    screen.getByPlaceholderText(/localidad/i),
    "Ciudad"
  );
  await userEvent.click(
    screen.getByText("Enviar por WhatsApp")
  );
  expect(
    screen.getByText("Falta completar Tipo de Vivienda")
  ).toBeInTheDocument();
});

});


//responsabilidad civil//
describe("Validaciones para Seguro de Responsabilidad Civil", () => {

it("Muestra campos dinámicos al seleccionar responsabilidad civil", async () => {
  render(<CotizacionForm />);
  await userEvent.selectOptions(
    screen.getByRole("combobox", { name: /tipo de seguro/i }),
    "responsabilidad"
  );
  expect(screen.getByText("Datos del Seguro de Responsabilidad Civil")).toBeInTheDocument();//titulo del formulario
  expect(screen.getByPlaceholderText("Actividad a Realizar")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Suma Asegurada")).toBeInTheDocument();
  await userEvent.selectOptions(
    screen.getByRole("combobox", { name: /tipo de seguro/i }),
    "" // O el valor que represente "Seleccionar..."
  );
  expect(screen.queryByPlaceholderText("Actividad a Realizar")).not.toBeInTheDocument();
  expect(screen.queryByPlaceholderText("Suma Asegurada")).not.toBeInTheDocument();
});

it("No permite enviar si la actividad a realizar está vacía", async () => {
  render(<CotizacionForm />);
  await userEvent.selectOptions(
    screen.getByRole("combobox", { name: /tipo de seguro/i }),
    "responsabilidad"
  );
  await userEvent.type(
    screen.getByPlaceholderText("Suma Asegurada"),
    "100000"
  );
  await userEvent.click(
    screen.getByText("Enviar por WhatsApp")
  );
  expect(
    screen.getByText("Falta completar Actividad a Realizar")
  ).toBeInTheDocument();
});

it("No permite enviar si la suma asegurada está vacía", async () => {
  render(<CotizacionForm />);
  await userEvent.selectOptions(
    screen.getByRole("combobox", { name: /tipo de seguro/i }),
    "responsabilidad"
  );
  await userEvent.type(
    screen.getByPlaceholderText("Actividad a Realizar"),
    "Construcción"
  );
  await userEvent.click(
    screen.getByText("Enviar por WhatsApp")
  );
  expect(
    screen.getByText("Falta completar Suma Asegurada")
  ).toBeInTheDocument();

});
it("No permite enviar si la suma asegurada es menor a 100000", async () => {
  render(<CotizacionForm />);
  await userEvent.selectOptions(
    screen.getByRole("combobox", { name: /tipo de seguro/i }),
    "responsabilidad"
  );
  await userEvent.type(
    screen.getByPlaceholderText("Actividad a Realizar"),
    "Construcción"
  );
  await userEvent.type(
    screen.getByPlaceholderText("Suma Asegurada"),
    "50000"
  );
  await userEvent.click(
    screen.getByText("Enviar por WhatsApp")
  );
  expect(
    screen.getByText("El mínimo permitido es 100000")
  ).toBeInTheDocument();
});


});


//accidentes personales//
describe("Validaciones para Seguro de Accidentes Personales", () => {

it("Muestra campos dinámicos al seleccionar accidentes personales", async () => {
  render(<CotizacionForm />);
  await userEvent.selectOptions(
    screen.getByRole("combobox", { name: /tipo de seguro/i }),
    "accidentes"
  );
  expect(screen.getByText("Datos del Seguro de Accidentes Personales")).toBeInTheDocument();//titulo del formulario
  expect(screen.getByPlaceholderText("Edad")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Actividad Profesional")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Suma Asegurada")).toBeInTheDocument();
  expect(screen.getByRole("combobox", { name: /tipo de cobertura/i })).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/localidad/i)).toBeInTheDocument();
  expect(screen.getByRole("combobox", { name: /periodo de cobertura/i })).toBeInTheDocument();
  await userEvent.selectOptions(
    screen.getByRole("combobox", { name: /tipo de seguro/i }),
    "" // O el valor que represente "Seleccionar..."
  );
  expect(screen.queryByPlaceholderText("Edad")).not.toBeInTheDocument();
  expect(screen.queryByPlaceholderText("Actividad Profesional")).not.toBeInTheDocument();
  expect(screen.queryByPlaceholderText("Suma Asegurada")).not.toBeInTheDocument();
  expect(screen.queryByRole("combobox", { name: /tipo de cobertura/i })).not.toBeInTheDocument();
  expect(screen.queryByPlaceholderText(/localidad/i)).not.toBeInTheDocument();
  expect(screen.queryByRole("combobox", { name: /periodo de cobertura/i })).not.toBeInTheDocument();
});
it("no permite enviar si tipo de cobertura no está seleccionado", async () => {
  render(<CotizacionForm />);
  await userEvent.selectOptions(
    screen.getByRole("combobox", { name: /tipo de seguro/i }),
    "accidentes"
  );
  await userEvent.click(
    screen.getByText("Enviar por WhatsApp")
  );
  expect(
    screen.getByText("Falta completar Tipo de cobertura")
  ).toBeInTheDocument();
});
it("no permite enviar si periodo de cobertura no está seleccionado", async () => {
  render(<CotizacionForm />);
  await userEvent.selectOptions(
    screen.getByRole("combobox", { name: /tipo de seguro/i }),
    "accidentes"
  );
  await userEvent.selectOptions(
    screen.getByRole("combobox", { name: /tipo de cobertura/i }),
    "Colectivo"
  );
  await userEvent.click(
    screen.getByText("Enviar por WhatsApp")
  );
  expect(
    screen.getByText("Falta completar Periodo de cobertura")
  ).toBeInTheDocument();
});

});


//incendio//
describe("Validaciones para Seguro de Incendio", () => {

it("Muestra campos dinámicos al seleccionar incendio", async () => {
  render(<CotizacionForm />);
  await userEvent.selectOptions(
    screen.getByRole("combobox", { name: /tipo de seguro/i }),
    "incendio"
  );
  expect(screen.getByText("Datos del Seguro de Incendio")).toBeInTheDocument();//titulo del formulario
  expect(screen.getByPlaceholderText(/metros cuadrados/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/localidad/i)).toBeInTheDocument();
  expect(screen.getByRole("combobox", { name: /tipo de vivienda/i })).toBeInTheDocument();
  await userEvent.selectOptions(
    screen.getByRole("combobox", { name: /tipo de seguro/i }),
    "" // O el valor que represente "Seleccionar..."
  );
  expect(screen.queryByPlaceholderText(/metros cuadrados/i)).not.toBeInTheDocument();
  expect(screen.queryByPlaceholderText(/localidad/i)).not.toBeInTheDocument();
  expect(screen.queryByRole("combobox", { name: /tipo de vivienda/i })).not.toBeInTheDocument();
});

it("no permite enviar si tipo de vivienda no está seleccionado", async () => {
  render(<CotizacionForm />);
  await userEvent.selectOptions(
    screen.getByRole("combobox", { name: /tipo de seguro/i }),
    "incendio"
  );
await userEvent.type(
    screen.getByPlaceholderText(/metros cuadrados/i),
    "100"
  );
  await userEvent.type(
    screen.getByPlaceholderText(/localidad/i),
    "Ciudad"
  );


  await userEvent.click(
    screen.getByText("Enviar por WhatsApp")
  );
  expect(
    screen.getByText("Falta completar Tipo de Vivienda")
  ).toBeInTheDocument();

  
});
});


//otros//
describe("Validaciones para Seguro Otros", () => {


it("Muestra campos dinámicos al seleccionar otros", async () => {
  render(<CotizacionForm />);
  await userEvent.selectOptions(
    screen.getByRole("combobox", { name: /tipo de seguro/i }),
    "otros"
  );
  expect(screen.getByText("otros")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Detalle del seguro")).toBeInTheDocument();
  await userEvent.selectOptions(
    screen.getByRole("combobox", { name: /tipo de seguro/i }),
    "" // O el valor que represente "Seleccionar..."
  );
  expect(screen.queryByPlaceholderText("Detalle del seguro")).not.toBeInTheDocument();

});
it("No permite enviar si el detalle del seguro está vacío", async () => {
  render(<CotizacionForm />);
  await userEvent.selectOptions(
    screen.getByRole("combobox", { name: /tipo de seguro/i }),
    "otros"
  );
  expect(screen.getByText("otros")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Detalle del seguro")).toBeInTheDocument();

  await userEvent.click(
    screen.getByText("Enviar por WhatsApp")
  );
  expect(
    screen.getByText("Falta completar Detalle del seguro")
  ).toBeInTheDocument();
});

});



//test automotor//
describe("Validaciones para Seguro de Automotor", () => {

  
  it("Muestra campos dinámicos al seleccionar auto", async () => {
    render(<CotizacionForm />);
    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: /tipo de seguro/i }),
      "automotor"
    );
    expect(screen.getByText("Datos del Vehículo")).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: /Tipo de Cobertura automotor/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Marca")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Modelo")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Año")).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: /¿Posee GNC?/i })).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: /Uso del vehículo/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/localidad/i)).toBeInTheDocument();
    
    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: /tipo de seguro/i }),
      "" // O el valor que represente "Seleccionar..."
    );
    expect(screen.queryByText("Datos del Vehículo")).not.toBeInTheDocument();
    expect(screen.queryByRole("combobox", { name: /Tipo de Cobertura automotor/i })).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText("Marca")).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText("Modelo")).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText("Año")).not.toBeInTheDocument();
    expect(screen.queryByRole("combobox", { name: /¿Posee GNC?/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("combobox", { name: /Uso del vehículo/i })).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText(/localidad/i)).not.toBeInTheDocument();
  });

  it("no permite enviar si tipo de cobertura no está seleccionado", async () => {
    render(<CotizacionForm />);
    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: /tipo de seguro/i }),
      "automotor"
    );
    await userEvent.click(
      screen.getByText("Enviar por WhatsApp")
    );
    expect(
      screen.getByText("Falta completar Tipo de Cobertura automotor")
    ).toBeInTheDocument();
  });

  it("no permite enviar si marca está vacía", async () => {
    render(<CotizacionForm />);
    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: /tipo de seguro/i }),
      "automotor"
    );
    await userEvent.click(
      screen.getByText("Enviar por WhatsApp")
    );
    expect(
      screen.getByText("Falta completar Marca")
    ).toBeInTheDocument();
  });

  it("no permite enviar si modelo está vacío", async () => {
    render(<CotizacionForm />);
    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: /tipo de seguro/i }),
      "automotor"
    );
    await userEvent.type(
      screen.getByPlaceholderText("Marca"),
      "Toyota"
    );
    await userEvent.click(
      screen.getByText("Enviar por WhatsApp")
    );
    expect(
      screen.getByText("Falta completar Modelo")
    ).toBeInTheDocument();
  });

it("No permite enviar si el año del vehículo es menor a 1980", async () => {
  render(<CotizacionForm />);
  await userEvent.selectOptions(
    screen.getByRole("combobox", { name: /tipo de seguro/i }),
    "automotor"
  );
  await userEvent.type(
    screen.getByPlaceholderText("Año"),
    "1970"
  );
  await userEvent.click(
    screen.getByText("Enviar por WhatsApp")
  );
  expect(
    screen.getByText("El mínimo permitido es 1980")
  ).toBeInTheDocument();
});

it("No permite enviar si el año del vehículo es mayor al año actual", async () => {
  render(<CotizacionForm />);
  await userEvent.selectOptions(
    screen.getByRole("combobox", { name: /tipo de seguro/i }),
    "automotor"
  );
  await userEvent.type(
    screen.getByPlaceholderText("Año"),
    "2030"
  );
  await userEvent.click(
    screen.getByText("Enviar por WhatsApp")
  );
  expect(
    screen.getByText("El máximo permitido es " + new Date().getFullYear())
  ).toBeInTheDocument();
});


  it("no permite enviar si uso del vehículo no está seleccionado", async () => {
    render(<CotizacionForm />);
    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: /tipo de seguro/i }),
      "automotor"
    );
    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: /Tipo de Cobertura automotor/i }),
      "Responsabilidad Civil"
    );
    await userEvent.type(
      screen.getByPlaceholderText("Marca"),
      "Toyota"
    );
    await userEvent.type(
      screen.getByPlaceholderText("Modelo"),
      "Corolla"
    );
    await userEvent.type(
      screen.getByPlaceholderText("Año"),
      "2010"  
    );
    await userEvent.click(
      screen.getByText("Enviar por WhatsApp")
    );
    expect(
      screen.getByText("Falta completar Uso del vehículo")
    ).toBeInTheDocument();
  });


});

});

});

