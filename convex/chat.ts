import { ConvexError, v } from 'convex/values';
import Groq from 'groq-sdk';
import { api, internal } from './_generated/api';
import {
  action,
  internalMutation,
  mutation,
  MutationCtx,
  query,
  QueryCtx,
} from './_generated/server';
import { useQuery } from 'convex/react';
import { Id } from './_generated/dataModel';
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const chatCompletionFunction = async (question: string, content: string) => {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `giving the following text file from user ${content} answer any question user ask and do not answer any question that is not talk about the file provided and tell the user to ask a question about the file and not other subject and dont start your answer with According to the provided text file or anything like that `,
      },
      {
        role: 'user',
        content: `answer the question :${question}`,
      },
    ],
    model: 'llama3-8b-8192',
  });
  return chatCompletion.choices[0]?.message?.content || '';
};
export const generateConversation = action({
  args: {
    userId: v.string(),
    question: v.string(),
    fileId: v.id('documents'),
  },
  async handler(ctx, args) {
    const file = await ctx.runQuery(api.document.getUserDocument, {
      fileId: args.fileId,
    });
    if (!file) throw new ConvexError('document not found');
    const answer = await chatCompletionFunction(
      args.question,
      file.filePageContent ?? ''
    );
    const chatId = await ctx.runMutation(api.chat.addConversation, {
      userId: args.userId,
      question: args.question,
      answer,
      fileId: args.fileId,
    });
  },
});

export const addConversation = mutation({
  args: {
    question: v.string(),
    answer: v.string(),
    userId: v.string(),
    fileId: v.id('documents'),
  },
  async handler(ctx, args) {
    return await ctx.db.insert('chats', {
      userId: args.userId,
      question: args.question,
      answer: args.answer,
      fileId: args.fileId,
    });
  },
});

export const getConversationRecords = query({
  args: {
    fileId: v.id('documents'),
    userId: v.string(),
  },
  async handler(ctx, args) {
    return await ctx.db
      .query('chats')
      .withIndex('by_userId_fileId', (q) =>
        q.eq('userId', args.userId).eq('fileId', args.fileId)
      )
      .collect();
  },
});
export const addChatHistory = action({
  args: {
    fileId: v.id('documents'),
    lastQuestion: v.string(),
    userId: v.string(),
  },
  async handler(ctx, args) {
    const file = await ctx.runQuery(api.document.getUserDocument, {
      fileId: args.fileId,
    });
    if (!file) throw new ConvexError('document not found');
    const fileTitle = await chatCompletionFunction(
      'generate a short title to the file , just a title and nothing else and avoid writing double quotes',
      file.filePageContent ?? ''
    );
    const lastConversationDate = new Date().getTime();
    await ctx.runMutation(internal.chat.internalAddChatHistory, {
      fileId: args.fileId,
      userId: args.userId,
      fileTitle,
      lastQuestion: args.lastQuestion,
      lastConversationDate,
    });
  },
});
export const updateLastConversationDate = mutation({
  args: {
    fileId: v.id('documents'),
    userId: v.string(),
    lastQuestion: v.string(),
  },
  async handler(ctx, args) {
    const lastConversationDate = new Date().getTime();
    const documentChatHistory = await ctx.db
      .query('chatsHistory')
      .withIndex('by_fileId_userId', (q) =>
        q.eq('userId', args.userId).eq('fileId', args.fileId)
      )
      .unique();
    if (!documentChatHistory) throw new ConvexError('chat history not found');
    await ctx.db.patch(documentChatHistory._id, {
      lastConversationDate: lastConversationDate,
      lastQuestion: args.lastQuestion,
    });
  },
});
export const internalAddChatHistory = internalMutation({
  args: {
    fileId: v.id('documents'),
    fileTitle: v.string(),
    userId: v.string(),
    lastConversationDate: v.number(),
    lastQuestion: v.string(),
  },
  async handler(ctx, args) {
    await ctx.db.insert('chatsHistory', {
      fileId: args.fileId,
      userId: args.userId,
      fileTitle: args.fileTitle,
      lastConversationDate: args.lastConversationDate,
      lastQuestion: args.lastQuestion,
    });
  },
});
export const getDocumentsChatsHistory = query({
  args: {
    userId: v.string(),
  },
  async handler(ctx, args) {
    return await ctx.db
      .query('chatsHistory')
      .withIndex('by_userId', (q) => q.eq('userId', args.userId))
      .collect();
  },
});
