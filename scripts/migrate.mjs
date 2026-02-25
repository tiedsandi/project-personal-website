// Script migrasi data dari JSON ke Supabase
// Jalankan: node scripts/migrate.mjs

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = "https://qxdximguwxxasjjnzxge.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4ZHhpbWd1d3h4YXNqam56eGdlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTk4NDMwNiwiZXhwIjoyMDg3NTYwMzA2fQ.bJrWhGG2Q2G8RLNBKQ5wAXOP0EYuP4uEi1Cj_SDAfsI";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function migrate() {
  console.log("🚀 Mulai migrasi...\n");

  // ── 1. Hero ──────────────────────────────────────
  const hero = JSON.parse(
    readFileSync(path.join(__dirname, "../src/data/hero.json"), "utf-8")
  );
  const { error: heroError } = await supabase
    .from("hero")
    .upsert({ id: 1, ...hero });
  if (heroError) console.error("❌ Hero:", heroError.message);
  else console.log("✅ Hero berhasil dimigrasi");

  // ── 2. Skills Marquee ────────────────────────────
  const marquee = JSON.parse(
    readFileSync(
      path.join(__dirname, "../src/data/marquee-skills.json"),
      "utf-8"
    )
  );
  const { error: skillsError } = await supabase
    .from("skills_marquee")
    .upsert({ id: 1, skills: marquee.skills });
  if (skillsError) console.error("❌ Skills:", skillsError.message);
  else console.log("✅ Skills marquee berhasil dimigrasi");

  // ── 3. Projects ──────────────────────────────────
  const projectData = JSON.parse(
    readFileSync(
      path.join(__dirname, "../src/data/projectList.json"),
      "utf-8"
    )
  );

  // Hapus kolom id agar Supabase generate sendiri (serial), lalu insert
  const projects = projectData.projects.map(({ id, ...rest }) => rest);

  // Kosongkan dulu table agar tidak duplikat
  await supabase.from("projects").delete().gte("id", 0);

  const { error: projError } = await supabase
    .from("projects")
    .insert(projects);
  if (projError) console.error("❌ Projects:", projError.message);
  else
    console.log(`✅ ${projects.length} project berhasil dimigrasi`);

  console.log("\n🎉 Migrasi selesai!");
}

migrate();
