import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// const originalFrom = supabase.from.bind(supabase);
// supabase.from = function (table) {
//   console.log("🔍 Supabase query to table:", table);
//   console.trace("Called from:"); // This will show WHERE the call is coming from
//   return originalFrom(table);
// };
