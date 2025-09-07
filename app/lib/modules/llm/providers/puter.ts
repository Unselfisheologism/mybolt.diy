import { BaseProvider } from '~/lib/modules/llm/base-provider';
import type { ModelInfo } from '~/lib/modules/llm/types';
import type { LanguageModelV1 } from 'ai';
import type { IProviderSetting } from '~/types/model';
import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';

export default class PuterProvider extends BaseProvider {
  name = 'Puter';
  getApiKeyLink = 'https://puter.com/';

  config = {
    apiTokenKey: 'PUTER_AUTH_TOKEN', // Puter doesn't use API keys, so this is for internal use
  };

  staticModels: ModelInfo[] = [
    // OpenAI GPT Models
    { name: 'gpt-4o-mini', label: 'GPT-4o Mini', provider: 'Puter', maxTokenAllowed: 128000 },
    { name: 'gpt-4o', label: 'GPT-4o', provider: 'Puter', maxTokenAllowed: 128000 },
    { name: 'o1', label: 'OpenAI o1', provider: 'Puter', maxTokenAllowed: 100000 },
    { name: 'o1-mini', label: 'OpenAI o1 Mini', provider: 'Puter', maxTokenAllowed: 128000 },
    { name: 'o1-pro', label: 'OpenAI o1 Pro', provider: 'Puter', maxTokenAllowed: 100000 },
    { name: 'o3', label: 'OpenAI o3', provider: 'Puter', maxTokenAllowed: 100000 },
    { name: 'o3-mini', label: 'OpenAI o3 Mini', provider: 'Puter', maxTokenAllowed: 100000 },
    { name: 'o4-mini', label: 'OpenAI o4 Mini', provider: 'Puter', maxTokenAllowed: 100000 },
    { name: 'gpt-4.1', label: 'GPT-4.1', provider: 'Puter', maxTokenAllowed: 128000 },
    { name: 'gpt-4.1-mini', label: 'GPT-4.1 Mini', provider: 'Puter', maxTokenAllowed: 128000 },
    { name: 'gpt-4.1-nano', label: 'GPT-4.1 Nano', provider: 'Puter', maxTokenAllowed: 128000 },
    { name: 'gpt-4.5-preview', label: 'GPT-4.5 Preview', provider: 'Puter', maxTokenAllowed: 128000 },
    { name: 'gpt-5-nano', label: 'GPT-5 Nano', provider: 'Puter', maxTokenAllowed: 32000 },

    // Anthropic Claude Models
    { name: 'claude-sonnet-4', label: 'Claude Sonnet 4', provider: 'Puter', maxTokenAllowed: 128000 },
    { name: 'claude-opus-4', label: 'Claude Opus 4', provider: 'Puter', maxTokenAllowed: 128000 },
    { name: 'claude-3-7-sonnet', label: 'Claude 3.7 Sonnet', provider: 'Puter', maxTokenAllowed: 128000 },
    { name: 'claude-3-5-sonnet', label: 'Claude 3.5 Sonnet', provider: 'Puter', maxTokenAllowed: 80000 },

    // DeepSeek Models
    { name: 'deepseek-chat', label: 'DeepSeek Chat', provider: 'Puter', maxTokenAllowed: 32000 },
    { name: 'deepseek-reasoner', label: 'DeepSeek Reasoner', provider: 'Puter', maxTokenAllowed: 32000 },

    // Google Gemini Models
    { name: 'google/gemini-2.5-flash-preview', label: 'Gemini 2.5 Flash Preview', provider: 'Puter', maxTokenAllowed: 1000000 },
    { name: 'google/gemini-2.5-flash-preview:thinking', label: 'Gemini 2.5 Flash Preview (Thinking)', provider: 'Puter', maxTokenAllowed: 1000000 },
    { name: 'google/gemini-2.0-flash-lite-001', label: 'Gemini 2.0 Flash Lite 001', provider: 'Puter', maxTokenAllowed: 1000000 },
    { name: 'google/gemini-2.0-flash-001', label: 'Gemini 2.0 Flash 001', provider: 'Puter', maxTokenAllowed: 1000000 },
    { name: 'google/gemini-pro-1.5', label: 'Gemini Pro 1.5', provider: 'Puter', maxTokenAllowed: 1000000 },

    // Meta Llama Models
    { name: 'meta-llama/llama-4-maverick', label: 'Llama 4 Maverick', provider: 'Puter', maxTokenAllowed: 8000 },
    { name: 'meta-llama/llama-4-scout', label: 'Llama 4 Scout', provider: 'Puter', maxTokenAllowed: 8000 },
    { name: 'meta-llama/llama-3.3-70b-instruct', label: 'Llama 3.3 70B Instruct', provider: 'Puter', maxTokenAllowed: 8000 },
    { name: 'meta-llama/llama-3.2-3b-instruct', label: 'Llama 3.2 3B Instruct', provider: 'Puter', maxTokenAllowed: 8000 },
    { name: 'meta-llama/llama-3.2-1b-instruct', label: 'Llama 3.2 1B Instruct', provider: 'Puter', maxTokenAllowed: 8000 },
    { name: 'meta-llama/llama-3.1-8b-instruct', label: 'Llama 3.1 8B Instruct', provider: 'Puter', maxTokenAllowed: 8000 },
    { name: 'meta-llama/llama-3.1-405b-instruct', label: 'Llama 3.1 405B Instruct', provider: 'Puter', maxTokenAllowed: 8000 },
    { name: 'meta-llama/llama-3.1-70b-instruct', label: 'Llama 3.1 70B Instruct', provider: 'Puter', maxTokenAllowed: 8000 },
    { name: 'meta-llama/llama-3-70b-instruct', label: 'Llama 3 70B Instruct', provider: 'Puter', maxTokenAllowed: 8000 },

    // Mistral Models
    { name: 'mistral-large-latest', label: 'Mistral Large Latest', provider: 'Puter', maxTokenAllowed: 32000 },
    { name: 'codestral-latest', label: 'Codestral Latest', provider: 'Puter', maxTokenAllowed: 32000 },

    // Google Gemma Models
    { name: 'google/gemma-2-27b-it', label: 'Gemma 2 27B IT', provider: 'Puter', maxTokenAllowed: 8000 },

    // xAI Grok Models
    { name: 'grok-beta', label: 'Grok Beta', provider: 'Puter', maxTokenAllowed: 32000 },

    // Legacy models for compatibility
    { name: 'gpt-4', label: 'GPT-4', provider: 'Puter', maxTokenAllowed: 8000 },
    { name: 'claude-3-opus-latest', label: 'Claude 3 Opus', provider: 'Puter', maxTokenAllowed: 8000 },
    { name: 'gemini-2-flash-exp', label: 'Gemini 2.0 Flash', provider: 'Puter', maxTokenAllowed: 1000000 },
    { name: 'o1-preview', label: 'OpenAI o1 Preview', provider: 'Puter', maxTokenAllowed: 128000 },
  ];

  async getDynamicModels(
    apiKeys?: Record<string, string>,
    settings?: IProviderSetting,
    serverEnv?: Record<string, string>,
  ): Promise<ModelInfo[]> {
    // Puter.js dynamically provides models, but we'll return static list for now
    // In a real implementation, you could query available models from Puter.js
    return this.staticModels;
  }

  getModelInstance(options: {
    model: string;
    serverEnv: { [key: string]: string | undefined };
    apiKeys?: Record<string, string>;
    providerSettings?: Record<string, IProviderSetting>;
  }): LanguageModelV1 {
    const { model } = options;

    // Always use backend SDK approach for now
    // Frontend Puter.js integration will be handled at the application level
    return this.getBackendModelInstance(model, options);
  }



  private getBackendModelInstance(model: string, options: {
    apiKeys?: Record<string, string>;
    providerSettings?: Record<string, IProviderSetting>;
  }): LanguageModelV1 {
    // Backend implementation that delegates to appropriate SDK
    try {
      // Try to use OpenAI SDK for GPT models and Claude for Anthropic models
      if (model.includes('gpt') || model.includes('o1') || model.includes('o3') || model.includes('o4')) {
        const openai = createOpenAI({
          apiKey: options.apiKeys?.[this.name] || 'puter-api-key-placeholder',
        });
        return openai(model);
      }

      // Try Anthropic for Claude models
      if (model.includes('claude')) {
        const anthropic = createAnthropic({
          apiKey: options.apiKeys?.[this.name] || 'puter-api-key-placeholder',
        });
        return anthropic(model);
      }

      // For other models, use OpenAI as fallback
      const openai = createOpenAI({
        apiKey: options.apiKeys?.[this.name] || 'puter-api-key-placeholder',
      });
      return openai('gpt-3.5-turbo'); // Fallback model

    } catch (error) {
      console.error('Failed to create backend model instance:', error);
      throw new Error(`Could not create model instance for ${model}: ${error}`);
    }
  }
}
