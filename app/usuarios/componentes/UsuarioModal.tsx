"use client";
import { useState, useEffect } from "react";
import { registrarUsuario, actualizarUsuario } from "../../login/authActions";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    usuarioParaEditar?: any; // Si viene algo, estamos editando
}

export default function UsuarioModal({ isOpen, onClose, onSuccess, usuarioParaEditar }: Props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | null>(usuarioParaEditar?.avatar_url || null);


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file)); // Crea una URL temporal para ver la foto
        }
    };

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        let res;

        if (usuarioParaEditar) {
            // Lógica de edición
            const datos = {
                nombre: formData.get("nombre") as string,
                email: formData.get("email") as string,
                username: formData.get("username") as string,
                role: formData.get("role") as string,
            };
            res = await actualizarUsuario(usuarioParaEditar.id, datos);
        } else {
            // Lógica de creación (la que ya tenías)
            res = await registrarUsuario(formData);
        }

        if (res.success) {
            onSuccess();
            onClose();
        } else {
            setError(res.error || "Ocurrió un error");
        }
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-[#001f3d] border border-white/20 w-full max-w-md p-8 rounded-2xl shadow-2xl animate-in zoom-in duration-200">
                <h2 className="text-2xl font-bold text-white mb-6">
                    {usuarioParaEditar ? "Editar Usuario" : "Nuevo Usuario"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <div className="p-3 bg-red-500/20 border border-red-500/40 text-red-200 text-sm rounded-lg text-center">{error}</div>}

                    <input name="nombre" defaultValue={usuarioParaEditar?.nombre} placeholder="Nombre Real" className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-white outline-none" required />
                    <input name="email" type="email" defaultValue={usuarioParaEditar?.email} placeholder="Email" className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-white outline-none" required />
                    <input name="username" defaultValue={usuarioParaEditar?.username} placeholder="Nombre de Usuario (Nick)" className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-white outline-none" required />

                    {!usuarioParaEditar && (
                        <input name="password" type="password" placeholder="Contraseña Temporal" className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-white outline-none" required />
                    )}

                    <select name="role" defaultValue={usuarioParaEditar?.role || "admin"} className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 outline-none">
                        <option value="admin" className="bg-[#001f3d]">Admin</option>
                        <option value="user" className="bg-[#001f3d]">Usuario Estándar</option>
                    </select>

                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={onClose} className="flex-1 py-3 text-white/60 hover:text-white transition">Cancelar</button>
                        <button type="submit" disabled={loading} className="flex-1 py-3 bg-white text-[#001f3d] font-bold rounded-lg hover:scale-[1.02] transition disabled:opacity-50">
                            {loading ? "Guardando..." : "Guardar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}