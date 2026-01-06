# GitHub Pages Setup - Quick Guide

## ✅ Step 1: Enable GitHub Pages (Required)

1. Go to your repository on GitHub:
   ```
   https://github.com/BrightProgress/time-management-game
   ```

2. Click **Settings** (top menu)

3. Scroll down to **Pages** (left sidebar)

4. Under **Source**, select:
   - **Source**: `GitHub Actions`
   - (NOT "Deploy from a branch")

5. Click **Save**

## ✅ Step 2: Verify Deployment

1. Go to **Actions** tab in your repository
2. You should see a workflow run called "Deploy to GitHub Pages"
3. Wait for it to complete (usually 1-2 minutes)
4. Once complete, you'll see a green checkmark ✅

## ✅ Step 3: Access Your App

Your app will be live at:
```
https://brightprogress.github.io/time-management-game/
```

**Note**: It may take 1-2 minutes after the workflow completes for the site to be accessible.

## 🔍 Troubleshooting

### If the workflow fails:
- Check the **Actions** tab for error messages
- Ensure **Pages** is enabled in Settings → Pages
- Make sure **Source** is set to "GitHub Actions" (not a branch)

### If the site shows 404:
- Wait a few minutes (DNS propagation)
- Check the workflow completed successfully
- Verify the URL matches: `https://brightprogress.github.io/time-management-game/`

### To check workflow status:
```bash
# View recent commits
git log --oneline -5
```

## 📱 Testing on Mobile

1. Open the URL on your mobile browser
2. Tap the browser menu (⋮ or ...)
3. Select **"Add to Home Screen"** or **"Install App"**
4. The app will install as a PWA!

## 🔄 Future Updates

Every time you push to the `main` branch, GitHub Actions will automatically:
- Build and deploy your app
- Update the live site
- No manual steps needed!

---

**Your app is being deployed! Check the Actions tab to see progress.**

