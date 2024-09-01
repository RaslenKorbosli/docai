'use client';

import { useQuery } from 'convex/react';
import { formatDistance } from 'date-fns';
import { Loader2, MoveUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';

export default function ChatHistory({ userId }: { userId: Id<'users'> }) {
  const getDocumentChatsHistory = useQuery(api.chat.getDocumentsChatsHistory, {
    userId: userId,
  });
  return (
    <div>
      {getDocumentChatsHistory === undefined ? (
        <div className="flex justify-center items-center container h-3/6 ">
          <Loader2 className="animate-spin h-14 w-14 " />
        </div>
      ) : getDocumentChatsHistory.length === 0 ? (
        <div className="flex flex-col gap-2 justify-center items-center h-fit mt-24">
          <Image
            src="/chatHistoryLogo.svg"
            width={300}
            height={300}
            alt="no chat history"
            className=" aspect-square"
          />
          <h1 className="text-2xl">You have no chat history yet !</h1>
          {/* <AddNewDocument /> */}
        </div>
      ) : (
        <div className="flex flex-wrap justify-start gap-4 py-4 md:px-20 overflow-y-scroll max-h-[calc(100vh-64px-100px)] ">
          {getDocumentChatsHistory.map((chatHistory) => (
            <div key={chatHistory._id} className="flex flex-col gap-4">
              {' '}
              <Link href={`/dashboard/chat/${chatHistory.fileId}`}>
                <div className="p-4 bg-accent hover:bg-accent/50 text-accent-foreground rounded-xl  w-80 flex flex-col gap-8 hover:shadow-lg ">
                  <div>
                    <h2 className="flex gap-2 justify-between items-center ">
                      {chatHistory.fileTitle}{' '}
                      <MoveUpRight className="h-4 w-4 text-secondary-foreground/75" />
                    </h2>{' '}
                    <p className="text-sm ml-4  flex gap-2">
                      {chatHistory.lastQuestion.slice(0, 20)} ...
                    </p>
                  </div>

                  <span className="self-end text-xs text-muted-foreground ">
                    {formatDistance(
                      chatHistory.lastConversationDate,
                      new Date(),
                      {
                        addSuffix: true,
                      }
                    )}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
