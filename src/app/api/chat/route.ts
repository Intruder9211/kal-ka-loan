import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not set in your environment variables. Please add it to your .env.local file.' },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { message, history } = body;

    const systemInstruction = `
      You are Kal, the official AI assistant for 'Kal Ka Loan', an Indian home loan aggregation platform.
      Your job is to answer user questions about home loans, interest rates, eligibility, and EMI calculations.
      - Always be extremely polite, concise, and helpful.
      - If asked to calculate EMI, perform the math formula: EMI = P * r * (1+r)^n / ((1+r)^n - 1) where P is principal, r is monthly interest rate (yearly rate/12/100), and n is tenure in months. Provide the exact numeric value in Indian Rupees.
      - If a user asks about rates, mention that they start from 8.35% for salaried individuals.
      - Format your responses with Markdown for readability (e.g., bolding important numbers).
      - Do not answer questions completely unrelated to finance, loans, real estate, or banking. Politely redirect them to home loans.
    `;

    // Use gemini-flash-latest (as per user's specific API key mapping)
    const model = genAI.getGenerativeModel({ 
      model: "gemini-flash-latest",
      systemInstruction: systemInstruction
    });

    // Start a chat session, injecting the past history
    const chat = model.startChat({
      history: history.map((msg: any) => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      }))
    });

    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    return NextResponse.json({ reply: responseText });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Sorry, I am having trouble connecting to my brain right now. Please try again later!" },
      { status: 500 }
    );
  }
}
