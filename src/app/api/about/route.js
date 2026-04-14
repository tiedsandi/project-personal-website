import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  const [aboutRes, journeyRes, learningRes] = await Promise.all([
    supabase.from("pf_about").select("*").limit(1).single(),
    supabase
      .from("pf_journey")
      .select("*")
      .order("sort_order", { ascending: true }),
    supabase
      .from("pf_skills")
      .select("id, name, category")
      .eq("is_learning", true)
      .order("name"),
  ]);

  if (aboutRes.error)
    return NextResponse.json(
      { error: aboutRes.error.message },
      { status: 500 },
    );

  return NextResponse.json({
    ...aboutRes.data,
    journey: journeyRes.data ?? [],
    currently_learning: learningRes.data ?? [],
  });
}
