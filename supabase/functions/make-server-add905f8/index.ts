import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2.49.8";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use("*", logger(console.log));
app.use("/*", cors({
  origin: "*",
  allowHeaders: ["Content-Type", "Authorization", "x-api-key"],
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  exposeHeaders: ["Content-Length"],
  maxAge: 600,
}));

// ─── Auth Middleware ──────────────────────────────────────────────────────────
async function requireAuth(c: any, next: any) {
  // API key auth — lightweight alternative for frontend direct access.
  // Set FRONTEND_API_KEY in Supabase Edge Function secrets and VITE_API_KEY in the
  // frontend environment to enable this path without Supabase user sessions.
  const apiKey = c.req.header("x-api-key");
  const expectedApiKey = Deno.env.get("FRONTEND_API_KEY");
  if (apiKey && expectedApiKey && apiKey === expectedApiKey) {
    c.set("userId", `api-key:${crypto.randomUUID()}`);
    c.set("userEmail", "frontend@creatoros.internal");
    await next();
    return;
  }

  // JWT auth — standard Supabase user session.
  const authHeader = c.req.header("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  const token = authHeader.slice(7);

  // Use anon key to verify user JWT
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
  );
  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return c.json({ error: "Invalid or expired token" }, 401);
  }

  c.set("userId", user.id);
  c.set("userEmail", user.email);
  await next();
}

// ─── Health ───────────────────────────────────────────────────────────────────
app.get("/make-server-add905f8/health", (c) => c.json({ status: "ok", version: "mvp1" }));

// ─── Brand Profile ────────────────────────────────────────────────────────────
app.get("/make-server-add905f8/brand-profile", requireAuth, async (c) => {
  const userId = c.get("userId");
  try {
    const profile = await kv.get(`brand_profile:${userId}`);
    return c.json({ profile: profile ?? null });
  } catch {
    return c.json({ profile: null });
  }
});

app.post("/make-server-add905f8/brand-profile", requireAuth, async (c) => {
  const userId = c.get("userId");
  const body = await c.req.json();

  if (!body.brandName) {
    return c.json({ error: "brandName is required" }, 400);
  }

  await kv.set(`brand_profile:${userId}`, {
    ...body,
    updatedAt: new Date().toISOString(),
  });

  return c.json({ success: true });
});

// ─── Content Generation ───────────────────────────────────────────────────────
app.post("/make-server-add905f8/content/generate", requireAuth, async (c) => {
  const userId = c.get("userId");
  const rawBody = await c.req.json().catch(() => null);
  const body =
    rawBody && typeof rawBody === "object" && !Array.isArray(rawBody)
      ? (rawBody as Record<string, unknown>)
      : {};
  const { offer, audience, platform, goal, tone, outputType } = body;

  if (!offer) return c.json({ error: "offer is required" }, 400);

  // Load brand profile if available — prefer KV-stored profile, fall back to
  // request-supplied voice fields (for users who have only configured BrandOS locally).
  let brandProfile: any = null;
  try { brandProfile = await kv.get(`brand_profile:${userId}`); } catch { /* ok */ }
  if (!brandProfile || typeof brandProfile !== "object") {
    // Fall back to any brand profile fields forwarded in the request body.
    const requestVoice: Record<string, string | undefined> = {
      brandName: typeof body.brandName === "string" ? body.brandName.trim() || undefined : undefined,
      voiceTone: typeof body.voiceTone === "string" ? body.voiceTone.trim() || undefined : undefined,
      voiceComplexity: typeof body.voiceComplexity === "string" ? body.voiceComplexity.trim() || undefined : undefined,
      voiceFormality: typeof body.voiceFormality === "string" ? body.voiceFormality.trim() || undefined : undefined,
      voiceEnergy: typeof body.voiceEnergy === "string" ? body.voiceEnergy.trim() || undefined : undefined,
    };
    brandProfile = Object.values(requestVoice).some((v) => v !== undefined) ? requestVoice : null;
  }

  // Build brand context block
  const brandContext = brandProfile ? `

BRAND VOICE & IDENTITY — apply to every output:
- Brand: ${brandProfile.brandName}
- Mission: ${brandProfile.mission}
- Voice Tone: ${brandProfile.voiceTone}
- Voice Energy: ${brandProfile.voiceEnergy}
- Complexity: ${brandProfile.voiceComplexity}
- Formality: ${brandProfile.voiceFormality}
- Do's: ${(brandProfile.voiceDos || []).join(", ")}
- Don'ts: ${(brandProfile.voiceDonts || []).join(", ")}
- Messaging Pillars: ${(brandProfile.messagingPillars || []).filter(Boolean).join(", ")}
- Target Customer: ${brandProfile.targetCustomer}
- Transformation Promise: ${brandProfile.transformation}

Every output MUST reflect this brand identity. No generic content.` : "";

  const systemPrompt = `You are an expert content strategist for creators and solo entrepreneurs.
You generate structured, high-quality content assets — not generic AI filler.
Every hook, script, and caption must be specific, direct, and action-oriented.
Return ONLY valid JSON. No markdown, no explanation, no code fences.`;

  const userPrompt = `Generate a full content suite:

Offer/Idea: ${offer}
Platform: ${platform}
Target Audience: ${audience || "Solo creators and entrepreneurs"}
Content Goal: ${goal || "Build awareness and drive engagement"}
Tone: ${tone}
Output Type: ${outputType}
${brandContext}

Return EXACTLY this JSON structure — nothing else:
{
  "hooks": ["hook1", "hook2", "hook3", "hook4", "hook5"],
  "scripts": ["Intro: ...", "Problem: ...", "Solution: ...", "Proof: ...", "CTA: ..."],
  "captions": ["instagram caption", "linkedin caption", "twitter/x caption"]
}

Rules:
- 5 hooks using different frameworks: Problem-Agitate, Curiosity Gap, Contrast, Bold Claim, Question
- 5 script sections for a 60–90 sec video or long post
- 3 platform-specific captions: Instagram (emotional), LinkedIn (professional), X (punchy ≤280 chars)
- Everything must be specific to the offer — no generic filler
- ${brandProfile ? `Mirror ${brandProfile.brandName}'s exact voice` : "Be concrete and specific"}`;

  // OpenAI call
  const openaiKey = Deno.env.get("OPENAI_API_KEY");
  if (!openaiKey) {
    return c.json({
      error: "OPENAI_API_KEY not set. Add it in Supabase Dashboard → Edge Functions → Secrets."
    }, 500);
  }

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${openaiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      max_tokens: 1800,
      temperature: 0.72,
      response_format: { type: "json_object" }, // force JSON mode
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    console.error("OpenAI error:", err);
    return c.json({ error: "AI generation failed. Please try again." }, 500);
  }

  const data = await res.json();
  const rawContent = data.choices?.[0]?.message?.content ?? "{}";

  let parsed: any = { hooks: [], scripts: [], captions: [] };
  try {
    parsed = JSON.parse(rawContent);
  } catch (e) {
    console.error("JSON parse error:", e, "raw:", rawContent);
  }

  // Build & persist asset
  const assetId = crypto.randomUUID();
  const asset = {
    id: assetId,
    input: { offer, audience, platform, goal, tone, outputType },
    hooks: parsed.hooks || [],
    scripts: parsed.scripts || [],
    captions: parsed.captions || [],
    brandName: brandProfile?.brandName ?? null,
    createdAt: new Date().toISOString(),
  };

  await kv.set(`content:${userId}:${assetId}`, asset);
  return c.json(asset);
});

// ─── Content Library ──────────────────────────────────────────────────────────
app.get("/make-server-add905f8/content/library", requireAuth, async (c) => {
  const userId = c.get("userId");
  try {
    const assets = await kv.getByPrefix(`content:${userId}:`);
    return c.json(
      assets.sort((a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    );
  } catch {
    return c.json([]);
  }
});

app.delete("/make-server-add905f8/content/:id", requireAuth, async (c) => {
  const userId = c.get("userId");
  const id = c.req.param("id");
  await kv.del(`content:${userId}:${id}`);
  return c.json({ success: true });
});

Deno.serve(app.fetch);
