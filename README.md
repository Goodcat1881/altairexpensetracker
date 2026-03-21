# Expense Uploader - Receipt Processing with AI

A minimal, fast receipt uploader that uses Claude Vision to extract expense data automatically.

## Project Structure

```
expense-uploader/
├── index.html              # HTML entry point
├── package.json            # Dependencies & scripts
├── vite.config.js          # Vite build configuration
├── tailwind.config.js      # Tailwind CSS config
├── postcss.config.js       # PostCSS config
├── .gitignore              # Git ignore rules
├── src/
│   ├── main.jsx            # React entry point
│   ├── App.jsx             # Main expense uploader component
│   └── index.css           # Tailwind CSS imports
└── README.md               # This file
```

## Setup

### 1. Local Development

```bash
# Install dependencies
npm install

# Start dev server (runs on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### 2. Deploy to Vercel

#### Option A: GitHub + Vercel (Recommended)

1. **Create GitHub repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: expense uploader"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/expense-uploader.git
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to https://vercel.com/dashboard
   - Click "Add New" → "Project"
   - Select your GitHub repository
   - Vercel auto-detects Vite config
   - Click "Deploy"

3. **Environment Variables (in Vercel):**
   - Go to Project Settings → Environment Variables
   - No required env vars for now (n8n webhook URL is hardcoded in component)

#### Option B: Vercel CLI

```bash
npm i -g vercel
vercel
# Follow prompts, select your project folder
```

## Configuration

### Update n8n Webhook URL

Edit `src/App.jsx` and find this line:

```javascript
const n8nWebhookUrl = 'https://YOUR_N8N_INSTANCE.com/webhook/expense-upload';
```

Replace with your actual n8n webhook URL. Options:

1. **Hardcode** (simple): Replace in code, redeploy
2. **Environment variable** (better): 
   - Add to `.env`: `VITE_N8N_WEBHOOK_URL=https://...`
   - Update code: `const n8nWebhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;`
   - Add to Vercel env vars

## Features

✅ **3-business tabs** (Damas, Shah Alam, Q Nails)
✅ **Drag-drop file upload** (images & PDFs)
✅ **AI extraction** (Claude Vision gets date, amount, category)
✅ **Airtable integration** (n8n stores receipt data)
✅ **Auto P&L sync** (monthly push to Google Sheets)

## Technologies

- **React 18** - UI framework
- **Vite** - Fast build tool
- **Tailwind CSS** - Styling
- **Lucide Icons** - Icons
- **n8n** - Automation (backend)
- **Claude Vision API** - Receipt OCR
- **Airtable** - Data storage

## Troubleshooting

### Build Error: "react-scripts not found"
❌ You're using Create React App config
✅ Use Vite instead (this project uses Vite)

### Deployment fails on Vercel
- Check build logs: Click "Deployments" → Failed → "View Logs"
- Ensure all files are committed to git
- Verify `package.json` exists in root
- Check Node version (should be 18+)

### Webhook not receiving uploads
- Verify n8n URL is correct and webhook is active
- Check browser console for POST errors
- Test n8n webhook manually: `curl -X POST https://your-n8n-url`

## Next Steps

1. Deploy to Vercel ✅
2. Update n8n webhook URL ✅
3. Set up Airtable base (see `airtable_schema.md`)
4. Create n8n workflows (see `n8n_workflows.md`)
5. Configure Google Sheets mapping (see `sheets_mapping.md`)
6. Run setup checklist (see `setup_checklist.md`)

## Support

For issues or questions, check:
- `setup_checklist.md` - Step-by-step guide
- `n8n_workflows.md` - Backend automation
- `airtable_schema.md` - Data structure
