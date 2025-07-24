#!/usr/bin/env node

/**
 * Build Test Script for Mahad's Portfolio
 * Tests the build process and checks for common issues
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting build test for Mahad\'s Portfolio...\n');

// Check if required files exist
const requiredFiles = [
  'package.json',
  'vite.config.js',
  'vercel.json',
  'src/App.jsx',
  'src/main.jsx',
  'index.html'
];

console.log('📋 Checking required files...');
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING!`);
    process.exit(1);
  }
});

// Check environment variables
console.log('\n🔧 Checking environment variables...');
const envExample = fs.readFileSync('.env.example', 'utf8');
const requiredEnvVars = envExample.match(/VITE_\w+/g) || [];

requiredEnvVars.forEach(envVar => {
  if (process.env[envVar]) {
    console.log(`✅ ${envVar} - Set`);
  } else {
    console.log(`⚠️  ${envVar} - Not set (will use fallback)`);
  }
});

// Run build
console.log('\n🔨 Running build...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build successful!');
} catch (error) {
  console.log('❌ Build failed!');
  process.exit(1);
}

// Check build output
console.log('\n📦 Checking build output...');
const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  const files = fs.readdirSync(distPath);
  console.log(`✅ Build output created with ${files.length} files`);
  
  // Check for critical files
  const criticalFiles = ['index.html', 'assets'];
  criticalFiles.forEach(file => {
    if (files.includes(file)) {
      console.log(`✅ ${file} found in build`);
    } else {
      console.log(`❌ ${file} missing from build`);
    }
  });
} else {
  console.log('❌ Build output directory not found');
  process.exit(1);
}

console.log('\n🎉 Build test completed successfully!');
console.log('🚀 Ready for deployment to Vercel!');
