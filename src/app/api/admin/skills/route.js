import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

function isAuthorized(request) {
  return request.cookies.get("admin_token")?.value === "authenticated";
}

// CREATE skill
export async function POST(request) {
  if (!isAuthorized(request))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { data, error } = await supabase
    .from("pf_skills")
    .insert(body)
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
