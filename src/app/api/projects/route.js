import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
import supabase from "@/lib/supabase";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const highlight = searchParams.get("highlight");

  let query = supabase
    .from("pf_projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (highlight === "true") {
    query = query.eq("is_highlight", true);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
