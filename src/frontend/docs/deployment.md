# Zekon Marketplace - Deployment Guide

This guide explains how to deploy your Zekon Marketplace application to the Internet Computer (ICP) as a web app.

## Deploy via Caffeine UI (Recommended)

If you're building your app in Caffeine, deployment is streamlined through the interface. Follow these steps to make your app live and get your public URL.

### Understanding the Deployment Status

When you're working in Caffeine, you'll see a preview panel on the right side of your screen. Before going live, this panel displays the message:

> **"Your live site will appear here once you go live"**

This means your app has been built successfully, but it hasn't been deployed to a public URL yet.

### Steps to Go Live

1. **Locate the "Go live" button**
   - Look at the top-right area of the Caffeine interface
   - You should see a button labeled **"Go live"** or similar
   - This button is typically near the preview panel or in the main toolbar

2. **Click "Go live"**
   - Click the button once
   - Caffeine will begin deploying your app to the Internet Computer
   - This process usually takes 10-30 seconds

3. **Wait for deployment to complete**
   - The system will build and deploy your frontend canister
   - You'll see progress indicators during this process

### Finding Your Public URL

Once deployment completes, your public URL will appear in one of these locations:

1. **In the preview panel** (right side of screen)
   - The message "Your live site will appear here once you go live" will be replaced with your live app
   - Look for a URL or "Open app" button

2. **In the spec tab**
   - Click on the **"spec"** tab at the top of the screen
   - Scroll down to the **"Deployment"** section
   - You'll see **"Frontend URL"** with your public link

3. **URL format**
   - Your URL will typically end with `.icp0.io`
   - Example: `https://abc123-xyz.icp0.io`
   - This is your permanent public link that you can share with anyone

### What to Do with Your URL

Once you have your URL:
- **Copy it** to share with users
- **Bookmark it** for easy access
- **Test it** in different browsers to ensure everything works
- **Share it** on social media or with your community

### Troubleshooting

**Can't find the "Go live" button?**
- Make sure your build completed successfully
- Check the top-right toolbar area
- Try refreshing the Caffeine interface

**Deployment failed?**
- Check the error messages in the console
- Ensure your code builds without errors
- Try clicking "Go live" again

**URL not appearing?**
- Wait a few more seconds - deployment can take up to a minute
- Check both the preview panel and the spec tab
- Refresh the page if needed

## Prerequisites

Before deploying, ensure you have:

1. **DFX SDK installed** - The DFINITY command-line tool for managing ICP canisters
   ```bash
   sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
   ```

2. **Node.js and pnpm** - For building the frontend
   ```bash
   # Install pnpm if you haven't already
   npm install -g pnpm
   ```

3. **ICP Cycles** - For mainnet deployment, you'll need cycles (ICP's compute units)
   - Get free cycles from the [cycles faucet](https://faucet.dfinity.org/) for testing
   - Or purchase ICP and convert to cycles for production

## Local Deployment (Advanced)

Local deployment is useful for testing before deploying to the mainnet.

### Steps:

1. **Start the local replica**
   ```bash
   dfx start --clean --background
   ```

2. **Deploy the canisters**
   ```bash
   dfx deploy
   ```

3. **Get your local frontend URL**
   After deployment, dfx will output URLs for your canisters. Look for output like:
   ```
   Frontend canister via browser
     frontend: http://127.0.0.1:4943/?canisterId=<CANISTER_ID>
   ```

4. **Access your app**
   Open the URL in your browser. Your marketplace is now running locally!

### Alternative: Using the setup script

