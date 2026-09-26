import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const projectType = String(body.project_type || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Please complete the required fields." }, { status: 400 });
    }

    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json({ error: "Supabase is not configured yet. Add the environment variables in Vercel." }, { status: 503 });
    }

    const { error } = await supabase.from("contact_submissions").insert({
      name,
      email,
      project_type: projectType || null,
      message
    });

    if (error) {
      console.error(error);
      return NextResponse.json({ error: "We could not save your message. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
