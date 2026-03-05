import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ClienteForm from "../app/components/ClienteForm"; // Ajustá la ruta si es necesario
import * as actions from "@/app/clientes/actions";
import { dir } from "console";

// 1. Mock de SweetAlert2 (para que no explote al no haber DOM real de alertas)
vi.mock("sweetalert2", () => ({
  default: {
    mixin: vi.fn(() => ({
      fire: vi.fn(),
    })),
  },
}));

// 2. Mock de la Server Action de guardado
vi.mock("@/app/clientes/actions", () => ({
  guardarCliente: vi.fn(),
}));

describe("Componente: ClienteForm", () => {
  const mockOnClose = vi.fn();
  const clientesDummy = [
    { id: 1, nombre: "Juan", apellido: "Perez", dni_cuit: "20304050", activo: true,
     fecha_nacimiento: "15/05/1990", email: "juan@test.com", celular: "1138936217", direccion: "Calle Falsa 123" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });
it("debe mostrar errores de validación si se envía vacío", async () => {
    render(<ClienteForm onClose={mockOnClose} clientesActuales={[]} />);
    
    const botonGuardar = screen.getByRole("button", { name: /Registrar Asegurado/i });
    await userEvent.click(botonGuardar);

    expect(screen.getByText("Falta ingresar nombre")).toBeInTheDocument();
    expect(screen.getByText("Falta ingresar apellido")).toBeInTheDocument();
    expect(screen.getByText("Falta ingresar celular")).toBeInTheDocument();
    // CORRECCIÓN: Mayúsculas exactas
    expect(screen.getByText("Falta ingresar DNI o CUIT")).toBeInTheDocument();
  });

  it("debe bloquear el guardado si el DNI ya existe en clientesActuales (Duplicado)", async () => {
    render(<ClienteForm onClose={mockOnClose} clientesActuales={clientesDummy} />);
    
    // CORRECCIÓN: Usamos Placeholder o DisplayValue en lugar de Label si no hay IDs vinculados
    await userEvent.type(screen.getByPlaceholderText(/ejemplo@correo.com/i), "test@test.com"); // Email por ej.
    
    // O mejor aún, buscamos el input que está cerca del texto "Nombre *"
    const inputs = screen.getAllByRole("textbox");
    await userEvent.type(inputs[0], "Otro"); // Nombre
    await userEvent.type(inputs[1], "Cliente"); // Apellido
    await userEvent.type(inputs[2], "1122334455"); // Celular
    await userEvent.type(inputs[3], "20304050"); // DNI Duplicado

    const botonGuardar = screen.getByRole("button", { name: /Registrar Asegurado/i });
    await userEvent.click(botonGuardar);

    expect(screen.getByText("Documento/CUIT ya vinculado")).toBeInTheDocument();
    expect(actions.guardarCliente).not.toHaveBeenCalled();
  });

  it("debe llamar a la acción de guardar cuando los datos son válidos", async () => {
    vi.mocked(actions.guardarCliente).mockResolvedValue({ success: true });
    render(<ClienteForm onClose={mockOnClose} clientesActuales={[]} />);
    
    const inputs = screen.getAllByRole("textbox");
    await userEvent.type(inputs[0], "Bianca");
    await userEvent.type(inputs[1], "Seguros");
    await userEvent.type(inputs[2], "1138936217");
    await userEvent.type(inputs[3], "12345678");

    const botonGuardar = screen.getByRole("button", { name: /Registrar Asegurado/i });
    await userEvent.click(botonGuardar);

    await waitFor(() => {
      expect(actions.guardarCliente).toHaveBeenCalled();
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});