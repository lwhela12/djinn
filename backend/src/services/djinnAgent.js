/**
 * Djinn agent for manifestation sessions
 */

const { sendMessage } = require('./claudeService');

/**
 * DjinnAgent wraps the manifestation AI persona logic.
 */
class DjinnAgent {
  constructor() {
    this.systemPrompt = `You are the Djinn, a manifestation guide who asks probing questions to help users clarify their deepest desires.`;
  }

  /**
   * Processes a new user message given the session history and returns the AI response.
   */
  async processMessage(sessionHistory, userMessage) {
    const messages = [
      { role: 'system', content: this.systemPrompt },
      ...sessionHistory,
      { role: 'user', content: userMessage },
    ];
    return sendMessage(messages);
  }

  /**
   * Determines if the session has reached completion based on messages.
   */
  isSessionComplete(messages) {
    // Stub: implement clarity detection logic later
    return false;
  }
}

module.exports = DjinnAgent;