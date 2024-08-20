import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import SideNav from '@/components/SideNav';
import { BotMessageSquare, Send } from 'lucide-react';
import { currentUser, User } from '@clerk/nextjs/server';
import ChatForm from '@/components/ChatForm';
import { Id } from '../../../convex/_generated/dataModel';

import ChatMessages from '@/components/ChatMessages';

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) throw new Error('you must be logged in');

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[calc(100vh-56px)] max-w-screen  border"
    >
      <ResizablePanel defaultSize={70}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Header</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={30} className="min-w-[300px] ">
        <div className="flex flex-col  h-full  justify-between p-4 whitespace-pre-line ">
          <ChatMessages />
          <ChatForm userId={user.id as Id<'users'>} />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
