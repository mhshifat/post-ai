import { OpenAiProvider } from "./providers";
import { AiService } from "./service";

export const aiService = new AiService(new OpenAiProvider());