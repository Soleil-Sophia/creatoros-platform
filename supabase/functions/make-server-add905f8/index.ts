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

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function normalizeText(value: unknown, maxLength = 1200): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return trimmed.length > maxLength ? trimmed.slice(0, maxLength) : trimmed;
}

function normalizeStringArray(value: unknown, maxItems = 10, maxLength = 180): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((entry) => normalizeText(entry, maxLength))
    .filter((entry): entry is string => typeof entry === "string")
    .slice(0, maxItems);
}

function requestBrandProfile(body: Record<string, unknown>) {
  return {
    brandName: normalizeText(body.brandName, 180),
    mission: normalizeText(body.mission, 500),
    voiceTone: normalizeText(body.voiceTone, 180),
    voiceComplexity: normalizeText(body.voiceComplexity, 180),
    voiceFormality: normalizeText(body.voiceFormality, 180),
    voiceEnergy: normalizeText(body.voiceEnergy, 180),
    voiceDos: normalizeStringArray(body.voiceDos),
    voiceDonts: normalizeStringArray(body.voiceDonts),
    messagingPillars: normalizeStringArray(body.messagingPillars),
    targetCustomer: normalizeText(body.targetCustomer, 500),
    transformation: normalizeText(body.transformation, 500),
  };
}

function hasRequestBrandProfile(profile: ReturnType<typeof requestBrandProfile>): boolean {
  return Object.values(profile).some((value) => Array.isArray(value) ? value.length > 0 : typeof value === "string");
}

// ─── Auth Middleware ──────────────────────────────────────────────────────────
async function requireAuth(c: any, next: any) {
  const apiKey = c.req.header("x-api-key");
  const expectedApiKey = Deno.env.get("FRONTEND_API_KEY");
  if (apiKey && expectedApiKey && apiKey === expectedApiKey) {
    c.set("userId", `api-key:${crypto.randomUUID()}`);
    c.set("userEmail", "frontend@creatoros.internal");
    c.set("allowPersistence", false);
    await next();
    return;
  }

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
  c.set("allowPersistence", true);
  await next();
}

// ─── Health ───────────────────────────────────────────────────────────────────
app.get("/make-server-add905f8/health", (c) => c.json({ status: "ok", version: "mvp1" }));

// ─── Brand Profile ────────────────────────────────────────────────────────────
app.get("/make-server-add905f8/brand-profile", requireAuth, async (c) => {
  const userId = c.get("userId");
  const allowPersistence = c.get("allowPersistence") === true;
  if (!allowPersistence) {
    return c.json({ profile: null });
  }
  try {
    const profile = await kv.get(`brand_profile:${userId}`);
    return c.json({ profile: profile ?? null });
  } catch {
    return c.json({ profile: null });
  }
});

app.post("/make-server-add905f8/brand-profile", requireAuth, async (c) => {
  const userId = c.get("userId");
  const allowPersistence = c.get("allowPersistence") === true;
  if (!allowPersistence) {
    return c.json({ error: "Brand profile persistence requires user session auth" }, 403);
  }
  const rawBody = await c.req.json().catch(() => null);
  if (!isPlainObject(rawBody)) {
    return c.json({ error: "Request body must be a JSON object" }, 400);
  }

  if (!normalizeText(rawBody.brandName, 180)) {
    return c.json({ error: "brandName is required" }, 400);
  }

  await kv.set(`brand_profile:${userId}`, {
    ...rawBody,
    updatedAt: new Date().toISOString(),
  });

  return c.json({ success: true });
});

// ─── Content Generation ───────────────────────────────────────────────────────
app.post("/make-server-add905f8/content/generate", requireAuth, async (c) => {
  const userId = c.get("userId");
  const allowPersistence = c.get("allowPersistence") === true;
  const rawBody = await c.req.json().catch(() => null);
  if (!isPlainObject(rawBody)) {
    return c.json({ error: "Request body must be a JSON object" }, 400);
  }
  const offer = normalizeText(rawBody.offer, 2000);
  const audience = normalizeText(rawBody.audience, 500);
  const platform = normalizeText(rawBody.platform, 180);
  const goal = normalizeText(rawBody.goal, 500);
  const tone = normalizeText(rawBody.tone, 180);
  const outputType = normalizeText(rawBody.outputType, 180);

  if (!offer) return c.json({ error: "offer is required" }, 400);

  // Load brand profile if available
  let brandProfile: Record<string, unknown> | null = null;
  if (allowPersistence) {
    try {
      const storedProfile = await kv.get(`brand_profile:${userId}`);
      if (isPlainObject(storedProfile)) {
        brandProfile = storedProfile;
      }
    } catch {
      // ok
    }
  }

  const fallbackBrandProfile = requestBrandProfile(rawBody);
  const effectiveBrandProfile = brandProfile
    ? { ...fallbackBrandProfile, ...brandProfile }
    : hasRequestBrandProfile(fallbackBrandProfile)
    ? fallbackBrandProfile
    : null;

  // Build brand context block
  const brandContext = effectiveBrandProfile ? `

BRAND VOICE & IDENTITY — apply to every output:
- Brand: ${normalizeText(effectiveBrandProfile.brandName, 180) ?? ""}
- Mission: ${normalizeText(effectiveBrandProfile.mission, 500) ?? ""}
- Voice Tone: ${normalizeText(effectiveBrandProfile.voiceTone, 180) ?? ""}
- Voice Energy: ${normalizeText(effectiveBrandProfile.voiceEnergy, 180) ?? ""}
- Complexity: ${normalizeText(effectiveBrandProfile.voiceComplexity, 180) ?? ""}
- Formality: ${normalizeText(effectiveBrandProfile.voiceFormality, 180) ?? ""}
- Do's: ${normalizeStringArray(effectiveBrandProfile.voiceDos).join(", ")}
- Don'ts: ${normalizeStringArray(effectiveBrandProfile.voiceDonts).join(", ")}
- Messaging Pillars: ${normalizeStringArray(effectiveBrandProfile.messagingPillars).join(", ")}
- Target Customer: ${normalizeText(effectiveBrandProfile.targetCustomer, 500) ?? ""}
- Transformation Promise: ${normalizeText(effectiveBrandProfile.transformation, 500) ?? ""}

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
- ${effectiveBrandProfile ? `Mirror ${normalizeText(effectiveBrandProfile.brandName, 180) ?? "the brand"}'s exact voice` : "Be concrete and specific"}`;

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
    brandName: normalizeText(effectiveBrandProfile?.brandName, 180) ?? null,
    createdAt: new Date().toISOString(),
  };

  if (allowPersistence) {
    await kv.set(`content:${userId}:${assetId}`, asset);
  }
  return c.json(asset);
});

// ─── Content Library ──────────────────────────────────────────────────────────
app.get("/make-server-add905f8/content/library", requireAuth, async (c) => {
  const userId = c.get("userId");
  const allowPersistence = c.get("allowPersistence") === true;
  if (!allowPersistence) {
    return c.json([]);
  }
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
  const allowPersistence = c.get("allowPersistence") === true;
  if (!allowPersistence) {
    return c.json({ error: "Content deletion requires user session auth" }, 403);
  }
  const id = c.req.param("id");
  await kv.del(`content:${userId}:${id}`);
  return c.json({ success: true });
});

Deno.serve(app.fetch);
