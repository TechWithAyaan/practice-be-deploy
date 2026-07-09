#!/bin/bash
# VERCEL DEPLOYMENT PRE-FLIGHT CHECKLIST
# Run this before pushing to GitHub

echo "🔍 VERCEL DEPLOYMENT VERIFICATION"
echo "=================================="
echo ""

# 1. Check jsonwebtoken
echo "✓ Checking jsonwebtoken..."
if grep -q '"jsonwebtoken": "9.0.2"' package.json; then
    echo "  ✅ jsonwebtoken 9.0.2 found in package.json"
else
    echo "  ❌ jsonwebtoken NOT found in package.json - FIX REQUIRED"
fi
echo ""

# 2. Check build script
echo "✓ Checking build script..."
if grep -q '"build"' package.json; then
    echo "  ✅ Build script found in package.json"
else
    echo "  ❌ Build script NOT found - FIX REQUIRED"
fi
echo ""

# 3. Check vercel.json buildCommand
echo "✓ Checking vercel.json..."
if grep -q 'buildCommand' vercel.json; then
    echo "  ✅ buildCommand found in vercel.json"
else
    echo "  ❌ buildCommand NOT found - FIX REQUIRED"
fi
echo ""

# 4. Check local npm install
echo "✓ Checking node_modules..."
if [ -d "node_modules/jsonwebtoken" ]; then
    echo "  ✅ jsonwebtoken installed locally"
else
    echo "  ❌ jsonwebtoken NOT installed - Run: npm install"
fi
echo ""

# 5. Check package-lock.json exists
echo "✓ Checking package-lock.json..."
if [ -f "package-lock.json" ]; then
    echo "  ✅ package-lock.json exists"
else
    echo "  ❌ package-lock.json missing - Run: npm install"
fi
echo ""

# 6. Check .gitignore (should exclude node_modules)
echo "✓ Checking .gitignore..."
if grep -q "node_modules" .gitignore; then
    echo "  ✅ node_modules in .gitignore (correct)"
else
    echo "  ❌ node_modules NOT in .gitignore"
fi
echo ""

# 7. Check server.js exports app
echo "✓ Checking server.js..."
if grep -q "export default app" server.js; then
    echo "  ✅ server.js exports app"
else
    echo "  ❌ server.js does NOT export app - FIX REQUIRED"
fi
echo ""

# 8. Check ES module extensions
echo "✓ Checking .js extensions in imports..."
js_count=$(grep -r "from ['\"]\./" src/ | grep -v "\.js'" | grep -v '\.js"' | wc -l)
if [ "$js_count" -eq 0 ]; then
    echo "  ✅ All imports have .js extensions"
else
    echo "  ⚠️  Some imports might be missing .js extensions"
fi
echo ""

echo "=================================="
echo "🚀 READY TO DEPLOY!"
echo ""
echo "Next steps:"
echo "1. git add ."
echo "2. git commit -m 'Fix Vercel deployment'"
echo "3. git push origin main"
echo "4. Monitor at Vercel Dashboard"
