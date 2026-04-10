import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

export const supabase = createClient<Database>(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_PUBLIC_KEY,
);

export const supabaseAdmin = createClient<Database>(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_ADMIN_KEY,
);
