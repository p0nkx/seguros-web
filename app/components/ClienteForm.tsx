"use client";
import { useState } from 'react';
import { Cliente } from './ClientesList';

interface ClienteFormProps {
  cliente?: Cliente | null;
  onClose: () => void;
}

export default function ClienteForm({ cliente, onClose }: ClienteFormProps) {
  const [formData, setFormData] = useState<Partial<Cliente>>(
    cliente || { activo: true, nombre: '', apellido: '', dni_cuit: '', email: '', celular: '', direccion: '', fecha_nacimiento: '', observaciones: '' }
  );

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden transform transition-all animate-in fade-in zoom-in duration-300">
        
        {/* CABECERA */}
        <div className="bg-[#001f3d] p-6 text-white flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold tracking-tight">
              {cliente ? 'Editar Asegurado' : 'Nuevo Registro'}
            </h2>
            <p className="text-blue-200 text-xs">Completa la información del cliente</p>
          </div>
          <button onClick={onClose} className="hover:bg-white/10 p-2 rounded-full transition-colors text-xl">✕</button>
        </div>

        <form className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* GRUPO: NOMBRE Y APELLIDO */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Nombre</label>
              <input 
                type="text" 
                placeholder="Ej: Maria"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                value={formData.nombre}
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Apellido</label>
              <input 
                type="text" 
                placeholder="Ej: Gonzalez"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                value={formData.apellido}
                onChange={(e) => setFormData({...formData, apellido: e.target.value})}
              />
            </div>

            {/* GRUPO: DNI Y CELULAR */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">DNI / CUIT</label>
              <input 
                type="text" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.dni_cuit}
                onChange={(e) => setFormData({...formData, dni_cuit: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">WhatsApp / Celular</label>
              <input 
                type="text" 
                placeholder="Ej: 1120304050"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-medium text-blue-600"
                value={formData.celular}
                onChange={(e) => setFormData({...formData, celular: e.target.value})}
              />
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Email</label>
              <input 
                type="email" 
                placeholder='correo@gmail.com'
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Fecha Nac. (DD/MM/YYYY)</label>
              <input 
                type="text" 
                placeholder="1/11/2000"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.fecha_nacimiento}
                onChange={(e) => setFormData({...formData, fecha_nacimiento: e.target.value})}
              />
            </div>

            {/* SWITCH ELEGANTE DE ESTADO */}
            <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200 mt-5">
              <span className="text-xs font-bold text-slate-500 uppercase ml-1">Estado Activo</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={formData.activo}
                  onChange={(e) => setFormData({...formData, activo: e.target.checked})}
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Observaciones o anotaciones sobre el cliente</label>
            <textarea 
              rows={3}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              value={formData.observaciones}
              onChange={(e) => setFormData({...formData, observaciones: e.target.value})}
            />
          </div>

          {/* BOTONES DE ACCIÓN */}
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
              className="flex-[2] py-3.5 rounded-2xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all text-sm cursor-pointer"
            >
              {cliente ? 'Actualizar Información' : 'Registrar Asegurado'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}