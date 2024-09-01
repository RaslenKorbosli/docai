import { ConvexError, v } from 'convex/values';
import {
  ActionCtx,
  internalMutation,
  MutationCtx,
  query,
  QueryCtx,
} from './_generated/server';
import { Id } from './_generated/dataModel';
import { api } from './_generated/api';

export const createUser = internalMutation({
  args: {
    userId: v.string(),
    fullName: v.string(),
    image: v.string(),
    email: v.string(),
  },
  async handler(ctx, args) {
    await ctx.db.insert('users', {
      userId: args.userId,
      fullName: args.fullName,
      image: args.image,
      email: args.email,
    });
  },
});
export const checkUser = async (
  ctx: QueryCtx | MutationCtx,
  userId: string
) => {
  const user = await ctx.db
    .query('users')
    .filter((q) => q.eq(q.field('userId'), userId))
    .unique();
  if (!user) throw new ConvexError('user dont exist');
  return user;
};

export const deleteUser = internalMutation({
  args: {
    userId: v.string(),
  },
  async handler(ctx, args) {
    const user = await checkUser(ctx, args.userId);
    const docs = await ctx.db
      .query('documents')
      .withIndex('by_userId', (q) => q.eq('userId', args.userId))
      .collect();
    docs.forEach(async (doc) => {
      await ctx.scheduler.runAfter(0, api.document.deleteDocument, {
        fileId: doc._id,
        fileStorageId: doc.fileStorageId,
        userId: args.userId,
      });
    });
    await await ctx.db.delete(user?._id);
  },
});
