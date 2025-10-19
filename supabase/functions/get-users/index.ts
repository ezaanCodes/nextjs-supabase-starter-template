// Follow this setup guide to integrate the Deno runtime and deploy your Edge Functions:
// https://deno.com/manual/runtime/

import { serve } from "https://deno.com/std@0.177.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.21.0"
import { corsHeaders } from "../_shared/cors.ts";

interface User {
  id: number;
  name: string;
  email: string;
}

interface ErrorResponse {
  error: string;
}

serve(async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data, error }: { data: User[] | null; error: Error | null } = await supabaseClient
      .from<User>("users")
      .select("id, name, email");

    if (error) throw error;

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (err) {
    const errorResponse: ErrorResponse = { error: String(err) };
    return new Response(JSON.stringify(errorResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
