# 🚀 Vercel Deployment Guide

## Prerequisites
- GitHub account with your portfolio repository
- Vercel account (free tier available)
- EmailJS account set up for contact form

## 📋 Step-by-Step Deployment

### 1. **Prepare Your Repository**
```bash
# Ensure all changes are committed and pushed
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. **Deploy to Vercel**

#### Option A: Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect it's a Vite project
5. Click "Deploy"

#### Option B: Vercel CLI
```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy from project root
vercel

# For production deployment
vercel --prod
```

### 3. **Configure Environment Variables**
In Vercel Dashboard → Project Settings → Environment Variables, add:

```
VITE_GEMINI_API_KEY = "AIzaSyBhAGZ8TTDhnv8aO4XFIV9oKIxFPkU_1w8"
VITE_APP_EMAILJS_SERVICE_ID = "service_d4rhbjc"
VITE_APP_EMAILJS_TEMPLATE_ID = "template_x8jjoc4"
VITE_APP_EMAILJS_PUBLIC_KEY = "-j0nNZwBSnjRdqxT0"
NODE_ENV = "production"
```

### 4. **Verify Deployment**
- ✅ Site loads correctly
- ✅ 3D models and animations work
- ✅ Contact form sends emails
- ✅ ChatWidget responds with AI
- ✅ All sections are responsive
- ✅ Navigation works properly

## 🔧 Build Configuration

### Vercel Settings
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Performance Optimizations
- Static assets cached for 1 year
- Gzip compression enabled
- SPA routing configured
- Environment variables secured

## 🐛 Troubleshooting

### Common Issues:
1. **Build Fails**: Check all dependencies are in package.json
2. **Environment Variables**: Ensure all VITE_ prefixed vars are set
3. **3D Models Not Loading**: Check public folder assets are included
4. **Contact Form Not Working**: Verify EmailJS credentials
5. **Routing Issues**: Ensure vercel.json rewrites are configured

### Debug Commands:
```bash
# Test build locally
npm run build
npm run preview

# Check for build errors
npm run build-test
```

## 📱 Post-Deployment Checklist
- [ ] Test on mobile devices
- [ ] Verify all external links work
- [ ] Check contact form functionality
- [ ] Test ChatWidget AI responses
- [ ] Validate 3D scene performance
- [ ] Confirm environment variables are working

## 🔄 Continuous Deployment
Vercel automatically redeploys when you push to your main branch. No additional setup needed!

## 📞 Support
If you encounter issues, check:
- Vercel deployment logs
- Browser console for errors
- Network tab for failed requests
