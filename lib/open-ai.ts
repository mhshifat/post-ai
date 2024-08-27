import OpenAi from 'openai';

export const openAiClient = new OpenAi({
  apiKey: process.env.OPEN_AI_SECRET_KEY
});

