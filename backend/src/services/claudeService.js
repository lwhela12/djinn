/**
 * Service to interact with Claude API
 */

const MODEL = process.env.CLAUDE_MODEL || 'claude-sonnet-4-20250514';
const API_URL = 'https://api.anthropic.com/v1/messages';

/**
 * Sends a conversation history to the Claude API and streams the assistant's reply.
 * @param {{role: string, content: string}[]} messages
 * @param {import('express').Response} res The express response object to stream to.
 */
async function sendMessage(messages, res, systemPrompt) {
  const claudeMessages = messages.map(({ role, content }) => ({ role, content }));

  const body = {
    model: MODEL,
    messages: claudeMessages,
    max_tokens: 8192,
    temperature: 0.7,
    stream: true,
  };

  if (systemPrompt) {
    body.system = systemPrompt;
  }

  console.log('Sending to Claude:', JSON.stringify(body, null, 2));

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': process.env.CLAUDE_API_KEY,
      'Anthropic-Version': process.env.CLAUDE_API_VERSION || '2023-06-01',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Claude API error ${response.status}: ${err}`);
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  let buffer = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop();
    for (const line of lines) {
      if (line.startsWith('data:')) {
        const data = JSON.parse(line.substring(5));
        console.log('Received from Claude stream:', data);
        if (data.type === 'content_block_delta') {
          res.write(`data: ${JSON.stringify(data.delta)}

`);
        }
      }
    }
  }
  res.end();
}

async function generateChatName(messages, systemPrompt) {
  const claudeMessages = messages.map(({ role, content }) => ({ role, content }));

  const body = {
    model: 'claude-3-5-haiku-latest',
    messages: claudeMessages,
    max_tokens: 20,
    temperature: 0.7,
  };

  if (systemPrompt) {
    body.system = systemPrompt;
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': process.env.CLAUDE_API_KEY,
      'Anthropic-Version': process.env.CLAUDE_API_VERSION || '2023-06-01',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Claude API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  console.log('Claude API response for chat name:', data);
  return data.content[0].text.trim();
}

module.exports = { sendMessage, generateChatName };