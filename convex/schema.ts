import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    userId: v.string(),
    fullName: v.string(),
    email: v.string(),
    image: v.string(),
  }).index('by_userId', ['userId']),
  chats: defineTable({
    userId: v.string(),
    fileId: v.id('documents'),
    question: v.string(),
    answer: v.string(),
  }).index('by_userId_fileId', ['userId', 'fileId']),
  documents: defineTable({
    fileName: v.string(),
    fileSize: v.string(),
    fileType: v.string(),
    userId: v.string(),
    fileStorageId: v.id('_storage'),
    filePageContent: v.optional(v.string()),
  }).index('by_userId', ['userId']),
  chatsHistory: defineTable({
    userId: v.string(),
    fileId: v.id('documents'),
    fileTitle: v.optional(v.string()),
    lastConversationDate: v.number(),
    lastQuestion: v.string(),
  }).index('by_chatId_userId', ['fileId', 'userId']),
});
