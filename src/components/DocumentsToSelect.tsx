'use client';

import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useUser } from '@clerk/clerk-react';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import AddNewDocument from './AddNewDocument';
import { Doc, Id } from '../../convex/_generated/dataModel';
import DocumentCardSelect from './DocumentCardSelect';

export default function DocumentsToSelect({ userId }: { userId: Id<'users'> }) {
  const userDocuments = useQuery(api.document.getUserDocuments, {
    userId: userId,
  });
  return (
    <div>
      {userDocuments === undefined ? (
        <div className="flex justify-center items-center container h-3/6 ">
          <Loader2 className="animate-spin h-14 w-14 " />
        </div>
      ) : userDocuments.length === 0 ? (
        <div className="flex flex-col gap-4 justify-center items-center h-fit mt-24">
          <Image
            src="/noData.svg"
            width={300}
            height={300}
            alt="no documents yet logo"
            className=" aspect-square"
          />
          <h1 className="text-2xl">No document yet , please upload one</h1>
          <AddNewDocument />
        </div>
      ) : (
        <div className="flex flex-wrap justify-start gap-4 py-4 md:px-20 overflow-y-scroll max-h-[calc(100vh-64px-100px)] ">
          {userDocuments.map((doc) => (
            <DocumentCardSelect
              key={doc._id}
              document={doc as Doc<'documents'>}
            />
          ))}
        </div>
      )}
    </div>
  );
}
