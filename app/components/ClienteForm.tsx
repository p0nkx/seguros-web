"use client";
import { useState, useTransition } from 'react';
import { Cliente } from './ClientesList';
import { validarCliente } from "@/lib/validators";
import { guardarCliente } from "@/app/clientes/actions";
import Swal from 'sweetalert2';

interface ClienteFormProps {
  cliente?: Cliente | null;
  onClose: () => void;
  clientesActuales: Cliente[]; // Para validar duplicados en caso de nuevo cliente
}

export default function ClienteForm({ cliente, onClose, clientesActuales }: ClienteFormProps) {
  // 1. Estado para los datos
  const [formData, setFormData] = useState<Partial<Cliente>>(
    cliente || {
      activo: true,
      nombre: '',
      apellido: '',
      dni_cuit: '',
      email: '',
      celular: '',
      direccion: '',
      fecha_nacimiento: '',
      observaciones: ''
    }
  );

  const [errores, setErrores] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition(); // Para saber si está guardando



  // Configuración del Toast (idéntica a la que usaste en cotizaciones)
  const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: '#111b31',
    color: '#fff',
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nuevosErrores = validarCliente(formData);
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      // Notificación de advertencia
      Toast.fire({
        icon: 'warning',
        title: 'Faltan datos obligatorios'
      });
      return;
    }

    // 2. VALIDACIÓN DE DUPLICADOS 
    if (formData.dni_cuit) {
      const valorNuevo = String(formData.dni_cuit).trim();

      const duplicado = clientesActuales.find((c: Cliente) => {
        const valorExistente = String(c.dni_cuit).trim();

        // Evitamos compararnos con nosotros mismos si estamos editando
        if (c.id === cliente?.id) return false;

        // Lógica de cruce:
        // ¿El nuevo DNI está contenido en el CUIT existente? 
        // O ¿El CUIT existente está contenido en el nuevo DNI? (caso inverso)
        return valorExistente.includes(valorNuevo) || valorNuevo.includes(valorExistente);
      });

      if (duplicado) {
        setErrores((prev) => ({ ...prev, dni_cuit: "Documento/CUIT ya vinculado" }));
        Toast.fire({
          icon: 'error',
          title: '¡Atención! Posible duplicado',
          text: `El documento coincide con ${duplicado.apellido} ${duplicado.nombre} (DNI/CUIT: ${duplicado.dni_cuit})`
        });
        return; // Frenamos el guardado
      }
    }

    startTransition(async () => {
      try {
        const resultado = await guardarCliente(formData);

        if (resultado.success) {
          // NOTIFICACIÓN DE ÉXITO
          Toast.fire({
            icon: 'success',
            title: cliente ? 'Actualizado correctamente' : 'Cliente registrado con éxito'
          });

          onClose();
        }
      } catch (error) {
        console.error(error);
        Toast.fire({
          icon: 'error',
          title: 'Error al conectar con la base de datos'
        });
      }
    });



  };

  // Función para las clases de los inputs
  const getInputClass = (campo: string) => `
    w-full bg-slate-50 border rounded-xl p-3 text-sm outline-none transition-all
    ${errores[campo]
      ? 'border-red-500 bg-red-50'
      : 'border-slate-200 focus:ring-2 focus:ring-blue-500'}
  `;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">

        {/* CABECERA */}
        <div className="bg-[#001f3d] p-6 text-white flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold tracking-tight">
              {cliente ? 'Editar Asegurado' : 'Nuevo Registro'}
            </h2>
          </div>
          <button type="button" onClick={onClose} className="hover:bg-white/10 p-2 rounded-full cursor-pointer">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* NOMBRE */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Nombre *</label>
              <input
                type="text"
                className={getInputClass('nombre')}
                value={formData.nombre}
                onChange={(e) => {
                  setFormData({ ...formData, nombre: e.target.value });
                  if (errores.nombre) setErrores({ ...errores, nombre: '' });
                }}
              />
              {errores.nombre && <p className="text-[10px] text-red-500 font-bold ml-1">{errores.nombre}</p>}
            </div>

            {/* APELLIDO */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Apellido *</label>
              <input
                type="text"
                className={getInputClass('apellido')}
                value={formData.apellido}
                onChange={(e) => {
                  setFormData({ ...formData, apellido: e.target.value });
                  if (errores.apellido) setErrores({ ...errores, apellido: '' });
                }}
              />
              {errores.apellido && <p className="text-[10px] text-red-500 font-bold ml-1">{errores.apellido}</p>}
            </div>

            {/* CELULAR */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">WhatsApp / Celular *</label>
              <input
                type="text" // Cambiamos a text para controlar el filtrado
                inputMode="numeric" // Activa el teclado numérico en móviles
                placeholder="Ej: 1138936217"
                className={getInputClass('celular')}
                value={formData.celular || ''}
                onKeyDown={(e) => {
                  // Bloqueo preventivo de teclas no numéricas típicas de type="number"
                  if (['-', '+', 'e', 'E', '.', ','].includes(e.key)) e.preventDefault();
                }}
                onChange={(e) => {
                  // LIMPIEZA DINÁMICA: Reemplaza cualquier cosa que NO sea un número por nada ""
                  const soloNumeros = e.target.value.replace(/\D/g, '');

                  setFormData({ ...formData, celular: soloNumeros });

                  // Limpiar el error visual si el usuario ya escribió algo
                  if (errores.celular) setErrores({ ...errores, celular: '' });
                }}
              />
              {errores.celular && (
                <p className="text-[10px] text-red-500 font-bold ml-1 animate-in fade-in slide-in-from-top-1">
                  {errores.celular}
                </p>
              )}
            </div>

            {/* DNI / CUIT */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">DNI / CUIT</label>
              <input
                type="text" // Cambiamos a text para controlar el filtrado total
                inputMode="numeric" // Teclado numérico en móviles
                placeholder="Solo números sin puntos ni guiones"
                className={getInputClass('dni_cuit')}
                value={formData.dni_cuit || ''}
                onKeyDown={(e) => {
                  // Bloqueo preventivo de teclas que el type="number" suele dejar pasar
                  if (['-', '+', 'e', 'E', '.', ','].includes(e.key)) e.preventDefault();
                }}
                onChange={(e) => {
                  // LIMPIEZA: Solo permitimos dígitos del 0 al 9
                  const soloNumeros = e.target.value.replace(/\D/g, '');

                  setFormData({ ...formData, dni_cuit: soloNumeros });

                  // Limpiamos el error visual si existe
                  if (errores.dni_cuit) setErrores({ ...errores, dni_cuit: '' });
                }}
              />
              {errores.dni_cuit && (
                <p className="text-[10px] text-red-500 font-bold ml-1 animate-in fade-in slide-in-from-top-1">
                  {errores.dni_cuit}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div className="space-y-1 md:col-span-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Email</label>
              <input
                type="text"
                placeholder="ejemplo@correo.com"
                className={getInputClass('email')}
                value={formData.email || ''}
                onChange={(e) => {
                  const valor = e.target.value;
                  setFormData({ ...formData, email: valor });

                  // VALIDACIÓN EN TIEMPO REAL
                  if (valor.trim() === "") {
                    setErrores({ ...errores, email: "" }); // Limpiar si está vacío
                  } else {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(valor)) {
                      setErrores({ ...errores, email: "Formato sugerido: nombre@correo.com" });
                    } else {
                      setErrores({ ...errores, email: "" }); // Se borra el rojo si es válido
                    }
                  }
                }}
              />
              {/* TEXTO ROJO DINÁMICO */}
              {errores.email && (
                <p className="text-[10px] text-red-500 font-bold ml-1 animate-in fade-in slide-in-from-top-1">
                  {errores.email}
                </p>
              )}
            </div>

            {/* FECHA NACIMIENTO */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Fecha Nac. (DD/MM/YYYY)</label>
              <input
                type="text"
                placeholder="DD/MM/YYYY"
                className={getInputClass('fecha_nacimiento')}
                value={formData.fecha_nacimiento || ''}
                onChange={(e) => setFormData({ ...formData, fecha_nacimiento: e.target.value })}
              />
              {errores.fecha_nacimiento && <p className="text-[10px] text-red-500 font-bold ml-1">{errores.fecha_nacimiento}</p>}
            </div>

            {/* ESTADO ACTIVO */}
            <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200 mt-5">
              <span className="text-xs font-bold text-slate-500 uppercase">Estado Activo</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={formData.activo}
                  onChange={(e) => setFormData({ ...formData, activo: e.target.checked })}
                />
                <div className="w-11 h-6 bg-slate-300 rounded-full peer peer-checked:bg-green-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>

            {/* DIRECCIÓN */}
            <div className="space-y-1 md:col-span-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Dirección</label>
              <input
                type="text"
                className={getInputClass('direccion')}
                value={formData.direccion}
                onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
              />
            </div>

            {/* OBSERVACIONES */}
            <div className="space-y-1 md:col-span-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Observaciones</label>
              <textarea
                className={getInputClass('observaciones') + ' h-24 resize-none'}
                value={formData.observaciones}
                onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
              />
            </div>

          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3.5 rounded-2xl font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 transition-all text-sm cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isPending}
              className={`flex-[2] py-3.5 rounded-2xl font-bold text-white transition-all text-sm cursor-pointer shadow-lg
                ${isPending ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'}
              `}
            >
              {isPending ? 'Guardando...' : (cliente ? 'Actualizar Información' : 'Registrar Asegurado')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}