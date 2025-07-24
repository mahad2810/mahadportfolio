# 🚀 Deployment Guide for Mahad's Portfolio

This guide will help you deploy your portfolio to Vercel (recommended) or other platforms.

## 📋 Prerequisites

1. **Node.js** (v16 or higher)
2. **Git** repository
3. **Vercel account** (free)
4. **Environment variables** configured

## 🔧 Environment Variables Setup

### Required Environment Variables:

Create a `.env` file in your project root with these variables:

```env
# Gemini AI API Key for ChatWidget
VITE_GEMINI_API_KEY=your-gemini-api-key-here

# EmailJS Configuration for Contact Form
VITE_APP_EMAILJS_SERVICE_ID=your-emailjs-service-id
VITE_APP_EMAILJS_TEMPLATE_ID=your-emailjs-template-id
VITE_APP_EMAILJS_PUBLIC_KEY=your-emailjs-public-key
```

### How to Get API Keys:

#### 1. **Gemini API Key:**
- Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
- Create a new API key
- Copy the key to `VITE_GEMINI_API_KEY`

#### 2. **EmailJS Configuration:**
- Sign up at [EmailJS](https://www.emailjs.com/)
- Create a service (Gmail, Outlook, etc.)
- Create an email template
- Get your Service ID, Template ID, and Public Key

## 🌐 Vercel Deployment (Recommended)

### Method 1: Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   npm run build
   vercel --prod
   ```

### Method 2: Vercel Dashboard

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables in Vercel dashboard
   - Deploy!

### Method 3: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/your-repo)

## ⚙️ Vercel Configuration

The project includes a `vercel.json` file with optimized settings:

- **SPA Routing:** All routes redirect to `index.html`
- **Build Output:** Uses `dist` directory
- **Environment:** Production optimized

## 🔧 Build Optimization

The project is configured for optimal performance:

- **Code Splitting:** Vendor, Three.js, and UI libraries are split into separate chunks
- **Asset Optimization:** Images and assets are optimized
- **Bundle Size:** Warnings for chunks over 1MB

## 🌍 Alternative Deployment Options

### Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json: `"homepage": "https://yourusername.github.io/repository-name"`
3. Add script: `"deploy": "gh-pages -d dist"`
4. Run: `npm run build && npm run deploy`

## 🐛 Troubleshooting

### Common Issues:

1. **Environment Variables Not Working:**
   - Ensure variables start with `VITE_`
   - Restart development server after adding variables
   - Check Vercel dashboard environment variables

2. **Build Failures:**
   - Run `npm run build` locally first
   - Check for TypeScript/ESLint errors
   - Ensure all dependencies are in package.json
   - **Fixed:** Removed problematic markdown dependencies that caused Rollup import issues

3. **3D Models Not Loading:**
   - Ensure models are in `public/` directory
   - Check file paths are correct
   - Verify GLTF/GLB files are valid

4. **Routing Issues:**
   - Verify `vercel.json` is configured correctly
   - Check that all routes redirect to `index.html`

5. **ChatBot Formatting:**
   - **Updated:** Replaced ReactMarkdown with simple text formatter
   - Supports bullet points and basic bold text formatting
   - No external markdown dependencies required

## 📊 Performance Monitoring

After deployment, monitor your site:

- **Vercel Analytics:** Built-in performance monitoring
- **Lighthouse:** Check Core Web Vitals
- **GTMetrix:** Performance analysis

## 🔄 Continuous Deployment

Set up automatic deployments:

1. **Connect GitHub to Vercel**
2. **Enable automatic deployments**
3. **Every push to main branch triggers deployment**

## 📝 Post-Deployment Checklist

- [ ] All environment variables configured
- [ ] Contact form working
- [ ] AI chatbot responding
- [ ] 3D models loading
- [ ] Mobile responsiveness
- [ ] Performance optimized
- [ ] SEO meta tags
- [ ] Analytics configured

## 🎯 Production URLs

After deployment, your portfolio will be available at:
- **Vercel:** `https://your-project-name.vercel.app`
- **Custom Domain:** Configure in Vercel dashboard

---

**Need Help?** Check the [Vercel Documentation](https://vercel.com/docs) or create an issue in the repository.
