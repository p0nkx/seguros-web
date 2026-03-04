"use client";
import { useState } from 'react';
import ClienteForm from './ClienteForm';
import WhatsappButton from './WhatsappButton';

/** * INTERFAZ DE DATOS
 * Define la estructura de un objeto "Cliente" para que TypeScript 
 * nos ayude a evitar errores de escritura.
 */
export interface Cliente {
  id: number;
  apellido: string;
  nombre: string;
  dni_cuit: string;
  email: string;
  celular: string;
  activo: boolean;
  observaciones?: string;
  fecha_alta?: string;
  direccion?: string;
  fecha_nacimiento?: string;
}

export default function ClientesList({ clientesIniciales }: { clientesIniciales: Cliente[] }) {
  
  /** * ESTADOS LOCALES (Hooks)
   * Controlan la búsqueda, el filtrado y qué tarjeta está desplegada.
   */
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState<"todos" | "activos" | "bajas">("todos");
  const [abiertoId, setAbiertoId] = useState<number | null>(null);

  /** * ESTADOS DEL MODAL/FORMULARIO
   * Controlan si el formulario de edición/creación está visible y a quién se edita.
   */
  const [mostrarForm, setMostrarForm] = useState(false);
  const [clienteAEditar, setClienteAEditar] = useState<Cliente | null>(null);

  /** * LÓGICA DE APERTURA DE FORMULARIO
   * abrirNuevo: Limpia el cliente seleccionado para crear uno de cero.
   * abrirEditar: Carga los datos de un cliente existente para modificarlos.
   */
  const abrirNuevo = () => {
    setClienteAEditar(null);
    setMostrarForm(true);
  };

  const abrirEditar = (e: React.MouseEvent, cliente: Cliente) => {
    e.stopPropagation(); // Evita que al hacer clic se cierre la tarjeta
    setClienteAEditar(cliente);
    setMostrarForm(true);
  };

  /** * CÁLCULO DE EDAD
   * Recibe una fecha (en string o Date) y devuelve los años cumplidos
   * basándose en la fecha actual del sistema.
   */
  const calcularEdad = (fecha: any) => {
    if (!fecha) return null;
    try {
      let fechaNac: Date;
      if (typeof fecha === 'string') {
        const partes = fecha.split('/'); // Asume formato DD/MM/YYYY
        if (partes.length !== 3) return null;
        fechaNac = new Date(parseInt(partes[2]), parseInt(partes[1]) - 1, parseInt(partes[0]));
      } else if (fecha instanceof Date) {
        fechaNac = fecha;
      } else {
        return null;
      }
      if (isNaN(fechaNac.getTime())) return null;
      const hoy = new Date();
      let edad = hoy.getFullYear() - fechaNac.getFullYear();
      const mes = hoy.getMonth() - fechaNac.getMonth();
      if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
        edad--;
      }
      return edad;
    } catch (e) {
      return null;
    }
  };

  /** * LÓGICA DE FILTRADO
   * Combina el texto de búsqueda (nombre/DNI) con el filtro de estado (Activo/Baja).
   */
  const filtrados = clientesIniciales.filter(c => {
    const coincideBusqueda = `${c.nombre} ${c.apellido} ${c.dni_cuit}`.toLowerCase().includes(busqueda.toLowerCase());
    const coincideEstado =
      filtroEstado === "todos" ? true :
        filtroEstado === "activos" ? c.activo : !c.activo;
    return coincideBusqueda && coincideEstado;
  });

  /** * CONTADORES RÁPIDOS
   * Cálculos simples para mostrar en los cuadros de arriba.
   */
  const totalActivos = clientesIniciales.filter(c => c.activo).length;
  const totalBajas = clientesIniciales.filter(c => !c.activo).length;

  /** * ACORDEÓN (Desplegable)
   * Maneja qué tarjeta de cliente se muestra expandida.
   */
  const toggleCliente = (id: number) => {
    setAbiertoId(abiertoId === id ? null : id);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 pb-10">

      {/* SECCIÓN 1: PANEL DE ESTADÍSTICAS (Contadores superiores) */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 pt-6">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 text-center">
          <span className="block text-2xl font-black text-slate-800">{clientesIniciales.length}</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total</span>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 text-center">
          <span className="block text-2xl font-black text-green-500">{totalActivos}</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Activos</span>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 text-center col-span-2 md:col-span-1">
          <span className="block text-2xl font-black text-red-400">{totalBajas}</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Bajas</span>
        </div>
      </div>

      {/* SECCIÓN 2: BARRA DE HERRAMIENTAS (Buscador y botón de nuevo asegurado) */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex flex-col md:flex-row gap-3 items-stretch">
          
          {/* Input de búsqueda con icono SVG lupa */}
          <div className="relative flex-grow group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Buscar por nombre, apellido o DNI..."
              className="w-full bg-white py-4 pl-12 pr-4 rounded-2xl border border-slate-100 shadow-sm focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all text-slate-700"
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          {/* Botón de acción principal para agregar nuevo cliente */}
          <button
            onClick={abrirNuevo}
            className="bg-[#001f3d] text-white px-6 py-4 rounded-2xl font-bold shadow-lg hover:bg-blue-900 transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0 active:scale-95"
          >
            <span className="text-xl">+</span>
            <span className="hidden sm:inline">Nuevo Asegurado</span>
          </button>
        </div>

        {/* Botonera de Filtros de Estado (Todos/Activos/Bajas) */}
        <div className="flex bg-slate-100/80 p-1 rounded-xl border border-slate-200 shadow-inner w-fit self-center md:self-start">
          {(["todos", "activos", "bajas"] as const).map((estado) => (
            <button
              key={estado}
              onClick={() => setFiltroEstado(estado)}
              className={`px-5 py-1.5 rounded-lg cursor-pointer text-[10px] font-black uppercase transition-all ${
                filtroEstado === estado
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {estado}
            </button>
          ))}
        </div>
      </div>

      {/* SECCIÓN 3: LISTA DINÁMICA DE TARJETAS (Resultados de búsqueda) */}
      <div className="grid grid-cols-1 gap-4">
        {filtrados.map((cliente) => {
          const edad = calcularEdad(cliente.fecha_nacimiento);
          return (
            <div
              key={cliente.id}
              className={`bg-white rounded-2xl transition-all duration-300 overflow-hidden border ${abiertoId === cliente.id
                ? 'shadow-2xl ring-1 ring-blue-500 border-transparent'
                : 'shadow-sm border-gray-100 hover:border-blue-200'
                }`}
            >
              {/* CABECERA DE LA TARJETA (Vista resumida) */}
              <div
                onClick={() => toggleCliente(cliente.id)}
                className="p-5 cursor-pointer flex justify-between items-center hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {/* Indicador visual de estado (Verde/Rojo) */}
                  <div className={`w-2 h-12 rounded-full ${cliente.activo ? 'bg-green-500' : 'bg-red-400'}`}></div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 uppercase tracking-tight">
                      {cliente.apellido}, {cliente.nombre}
                    </h3>
                    <p className="text-sm font-mono text-slate-500">{cliente.dni_cuit || "SIN CUIT"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`hidden sm:inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest ${cliente.activo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {cliente.activo ? 'ACTIVO' : 'BAJA'}
                  </span>
                  <span className={`text-slate-300 transition-transform duration-300 ${abiertoId === cliente.id ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>
              </div>

              {/* CUERPO EXPANDIBLE (Vista detallada) */}
              <div className={`transition-all duration-500 ease-in-out overflow-hidden ${abiertoId === cliente.id ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-6 bg-slate-50 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8">

                  {/* Detalle: Contacto */}
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-[11px] font-black text-blue-600 uppercase tracking-widest">Contacto</h4>
                      <div className="space-y-3 text-sm text-slate-600">
                        <p className="flex items-center gap-2">📞 {cliente.celular || 'No disponible'}</p>
                        <p className="truncate flex items-center gap-2">✉️ {cliente.email?.toLowerCase() || 'No disponible'}</p>
                        <p className="flex items-center gap-2">📍 {cliente.direccion || 'Sin dirección'}</p>
                      </div>
                    </div>

                    {/* Notas adicionales (Si existen) */}
                    {cliente.observaciones && (
                      <div className="bg-white p-4 rounded-xl border-l-4 border-blue-400 shadow-sm">
                        <h5 className="text-[10px] font-bold text-slate-400 uppercase mb-1">Notas del Asegurado</h5>
                        <p className="text-xs text-slate-700 italic">"{cliente.observaciones}"</p>
                      </div>
                    )}

                    {/* Botón rápido de contacto */}
                    <div className="flex items-center gap-3 pt-2">
                      {cliente.celular && (
                        <>
                          <WhatsappButton
                            phone={cliente.celular}
                            message={`Hola ${cliente.nombre}, te contacto desde la administración de seguros...`}
                            isFloating={false}
                          />
                          <span className="text-xs font-bold text-slate-500 uppercase">WhatsApp</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Detalle: Información Administrativa */}
                  <div className="space-y-4">
                    <h4 className="text-[11px] font-black text-blue-600 uppercase tracking-widest">Detalles de Cuenta</h4>
                    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Cliente desde</span>
                          <span className="text-slate-800 font-semibold">{cliente.fecha_alta || 'Pendiente'}</span>
                        </div>
                        <div className="bg-blue-50 p-2 rounded-lg">📅</div>
                      </div>

                      <div className="h-px bg-slate-100 w-full"></div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Nacimiento:</span>
                          <span className="text-slate-700 font-medium">{cliente.fecha_nacimiento || '---'}</span>
                        </div>
                        {edad !== null && (
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400 italic">Edad:</span>
                            <span className="text-blue-600 font-bold">{edad} años</span>
                          </div>
                        )}
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                        <span className="text-[11px] text-slate-400 font-bold uppercase">ID Interno</span>
                        <span className="bg-slate-800 text-white px-3 py-1 rounded-md font-mono text-xs font-bold">#{cliente.id}</span>
                      </div>
                    </div>
                  </div>

                  {/* Acciones del registro */}
                  <div className="md:col-span-2 border-t border-gray-200 pt-4 mt-2">
                    <button
                      onClick={(e) => abrirEditar(e, cliente)}
                      className="w-full md:w-auto px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2"
                    >
                      ✏️ Editar información
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* SECCIÓN 4: MODAL FORMULARIO (Se activa para crear o editar) */}
      {mostrarForm && (
        <ClienteForm
          cliente={clienteAEditar}
          onClose={() => setMostrarForm(false)}
          clientesActuales={clientesIniciales}
        />
      )}
    </div>
  );
}