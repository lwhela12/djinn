const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

/**
 * List all sessions for the authenticated user.
 */
router.get('/', async (req, res, next) => {
  try {
    const sessions = await prisma.session.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
    });
    res.json(sessions);
  } catch (err) {
    next(err);
  }
});

/**
 * Create a new session.
 */
router.post('/', async (req, res, next) => {
  try {
    const session = await prisma.session.create({
      data: { userId: req.user.id, title: req.body.title },
    });
    // Seed initial AI prompt for new manifestation session
    await prisma.message.create({
      data: { sessionId: session.id, role: 'assistant', content: 'What do you want?' },
    });
    res.status(201).json(session);
  } catch (err) {
    next(err);
  }
});

/**
 * Get a session by ID, including its messages.
 */
router.get('/:id', async (req, res, next) => {
  const id = Number(req.params.id);
  try {
    const session = await prisma.session.findUnique({
      where: { id },
      include: { messages: { orderBy: { timestamp: 'asc' } } },
    });
    if (!session || session.userId !== req.user.id) {
      return res.status(404).json({ message: 'Session not found' });
    }
    res.json(session);
  } catch (err) {
    next(err);
  }
});

/**
 * Update session title or status.
 */
router.patch('/:id', async (req, res, next) => {
  const id = Number(req.params.id);
  const { title, status } = req.body;
  try {
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (status) {
      updateData.status = status;
      if (status === 'completed') updateData.completedAt = new Date();
    }
    const session = await prisma.session.updateMany({
      where: { id, userId: req.user.id },
      data: updateData,
    });
    if (session.count === 0) {
      return res.status(404).json({ message: 'Session not found' });
    }
    const updated = await prisma.session.findUnique({ where: { id } });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

/**
 * Delete a session.
 */
router.delete('/:id', async (req, res, next) => {
  const id = Number(req.params.id);
  try {
    // Delete associated messages first due to foreign key constraints
    await prisma.message.deleteMany({
      where: { sessionId: id },
    });
    const deleted = await prisma.session.deleteMany({
      where: { id, userId: req.user.id },
    });
    if (deleted.count === 0) {
      return res.status(404).json({ message: 'Session not found' });
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;