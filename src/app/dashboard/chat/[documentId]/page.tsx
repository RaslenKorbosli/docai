import ChatForm from '@/components/ChatForm';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { currentUser } from '@clerk/nextjs/server';
import { Id } from '../../../../../convex/_generated/dataModel';

import ChatMessages from '@/components/ChatMessages';
import PdfViewer from '@/components/PdfViewer';

export default async function DocumentChatPage({
  params,
}: {
  params: { documentId: Id<'documents'> };
}) {
  const user = await currentUser();
  if (!user) throw new Error('you must be logged in');

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[calc(100vh-56px)] max-w-screen  border"
    >
      <ResizablePanel defaultSize={70} className="relative">
        <div className="flex h-full justify-center   overflow-y-scroll ">
          <PdfViewer documentId={params.documentId} />
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
