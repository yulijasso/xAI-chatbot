import { NextRequest, NextResponse } from "next/server";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const apiKey = process.env.XAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "XAI_API_KEY is not configured." },
      { status: 500 }
    );
  }

  const response = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "grok-3",
      messages,
      stream: false,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    return NextResponse.json(
      { error: `xAI API error: ${error}` },
      { status: response.status }
    );
  }

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content ?? "No response.";

  return NextResponse.json({ reply });
}
