import { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

// Initialize OpenAI with server-side API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Server-side environment variable
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    const { prompt, topic, difficulty, count } = req.body;

    // Validate input
    if (!prompt || !topic || !difficulty || !count) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required parameters' 
      });
    }

    // Validate count to prevent abuse
    if (count > 10) {
      return res.status(400).json({ 
        success: false, 
        error: 'Maximum 10 questions per request' 
      });
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ 
        success: false, 
        error: 'OpenAI API key not configured' 
      });
    }

    console.log(`Generating ${count} questions for ${topic} (${difficulty})`);

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert computer science educator who creates high-quality, educational quiz questions. Always respond with valid JSON format."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 2000,
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const responseText = completion.choices[0]?.message?.content;
    if (!responseText) {
      throw new Error('No response from OpenAI');
    }

    console.log('OpenAI response received');
    
    const parsedResponse = JSON.parse(responseText);
    const questions = parsedResponse.questions || [];

    return res.status(200).json({
      success: true,
      questions,
      tokensUsed: completion.usage?.total_tokens
    });

  } catch (error) {
    console.error('Error in generate-questions API:', error);
    
    let errorMessage = 'Internal server error';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return res.status(500).json({
      success: false,
      error: errorMessage
    });
  }
}
