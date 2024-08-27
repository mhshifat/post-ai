export interface AiStrategy {
  generateResponse(message: string): Promise<{ message: string }>
}