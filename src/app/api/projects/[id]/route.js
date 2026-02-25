import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function PUT(request, { params }) {
  const id = parseInt(params.id);
  const body = await request.json();

  const { data, error } = await supabase.from("projects").update(body).eq("id", id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Project tidak ditemukan" }, { status: 404 });
  return NextResponse.json(data);
}

export async function DELETE(request, { params }) {
  const id = parseInt(params.id);

  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
