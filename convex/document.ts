import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});
export const addDocument = mutation({
  args: {
    docName: v.string(),
    userId: v.string(),
    documentId: v.id('_storage'),
  },
  async handler(ctx, args) {
    await ctx.db.insert('documents', {
      docName: args.docName,
      userId: args.userId,
      documentId: args.documentId,
    });
  },
});
export const getUserDocuments = query({
  args: {
    userId: v.string(),
  },
  async handler(ctx, args) {
    return await ctx.db
      .query('documents')
      .withIndex('by_userId', (q) => q.eq('userId', args.userId))
      .collect();
  },
});
