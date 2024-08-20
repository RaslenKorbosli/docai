import { ConvexError, v } from 'convex/values';
import {
  ActionCtx,
  internalMutation,
  MutationCtx,
  query,
  QueryCtx,
} from './_generated/server';
import { Id } from './_generated/dataModel';

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
const checkUser = async (ctx: QueryCtx | MutationCtx, id: Id<'users'>) => {
  const user = await ctx.db.get(id);
  if (!user) throw new ConvexError('u must be logged in');
  return user;
};

export const deleteUser = internalMutation({
  args: {
    userId: v.string(),
  },

  async handler(ctx, args) {
    const user = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('userId'), args.userId))
      .unique();
    if (!user) throw new ConvexError('user dont exist');
    await ctx.db.delete(user?._id);
  },
});
