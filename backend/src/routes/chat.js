const express = require('express');
const { PrismaClient } = require('@prisma/client');
const DjinnAgent = require('../services/djinnAgent');
const { generateChatName } = require('../services/claudeService');

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
    await agent.processMessage(history, content, res);
  } catch (err) {
    next(err);
  }
});

router.post('/:sessionId/message/assistant', async (req, res, next) => {
  const sessionId = Number(req.params.sessionId);
  const { content } = req.body;
  try {
    const session = await prisma.session.findUnique({ where: { id: sessionId } });
    if (!session || session.userId !== req.user.id) {
      return res.status(404).json({ message: 'Session not found' });
    }
    await prisma.message.create({ data: { sessionId, role: 'assistant', content } });
    res.status(201).json({ message: 'Assistant message saved' });
  } catch (err) {
    next(err);
  }
});

router.post('/:sessionId/name', async (req, res, next) => {
  const sessionId = Number(req.params.sessionId);
  try {
    const session = await prisma.session.findUnique({ where: { id: sessionId } });
    if (!session || session.userId !== req.user.id) {
      return res.status(404).json({ message: 'Session not found' });
    }

    const messages = await prisma.message.findMany({
      where: { sessionId },
      orderBy: { timestamp: 'asc' },
      take: 3, // Get the first few messages for context
    });

    const chatName = await generateChatName(messages, 'Name this manifestation in no more than 7 words.');

    await prisma.session.update({
      where: { id: sessionId },
      data: { title: chatName },
    });

    res.status(200).json({ title: chatName });
  } catch (err) {
    next(err);
  }
});

module.exports = router;