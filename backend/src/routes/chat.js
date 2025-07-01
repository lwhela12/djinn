const express = require('express');
const { PrismaClient } = require('@prisma/client');
const DjinnAgent = require('../services/djinnAgent');

const prisma = new PrismaClient();
const agent = new DjinnAgent();
const router = express.Router();

/**
 * Send a user message and get AI response for a given session.
 */
router.post('/:sessionId/message', async (req, res, next) => {
  const sessionId = Number(req.params.sessionId);
  const { content } = req.body;
  try {
    const session = await prisma.session.findUnique({ where: { id: sessionId } });
    if (!session || session.userId !== req.user.id) {
      return res.status(404).json({ message: 'Session not found' });
    }
    // Save user message
    await prisma.message.create({ data: { sessionId, role: 'user', content } });
    // Get full history
    const history = await prisma.message.findMany({
      where: { sessionId },
      orderBy: { timestamp: 'asc' },
    });
    // Generate AI reply
    const reply = await agent.processMessage(history, content);
    const aiMessage = await prisma.message.create({ data: { sessionId, role: 'assistant', content: reply } });
    // Check for completion
    if (agent.isSessionComplete([...history, { role: 'assistant', content: reply }])) {
      await prisma.session.update({
        where: { id: sessionId },
        data: { status: 'completed', completedAt: new Date() },
      });
    }
    res.json({ reply: aiMessage });
  } catch (err) {
    next(err);
  }
});

module.exports = router;