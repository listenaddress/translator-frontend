const { Configuration, OpenAIApi } = require("openai");
import { getAnthropicSystemMessages, getSystemMessages } from "../../helpers/prompt";
const { Anthropic } = require("@anthropic-ai/sdk");

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY environment variable");
}

if (!process.env.ANTHROPIC_API_KEY) {
  throw new Error("Missing ANTHROPIC_API_KEY environment variable");
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export default async function handler(req, res) {
  const { message, domain, model } = req.body;
  if (!message || !domain || !model) {
    return res.status(400).json({ error: "Missing message, domain, or model" });
  }

  try {
    let completion;
    if (model === "gpt-4o" || model === "gpt-3.5-turbo" || model === "o3-mini") {
      console.log('About to call openai.createChatCompletion');
      const messages = getSystemMessages(domain);
      messages.push({
        role: "user",
        content: message
      });
      completion = await openai.createChatCompletion({
        model: model,
        messages: messages,
      });
    } else if (model === "claude-3.5-sonnet") {
      console.log('About to call anthropic.messages.create');
      const messages = getAnthropicSystemMessages(domain, message);

      completion = await anthropic.messages.create({
        messages: messages,
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 1000,
      });
    } else {
      return res.status(400).json({ error: "Invalid model selected" });
    }

    if (model.startsWith("gpt") || model === "o3-mini") {
      const responseMessage = completion.data.choices[0].message;
      if (responseMessage) {
        res.status(200).json({ message: responseMessage });
      } else {
        res.status(400).json({ error: "No message returned from GPT model" });
      }
    } else if (model === "claude-3.5-sonnet") {
      const responseMessage = completion.content[0].text;
      console.log('responseMessage: ', responseMessage);
      if (responseMessage) {
        res.status(200).json({ message: { content: responseMessage } });
      } else {
        res.status(400).json({ error: "No message returned from Claude model" });
      }
    }
  } catch (error) {
    console.error('Error during completion:', error);
    res.status(500).json({ error: "Internal server error" });
  }
}
