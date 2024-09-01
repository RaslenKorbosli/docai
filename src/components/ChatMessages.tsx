'use client';
import { useQuery } from 'convex/react';

import { useUser } from '@clerk/clerk-react';
import { BotMessageSquare, Ellipsis } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';
import UserImageProfile from './UserImageProfile';
export default function ChatMessages({
  documentId,
}: {
  documentId: Id<'documents'>;
}) {
  const user = useUser();

  const ref = useRef<HTMLDivElement>(null);

  const chatConversation = useQuery(api.chat.getConversationRecords, {
    fileId: documentId,
    userId: user.user?.id!,
  });
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
      // ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [chatConversation]);
  return (
    <div className="flex flex-col gap-4 overflow-scroll max-h-[calc(100vh-56px-36px-40px)] no-scrollbar">
      <div className="bg-accent text-accent-foreground rounded-lg flex gap-2 p-2 w-fit ">
        <div>
          <BotMessageSquare className="h-6 w-6" />
        </div>
        Welcome! I&apos;m ready to help you with your questions on the document.
      </div>
      {chatConversation === undefined ? (
        <Ellipsis className="animate-bounce h-8 w-8" />
      ) : (
        chatConversation.map((chat) => {
          return (
            <div key={chat._id} className="flex flex-col gap-4 mt-2 ">
              <div className=" bg-primary/90 text-primary-foreground  rounded-lg flex gap-2 p-2 items-center w-fit self-end ">
                <UserImageProfile
                  ImageUrl={user.user?.imageUrl ?? ''}
                  firstName={user.user?.firstName ?? ''}
                  lastName={user.user?.lastName ?? ''}
                />
                {chat.question}
              </div>
              <div className="bg-accent text-accent-foreground rounded-lg flex gap-2 p-2 w-fit ">
                <div>
                  <BotMessageSquare className="h-6 w-6" />
                </div>
                {chat.answer}
              </div>{' '}
            </div>
          );
        })
      )}
      <div ref={ref}></div>
    </div>
  );
}
