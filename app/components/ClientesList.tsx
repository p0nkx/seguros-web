"use client";
import { useState } from 'react';

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
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState<"todos" | "activos" | "bajas">("todos");
  const [abiertoId, setAbiertoId] = useState<number | null>(null);

  // --- FUNCIÓN PARA CALCULAR EDAD  ---
  const calcularEdad = (fecha: any) => {
    if (!fecha) return null;
    
    try {
      let fechaNac: Date;

      // Si es un string (formato DD/MM/YYYY)
      if (typeof fecha === 'string') {
        const partes = fecha.split('/');
        if (partes.length !== 3) return null;
        fechaNac = new Date(parseInt(partes[2]), parseInt(partes[1]) - 1, parseInt(partes[0]));
      } 
      // Si ya es un objeto Date
      else if (fecha instanceof Date) {
        fechaNac = fecha;
      } 
      else {
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

  // --- LÓGICA DE FILTRADO ---
  const filtrados = clientesIniciales.filter(c => {
    const coincideBusqueda = `${c.nombre} ${c.apellido} ${c.dni_cuit}`.toLowerCase().includes(busqueda.toLowerCase());
    const coincideEstado = 
      filtroEstado === "todos" ? true :
      filtroEstado === "activos" ? c.activo : !c.activo;
    
    return coincideBusqueda && coincideEstado;
  });

  // --- CÁLCULO DE CONTADORES (Sobre la lista inicial completa) ---
  const totalActivos = clientesIniciales.filter(c => c.activo).length;
  const totalBajas = clientesIniciales.filter(c => !c.activo).length;

  const toggleCliente = (id: number) => {
    setAbiertoId(abiertoId === id ? null : id);
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      
      {/* PANEL DE CONTADORES ABAJO DEL TÍTULO */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
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

      {/* BUSCADOR Y FILTROS */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-gray-400">🔍</span>
          </div>
          <input 
            type="text" 
            placeholder="Buscar asegurado..." 
            className="w-full p-4 pl-12 rounded-2xl border-none shadow-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-800 bg-white"
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <div className="flex bg-white p-1 rounded-2xl shadow-lg border border-slate-100">
          {(["todos", "activos", "bajas"] as const).map((estado) => (
            <button
              key={estado}
              onClick={() => setFiltroEstado(estado)}
              className={`px-6 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${
                filtroEstado === estado 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {estado}
            </button>
          ))}
        </div>
      </div>

      {/* LISTA DE TARJETAS */}
      <div className="grid grid-cols-1 gap-4">
        {filtrados.map((cliente) => {
          const edad = calcularEdad(cliente.fecha_nacimiento);
          
          return (
            <div 
              key={cliente.id} 
              className={`bg-white rounded-2xl transition-all duration-300 overflow-hidden border ${
                abiertoId === cliente.id 
                ? 'shadow-2xl ring-1 ring-blue-500 border-transparent' 
                : 'shadow-sm border-gray-100 hover:border-blue-200'
              }`}
            >
              <div 
                onClick={() => toggleCliente(cliente.id)}
                className="p-5 cursor-pointer flex justify-between items-center hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-12 rounded-full ${cliente.activo ? 'bg-green-500' : 'bg-red-400'}`}></div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 uppercase tracking-tight">
                      {cliente.apellido}, {cliente.nombre}
                    </h3>
                    <p className="text-sm font-mono text-slate-500">{cliente.dni_cuit || "SIN CUIT"}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className={`hidden sm:inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest ${
                    cliente.activo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {cliente.activo ? 'ACTIVO' : 'BAJA'}
                  </span>
                  <span className={`text-slate-300 transition-transform duration-300 ${abiertoId === cliente.id ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>
              </div>

              <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                abiertoId === cliente.id ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="p-6 bg-slate-50 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-[11px] font-black text-blue-600 uppercase tracking-widest">Contacto</h4>
                    <div className="space-y-2 text-sm text-slate-600">
                      <p>📞 {cliente.celular || 'No disponible'}</p>
                      <p className="truncate">✉️ {cliente.email?.toLowerCase() || 'No disponible'}</p>
                      <p>📍 {cliente.direccion || 'Sin dirección'}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-[11px] font-black text-blue-600 uppercase tracking-widest">Administrativo</h4>
                    <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Nacimiento:</span>
                        <span className="text-slate-700 font-medium">{cliente.fecha_nacimiento || '---'}</span>
                      </div>
                      {edad !== null && (
                        <div className="flex justify-between">
                          <span className="text-slate-400 italic">Edad:</span>
                          <span className="text-blue-600 font-bold">{edad} años</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {cliente.observaciones && (
                    <div className="md:col-span-2 bg-amber-50 border-l-4 border-amber-400 p-3 rounded-r-xl">
                      <p className="text-xs text-amber-900 italic">"{cliente.observaciones}"</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}