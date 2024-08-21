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
    question: v.string(),
    answer: v.string(),
  }).index('by_userId', ['userId']),
  documents: defineTable({
    docName: v.string(),
    userId: v.string(),
    documentStorageId: v.id('_storage'),
  }).index('by_userId', ['userId']),
});
