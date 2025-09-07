import { type AppLoadContext } from '@remix-run/node';

declare module '@remix-run/node' {
  interface AppLoadContext {
    // This can be extended with any custom context you need for Vercel
    // For now, keeping it minimal to work with base Node.js adapter
  }
}
