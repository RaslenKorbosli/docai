import { ConvexError, v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});
export const addDocument = mutation({
  args: {
    docName: v.string(),
    userId: v.string(),
    documentStorageId: v.id('_storage'),
  },
  async handler(ctx, args) {
    await ctx.db.insert('documents', {
      docName: args.docName,
      userId: args.userId,
      documentStorageId: args.documentStorageId,
    });
  },
});
export const deleteDocument = mutation({
  args: {
    documentId: v.id('documents'),
    documentStorageId: v.id('_storage'),
  },
  async handler(ctx, args) {
    await ctx.db.delete(args.documentId);
    await ctx.storage.delete(args.documentStorageId);
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
export const getUserDocument = query({
  args: {
    documentId: v.id('documents'),
  },
  async handler(ctx, args) {
    const document = await ctx.db.get(args.documentId);
    if (!document) throw new ConvexError('document not found');
    return document;
  },
});
export const getDocumentFileUrl = query({
  args: {
    documentStorageId: v.id('_storage'),
  },
  async handler(ctx, args) {
    const documentFile = await ctx.storage.getUrl(args.documentStorageId);
    if (!documentFile) throw new ConvexError('document not found in storage');
    return documentFile;
  },
});
