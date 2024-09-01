import { ConvexError, v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});
export const addDocument = mutation({
  args: {
    fileName: v.string(),
    userId: v.string(),
    fileStorageId: v.id('_storage'),
    fileSize: v.string(),
    fileType: v.string(),
  },
  async handler(ctx, args) {
    await ctx.db.insert('documents', {
      fileName: args.fileName,
      userId: args.userId,
      fileStorageId: args.fileStorageId,
      fileSize: args.fileSize,
      fileType: args.fileType,
    });
  },
});
export const deleteDocument = mutation({
  args: {
    fileId: v.id('documents'),
    userId: v.string(),
    fileStorageId: v.id('_storage'),
  },
  async handler(ctx, args) {
    const chats = await ctx.db
      .query('chats')
      .withIndex('by_userId_fileId', (q) =>
        q.eq('userId', args.userId).eq('fileId', args.fileId)
      )
      .collect();
    const chatHistory = await ctx.db
      .query('chatsHistory')
      .withIndex('by_fileId_userId', (q) =>
        q.eq('userId', args.userId).eq('fileId', args.fileId)
      )
      .unique();
    await ctx.db.delete(args.fileId);
    await ctx.storage.delete(args.fileStorageId);
    chats.forEach(async (chat) => await ctx.db.delete(chat._id));
    if (chatHistory !== null) await ctx.db.delete(chatHistory?._id);
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
    fileId: v.id('documents'),
  },
  async handler(ctx, args) {
    const document = await ctx.db.get(args.fileId);
    if (!document) throw new ConvexError('document not found');
    return document;
  },
});
export const getDocumentFileUrl = query({
  args: {
    fileStorageId: v.id('_storage'),
  },
  async handler(ctx, args) {
    const documentFile = await ctx.storage.getUrl(args.fileStorageId);
    if (!documentFile) throw new ConvexError('document not found in storage');
    return documentFile;
  },
});
export const patchDocumentContent = mutation({
  args: { fileId: v.id('documents'), filePageContent: v.optional(v.string()) },

  async handler(ctx, args) {
    ctx.db.patch(args.fileId, { filePageContent: args.filePageContent });
  },
});
