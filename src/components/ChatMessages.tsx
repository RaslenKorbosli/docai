'use client';
import { useQuery } from 'convex/react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@clerk/clerk-react';
import { BotMessageSquare, Ellipsis, Loader2 } from 'lucide-react';
import { api } from '../../convex/_generated/api';
import { RefObject, useEffect, useRef } from 'react';
export default function ChatMessages() {
  const user = useUser();
  const ref = useRef<HTMLDivElement>(null);

  const chatConversation = useQuery(api.chat.getConversationRecords, {
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
      <div className="bg-slate-100 rounded-lg flex gap-2 p-2 w-fit ">
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
            <>
              <div className="bg-slate-300 rounded-lg flex gap-2 p-2 items-center w-fit self-end ">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.user?.imageUrl ?? ''} />
                  <AvatarFallback className="bg-slate-200">
                    {user.user?.firstName?.slice(0, 1)}
                    {user.user?.lastName?.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
                {chat.question}
              </div>
              <div className="bg-slate-100 rounded-lg flex gap-2 p-2 w-fit ">
                <div>
                  <BotMessageSquare className="h-6 w-6" />
                </div>
                {chat.answer}
              </div>{' '}
            </>
          );
        })
      )}
      <div ref={ref}></div>
    </div>
  );
}
