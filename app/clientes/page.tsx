// app/clientes/page.tsx
import { getClientes } from './actions';
import ClientesList from '../components/ClientesList';
import { Cliente } from '../components/ClientesList';
import{ useAuthStore } from '../src/store/useAuthStore';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const datosBrutos = await getClientes();

  

  // TRANSFORMACIÓN: Convertimos objetos Date a Strings
  const clientes: Cliente[] = datosBrutos.map((cliente: any) => ({
    ...cliente,
    // Si la fecha existe, la convertimos a string (DD/MM/YYYY), si no, queda null
    fecha_alta: cliente.fecha_alta instanceof Date 
      ? cliente.fecha_alta.toLocaleDateString('es-AR') 
      : cliente.fecha_alta,
    fecha_nacimiento: cliente.fecha_nacimiento instanceof Date 
      ? cliente.fecha_nacimiento.toLocaleDateString('es-AR') 
      : cliente.fecha_nacimiento,
  }));
  

  return (
    <main className="min-h-screen bg-[#f1f5f9] pt-28 pb-20">
      <div className="max-w-6xl mx-auto mb-10 px-4 text-center">
        <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest mb-4">
          Base de Datos Realtime
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          Gestión de Cartera
        </h1>
        <p className="text-slate-500 mt-4 text-lg max-w-2xl mx-auto">
          Consulta rápida de asegurados, estados de póliza y acceso directo a contacto.
        </p>
        <div className="mt-6 flex justify-center">
          <span className="h-1.5 w-20 bg-[#001f3d] rounded-full"></span>
        </div>
      </div>

      <div className="px-4">
        {/* Ahora 'clientes' ya no tiene objetos Date, tiene texto limpio */}
        <ClientesList clientesIniciales={clientes} />
      </div>
    </main>
  );
}