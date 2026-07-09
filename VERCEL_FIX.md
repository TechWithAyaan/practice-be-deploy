# Vercel Deployment Issues - Root Causes & Fixes

## Problem Analysis

### Issue 1: node_modules Excluded from Git
- **Current State**: `.gitignore` contains `node_modules/`
- **Impact**: When pushed to GitHub, node_modules are not included
- **Vercel Behavior**: Vercel clones from GitHub but doesn't have node_modules
- **Result**: Runtime error: "Cannot find module 'jsonwebtoken'"

### Issue 2: Missing Build Configuration
- **Current State**: `vercel.json` doesn't specify build commands
- **Impact**: Vercel may not run `npm install` automatically
- **Solution**: Add explicit build configuration

### Issue 3: Wrong Entry Point (Potential)
- **Current State**: `server.js` exports app as default but doesn't start server
- **Impact**: App initializes but may not listen on port
- **Solution**: Need to start the server on PORT env variable

## Solutions Applied

### Fix 1: Update vercel.json with Build Command
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

### Fix 2: Update server.js to Start Server
Add server startup code that respects Vercel environment.

### Fix 3: Add package.json Build Script
Add a build script to ensure clean builds.

## Deployment Steps

1. Ensure all files are committed to git
2. Verify package.json has all dependencies
3. Run: `npm install` locally (already done)
4. Commit changes: `git add . && git commit -m "Fix Vercel deployment"`
5. Push to GitHub: `git push origin main`
6. Vercel will automatically:
   - Install dependencies with `npm install`
   - Build and deploy

## Verification Checklist
- [ ] jsonwebtoken in dependencies ✓
- [ ] package.json at root ✓
- [ ] All imports use .js extension ✓
- [ ] server.js exports app ✓
- [ ] vercel.json configured ✓
- [ ] Build script added ✓
