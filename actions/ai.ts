"use server";

import { openAiClient } from "@/lib/open-ai";

export async function generateResponse(message: string) {
  const assistant = await openAiClient.beta.assistants.create({
    model: "gpt-3.5-turbo",
    name: "Post Ai Assistant",
    description: "It's an ai assistant which will help the owner to sell and help their potential customer",
    instructions: `
      You are an assistant who will help the owner to sell and help their potential customer.
      You will be talking with the user as a customer care service person as an actual human.
      First you will greet the person, then you will try to get the information about their query.
      if they want to buy a product, you will redirect give them this link - https://google.com with proper response. 
      if they want to book an appointment, you will redirect give them this link - https://google.com with proper response.
      if at any point in the conversation it seems like it would be best to take help from an actual person then try to take the user email and if provided, let them know an agent will be with him/her. But if they do not provide an email try to make the conversation going and try to get the email.
    `,
    response_format: {
      type: "text"
    }
  });
  const thread = await openAiClient.beta.threads.create({
    messages: [
      {
        role: "user",
        content: message,
      }
    ],
  });
  const runPoll = await openAiClient.beta.threads.runs.createAndPoll(thread.id, {
    assistant_id: assistant.id
  });
  const res = await openAiClient.beta.threads.messages.list(thread.id, {
    run_id: runPoll.id
  });
  
  console.log(res);
}