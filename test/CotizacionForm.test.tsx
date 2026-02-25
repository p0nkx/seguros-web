import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import CotizacionForm from "../app/components/CotizacionForm";

vi.stubGlobal("open", vi.fn());

describe("Formulario de Cotización Completo", () => {

  it("Muestra error si se envía vacío", async () => {
    render(<CotizacionForm />);

    await userEvent.click(
      screen.getByText("Enviar por WhatsApp")
    );

    expect(
      screen.getByText("Seleccioná un tipo de seguro")
    ).toBeInTheDocument();
  });

  it("Muestra campos dinámicos al seleccionar vida", async () => {
    render(<CotizacionForm />);

    await userEvent.selectOptions(
      screen.getByDisplayValue("Seleccionar tipo de seguro"),
      "vida"
    );

    expect(
      screen.getByText("Datos del Seguro de Vida")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Edad")
    ).toBeInTheDocument();
  });

  it("No envía si email es inválido", async () => {
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

    await userEvent.type(
      screen.getByPlaceholderText("Edad"),
      "30"
    );

    await userEvent.click(
      screen.getByText("Enviar por WhatsApp")
    );

    expect(
      screen.getByText("Ingresá un email válido")
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
      "123456"
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

});