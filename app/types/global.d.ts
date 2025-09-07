interface Window {
  showDirectoryPicker(): Promise<FileSystemDirectoryHandle>;
  webkitSpeechRecognition: typeof SpeechRecognition;
  SpeechRecognition: typeof SpeechRecognition;
  puter?: typeof import('puter-js-types').puter;
}

interface Performance {
  memory?: {
    jsHeapSizeLimit: number;
    totalJSHeapSize: number;
    usedJSHeapSize: number;
  };
}

// Environment variables type for Vercel/Node.js
interface Env {
  [key: string]: string | undefined;
}

// Basic Puter.js type declarations
declare namespace puter {
  const ai: {
    chat(
      prompt: string,
      options?: {
        model?: string;
        stream?: boolean;
        max_tokens?: number;
        temperature?: number;
      }
    ): Promise<string>;
  };
}

declare global {
  const puter: typeof puter;
}
