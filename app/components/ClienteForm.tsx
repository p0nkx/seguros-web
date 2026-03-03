"use client";
import { useState, useEffect } from 'react';
import { guardarCliente } from '../clientes/actions';

export default function ClienteForm({ cliente, onClose }: { cliente?: any, onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: cliente?.id || null,
    nombre: cliente?.nombre || '',
    apellido: cliente?.apellido || '',
    dni_cuit: cliente?.dni_cuit || '',
    celular: cliente?.celular || '',
    email: cliente?.email || '',
    direccion: cliente?.direccion || '',
    fecha_nacimiento: cliente?.fecha_nacimiento || '',
    activo: cliente ? cliente.activo : true,
    observaciones: cliente?.observaciones || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await guardarCliente(formData);
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">
            {formData.id ? 'Editar Asegurado' : 'Nuevo Asegurado'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-red-500 transition-colors text-2xl">×</button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          <input type="text" placeholder="Nombre" required className="input-field" 
            value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} />
          
          <input type="text" placeholder="Apellido" required className="input-field"
            value={formData.apellido} onChange={e => setFormData({...formData, apellido: e.target.value})} />

          <input type="text" placeholder="DNI / CUIT" className="input-field"
            value={formData.dni_cuit} onChange={e => setFormData({...formData, dni_cuit: e.target.value})} />

          <input type="text" placeholder="Celular" className="input-field"
            value={formData.celular} onChange={e => setFormData({...formData, celular: e.target.value})} />

          <input type="email" placeholder="Email" className="input-field"
            value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />

          <input type="text" placeholder="Fecha Nac. (DD/MM/YYYY)" className="input-field"
            value={formData.fecha_nacimiento} onChange={e => setFormData({...formData, fecha_nacimiento: e.target.value})} />

          <div className="md:col-span-2">
            <textarea placeholder="Observaciones o pólizas actuales..." className="input-field h-24"
              value={formData.observaciones} onChange={e => setFormData({...formData, observaciones: e.target.value})} />
          </div>

          {formData.id && (
            <div className="md:col-span-2 flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
              <input type="checkbox" checked={formData.activo} 
                onChange={e => setFormData({...formData, activo: e.target.checked})} />
              <label className="text-sm font-bold text-slate-600">Cliente Activo</label>
            </div>
          )}

          <div className="md:col-span-2 flex gap-3 pt-4">
            <button type="submit" disabled={loading} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg transition-all disabled:opacity-50">
              {loading ? 'Guardando...' : 'Confirmar y Guardar'}
            </button>
          </div>
        </form>
      </div>
      
      <style jsx>{`
        .input-field {
          @apply w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm;
        }
      `}</style>
    </div>
  );
}