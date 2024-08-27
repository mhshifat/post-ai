import { generateResponse } from "@/actions/ai";
import { AiStrategy } from "../strategy";

export class OpenAiProvider implements AiStrategy {
  constructor() {}

  async generateResponse(message: string) {
    console.log(await generateResponse(message));
    return Promise.resolve({ message: "" });
  }
}