import { NextResponse } from "next/server";

export async function GET(request) {
  const url = new URL(request.url);
  const urlStr = url.searchParams.get("url");
  if (!urlStr) {
    return NextResponse.json(
      { error: "Missing url parameter" },
      { status: 400 }
    );
  }
  const response = await fetch('https://api.coze.com/open_api/v2/chat', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.COZE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "conversation_id": "123",
      "bot_id": process.env.COZE_BOT_ID,
      "user": "123333333",
      "query": url,
      "stream": false
    })
  })

  const result = await response.json();

  const answerChoice = result.messages.find(m => m.type === 'answer');
  const content = answerChoice.content.replace(/\```(json)?/g, '');
  let res = {}
  try {
    res = JSON.parse(content);
  } catch (error) {}
  return NextResponse.json(res);
}


export const maxDuration = 60;
