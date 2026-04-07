# CreatorOS MVP-1: BrandOS → ContentOS Integration

**Mission:** Transform CreatorOS from isolated tools into a real connected system.

**Last Updated:** 2026-04-07

---

## 🎯 Goal

Build the **first real system integration** that proves CreatorOS is more than separate tools.

**MVP-1 Flow:**
```
User creates Brand Profile (BrandOS)
  ↓
Profile saved to database with user account
  ↓
User generates content (ContentOS)
  ↓
AI uses Brand Profile (Voice, Tone, Messaging) to personalize output
  ↓
Generated content reflects brand identity
  ↓
User sees library persist across sessions
```

**Success Metric:**  
Content generated with Brand Profile is **noticeably better** than generic AI output.

---

## 🔍 Current State Analysis

### What Works
- ✅ BrandOS UI (6-step setup flow)
- ✅ ContentOS UI (Generate + Library)
- ✅ Form state management (local)
- ✅ Library with localStorage
- ✅ Basic UX flows

### Critical Gaps
- ❌ **NO AI Integration** (ContentOS uses mock data - lines 73-93 in `/src/app/screens/generate.tsx`)
- ❌ **NO Backend** (no database, no auth)
- ❌ **NO Integration** (BrandOS and ContentOS don't communicate)
- ❌ **NO Persistence** (data lost on refresh, except localStorage library)

### Impact
**Users can't actually use the product.**

They can:
- Fill out BrandOS form → downloads JSON (useless)
- Fill out ContentOS form → sees mock data (useless)
- View library → only localStorage (not real)

They can't:
- Save brand profiles
- Generate real content
- Apply brand voice to content
- Persist anything long-term

---

## 🚀 Build Plan (4 Phases)

### Phase 1: Backend Foundation (Week 1)

**Goal:** Users can create accounts and save data

#### Tasks
1. **Supabase Auth Setup**
   - [ ] Configure Supabase Auth (email/password)
   - [ ] Create signup page (`/auth/signup`)
   - [ ] Create login page (`/auth/login`)
   - [ ] Add auth state provider (React Context)
   - [ ] Protected routes (redirect if not logged in)

2. **Database Schema**
   ```sql
   -- Brand Profiles Table
   CREATE TABLE brand_profiles (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     
     -- Brand Basics (Step 1)
     brand_name TEXT NOT NULL,
     mission TEXT,
     vision TEXT,
     core_values TEXT[],
     positioning TEXT,
     
     -- Target Audience (Step 2)
     target_customer TEXT,
     customer_problems TEXT[],
     customer_language TEXT,
     
     -- Voice & Tone (Step 3)
     voice_tonality TEXT,
     voice_style TEXT,
     voice_dos TEXT[],
     voice_donts TEXT[],
     
     -- Messaging Pillars (Step 4)
     messaging_pillars JSONB,
     
     -- Offer Context (Step 5)
     product_service TEXT,
     transformation TEXT,
     cta_style TEXT,
     
     -- Metadata
     created_at TIMESTAMPTZ DEFAULT NOW(),
     updated_at TIMESTAMPTZ DEFAULT NOW(),
     is_active BOOLEAN DEFAULT TRUE
   );
   
   -- Content Assets Table
   CREATE TABLE content_assets (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     brand_profile_id UUID REFERENCES brand_profiles(id) ON DELETE SET NULL,
     
     -- Input Context
     offer_idea TEXT NOT NULL,
     audience TEXT,
     platform TEXT,
     goal TEXT,
     tone TEXT,
     output_type TEXT,
     
     -- Generated Content
     hooks TEXT[],
     scripts TEXT[],
     captions TEXT[],
     
     -- Metadata
     created_at TIMESTAMPTZ DEFAULT NOW(),
     asset_type TEXT, -- 'hook', 'script', 'caption', 'suite'
     status TEXT DEFAULT 'draft',
     
     UNIQUE(user_id, created_at)
   );
   
   -- Indexes
   CREATE INDEX idx_brand_profiles_user_id ON brand_profiles(user_id);
   CREATE INDEX idx_brand_profiles_active ON brand_profiles(is_active) WHERE is_active = TRUE;
   CREATE INDEX idx_content_assets_user_id ON content_assets(user_id);
   CREATE INDEX idx_content_assets_brand_profile ON content_assets(brand_profile_id);
   ```

3. **API Routes (Supabase Edge Functions)**
   - [ ] `POST /api/brand-profile` - Save brand profile
   - [ ] `GET /api/brand-profile` - Load active brand profile
   - [ ] `PUT /api/brand-profile/:id` - Update brand profile
   - [ ] `POST /api/content/generate` - Generate content with AI
   - [ ] `GET /api/content/library` - Load user's content assets
   - [ ] `DELETE /api/content/:id` - Delete content asset

4. **Auth UI Components**
   - [ ] `<SignupForm />` - Email/password signup
   - [ ] `<LoginForm />` - Email/password login
   - [ ] `<AuthGuard />` - Protect routes
   - [ ] `<UserMenu />` - Logout, profile

**Deliverable:** Users can sign up, log in, and routes are protected.

---

### Phase 2: BrandOS Backend Integration (Week 2)

**Goal:** Brand profiles persist to database

#### Tasks
1. **Update BrandOS App**
   - [ ] Load user's existing brand profile on mount
   - [ ] Replace "Export JSON" with "Save Brand Profile"
   - [ ] API call to `POST /api/brand-profile` on submit
   - [ ] Show loading state during save
   - [ ] Success screen: "Your brand is ready! → Create Content"
   - [ ] Error handling (show toast if save fails)

2. **Success Flow**
   - [ ] After save, redirect to `/app/content-os/generate`
   - [ ] Pass `brandProfileId` in URL params or state
   - [ ] Show toast: "Brand Profile saved successfully"

3. **Edit Flow**
   - [ ] If user has existing profile, show "Edit Brand Profile" instead of blank form
   - [ ] Pre-fill form with saved data
   - [ ] Update instead of create on submit

4. **Multiple Profiles (Optional)**
   - [ ] Allow users to have multiple brand profiles
   - [ ] Add "Switch Brand" dropdown
   - [ ] Set one as "active" for ContentOS

**Deliverable:** Users can save brand profiles and they persist across sessions.

---

### Phase 3: AI Integration (Week 2-3)

**Goal:** ContentOS generates real content using OpenAI

#### Tasks
1. **OpenAI API Setup**
   - [ ] Add OpenAI API key to Supabase secrets
   - [ ] Create prompt template system
   - [ ] Test API integration (generate sample content)

2. **Prompt Engineering**
   ```typescript
   // Prompt Template
   const generateContentPrompt = (input: {
     offer: string;
     audience: string;
     platform: string;
     goal: string;
     tone: string;
     brandProfile?: BrandProfile;
   }) => {
     const basePrompt = `
       Generate content for a ${input.platform} post.
       
       Offer/Idea: ${input.offer}
       Target Audience: ${input.audience}
       Goal: ${input.goal}
       Tone: ${input.tone}
     `;
     
     // If brand profile exists, inject voice & messaging
     if (brandProfile) {
       return `
         ${basePrompt}
         
         BRAND VOICE & IDENTITY:
         - Brand Name: ${brandProfile.brand_name}
         - Mission: ${brandProfile.mission}
         - Voice Tonality: ${brandProfile.voice_tonality}
         - Voice Style: ${brandProfile.voice_style}
         - Do's: ${brandProfile.voice_dos.join(', ')}
         - Don'ts: ${brandProfile.voice_donts.join(', ')}
         - Messaging Pillars: ${JSON.stringify(brandProfile.messaging_pillars)}
         
         Generate content that reflects this brand identity.
       `;
     }
     
     return basePrompt;
   };
   ```

3. **API Route Implementation**
   ```typescript
   // /supabase/functions/server/routes/content.ts
   app.post('/api/content/generate', async (c) => {
     const { offer, audience, platform, goal, tone, outputType } = await c.req.json();
     const userId = c.get('userId'); // from auth middleware
     
     // Load user's active brand profile
     const { data: brandProfile } = await supabase
       .from('brand_profiles')
       .select('*')
       .eq('user_id', userId)
       .eq('is_active', true)
       .single();
     
     // Generate content with OpenAI
     const prompt = generateContentPrompt({
       offer,
       audience,
       platform,
       goal,
       tone,
       brandProfile
     });
     
     const response = await openai.chat.completions.create({
       model: 'gpt-4',
       messages: [
         { role: 'system', content: 'You are a content strategist...' },
         { role: 'user', content: prompt }
       ]
     });
     
     const generatedContent = parseOpenAIResponse(response);
     
     // Save to database
     const { data: asset } = await supabase
       .from('content_assets')
       .insert({
         user_id: userId,
         brand_profile_id: brandProfile?.id,
         offer_idea: offer,
         audience,
         platform,
         goal,
         tone,
         output_type: outputType,
         hooks: generatedContent.hooks,
         scripts: generatedContent.scripts,
         captions: generatedContent.captions,
         asset_type: 'suite'
       })
       .select()
       .single();
     
     return c.json({ success: true, asset });
   });
   ```

4. **Frontend Integration**
   - [ ] Remove mock data from `generate.tsx` (lines 73-93)
   - [ ] Add `generateContent()` function that calls API
   - [ ] Show loading state during generation
   - [ ] Display real generated content
   - [ ] Save to database (not localStorage)

**Deliverable:** Users generate real AI content that reflects their brand voice.

---

### Phase 4: ContentOS Backend Integration (Week 3)

**Goal:** Library persists to database and shows brand-aware content

#### Tasks
1. **Load Brand Profile in ContentOS**
   - [ ] On mount, fetch user's active brand profile
   - [ ] Display indicator: "Using Brand: [Brand Name]"
   - [ ] Show "No brand profile" warning if missing
   - [ ] CTA: "Create Brand Profile" → link to BrandOS

2. **Library Database Migration**
   - [ ] Load library from database (not localStorage)
   - [ ] Filter by `user_id` automatically
   - [ ] Show brand profile name on each asset card
   - [ ] Add "Generated with: [Brand Name]" badge

3. **Save to Library Flow**
   - [ ] After generation, asset is already saved to DB
   - [ ] "Save to Library" button → just shows success toast
   - [ ] Or: Change button to "View in Library"
   - [ ] Navigate to `/app/content-os/library`

4. **Library Enhancements**
   - [ ] Filter by brand profile (if user has multiple)
   - [ ] Edit content (update DB)
   - [ ] Delete content (remove from DB)
   - [ ] Export content (download as file)

5. **Brand Profile Indicator**
   ```tsx
   {brandProfile && (
     <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-purple-500/20 bg-purple-500/5">
       <CheckCircle className="w-4 h-4 text-purple-400" />
       <span className="text-sm text-purple-200">
         Using Brand: <strong>{brandProfile.brand_name}</strong>
       </span>
     </div>
   )}
   ```

**Deliverable:** Library persists across sessions and shows brand-aware content.

---

## 🎨 UI/UX Enhancements

### Success Screens
- **BrandOS Complete:**
  ```
  ✅ Your brand is ready!
  
  [Brand Name] has been saved to your account.
  
  [Create Content with This Brand] → /app/content-os/generate
  ```

- **ContentOS Generate:**
  ```
  Using Brand: [Brand Name] ✓
  
  [Input fields...]
  
  [Generate Content] → API call
  ```

- **Library:**
  ```
  Content Library
  Showing 12 assets • Generated with: [Brand Name]
  
  [Filter] [Search] [View: Grid/List]
  ```

### Loading States
- BrandOS: "Saving your brand profile..."
- ContentOS: "Generating content with your brand voice..."
- Library: "Loading your content library..."

### Error States
- "Failed to save brand profile. Please try again."
- "Content generation failed. Please check your inputs."
- "Failed to load library. Please refresh."

---

## 📊 Success Metrics

### Qualitative
- [ ] Content generated **with** brand profile sounds better than **without**
- [ ] Users understand the BrandOS → ContentOS flow
- [ ] Users see value in saving brand profiles
- [ ] Library feels like "their content" (not generic)

### Quantitative
- [ ] 80%+ of users who complete BrandOS also use ContentOS
- [ ] 50%+ of ContentOS generations use brand profile
- [ ] 70%+ of generated content is saved to library
- [ ] Users return to library 3+ times per week

---

## 🚫 Out of Scope for MVP-1

**Don't Build:**
- ❌ Launch OS (not needed yet)
- ❌ Management OS (scheduling comes later)
- ❌ Analytics OS (measurement comes after execution)
- ❌ Social media integrations (manual posting for now)
- ❌ Team collaboration (single user only)
- ❌ Advanced AI features (voice cloning, image generation)
- ❌ Payment/billing (free tier only)

**Why:**  
Focus = Power. One perfect flow beats five half-built features.

---

## 📅 Timeline

### Week 1: Backend Foundation
- Supabase auth setup
- Database schema
- API routes
- Auth UI

### Week 2: BrandOS + AI Integration
- BrandOS save to DB
- OpenAI integration
- Prompt engineering
- ContentOS real generation

### Week 3: ContentOS Backend + Polish
- Library migration to DB
- Brand profile indicator
- Success screens
- Error handling
- Testing

### Week 4: Testing & Refinement
- User testing
- Bug fixes
- Performance optimization
- Documentation

**Total: 4 weeks to MVP-1**

---

## 🔥 Critical Path

These tasks BLOCK everything else:

1. **Supabase Auth** (blocks all database operations)
2. **Database Schema** (blocks all data persistence)
3. **OpenAI Integration** (blocks real content generation)
4. **Brand Profile API** (blocks BrandOS → ContentOS handoff)

Start with these. Everything else can wait.

---

## 🎯 Next Immediate Actions

### Today
1. [ ] Review this plan with team
2. [ ] Set up Supabase project (if not done)
3. [ ] Create OpenAI API account
4. [ ] Decide: Email/password or social auth? (recommend email for MVP)

### Tomorrow
1. [ ] Implement auth signup/login pages
2. [ ] Create database tables
3. [ ] Test auth flow (signup → login → protected route)

### This Week
1. [ ] BrandOS save to database
2. [ ] OpenAI API integration
3. [ ] First real content generation

---

## 📌 Key Decisions Needed

1. **Auth Method:**
   - Email/password (simpler, faster)
   - Social auth (Google, GitHub) (better UX, more setup)
   - **Recommendation:** Email/password for MVP-1

2. **AI Model:**
   - GPT-4 (best quality, expensive)
   - GPT-3.5-turbo (good quality, cheap)
   - Claude (alternative)
   - **Recommendation:** GPT-3.5-turbo for MVP, upgrade later

3. **Multiple Brand Profiles:**
   - Single profile per user (simpler)
   - Multiple profiles (more flexible)
   - **Recommendation:** Single for MVP-1, add multiple later

4. **Content Pricing:**
   - Free tier: 10 generations/month
   - Paid tier: Unlimited
   - **Recommendation:** Free unlimited for MVP-1, add pricing later

---

## 🚀 Post-MVP-1 Roadmap

**After MVP-1 works perfectly:**

1. **Add Launch OS** (Q2 2026)
   - Plan content launches
   - Coordinate rollouts
   - Phase-based execution

2. **Add Management OS** (Q2 2026)
   - Content calendar
   - Multi-platform scheduling
   - Publishing queue

3. **Add Analytics OS** (Q3 2026)
   - Performance tracking
   - AI insights
   - Content optimization

**But not before MVP-1 is rock-solid.**

---

**Maintained by:** Product Team  
**Last Updated:** 2026-04-07  
**Status:** Ready for Development
