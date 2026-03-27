import { useState, useEffect } from "react";
import { supabase } from "@infrastructure/supabase/client";
import { useToast } from "@application/context/ToastContext";

interface AuditoriaLog {
  idauditoria: number;
  fecha: string;
  tipo: string;
  entidad: string;
  identidad: number;
  detalle: string;
  idusuario: number | null;
  usuarios?: {
    nombre: string;
  } | null;
}

export default function AdminAuditoriaTab() {
  const [logs, setLogs] = useState<AuditoriaLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterTipo, setFilterTipo] = useState<string>("todos");
  const { showToast } = useToast();

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('auditorias')
        .select(`*, usuarios(nombre)`)
        .order('fecha', { ascending: false })
        .limit(100);

      if (error) throw new Error(error.message);
      setLogs(data || []);
    } catch (err: any) {
      showToast(err.message || "Error al cargar el registro de auditoría", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const logsFiltrados = filterTipo === "todos" 
    ? logs 
    : logs.filter(log => log.tipo.toLowerCase() === filterTipo.toLowerCase());

  const getTipoStyles = (tipo: string) => {
    const t = tipo.toLowerCase();
    if (t.includes('crear')) return { bg: "#dbeafe", text: "#1e40af" };
    if (t.includes('modificar') || t.includes('actualizar')) return { bg: "#fef9c3", text: "#854d0e" };
    if (t.includes('eliminar') || t.includes('suspender') || t.includes('borrar')) return { bg: "#fee2e2", text: "#991b1b" };
    if (t.includes('reactivar') || t.includes('activar')) return { bg: "#d1fae5", text: "#065f46" };
    return { bg: "#f3f4f6", text: "#374151" };
  };

  if (loading) {
    return (
      <div className="admin-tab-content">
        <h2>Logs de Auditoría</h2>
        <div style={{ textAlign: "center", padding: "40px", color: "#aaa" }}>
          Cargando registros...
        </div>
      </div>
    );
  }

  return (
    <div className="admin-tab-content">
      <h2>Logs de Auditoría</h2>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <p style={{ margin: 0 }}>Registro ordenado cronológicamente de todas las acciones importantes del sistema.</p>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "0.9rem", color: "#6b7280" }}>Filtrar por acción:</span>
          <select 
            value={filterTipo} 
            onChange={(e) => setFilterTipo(e.target.value)}
            style={{ 
              padding: "6px 12px", 
              borderRadius: "8px", 
              border: "1px solid #e5e7eb",
              fontSize: "0.9rem",
              outline: "none",
              cursor: "pointer"
            }}
          >
            <option value="todos">Todas las acciones</option>
            <option value="crear">Crear</option>
            <option value="modificar">Modificar</option>
            <option value="suspender">Suspender</option>
            <option value="reactivar">Reactivar</option>
          </select>
        </div>
      </div>

      {logsFiltrados.length === 0 ? (
        <div className="admin-empty-state" style={{ marginTop: "10px", border: "1px dashed #e5e7eb", padding: "40px", color: "#aaa", borderRadius: "12px", textAlign: "center" }}>
          {filterTipo === "todos" ? "No hay registros de auditoría aún." : `No se encontraron registros de tipo "${filterTipo}".`}
        </div>
      ) : (
        <div className="admin-table-container" style={{ marginTop: "20px" }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Acción</th>
                <th>Entidad Afectada</th>
                <th>Descripción Detallada</th>
              </tr>
            </thead>
            <tbody>
              {logsFiltrados.map((log) => (
                <tr key={log.idauditoria}>
                  <td style={{ whiteSpace: "nowrap", fontSize: "0.85rem", color: "#4b5563" }}>
                    {new Date(log.fecha).toLocaleString('es-CO', {
                      day: '2-digit', month: '2-digit', year: 'numeric',
                      hour: '2-digit', minute: '2-digit'
                    })}
                  </td>
                   <td>
                    <span
                      style={{
                        padding: "4px 8px",
                        borderRadius: "12px",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        backgroundColor: getTipoStyles(log.tipo).bg,
                        color: getTipoStyles(log.tipo).text,
                        textTransform: "uppercase"
                      }}
                    >
                      {log.tipo}
                    </span>
                  </td>
                  <td style={{ fontSize: "0.85rem", color: "#6b7280" }}>
                    {log.entidad} <span style={{ fontWeight: 600 }}>#{log.identidad}</span>
                  </td>
                  <td style={{ fontSize: "0.9rem", color: "#111827", lineHeight: "1.4" }}>
                    {log.detalle}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
