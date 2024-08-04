# RACOS
## *R*outed *A*dmission *Co*unseling *S*upport
This is the frontend web app of RACOS, which handling user interfaces, speech recognition, voice synthesis and
streaming output from LLM models.

## Getting Started

Make sure you added environment variables. Create an .env file in the root folder that look like this: 
```env
GOOGLE_GENERATIVE_AI_API_KEY=[your Google API key]
API_KEY=[your Google API key]
BACKEND_URL=[your backend port]
```
The `GOOGLE_GENERATIVE_AI_API_KEY` and `API_KEY` should have the same value, and `BACKEND_URL` is the port of your backend
that handle the user prompt before sending it to LLM providers. See our backend repository for more information.

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

We also deployed it [here on Vercel](https://chatbot-app-xi.vercel.app/) so you can test it out.

## Dependencies
- Next.js
- React
- Tailwind CSS
- Daisy UI
- Web Speech API
- Vercel AI SDK

