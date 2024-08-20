import { v } from 'convex/values';
import Groq from 'groq-sdk';
import { api } from './_generated/api';
import { action, mutation, query } from './_generated/server';
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
export const generateConversation = action({
  args: {
    userId: v.string(),
    question: v.string(),
  },
  async handler(ctx, args) {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: args.question,
        },
      ],
      model: 'llama3-8b-8192',
    });
    const answer = chatCompletion.choices[0]?.message?.content || '';
    await ctx.runMutation(api.chat.addConversation, {
      userId: args.userId,
      question: args.question,
      answer,
    });
  },
});

export const addConversation = mutation({
  args: {
    question: v.string(),
    answer: v.string(),
    userId: v.string(),
  },
  async handler(ctx, args) {
    await ctx.db.insert('chats', {
      userId: args.userId,
      question: args.question,
      answer: args.answer,
    });
  },
});
export const getConversationRecords = query({
  args: {
    userId: v.string(),
  },
  async handler(ctx, args) {
    return await ctx.db.query('chats').collect();
  },
});
