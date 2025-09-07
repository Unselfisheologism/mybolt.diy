# Bolt.diy - AI-Powered Code Development Platform

Bolt.diy is a modern, AI-powered development environment featuring Puter.js integration for cost-free AI capabilities.

## 🚀 Features

- **AI-Powered Code Completion** - Powered by Puter.js (zero-cost AI)
- **Multi-Provider Support** - OpenAI, Anthropic, Google, and more through Puter
- **Real-time Collaboration** - Built-in chat and code sharing
- **Git Integration** - Full Git workflow support
- **WebContainer Technology** - Run code in-browser
- **Extensible Plugin System** - Custom AI providers and tools

## 🛠️ Tech Stack

- **Frontend**: React + Remix + TypeScript
- **Build Tool**: Vite
- **Styling**: UnoCSS + Tailwind CSS
- **AI**: Puter.js + AI SDK
- **Database**: Key-Value Store (Puter.js)
- **Deployment**: Vercel, Netlify, or Cloudflare

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-repo/bolt.diy.git
cd bolt.diy

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🚀 Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**
   ```bash
   # Login to Vercel
   vercel login

   # Deploy (staging first)
   npm run deploy:staging

   # Or deploy to production
   npm run deploy
   ```

3. **Environment Variables**
   Add these to your Vercel project (Dashboard → Project → Settings → Environment Variables):
   ```
   # AI Provider Settings (these can be empty since Puter.js handles AI)
   ANTHROPIC_API_KEY=
   OPENAI_API_KEY=
   GOOGLE_API_KEY=
   ```

4. **Custom Domain (Optional)**
   ```bash
   vercel domains add yourdomain.com
   ```

### Option 2: Netlify

1. **Connect Repository**
   ```bash
   npm run start:netlify
   ```

2. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: build/client
   Functions directory: (leave empty)
   ```

### Option 3: Cloudflare Pages

```bash
# Still supports Cloudflare with some modifications needed
npm run start:cloudflare
```

## 🔧 Configuration

### AI Providers

The app uses Puter.js by default, which provides:
- **GPT-5 Nano** - Fast, cost-effective AI
- **Claude 3.7 Sonnet** - Advanced reasoning
- **Gemini 2.0 Flash** - Multimodal capabilities
- **O1 Preview** - Advanced problem solving

### Environment Variables

```env
# Database Configuration (Optional - Puter.js handles this automatically)
KV_URL=
KV_TOKEN=

# Analytics (Optional)
ANALYTICS_ID=

# GitHub Integration (Optional)
GITHUB_TOKEN=
```

## 🏗️ Architecture

```
src/
├── app/
│   ├── components/    # React components
│   ├── lib/
│   │   ├── api/       # API integration
│   │   ├── modules/
│   │   │   └── llm/   # AI providers (Puter.js integrated)
│   │   ├── stores/    # State management
│   │   └── utils/     # Utility functions
│   ├── routes/        # Remix routes
│   └── types/         # TypeScript definitions
├── public/            # Static assets
├── functions/         # Serverless functions
└── build/            # Generated build files
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Puter.js** - Zero-cost AI and cloud services
- **Remix** - Full-stack React framework
- **AI SDK** - AI model abstraction layer
- **UnoCSS** - Atomic CSS framework

## 🆘 Troubleshooting

### Build Errors
```bash
# Clear cache and reinstall
npm run clean
npm install
npm run build
```

### Deployment Issues
```bash
# Check Vercel logs
vercel logs

# Re-deploy with verbose output
vercel --prod --verbose
```

### AI Provider Issues
```bash
# Test AI connectivity
npm run test:ai

# Reset AI configuration
# Visit Settings → AI → Reset Provider Settings
```

## 📚 Additional Resources

- [Puter.js Documentation](https://docs.puter.com)
- [Remix Documentation](https://remix.run/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [AI SDK Documentation](https://sdk.vercel.ai)
