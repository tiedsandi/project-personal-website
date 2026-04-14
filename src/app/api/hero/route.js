import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
import supabase from "@/lib/supabase";

export async function GET() {
  const [heroRes, countRes] = await Promise.all([
    supabase.from("pf_hero").select("*").limit(1).single(),
    supabase.from("pf_projects").select("id", { count: "exact", head: true }),
  ]);

  if (heroRes.error)
    return NextResponse.json({ error: heroRes.error.message }, { status: 500 });

  return NextResponse.json({
    ...heroRes.data,
    stat_projects: countRes.count ?? heroRes.data.stat_projects ?? 0,
  });
}
