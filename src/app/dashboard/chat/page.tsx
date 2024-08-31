import ChatHistory from '@/components/ChatHistory';
import { currentUser } from '@clerk/nextjs/server';
import { Id } from '../../../../convex/_generated/dataModel';

export default async function ChatPage() {
  const user = await currentUser();
  return (
    <div className=" w-full  min-h-[calc(100vh-56px)] ">
      <div className="flex py-8 md:px-20 justify-between items-start  ">
        <h1 className="text-2xl font-semibold">Chat history</h1>
      </div>{' '}
      <ChatHistory userId={user?.id as Id<'users'>} />
    </div>
  );
}
