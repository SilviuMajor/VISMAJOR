import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let email: string;
  try {
    const body = await req.json();
    email = String(body?.email ?? "").trim().toLowerCase();
    if (!EMAIL_RX.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email." },
        { status: 400 }
      );
    }
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }

  const supabase = getSupabase();

  // No Supabase configured — accept gracefully so dev/preview still demos.
  if (!supabase) {
    // eslint-disable-next-line no-console
    console.log(`[notify-me stub] would save: ${email}`);
    return NextResponse.json({
      ok: true,
      note: "Saved locally to dev log (Supabase not configured).",
    });
  }

  const { error } = await supabase
    .from("notify_list")
    .upsert({ email }, { onConflict: "email" });

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
