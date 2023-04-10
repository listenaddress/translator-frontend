const { Configuration, OpenAIApi } = require("openai");
import { getSystemMessages } from "../../helpers/prompt";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log('process.env.OPENAI_API_KEY: ', process.env.OPENAI_API_KEY)
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { message, domain } = req.body;
  if (!message || !domain) return res.status(400).json({ error: "Missing message or domain" })
  console.log('Message: ', message)
  console.log('Domain: ', domain)
  console.log("systemMessages: ", getSystemMessages(domain));

  const messages = getSystemMessages(domain);
  messages.push({
    role: "user",
    content: message
  });

  console.log("messages: ", messages);

  try {
    const completion = await openai.createChatCompletion({
      // model: "gpt-4",
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    console.log(completion.data);
    console.log(completion.data.choices[0].message);
    if (completion.data.choices[0].message) {
      res.status(200).json({ message: completion.data.choices[0].message });
    } else {
      res.status(400).json({ message: "No message returned" });
    }
  } catch (error) {
    console.log(error)
    console.log('Message that failed: ', message)
    console.log('Domain that failed: ', message)
    res.status(500).json({ error });
  }
}