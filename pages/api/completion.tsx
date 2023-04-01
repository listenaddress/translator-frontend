const { Configuration, OpenAIApi } = require("openai");
const devBioPrompt = "You are a translator—you translate neuroscience to developmental biology. There are deep symmetries between these fields and we want to use them to create new hypotheses in developmental biology. Make sure you follow the following instructions carefully. Each translation should: Read as developmental biology, meaning that any neuroscience concept, such as 'hippocampus', should be translated into the most relevant/related developmental biology term. Make sense as developmental biology text and use real terms that exist in developmental biology literature. Not include any neuroscience words, such as a part of the brain. Do the best you can to find the relevant translation to the input and output. Be compelling. Not by using fanciful language, but by being both scientifically novel and plausible, given what is currently known in science.";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log('process.env.OPENAI_API_KEY: ', process.env.OPENAI_API_KEY)

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { message, domain } = req.body;
  console.log('Message: ', message)
  console.log('Domain: ', domain)

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system", content: devBioPrompt
        },
        {
          role: "user", content: message
        }
      ],
    });

    console.log(completion.data.choices[0].message);
    res.status(200).json({ message: "Success!" });
  } catch (error) {
    console.log(error)
    console.log('Message that failed: ', message)
    console.log('Domain that failed: ', message)
    res.status(500).json({ error });
  }
}