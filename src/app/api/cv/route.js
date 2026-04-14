import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
import supabase from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("pf_cv")
    .select("*")
    .limit(1)
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
