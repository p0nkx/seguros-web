"use client";
import { useEffect, useState } from "react";
import { obtenerUsuarios, eliminarUsuario } from "../login/authActions";
import { useAuthStore } from "../src/store/useAuthStore";
import UsuarioModal from "./componentes/UsuarioModal";




export default function GestionUsuarios() {
    const [usuarios, setUsuarios] = useState<any[]>([]);
    const { role } = useAuthStore();
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [usuarioParaEditar, setUsuarioParaEditar] = useState<any>(null);

    const abrirModalNuevo = () => {
        setUsuarioParaEditar(null);
        setIsModalOpen(true);
    };

    const abrirModalEditar = (u: any) => {
        setUsuarioParaEditar(u);
        setIsModalOpen(true);
    };
    

    const cargarUsuarios = async () => {
        setLoading(true);
        const data = await obtenerUsuarios();
        setUsuarios(data);
        setLoading(false);
    };

    useEffect(() => {
        if (role === 'admin') cargarUsuarios();
    }, [role]);

    const handleEliminar = async (id: number) => {
        if (confirm("¿Estás seguro de eliminar este usuario?")) {
            await eliminarUsuario(id);
            cargarUsuarios();
        }
    };

    if (role !== 'admin') return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white pt-20">
            <p className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg">Acceso denegado. Solo administradores.</p>
        </div>
    );

    

    return (
        // bg-[#0f172a] es un gris azulado muy profundo y elegante. 
        // pt-28 asegura que el contenido baje y no choque con el header.
        <main className="min-h-screen bg-slate-200 pt-38 pb-12 px-6 md:px-12 text-slate-200">
            <div className="max-w-7xl mx-auto">

                {/* Encabezado */}
                <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-6 mb-10">
                    {/* Presentación mejorada del Título */}
                    <div className="relative pl-5 border-l-4 border-[#163594]">
                        <h1 className="text-4xl font-black text-slate-800 tracking-tighter">
                            Control de <span className="text-[#163594]">Usuarios</span>
                        </h1>
                        <p className="text-slate-500 text-base mt-1 font-medium">
                            Gestión centralizada de credenciales y nivel de acceso técnico.
                        </p>
                    </div>

                    {/* Botón con sombra de profundidad */}
                    <button
                        onClick={abrirModalNuevo}
                        className="bg-[#163594] hover:bg-[#0e2a7a] text-white px-8 py-3.5 rounded-2xl font-bold transition-all shadow-lg shadow-blue-900/20 flex items-center gap-3 active:scale-95"
                    >
                        <div className="bg-white/20 p-1 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        Nuevo Usuario
                    </button>
                </div>

                {/* Tabla con estilo Gris Oscuro y Bordes Sutiles */}
                <div className="bg-[#1e293b] border border-slate-700/50 rounded-2xl overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-800/50 border-b border-slate-700/50">
                                    <th className="p-5 text-xs font-semibold uppercase tracking-wider text-slate-400">Usuarios</th>
                                    <th className="p-5 text-xs font-semibold uppercase tracking-wider text-slate-400">Email</th>
                                    <th className="p-5 text-xs font-semibold uppercase tracking-wider text-slate-400">Rol</th>
                                    <th className="p-5 text-xs font-semibold uppercase tracking-wider text-slate-400">Actividad</th>
                                    <th className="p-5 text-xs font-semibold uppercase tracking-wider text-slate-400 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50">
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="p-10 text-center text-slate-500">Cargando base de datos...</td>
                                    </tr>
                                ) : usuarios.map((u) => (
                                    <tr key={u.id} className="hover:bg-slate-800/40 transition-colors group">
                                        <td className="p-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-[#163594]/30 flex items-center justify-center text-[#60a5fa] font-bold">
                                                    {u.nombre.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-white group-hover:text-blue-400 transition-colors">{u.nombre}</div>
                                                    <div className="text-xs text-slate-500 italic">@{u.username}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-5 text-slate-300 font-mono text-sm">{u.email}</td>
                                        <td className="p-5">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${u.role === 'admin'
                                                    ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                                                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                                }`}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td className="p-5 text-xs text-slate-400">
                                            <span className="block text-slate-500">Última vez:</span>
                                            {u.ultima_conexion ? new Date(u.ultima_conexion).toLocaleString() : 'Sin registros'}
                                        </td>
                                        <td className="p-5">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() => abrirModalEditar(u)}
                                                    className="p-2 hover:bg-blue-500/10 text-slate-400 hover:text-blue-400 rounded-lg transition-colors"
                                                    title="Editar"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => handleEliminar(u.id)}
                                                    className="p-2 hover:bg-red-500/10 text-slate-400 hover:text-red-400 rounded-lg transition-colors"
                                                    title="Eliminar"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <UsuarioModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={cargarUsuarios}
                usuarioParaEditar={usuarioParaEditar}
            />
        </main>
    );
}