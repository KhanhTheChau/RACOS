// "use server";

// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const apikey = process.env.API_KEY;

// const genAI = new GoogleGenerativeAI(apikey);

// export async function runTextPrompt(prompt) {
// 	"use server";
// 	// The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
// 	//const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// 	console.log("ENVIRONMENT: ");
// 	console.log(apikey);

// 	// The Gemini 1.5 models are versatile and work with most use cases
// 	const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// 	const chat = model.startChat({
// 		history: [],
// 		generationConfig: {
// 			maxOutputTokens: 500,
// 		},
// 	});

// 	//const prompt = "Write a story about a magic backpack."

// 	const result = await chat.sendMessageStream(prompt);
// 	let text = "";
// 	for await (const chunk of result.stream) {
// 		const chunkText = await chunk.text();
// 		console.log(chunkText);
// 		text += chunkText;
// 	}
// 	// const response = await result.response;
// 	// const text = response.text();
// 	// return text;
// 	return <p>{text}</p>;
// }
