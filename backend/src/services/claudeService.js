/**
 * Service to interact with Claude API
 */

const HUMAN_PROMPT = '\n\nHuman: ';
const AI_PROMPT = '\n\nAssistant: ';
const MODEL = process.env.CLAUDE_MODEL || 'claude-sonnet-4-20250514';
const API_URL = 'https://api.anthropic.com/v1/complete';

/**
 * Sends a conversation history to the Claude API and returns the assistant's reply.
 * @param {{role: string, content: string}[]} messages
 * @returns {Promise<string>}
 */
async function sendMessage(messages) {
  const prompt = [
    ...messages.map((msg) =>
      msg.role === 'assistant'
        ? `${AI_PROMPT}${msg.content}`
        : `${HUMAN_PROMPT}${msg.content}`
    ),
    AI_PROMPT,
  ].join('');

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': process.env.CLAUDE_API_KEY,
      'Anthropic-Version': process.env.CLAUDE_API_VERSION || '2024-11-08',
    },
    body: JSON.stringify({
      model: MODEL,
      prompt,
      max_tokens_to_sample: 1000,
      temperature: 0.7,
      stop_sequences: [HUMAN_PROMPT],
    }),
  });
  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Claude API error ${response.status}: ${err}`);
  }
  const data = await response.json();
  return data.completion.trim();
}

module.exports = { sendMessage, HUMAN_PROMPT, AI_PROMPT };