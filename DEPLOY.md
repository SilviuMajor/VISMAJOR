# Deploying GY-NO! — step by step

The site is a Next.js 14 app. Recommended host: **Vercel** (made by the Next.js
team, free to start). Database for the notify-me list: **Supabase** (free tier).
Payments: **Stripe**.

You'll do the account/key steps yourself (they need your logins). Everything in
the code is already deploy-ready — `npm run build` passes clean.

---

## 0. One-time accounts (≈5 min)
Create these if you don't have them (all free to start):
- GitHub — https://github.com  (stores the code)
- Vercel — https://vercel.com  → "Sign up with GitHub"
- Supabase — https://supabase.com  → "Sign up with GitHub"
- Stripe — https://stripe.com  (you likely have this)

---

## 1. Put the code on GitHub
Two ways — pick one:

**A. Easiest — let your developer/agent push it.** Run this one command in the
project folder to log in, then say "push it":
```
gh auth login
```
(choose GitHub.com → HTTPS → "Login with a web browser", paste the code.)

**B. Do it yourself with GitHub Desktop:** install https://desktop.github.com,
"Add Local Repository" → choose `Desktop/gy-no` → "Publish repository". 
**Make it Private.**

> The repo includes your source images in `images/` — keep the repo **Private**.

---

## 2. Deploy on Vercel (≈2 min)
1. Go to https://vercel.com/new
2. "Import" the `gy-no` repository.
3. Vercel auto-detects **Next.js** — leave all settings default.
4. Click **Deploy**. In ~1 minute you get a live URL like `gy-no.vercel.app`.

The site works immediately. Pre-order checkout and notify-me will show a
"not configured yet" message until you add the keys below.

---

## 3. Supabase — the notify-me email list (≈3 min)
1. https://supabase.com → New project (pick a name + region; save the DB password).
2. Left sidebar → **SQL Editor** → New query → paste and Run:
   ```sql
   create table notify_list (
     email text primary key,
     created_at timestamptz default now()
   );
   ```
3. Left sidebar → **Project Settings → API**. Copy two values:
   - **Project URL**
   - **service_role** secret key (under "Project API keys")

---

## 4. Stripe — pre-order checkout (≈5 min)
1. Stripe Dashboard → **Products** → add product "GY-NO! 20ml", set a GBP price.
   Repeat for 40ml and the 2-pack. On each price, copy its **Price ID**
   (`price_...`).
2. Stripe Dashboard → **Developers → API keys**. Copy:
   - **Secret key** (`sk_live_...` or `sk_test_...` while testing)
   - **Publishable key** (`pk_...`)

---

## 5. Add the keys to Vercel
Vercel → your project → **Settings → Environment Variables**. Add each of these
(Name → Value), then **Redeploy** (Deployments tab → ⋯ → Redeploy):

| Name | Value |
| ---- | ----- |
| `NEXT_PUBLIC_SITE_URL` | your final domain, e.g. `https://gy-no.co.uk` |
| `PREORDER_SHIP_MONTH` | e.g. `September 2026` |
| `STRIPE_SECRET_KEY` | from Stripe |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | from Stripe |
| `STRIPE_PRICE_1_TUBE` | the 20ml Price ID |
| `STRIPE_PRICE_2_TUBES` | the 40ml Price ID |
| `STRIPE_PRICE_3_TUBES` | the 2-pack Price ID |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service_role key |

> If you skip the Stripe Price IDs, checkout still works using the inline
> fallback prices in `app/api/checkout/route.ts`.

---

## 6. Connect your domain (≈5 min + DNS wait)
1. Vercel → project → **Settings → Domains** → add `gy-no.co.uk` (and `www`).
2. Vercel shows the DNS records to set. Go to **where you bought the domain**
   (registrar) and either:
   - set the **A record** / **CNAME** Vercel gives you, **or**
   - point the domain's **nameservers** to Vercel (simplest).
3. Wait for DNS to propagate (minutes to a few hours). Vercel auto-issues HTTPS.

Done — `https://gy-no.co.uk` is live.

---

## Before you go fully live
- Switch Stripe from **test** keys to **live** keys (and re-add in Vercel).
- The `/explore` and `/compare` pages are internal review pages (not linked from
  the site). Delete `app/explore` and `app/compare` before launch if you don't
  want them reachable.
- Replace the placeholder copy: real prices, real "2,000+/68%" figures, real
  testimonials, RP name/address and GS1 barcode for packaging.

## Every future update
Push to GitHub (`git commit` + `git push`) → Vercel auto-deploys. That's it.
