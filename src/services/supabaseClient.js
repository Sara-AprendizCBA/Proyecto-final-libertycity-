import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// CORREGIR: Usa la clave correcta
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

// Agrega validación
if (!supabaseUrl || !supabaseAnonKey) {
    console.error(" Error: Variables de entorno no configuradas");
    console.log("VITE_SUPABASE_URL:", supabaseUrl || "No definido");
    console.log("VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY:", supabaseAnonKey ? "Definido" : "No definido");
    throw new Error("Variables de Supabase no configuradas");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Opcional: Verifica conexión
supabase.auth.getSession().then(({ data, error }) => {
    if (error) {
        console.error(" Error conectando a Supabase:", error.message);
    } else {
        console.log(" Conectado a Supabase correctamente");
    }
});

export default supabase;