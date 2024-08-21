import ChatForm from '@/components/ChatForm';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

import ChatMessages from '@/components/ChatMessages';
import { Id } from '../../../../convex/_generated/dataModel';
import DocumentsToSelect from '@/components/DocumentsToSelect';
import { currentUser } from '@clerk/nextjs/server';

export default async function ChatPage() {
  const user = await currentUser();
  return (
    <div className=" w-full  min-h-[calc(100vh-56px)] ">
      <div className="flex py-8 md:px-20 justify-between items-start  ">
        <h1 className="text-2xl font-semibold">Select Document to chat</h1>
      </div>{' '}
      <DocumentsToSelect userId={user?.id as Id<'users'>} />
    </div>
  );
}
