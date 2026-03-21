# EXPENSE UPLOADER - COMPLETE DEPLOYMENT GUIDE

Your previous Vercel deployment failed because the project was incomplete. **This guide fixes that.**

---

## THE PROBLEM

You deployed just a single `.jsx` file to Vercel. Vercel needs:
- ✅ `package.json` (dependencies & build script)
- ✅ `vite.config.js` (build configuration)
- ✅ `index.html` (entry point)
- ✅ `src/` folder with React components
- ✅ `.gitignore` (don't upload node_modules)

Missing any of these → **Build fails.**

---

## THE SOLUTION: Complete Project Setup

I've prepared **all 8 files** you need. Here's the folder structure:

```
expense-uploader/
├── .gitignore              ← Ignore node_modules
├── index.html              ← HTML entry point
├── package.json            ← Dependencies & scripts
├── postcss.config.js       ← CSS processing
├── README.md               ← Project overview
├── tailwind.config.js      ← Tailwind CSS setup
├── vite.config.js          ← Vite build config
├── VERCEL_DEPLOYMENT.md    ← This deployment guide
└── src/
    ├── App.jsx             ← Your expense uploader component
    ├── index.css           ← Tailwind CSS imports
    └── main.jsx            ← React entry point
```

---

## STEP 1: Create GitHub Repository

Open Terminal/CMD and run:

```bash
# Create folder
mkdir expense-uploader
cd expense-uploader

# Initialize git
git init
git config user.email "your@email.com"
git config user.name "Your Name"

# Add all files
git add .
git commit -m "Initial commit: expense uploader with Vite + Tailwind"

# Create main branch
git branch -M main

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/expense-uploader.git

# Push to GitHub
git push -u origin main
```

**First time?** Go to https://github.com/new to create the repo first.

---

## STEP 2: Clean Up Vercel (Delete Failed Deployment)

1. Go to https://vercel.com/dashboard
2. Find your failed "altairexpensetracker" project
3. Click the **⋯ menu** → **Settings**
4. Scroll down → **Danger Zone** → **Delete Project**
5. Confirm deletion

---

## STEP 3: Deploy Fresh to Vercel

1. Go to https://vercel.com/dashboard
2. Click **"Add New"** → **"Project"**
3. **Import Git Repository**
4. Paste your GitHub URL: `https://github.com/YOUR_USERNAME/expense-uploader`
5. Click **"Continue"**
6. **Vercel should auto-detect:**
   - Framework: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
7. Click **"Deploy"**

**Wait 2-3 minutes.** You should see ✅ **"Congratulations! Your site is live."**

Your site will be at: `https://expense-uploader-YOUR_RANDOM_SUBDOMAIN.vercel.app`

---

## STEP 4: Update n8n Webhook URL

The form currently has a placeholder URL. Update it:

### Option A: Hardcode (Simple)

1. Edit `src/App.jsx` in your GitHub repo
2. Find this line (~15):
   ```javascript
   const n8nWebhookUrl = 'https://YOUR_N8N_INSTANCE.com/webhook/expense-upload';
   ```
3. Replace with your actual n8n webhook URL
4. Commit & push:
   ```bash
   git add src/App.jsx
   git commit -m "Update n8n webhook URL"
   git push
   ```
5. Vercel auto-redeploys (takes ~1 min)

### Option B: Environment Variables (Better)

1. Go to your Vercel project → **Settings** → **Environment Variables**
2. Add new variable:
   - Name: `VITE_N8N_WEBHOOK_URL`
   - Value: `https://your-n8n-instance.com/webhook/expense-upload`
3. Click **"Add"**
4. Go to **Deployments** → Find latest → Click **⋯** → **Redeploy**
5. Update `src/App.jsx`:
   ```javascript
   const n8nWebhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://YOUR_N8N_INSTANCE.com/webhook/expense-upload';
   ```
6. Commit & push → Auto-redeploys

---

## STEP 5: Test the Form

1. Open your Vercel deployment URL
2. You should see the **expense uploader form**
3. Try uploading a test receipt
4. Check browser console (F12 → Console) for errors
5. Verify POST request to n8n webhook in Network tab

---

## WHAT YOU'LL SEE

### ✅ Success
- Form displays with 3 business tabs
- File upload area works
- "Upload Receipt" button enabled
- After upload: "Receipt received! AI is extracting data now."

### ❌ Errors to Check

| Error | Cause | Fix |
|-------|-------|-----|
| Blank page / 404 | Missing `index.html` | Verify file in repo root |
| Button disabled | No file selected | Click upload area to select file |
| Upload fails | Wrong n8n URL | Update webhook URL (Step 4) |
| "Command not found" | Old Vercel cache | Delete project, redeploy fresh |

---

## QUICK CHECKLIST

- [ ] All 8 files copied to your local folder
- [ ] GitHub repository created and pushed
- [ ] Old Vercel project deleted
- [ ] Fresh deployment on Vercel (shows ✅)
- [ ] n8n webhook URL updated
- [ ] Form tested (opens in browser)
- [ ] Test receipt uploaded successfully

---

## NEXT: Backend Setup

Once form is deployed, set up:

1. **Airtable base** (see `airtable_schema.md`)
2. **n8n workflows** (see `n8n_workflows.md`)
3. **Google Sheets mapping** (see `sheets_mapping.md`)
4. **Full setup checklist** (see `setup_checklist.md`)

---

## TROUBLESHOOTING

### "Build failed" on Vercel

Click **Deployments** → Find failed one → **View Logs**. Common causes:

- Missing `package.json` → Add it
- Missing `.gitignore` → Add it
- Wrong folder structure → Check folder layout above
- Node version → Vercel should handle (18+)

**Fix:** Delete project, add missing files, redeploy.

### Form won't load

- Check Vercel URL is correct
- Try incognito mode (clear cache)
- Check browser console for JavaScript errors
- Verify `index.html` in repo root

### Upload button does nothing

- Check n8n webhook URL in code
- Open browser console (F12) → Network tab
- Try uploading → Look for POST request
- If POST fails → n8n URL is wrong (Step 4)

### "Cannot find module" errors

- All dependencies in `package.json`?
- `npm install` ran locally before push?
- `node_modules/` NOT in `.gitignore`? (it should be)

---

## FILE REFERENCE

| File | Purpose | Created? |
|------|---------|----------|
| `package.json` | Dependencies & build scripts | ✅ |
| `vite.config.js` | Vite build config | ✅ |
| `tailwind.config.js` | Tailwind CSS setup | ✅ |
| `postcss.config.js` | CSS processing | ✅ |
| `index.html` | HTML entry point | ✅ |
| `.gitignore` | Ignore files | ✅ |
| `README.md` | Project docs | ✅ |
| `src/main.jsx` | React entry point | ✅ |
| `src/App.jsx` | Expense uploader component | ✅ |
| `src/index.css` | Tailwind CSS imports | ✅ |

**All files are in `/mnt/user-data/outputs/`** — download and use them.

---

## YOU'RE DONE! 🎉

Once deployed and tested:
- Next: Set up Airtable base
- Then: Build n8n workflows  
- Finally: Map Google Sheets cells
- Full instructions in `setup_checklist.md`

---

**Questions?** Re-read this guide or check `README.md` in the project.
