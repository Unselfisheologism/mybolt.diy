#!/usr/bin/env node

/**
 * Bolt.diy Deployment Script
 *
 * This script helps deploy Bolt.diy to various platforms
 * Usage: node scripts/deploy.js [platform]
 *
 * Platforms: vercel, netlify
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PLATFORM = process.argv[2] || 'vercel';
const IS_PROD = process.argv.includes('--prod');

console.log(`🚀 Deploying Bolt.diy to ${PLATFORM}${IS_PROD ? ' (Production)' : ' (Staging)'}...\n`);

function runCommand(command, description) {
  console.log(`📋 ${description}`);
  console.log(`   $ ${command}`);

  try {
    const result = execSync(command, {
      stdio: 'pipe',
      encoding: 'utf-8'
    });
    console.log(`   ✅ Success`);
    return result;
  } catch (error) {
    console.log(`   ❌ Failed: ${error.message}`);
    throw error;
  }
}

function checkDependencies() {
  console.log('🔍 Checking dependencies...');

  try {
    execSync('node --version', { stdio: 'pipe' });
    console.log('   ✅ Node.js installed');
  } catch (error) {
    throw new Error('Node.js is required for deployment');
  }

  try {
    execSync('npm --version', { stdio: 'pipe' });
    console.log('   ✅ npm installed');
  } catch (error) {
    throw new Error('npm is required for deployment');
  }
}

function installDependencies() {
  console.log('📦 Installing dependencies...');
  runCommand('npm install', 'Installing production dependencies');
}

function runBuild() {
  runCommand('npm run build', 'Building application');
}

function checkEnvironmentVariables() {
  console.log('🔧 Checking environment variables...');

  const requiredVars = [
    'OPENAI_API_KEY',
    'ANTHROPIC_API_KEY',
    'GOOGLE_API_KEY'
  ];

  const envPath = path.join(process.cwd(), '.env.local');
  let envExists = false;

  try {
    if (fs.existsSync(envPath)) {
      envExists = true;
      const envContent = fs.readFileSync(envPath, 'utf-8');

      requiredVars.forEach(varName => {
        if (!envContent.includes(`${varName}=`)) {
          console.log(`   ⚠️  ${varName} not found in .env.local`);
          console.log(`   💡 Since using Puter.js, you can leave this empty`);
        }
      });
    } else {
      console.log('   ℹ️  .env.local not found (optional for Puter.js)');
    }
  } catch (error) {
    console.log('   ℹ️  Could not read .env.local file');
  }

  return envExists;
}

async function deployToVercel() {
  console.log('\n🌐 Deploying to Vercel...');

  try {
    // Check if Vercel CLI is installed
    execSync('vercel --version', { stdio: 'pipe' });
    console.log('   ✅ Vercel CLI installed');
  } catch (error) {
    throw new Error('Vercel CLI not installed. Run: npm i -g vercel');
  }

  const deployCommand = IS_PROD ? 'npm run deploy' : 'npm run deploy:staging';
  runCommand(deployCommand, IS_PROD ? 'Deploying to production' : 'Deploying to staging');
}

function deployToNetlify() {
  console.log('\n🌐 Deploying to Netlify...');

  try {
    execSync('netlify --version', { stdio: 'pipe' });
    console.log('   ✅ Netlify CLI installed');
  } catch (error) {
    throw new Error('Netlify CLI not installed. Run: npm install -g netlify-cli');
  }

  runCommand('npm run start:netlify', 'Starting Netlify development server');
}



async function main() {
  try {
    checkDependencies();
    checkEnvironmentVariables();
    installDependencies();
    runBuild();

    switch (PLATFORM.toLowerCase()) {
      case 'vercel':
        await deployToVercel();
        break;
      case 'netlify':
        deployToNetlify();
        break;
      default:
        console.log(`❌ Unknown platform: ${PLATFORM}`);
        console.log('   Supported platforms: vercel, netlify');
        process.exit(1);
    }

    console.log('\n🎉 Deployment completed successfully!');
    console.log('📖 Check the README.md for additional configuration steps');

  } catch (error) {
    console.log(`\n❌ Deployment failed: ${error.message}`);
    console.log('\n💡 Troubleshooting:');
    console.log('   1. Check if you have the correct CLI tools installed');
    console.log('   2. Make sure your .env.local file is properly configured');
    console.log('   3. Verify you have the correct permissions for deployment');
    console.log('   4. Check the deployment platform documentation');

    process.exit(1);
  }
}

main();
