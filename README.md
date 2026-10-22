# Amedsi Peptides

A Next.js educational site for peptide and longevity research, with a consultation request form and admin dashboard.

---

## Deployment Setup

### 1. Create a Resend Account (for contact form emails)

1. Go to **resend.com** and create a free account
2. In the Resend dashboard, go to **Domains → Add Domain**
3. Add `amedsi.com` and follow the DNS verification steps (adds TXT/MX records to your domain registrar)
4. Once verified, go to **API Keys → Create API Key**
5. Copy the key — you'll need it in step 3 below

---

### 2. Deploy to Vercel

1. Go to **vercel.com → Add New → Project**
2. Import the `amedsistemcells` GitHub repository
3. Before clicking Deploy, add the following **Environment Variables**:

| Variable | Value | Notes |
|----------|-------|-------|
| `DATABASE_URL` | Your Postgres connection string | See Database Setup below |
| `RESEND_API_KEY` | Your Resend API key | From step 1 above |
| `ADMIN_EMAIL` | `office@amedsipeptides.com` | Contact form notifications go here |
| `ADMIN_PASSWORD_HASH` | Bcrypt hash of admin password | See Admin Setup below |
| `SESSION_SECRET` | Random 32+ character string | Used to sign session cookies |
| `CRON_SECRET` | Random string | Protects the `/api/cron/purge` endpoint |
| `IP_HASH_SALT` | Random string | Used to anonymize visitor IPs |
| `NEXT_PUBLIC_BASE_URL` | `https://peptides.amedsi.com` | Your production domain |

4. Click **Deploy**

---

### 3. Database Setup

This app uses **Postgres** via Drizzle ORM. You can provision a free Postgres database from the Vercel Marketplace (Neon is recommended):

1. In Vercel, go to **Storage → Create Database → Neon Postgres**
2. Vercel will automatically add `DATABASE_URL` to your environment variables
3. After deploying, run the migration to create tables:

```bash
npm run migrate
```

---

### 4. Admin Setup

To generate a bcrypt hash for the admin password:

```bash
npm run hash-password
```

Enter your chosen password and copy the output hash into the `ADMIN_PASSWORD_HASH` environment variable in Vercel.

---

### 5. Custom Domain

1. In Vercel, go to your project → **Settings → Domains**
2. Add `peptides.amedsi.com`
3. Update your DNS with the CNAME/A record Vercel provides

---

## Local Development

```bash
npm install
npm run dev
```

Create a `.env.local` file with the environment variables listed above.

---

## Inviting Team Members

To give someone access to modify the code:

1. Go to **github.com/dianahub/amedsistemcells → Settings → Collaborators**
2. Click **Add people** and enter their GitHub username
3. They accept the invite via email and can then push changes

Any push to the `main` branch will automatically trigger a new deployment on Vercel.
